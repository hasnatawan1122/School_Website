import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  return NextResponse.json({
    settings: db.settings,
    content: db.content
  });
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const db = await getDb();

    if (body.settings) {
      db.settings = { ...db.settings, ...body.settings };
    }

    if (body.content) {
      db.content = {
        ...db.content,
        ...body.content,
        hero: { ...db.content.hero, ...(body.content.hero || {}) },
        about: { ...db.content.about, ...(body.content.about || {}) }
      };
    }

    await saveDb(db);
    return NextResponse.json({ success: true, message: 'Website content updated successfully.' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Update failed';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
