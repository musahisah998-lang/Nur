import Link from 'next/link';
import { LogoutButton } from '@/components/logout-button';
import { requireProfile } from '@/lib/user';
import { formatRoleLabel } from '@/lib/roles';

const futureModules = [
  'Nur Assistant',
  'Qur\'an',
  'Library',
  'Academy',
  'Courses'
];

export default async function DashboardPage() {
  const profile = await requireProfile();

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container-shell flex items-center justify-between gap-4 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-brand-primary">Nur</p>
            <h1 className="text-xl font-black text-slate-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/profile" className="button-secondary px-4 py-2.5 text-sm">
              Profile
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="container-shell py-10 md:py-14">
        <section className="card-surface rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-primary">Welcome</p>
              <h2 className="mt-3 text-3xl font-black text-slate-900">{profile.full_name}</h2>
            </div>
            <div className="rounded-2xl border border-brand-primary/10 bg-brand-primary/5 px-4 py-3 text-sm font-medium text-brand-primary">
              Role: {formatRoleLabel(profile.role)}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {futureModules.map((module) => (
            <article key={module} className="card-surface rounded-[1.5rem] p-5">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-slate-800">{module}</span>
                <span className="rounded-full bg-brand-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-primary">
                  Soon
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                This module is planned for a future release. Full functionality will be added later.
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
