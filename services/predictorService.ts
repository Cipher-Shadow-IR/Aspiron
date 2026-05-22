import { prisma } from '../lib/prisma';
import { parseCollegeJson } from './collegeService';
import { PredictResult } from '../types';

export const predictorService = {
  async predictColleges(exam: string, rank: number): Promise<PredictResult[]> {
    if (exam !== 'JEE Main' && exam !== 'GUJCET') {
      throw new Error('Unsupported exam. Only JEE Main and GUJCET are accepted.');
    }

    const rules = await prisma.predictionRule.findMany({
      where: {
        exam: exam,
        minRank: {
          lte: rank,
        },
        maxRank: {
          gte: rank,
        },
      },
      include: {
        college: true,
      },
    });

    // Map and parse the associated college Json fields
    return rules.map((rule) => ({
      ruleId: rule.id,
      exam: rule.exam,
      minRank: rule.minRank,
      maxRank: rule.maxRank,
      college: parseCollegeJson(rule.college),
    }));
  },
};
