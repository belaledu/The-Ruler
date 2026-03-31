import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { createCourse, listCoursesAdmin } from '@/lib/data/sheetsRepo';
import { updateRowById, deleteRowById, readSheet, ensureSheetWithHeaders } from '@/lib/google/sheets.service';
import { z } from 'zod';

const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  description: z.string().optional(),
  grade: z.string().min(1),
  price: z.string().min(1),
  thumbnail: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || (user.role !== 'super_admin' && user.role !== 'content_manager')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = courseSchema.omit({ id: true }).parse(body);

    const course = await createCourse({
      title: data.title,
      description: data.description,
      grade: data.grade,
      price: data.price,
      thumbnail: data.thumbnail,
      isPublished: data.isPublished,
    });

    return NextResponse.json({ message: 'Course created successfully', id: course.ID, course }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'بيانات غير صالحة' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || (user.role !== 'super_admin' && user.role !== 'content_manager')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courses = await listCoursesAdmin();
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching admin courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || (user.role !== 'super_admin' && user.role !== 'content_manager')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = courseSchema.parse(body);
    if (!data.id) return NextResponse.json({ error: 'ID مطلوب' }, { status: 400 });

    await ensureSheetWithHeaders('Courses', ['ID','Title','Description','Grade','Price','Thumbnail','IsPublished','LessonsCount','DurationMins']);
    const existing = await readSheet('Courses');
    const found = existing.find((c) => c.ID === data.id);
    if (!found) return NextResponse.json({ error: 'الكورس غير موجود' }, { status: 404 });

    const merged = {
      ...found,
      Title: data.title,
      Description: data.description ?? found.Description,
      Grade: data.grade,
      Price: data.price,
      Thumbnail: data.thumbnail ?? found.Thumbnail,
      IsPublished: data.isPublished !== undefined ? (data.isPublished ? 'true' : 'false') : found.IsPublished,
    };

    await updateRowById('Courses', data.id, merged);
    return NextResponse.json({ course: merged });
  } catch (error) {
    console.error('Error updating course:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'بيانات غير صالحة' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || (user.role !== 'super_admin' && user.role !== 'content_manager')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID مطلوب' }, { status: 400 });

    await ensureSheetWithHeaders('Courses', ['ID','Title','Description','Grade','Price','Thumbnail','IsPublished','LessonsCount','DurationMins']);
    const existing = await readSheet('Courses');
    const found = existing.find((c) => c.ID === id);
    if (!found) return NextResponse.json({ error: 'الكورس غير موجود' }, { status: 404 });

    await deleteRowById('Courses', id);
    return NextResponse.json({ message: 'تم الحذف' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
