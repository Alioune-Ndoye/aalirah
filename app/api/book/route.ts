import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
    }

    const booking = {
      ...body,
      createdAt: new Date(),
    };

    const client = await getMongoClient();
    const db = client.db();
    await db.collection('bookings').insertOne(booking);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
