import { NextResponse } from 'next/server';
import { getCourse, getLessonsByCourse } from '@/lib/data/sheetsRepo';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const course = await getCourse(id);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    const lessons = await getLessonsByCourse(id);
    return NextResponse.json({ course, lessons });
  } catch (error) {
    console.error('Error loading course', error);
    return NextResponse.json({ error: 'Failed to load course' }, { status: 500 });
  }
}
