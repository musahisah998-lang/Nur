create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade not null,
  full_name text not null,
  email text not null,
  role text not null default 'student' check (role in ('student', 'teacher', 'reviewer', 'admin', 'super_admin')),
  avatar text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, avatar, created_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'User'),
    new.email,
    'student',
    null,
    now()
  );

  return new;
end;
$$;

create or replace trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create policy "User can view own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "User can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "User can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Admins can access all profiles"
on public.profiles
for select
using (
  exists (
    select 1
    from public.profiles current_profile
    where current_profile.id = auth.uid()
      and current_profile.role in ('admin', 'super_admin')
  )
);

create or replace function public.prevent_role_changes()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  new.role := 'student';
  return new;
end;
$$;

create or replace trigger enforce_student_role_on_profile_updates
before update on public.profiles
for each row execute procedure public.prevent_role_changes();
