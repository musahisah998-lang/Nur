'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export function SiteHeader() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function checkSession() {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(Boolean(data.user));
      setLoading(false);
    }

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session));
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-brand-secondary/90 backdrop-blur-lg">
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3 text-brand-primary">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary text-lg font-black text-white shadow-soft">
            N
          </div>
          <div>
            <div className="text-xl font-black tracking-tight">Nur</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Islamic Learning</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/" className="transition hover:text-brand-primary">Gida</Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="transition hover:text-brand-primary">Dashboard</Link>
              <Link href="/profile" className="transition hover:text-brand-primary">Profile</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="transition hover:text-brand-primary">Login</Link>
              <Link href="/signup" className="transition hover:text-brand-primary">Create Account</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!loading && isLoggedIn ? (
            <button onClick={handleSignOut} className="button-secondary px-4 py-2.5 text-sm">
              Logout
            </button>
          ) : (
            <Link href="/login" className="button-primary px-4 py-2.5 text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
