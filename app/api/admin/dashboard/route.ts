import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { getAdminDashboardData } from '@/lib/data/sheetsRepo';

export async function GET(request: Request) {
  const user = await verifyAuth(request);
  if (!user || (user.role !== 'super_admin' && user.role !== 'content_manager')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await getAdminDashboardData();
  return NextResponse.json(data);
}
