import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { verifyAuth } from '@/lib/auth';
import { listStudents, addStudent, updateStudent, removeStudent } from '@/lib/data/sheetsRepo';

const adminGuard = async (request: Request) => {
  const user = await verifyAuth(request);
  if (!user || (user.role !== 'super_admin' && user.role !== 'content_manager')) {
    return null;
  }
  return user;
};

const studentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  password: z.string().min(6).optional(),
  grade: z.string().optional(),
  city: z.string().optional(),
  status: z.enum(['active', 'blocked']).optional(),
  role: z.enum(['student', 'super_admin', 'content_manager']).optional(),
});

export async function GET(request: Request) {
  const user = await adminGuard(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const students = await listStudents();
  return NextResponse.json({ students });
}

export async function POST(request: Request) {
  const user = await adminGuard(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const data = studentSchema.omit({ id: true }).parse(body);

    const existing = await listStudents();
    const conflict = existing.find((s) => s.Email === data.email || s.Phone === data.phone);
    if (conflict) {
      return NextResponse.json({ error: 'البريد أو الهاتف مستخدم بالفعل' }, { status: 400 });
    }

    const passwordHash = data.password ? await bcrypt.hash(data.password, 12) : undefined;
    const created = await addStudent({
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash,
      grade: data.grade,
      city: data.city,
      status: data.status,
      role: data.role,
    });

    return NextResponse.json({ student: created }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'بيانات غير صالحة' }, { status: 400 });
    }
    console.error('Create student failed', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء إنشاء الطالب' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const user = await adminGuard(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const data = studentSchema.parse(body);
    if (!data.id) return NextResponse.json({ error: 'ID مطلوب' }, { status: 400 });

    const passwordHash = data.password ? await bcrypt.hash(data.password, 12) : undefined;

    const updated = await updateStudent(data.id, {
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Grade: data.grade,
      City: data.city,
      Status: data.status,
      Role: data.role,
      ...(passwordHash ? { Password: passwordHash } : {}),
    });

    if (!updated) return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });

    return NextResponse.json({ student: updated });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'بيانات غير صالحة' }, { status: 400 });
    }
    console.error('Update student failed', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تحديث الطالب' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await adminGuard(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID مطلوب' }, { status: 400 });

    const ok = await removeStudent(id);
    if (!ok) return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });

    return NextResponse.json({ message: 'تم الحذف' });
  } catch (error) {
    console.error('Delete student failed', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء حذف الطالب' }, { status: 500 });
  }
}
