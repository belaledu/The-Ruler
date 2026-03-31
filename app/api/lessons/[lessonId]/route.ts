import { NextResponse } from 'next/server';
import { getCourse, getLesson, getLessonsByCourse } from '@/lib/data/sheetsRepo';

interface Params {
  params: Promise<{ lessonId: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const { lessonId } = await params;
    const lesson = await getLesson(lessonId);
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const course = await getCourse(lesson.CourseID);
    const lessons = await getLessonsByCourse(lesson.CourseID);

    return NextResponse.json({ lesson, course, lessons });
  } catch (error) {
    console.error('Error loading lesson', error);
    return NextResponse.json({ error: 'Failed to load lesson' }, { status: 500 });
  }
}
