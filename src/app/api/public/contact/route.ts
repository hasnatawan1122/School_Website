import { NextResponse } from 'next/server';
import { getDb, saveDb, ContactMessage } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter a valid full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json({ error: 'Please provide message details.' }, { status: 400 });
    }

    const db = await getDb();

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 100),
      phone: (phone || '').trim().substring(0, 40),
      subject: (subject || 'General Enquiry').trim().substring(0, 120),
      message: message.trim().substring(0, 2000),
      createdAt: new Date().toISOString(),
      read: false
    };

    // Store at beginning of array
    db.messages.unshift(newMessage);
    await saveDb(db);

    return NextResponse.json({
      success: true,
      message: 'Enquiry successfully delivered to administration.',
      id: newMessage.id
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to process message';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
