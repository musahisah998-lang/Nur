import Link from 'next/link';
import { LogoutButton } from '@/components/logout-button';
import { requireProfile } from '@/lib/user';
import { formatRoleLabel } from '@/lib/roles';

export default async function ProfilePage() {
  const profile = await requireProfile();

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container-shell flex items-center justify-between gap-4 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-brand-primary">Nur</p>
            <h1 className="text-xl font-black text-slate-900">Profile</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="button-secondary px-4 py-2.5 text-sm">
              Dashboard
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="container-shell py-10 md:py-14">
        <section className="card-surface rounded-[2rem] p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary text-2xl font-black text-white">
              {profile.full_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-primary">User Profile</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">{profile.full_name}</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Full Name</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{profile.full_name}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{profile.email}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Role</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{formatRoleLabel(profile.role)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Member Since</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {new Date(profile.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
