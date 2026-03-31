import { NextResponse } from 'next/server';
import { getDashboard } from '@/lib/data/sheetsRepo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId') || 'dev-user-1';

    const data = await getDashboard(studentId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading dashboard data', error);
    return NextResponse.json({ error: 'Failed to load dashboard data' }, { status: 500 });
  }
}
