import { NextResponse } from 'next/server';
import { getCourse, getLessonsByCourse } from '@/lib/data/sheetsRepo';

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const course = await getCourse(params.id);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    const lessons = await getLessonsByCourse(params.id);
    return NextResponse.json({ course, lessons });
  } catch (error) {
    console.error('Error loading course', error);
    return NextResponse.json({ error: 'Failed to load course' }, { status: 500 });
  }
}
