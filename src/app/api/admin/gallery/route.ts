import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getDb, saveDb, GalleryItem } from '@/lib/db';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  return NextResponse.json({ gallery: db.gallery.sort((a, b) => a.order - b.order) });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, image, caption } = body;

    if (!title || !image) {
      return NextResponse.json({ error: 'Image title and image path/URL are required' }, { status: 400 });
    }

    const db = await getDb();
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: title.trim(),
      category: category || 'Campus',
      image: image.trim(),
      caption: (caption || '').trim(),
      date: new Date().toISOString().split('T')[0],
      order: db.gallery.length + 1
    };

    db.gallery.push(newItem);
    await saveDb(db);

    return NextResponse.json({ success: true, item: newItem });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to add gallery item';
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
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    const db = await getDb();
    db.gallery = db.gallery.filter((g) => g.id !== id);
    await saveDb(db);

    return NextResponse.json({ success: true, message: 'Gallery item removed' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to delete gallery item';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
