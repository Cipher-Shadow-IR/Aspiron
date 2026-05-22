import { NextResponse } from 'next/server';
import { collegeService } from '../../../../services/collegeService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cities = await collegeService.getCities();
    return NextResponse.json({ cities });
  } catch (error) {
    console.error('Error in GET /api/colleges/cities:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
