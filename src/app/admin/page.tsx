import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getDb } from '@/lib/db';
import AdminDashboardClient from './AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const db = await getDb();

  return <AdminDashboardClient initialData={db} username={session.username} />;
}
