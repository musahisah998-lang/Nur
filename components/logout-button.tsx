'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <button onClick={handleSignOut} className="button-secondary px-4 py-2.5 text-sm">
      Logout
    </button>
  );
}
