import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { findByField, ensureSheetWithHeaders } from '@/lib/google/sheets.service';
import { ensureDemoData } from '@/lib/data/sheetsRepo';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = loginSchema.parse(body);

    // Ensure seed/admin users are present (Belal + demo accounts)
    await ensureDemoData();

    const STUDENT_HEADERS = ['ID', 'Name', 'Email', 'Phone', 'Password', 'Grade', 'City', 'CreatedAt', 'Status', 'Role'];
    await ensureSheetWithHeaders('Students', STUDENT_HEADERS);
    
    // Find user
    const users = await findByField('Students', 'Email', validatedData.email);
    const user = users[0];
    
    if (!user) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // Check password
    if (!user.Password) {
      return NextResponse.json(
        { error: 'حدث خطأ في بيانات الحساب' },
        { status: 500 }
      );
    }
    
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.Password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // Check status
    if (user.Status !== 'active') {
      return NextResponse.json(
        { error: 'حسابك غير نشط، يرجى التواصل مع الدعم' },
        { status: 403 }
      );
    }

    // Generate JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only');
    const alg = 'HS256';
    
    const token = await new SignJWT({ 
      id: user.ID, 
      role: user.Role, 
      email: user.Email,
      name: user.Name,
      grade: user.Grade
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('30d') // 30 days
      .sign(secret);

    // Create response
    const response = NextResponse.json(
      { 
        message: 'تم تسجيل الدخول بنجاح',
        user: {
          id: user.ID,
          name: user.Name,
          email: user.Email,
          role: user.Role,
          grade: user.Grade
        }
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;

  } catch (error: any) {
    console.error('Login error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'بيانات غير صالحة' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    );
  }
}
