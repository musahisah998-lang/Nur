import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function getProfileData() {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user.id)
    .maybeSingle();

  if (error || !profile) {
    return null;
  }

  return profile;
}

export async function requireProfile() {
  const profile = await getProfileData();
  if (!profile) {
    redirect('/login');
  }

  return profile;
}
