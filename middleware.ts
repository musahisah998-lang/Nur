import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        }
      }
    }
  );

  const { data } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;
  const protectedRoutes = ['/dashboard', '/profile', '/admin'];

  if (
    protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)) &&
    !data.user
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*']
};
