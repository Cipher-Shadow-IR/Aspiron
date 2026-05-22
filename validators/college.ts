import { z } from 'zod';

export const getCollegesSchema = z.object({
  search: z.string().trim().max(100).optional(),
  city: z.string().trim().max(100).optional(),
  maxFees: z.preprocess(
    (val) => (val !== undefined && val !== '' ? Number(val) : undefined),
    z.number().nonnegative('Fees must be a positive number').optional()
  ),
  minRating: z.preprocess(
    (val) => (val !== undefined && val !== '' ? Number(val) : undefined),
    z.number().min(0, 'Rating cannot be negative').max(5, 'Rating cannot exceed 5').optional()
  ),
  sortBy: z.enum(['rating', 'fees']).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  page: z.preprocess(
    (val) => (val !== undefined && val !== '' ? Number(val) : 1),
    z.number().int().positive('Page number must be positive').default(1)
  ),
  limit: z.preprocess(
    (val) => (val !== undefined && val !== '' ? Number(val) : 10),
    z.number().int().positive('Limit must be positive').default(10)
  ),
});

export const getCollegeByIdSchema = z.object({
  id: z.preprocess(
    (val) => Number(val),
    z.number().int().positive('College ID must be a positive integer')
  ),
});

export const getCompareSchema = z.object({
  ids: z.string().refine(
    (val) => {
      if (!val) return false;
      const parts = val.split(',').map((p) => p.trim()).filter(Boolean);
      if (parts.length === 0) return false;
      const numParts = parts.map(Number);
      
      // check if any are not valid positive integers
      if (numParts.some(isNaN) || numParts.some((n) => n <= 0 || !Number.isInteger(n))) {
        return false;
      }
      
      // check if duplicates exist
      const unique = new Set(numParts);
      if (unique.size !== numParts.length) {
        return false;
      }

      // check if more than 3 colleges
      if (numParts.length > 3) {
        return false;
      }

      return true;
    },
    {
      message: 'Query parameter "ids" must be a comma-separated list of 1 to 3 unique positive integer college IDs (e.g. ?ids=1,2,3).',
    }
  ),
});

export const predictCollegesSchema = z.object({
  exam: z.enum(['JEE Main', 'GUJCET'], {
    message: 'Exam must be either "JEE Main" or "GUJCET"',
  }),
  rank: z.number({
    message: 'Rank must be a number',
  }).int('Rank must be an integer').positive('Rank must be a positive integer'),
});
