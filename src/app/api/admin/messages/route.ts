import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  return NextResponse.json({ messages: db.messages });
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, read } = body;

    const db = await getDb();
    const index = db.messages.findIndex((m) => m.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    db.messages[index].read = Boolean(read);
    await saveDb(db);

    return NextResponse.json({ success: true, message: db.messages[index] });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update message';
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
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const db = await getDb();
    db.messages = db.messages.filter((m) => m.id !== id);
    await saveDb(db);

    return NextResponse.json({ success: true, message: 'Message removed from records' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to delete message';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
