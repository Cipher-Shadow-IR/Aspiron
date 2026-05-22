import { College as PrismaCollege, PredictionRule as PrismaPredictionRule } from '@prisma/client';

export interface CollegeParsed extends Omit<PrismaCollege, 'courses' | 'examAccepted'> {
  courses: string[];
  examAccepted: string[];
}

export interface PredictionRuleWithCollege extends Omit<PrismaPredictionRule, 'college'> {
  college: CollegeParsed;
}

export interface PredictResult {
  ruleId: number;
  exam: string;
  minRank: number;
  maxRank: number;
  college: CollegeParsed;
}

export interface GetCollegesResponse {
  colleges: CollegeParsed[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
