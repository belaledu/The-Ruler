import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only'
);

export async function verifyAuth(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: string; email: string; role: string; name: string; grade?: string };
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
