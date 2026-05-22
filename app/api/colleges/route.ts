import { NextRequest, NextResponse } from 'next/server';
import { getCollegesSchema } from '../../../validators/college';
import { collegeService } from '../../../services/collegeService';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const rawParams = {
      search: searchParams.get('search') || undefined,
      city: searchParams.get('city') || undefined,
      maxFees: searchParams.get('maxFees') || undefined,
      minRating: searchParams.get('minRating') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: searchParams.get('sortOrder') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
    };

    const validatedParams = getCollegesSchema.parse(rawParams);
    const data = await collegeService.getColleges(validatedParams);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/colleges:', error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.issues.map((e) => e.message) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal database or server error' },
      { status: 500 }
    );
  }
}
