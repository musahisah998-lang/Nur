import { AuthCard } from '@/components/auth/auth-card';
import { SiteHeader } from '@/components/site-header';

export default function SignupPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="container-shell flex items-center justify-center py-16">
        <AuthCard mode="signup" />
      </div>
    </main>
  );
}
