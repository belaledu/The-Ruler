import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { readSheet, createRow, ensureSheetWithHeaders } from '@/lib/google/sheets.service';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  phone: z.string().min(10, 'رقم الجوال غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  grade: z.string().min(1, 'الرجاء اختيار المرحلة الدراسية'),
  city: z.string().min(1, 'الرجاء اختيار المدينة'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);
    
    // Ensure sheet and headers exist
    const STUDENT_HEADERS = ['ID', 'Name', 'Email', 'Phone', 'Password', 'Grade', 'City', 'CreatedAt', 'Status', 'Role'];
    await ensureSheetWithHeaders('Students', STUDENT_HEADERS);

    // Check if user already exists
    const existingUsers = await readSheet('Students');
    const userExists = existingUsers.some(
      (user) => user.Email === validatedData.email || user.Phone === validatedData.phone
    );
    
    if (userExists) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو رقم الجوال مسجل مسبقاً' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);
    
    // Generate unique ID
    const userId = `stu_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    // Create user row
    const newUser = {
      ID: userId,
      Name: validatedData.name,
      Email: validatedData.email,
      Phone: validatedData.phone,
      Password: hashedPassword,
      Grade: validatedData.grade,
      City: validatedData.city,
      CreatedAt: new Date().toISOString(),
      Status: 'active',
      Role: 'student',
    };

    await createRow('Students', newUser);

    return NextResponse.json(
      { message: 'تم التسجيل بنجاح', userId },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'بيانات غير صالحة' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'حدث خطأ أثناء التسجيل' },
      { status: 500 }
    );
  }
}
