import { NextRequest, NextResponse } from 'next/server';
import { predictCollegesSchema } from '../../../validators/college';
import { predictorService } from '../../../services/predictorService';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = predictCollegesSchema.parse(body);

    const recommendations = await predictorService.predictColleges(
      validated.exam,
      validated.rank
    );

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error in POST /api/predict:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Malformed JSON payload' },
        { status: 400 }
      );
    }
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues.map((e) => e.message) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
