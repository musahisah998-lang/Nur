import { redirect } from 'next/navigation';
import { LogoutButton } from '@/components/logout-button';
import { isAdminRole } from '@/lib/roles';
import { getProfileData } from '@/lib/user';

export default async function AdminPage() {
  const profile = await getProfileData();

  if (!profile) {
    redirect('/login');
  }

  if (!isAdminRole(profile.role)) {
    return (
      <main className="min-h-screen bg-brand-secondary px-4 py-10">
        <div className="container-shell max-w-xl rounded-[2rem] border border-red-200 bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.2em] text-red-600">Access denied</p>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Admin access required</h1>
          <p className="mt-4 text-base text-slate-600">
            This area is reserved for administrators and super administrators only.
          </p>
          <a href="/dashboard" className="button-primary mt-6 h-12 px-5 text-sm">
            Return to Dashboard
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container-shell flex items-center justify-between gap-4 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-brand-primary">Nur</p>
            <h1 className="text-xl font-black text-slate-900">Admin Dashboard</h1>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="container-shell py-10 md:py-14">
        <section className="card-surface rounded-[2rem] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.18em] text-brand-primary">Control Center</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Admin Dashboard</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Current user</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{profile.full_name}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Current role</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{profile.role}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
