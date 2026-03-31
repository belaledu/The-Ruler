import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isDashboardRoute = path.startsWith('/dashboard');
  const isAdminRoute = path.startsWith('/admin');
  const isAuthRoute = path.startsWith('/auth');

  // If trying to access protected route without token
  if ((isDashboardRoute || isAdminRoute) && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If trying to access auth routes with token
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Verify token and role for admin routes
  if (isAdminRoute && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only');
      const { payload } = await jwtVerify(token, secret);
      
      if (payload.role !== 'super_admin' && payload.role !== 'content_manager') {
        // Redirect non-admins to student dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // Invalid token
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/:path*'],
};
