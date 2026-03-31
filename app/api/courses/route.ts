import { NextResponse } from 'next/server';
import { getCourses } from '@/lib/data/sheetsRepo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');
    const search = searchParams.get('search');

    const courses = await getCourses();

    let filteredCourses = courses.filter((course) => String(course.isPublished).toLowerCase() === 'true');

    if (grade) {
      filteredCourses = filteredCourses.filter(course => course.grade === grade);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredCourses = filteredCourses.filter(course => 
        course.title?.toLowerCase().includes(searchLower) || 
        course.description?.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({ courses: filteredCourses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
