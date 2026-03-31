import { NextResponse } from 'next/server';
import { getAssignments } from '@/lib/data/sheetsRepo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId') || 'dev-user-1';
    const assignments = await getAssignments(studentId);
    return NextResponse.json({ assignments });
  } catch (error) {
    console.error('Error loading assignments', error);
    return NextResponse.json({ error: 'Failed to load assignments' }, { status: 500 });
  }
}
