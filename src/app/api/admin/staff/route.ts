import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getDb, saveDb, StaffMember } from '@/lib/db';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  return NextResponse.json({ staff: db.staff.sort((a, b) => a.order - b.order) });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, role, department, qualification, email, image, bio } = body;

    if (!name || !role) {
      return NextResponse.json({ error: 'Staff name and role are required' }, { status: 400 });
    }

    const db = await getDb();
    const newStaff: StaffMember = {
      id: `staff-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      department: (department || 'General').trim(),
      qualification: (qualification || '').trim(),
      email: (email || '').trim(),
      image: (image || '/images/headteacher.jpg').trim(),
      order: db.staff.length + 1,
      bio: (bio || '').trim()
    };

    db.staff.push(newStaff);
    await saveDb(db);

    return NextResponse.json({ success: true, staff: newStaff });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to add staff';
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
    const { id, name, role, department, qualification, email, image, bio, order } = body;

    if (!id) {
      return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
    }

    const db = await getDb();
    const index = db.staff.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }

    db.staff[index] = {
      ...db.staff[index],
      name: name ?? db.staff[index].name,
      role: role ?? db.staff[index].role,
      department: department ?? db.staff[index].department,
      qualification: qualification ?? db.staff[index].qualification,
      email: email ?? db.staff[index].email,
      image: image ?? db.staff[index].image,
      bio: bio ?? db.staff[index].bio,
      order: typeof order === 'number' ? order : db.staff[index].order
    };

    await saveDb(db);
    return NextResponse.json({ success: true, staff: db.staff[index] });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update staff';
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
      return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
    }

    const db = await getDb();
    db.staff = db.staff.filter((s) => s.id !== id);
    await saveDb(db);

    return NextResponse.json({ success: true, message: 'Staff member removed' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to delete staff';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
