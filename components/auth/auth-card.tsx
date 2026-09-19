'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const authFieldErrorMap: Record<string, string> = {
  'Invalid login credentials': 'Kuskuren shigarwar email ko kalmar sirri ba daidai ba ne.',
  'Email not confirmed': 'Email din da kuka shigar bai tabbatar ba. Duba akwatin saƙon ku.',
  'User already registered': 'An riga an yi rijista da wannan email.',
  'Password should be at least 6 characters': 'Kalmar sirri ta dole ta kasance haruffa 6 ko sama.',
  'Signup requires a valid email': 'Email mai inganci ya zama dole don yin rajista.'
};

function translateAuthError(message: string) {
  return authFieldErrorMap[message] ?? message || 'An sami matsala. Dan Allah sake gwadawa.';
}

export function AuthCard({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          setError('Sunanka ya zama dole.');
          return;
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName.trim()
            }
          }
        });

        if (signUpError) {
          setError(translateAuthError(signUpError.message));
          return;
        }

        if (!data.user) {
          setError('An yi rijista, amma an kasa haifar da asusun. Sake gwadawa.');
          return;
        }

        if (!data.session) {
          setError('Da fatan za a tabbatar da email kafin shiga dashboard.');
          return;
        }

        router.push('/dashboard');
        router.refresh();
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        setError(translateAuthError(signInError.message));
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('An sami matsala. Da fatan za a sake gwadawa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-surface w-full max-w-lg rounded-[2rem] p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary">Nur</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </h1>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-xl font-black text-brand-primary">
          N
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div>
            <label htmlFor="full_name" className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              id="full_name"
              name="full_name"
              className="input-style"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your full name"
              autoComplete="name"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            className="input-style"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            className="input-style"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
          />
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        <button type="submit" disabled={loading} className="button-primary h-12 w-full text-base disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
        <Link href={mode === 'login' ? '/signup' : '/login'} className="font-semibold text-brand-primary hover:underline">
          {mode === 'login' ? 'Create an account' : 'Log in'}
        </Link>
      </p>
    </div>
  );
}
