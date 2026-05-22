import { NextRequest, NextResponse } from 'next/server';
import { getCollegeByIdSchema } from '../../../../validators/college';
import { collegeService } from '../../../../services/collegeService';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rawParams = { id: params.id };
    const validated = getCollegeByIdSchema.parse(rawParams);

    const college = await collegeService.getCollegeById(validated.id);
    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error(`Error in GET /api/colleges/${params?.id}:`, error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.issues.map((e) => e.message) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
