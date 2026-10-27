import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getDb, saveDb, Announcement } from '@/lib/db';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  return NextResponse.json({ announcements: db.announcements });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, summary, content, priority } = body;

    if (!title || !summary) {
      return NextResponse.json({ error: 'Announcement title and summary are required' }, { status: 400 });
    }

    const db = await getDb();
    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      category: category || 'General',
      date: new Date().toISOString().split('T')[0],
      summary: summary.trim(),
      content: (content || summary).trim(),
      priority: priority === 'urgent' ? 'urgent' : 'normal',
      published: true
    };

    db.announcements.unshift(newAnnouncement);
    await saveDb(db);

    return NextResponse.json({ success: true, announcement: newAnnouncement });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to add announcement';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, category, summary, content, priority, published } = body;

    const db = await getDb();
    const index = db.announcements.findIndex((a) => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
    }

    db.announcements[index] = {
      ...db.announcements[index],
      title: title ?? db.announcements[index].title,
      category: category ?? db.announcements[index].category,
      summary: summary ?? db.announcements[index].summary,
      content: content ?? db.announcements[index].content,
      priority: priority ?? db.announcements[index].priority,
      published: typeof published === 'boolean' ? published : db.announcements[index].published
    };

    await saveDb(db);
    return NextResponse.json({ success: true, announcement: db.announcements[index] });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update announcement';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Announcement ID is required' }, { status: 400 });
    }

    const db = await getDb();
    db.announcements = db.announcements.filter((a) => a.id !== id);
    await saveDb(db);

    return NextResponse.json({ success: true, message: 'Announcement deleted' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to delete announcement';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
