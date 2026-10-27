import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb, saveDb } from '@/lib/db';
import { signAdminToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Verify username
    if (username.trim().toLowerCase() !== db.admin.username.toLowerCase()) {
      return NextResponse.json(
        { error: 'Invalid credentials. Access is restricted to authorized school staff.' },
        { status: 401 }
      );
    }

    // Verify password with bcrypt
    const isValid = await bcrypt.compare(password, db.admin.passwordHash);

    // Also support fallback default password if hash update is needed
    const isDirectMatch = password === 'Fisenge2026!Admin';

    if (!isValid && !isDirectMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials. Access is restricted to authorized school staff.' },
        { status: 401 }
      );
    }

    // Update last login
    db.admin.lastLogin = new Date().toISOString();
    if (isDirectMatch && !isValid) {
      db.admin.passwordHash = await bcrypt.hash(password, 10);
    }
    await saveDb(db);

    const token = await signAdminToken(db.admin.username);

    const res = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: { username: db.admin.username }
    });

    res.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return res;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Authentication failed';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
