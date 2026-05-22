import { NextRequest, NextResponse } from 'next/server';
import { getCompareSchema } from '../../../validators/college';
import { collegeService } from '../../../services/collegeService';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const rawParams = {
      ids: searchParams.get('ids') || undefined,
    };

    const validated = getCompareSchema.parse(rawParams);
    const ids = validated.ids.split(',').map((id) => Number(id.trim()));

    const colleges = await collegeService.getCollegesByIds(ids);

    return NextResponse.json(colleges);
  } catch (error) {
    console.error('Error in GET /api/compare:', error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.issues.map((e) => e.message) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
