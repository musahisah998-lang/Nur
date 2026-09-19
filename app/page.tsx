import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';

const modules = [
  { title: 'Nur Assistant', note: 'AI helper coming soon' },
  { title: 'Qur\'an', note: 'Study and reflection hub' },
  { title: 'Library', note: 'Readings and resources' },
  { title: 'Academy', note: 'Learning tracks and classes' },
  { title: 'Courses', note: 'Structured pathways for growth' }
];

export default function HomePage() {
  return (
    <main>
      <SiteHeader />

      <section className="container-shell grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
        <div>
          <span className="inline-flex rounded-full border border-brand-primary/20 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
            Foundation Build
          </span>
          <h1 className="section-title mt-6 text-slate-900">
            A trustworthy home for Islamic learning, growth, and community.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Nur is designed to grow into a modern Islamic learning platform with a digital library, academy, Quran area, and guided learning experiences.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup" className="button-primary h-12 px-6 text-base">
              Create Account
            </Link>
            <Link href="/login" className="button-secondary h-12 px-6 text-base">
              Login
            </Link>
          </div>
        </div>

        <div className="card-surface rounded-[2rem] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-2xl font-black text-white">
              N
            </div>
            <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
              Nur
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-brand-soft p-4">
              <p className="text-sm text-slate-500">Mission</p>
              <p className="mt-2 text-xl font-bold text-slate-800">Build knowledge with clarity and trust.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map((module) => (
                <div key={module.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-base font-bold text-slate-800">{module.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{module.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
