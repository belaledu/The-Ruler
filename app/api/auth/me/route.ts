import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { findById, ensureSheetWithHeaders } from '@/lib/google/sheets.service';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only');
    const { payload } = await jwtVerify(token, secret);

    const STUDENT_HEADERS = ['ID', 'Name', 'Email', 'Phone', 'Password', 'Grade', 'City', 'CreatedAt', 'Status', 'Role'];
    await ensureSheetWithHeaders('Students', STUDENT_HEADERS);

    const user = await findById('Students', payload.id as string);

    if (!user) {
      return NextResponse.json({ error: 'المستخدم غير موجود' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.ID,
        name: user.Name,
        email: user.Email,
        role: user.Role,
        grade: user.Grade,
        phone: user.Phone,
        city: user.City,
      }
    });
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }
}
