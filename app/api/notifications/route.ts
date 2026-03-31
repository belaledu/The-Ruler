import { NextResponse } from 'next/server';
import { getNotifications } from '@/lib/data/sheetsRepo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId') || 'dev-user-1';
    const notifications = await getNotifications(studentId);
    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error loading notifications', error);
    return NextResponse.json({ error: 'Failed to load notifications' }, { status: 500 });
  }
}
