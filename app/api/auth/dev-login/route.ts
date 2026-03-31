import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only'
);

export async function POST() {
  const isEnabled = process.env.ALLOW_DUMMY_LOGIN === 'true';

  if (!isEnabled) {
    return NextResponse.json(
      { error: 'Dummy login is disabled. Set ALLOW_DUMMY_LOGIN=true to enable it temporarily.' },
      { status: 403 }
    );
  }

  const dummyUser = {
    id: 'dev-user-1',
    name: 'Demo Student',
    email: 'demo@student.local',
    role: 'student',
    grade: '12',
  } as const;

  const token = await new SignJWT(dummyUser)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  const response = NextResponse.json(
    {
      message: 'Dummy login successful',
      user: dummyUser,
    },
    { status: 200 }
  );

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  return response;
}
