import { prisma } from '../lib/prisma';
import { CollegeParsed } from '../types';

export function parseCollegeJson(college: any): CollegeParsed {
  if (!college) return null as any;
  return {
    ...college,
    courses: Array.isArray(college.courses) ? (college.courses as string[]) : [],
    examAccepted: Array.isArray(college.examAccepted) ? (college.examAccepted as string[]) : [],
  };
}

export interface GetCollegesParams {
  search?: string;
  city?: string;
  maxFees?: number;
  minRating?: number;
  sortBy?: 'rating' | 'fees';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const collegeService = {
  async getColleges(params: GetCollegesParams) {
    const {
      search,
      city,
      maxFees,
      minRating,
      sortBy,
      sortOrder = 'asc',
      page = 1,
      limit = 10,
    } = params;

    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (city) {
      where.city = {
        equals: city,
        mode: 'insensitive',
      };
    }

    if (maxFees !== undefined) {
      where.fees = {
        lte: maxFees,
      };
    }

    if (minRating !== undefined) {
      where.rating = {
        gte: minRating,
      };
    }

    const orderBy: any = {};
    if (sortBy === 'rating') {
      orderBy.rating = sortOrder;
    } else if (sortBy === 'fees') {
      orderBy.fees = sortOrder;
    } else {
      orderBy.id = 'asc';
    }

    const skip = (page - 1) * limit;
    const take = limit;

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      prisma.college.count({ where }),
    ]);

    return {
      colleges: colleges.map(parseCollegeJson),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async getCollegeById(id: number): Promise<CollegeParsed | null> {
    const college = await prisma.college.findUnique({
      where: { id },
    });
    if (!college) return null;
    return parseCollegeJson(college);
  },

  async getCollegesByIds(ids: number[]): Promise<CollegeParsed[]> {
    if (ids.length === 0) return [];
    const colleges = await prisma.college.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return colleges.map(parseCollegeJson);
  },

  async getCities(): Promise<string[]> {
    try {
      const cities = await prisma.college.findMany({
        select: {
          city: true,
        },
        distinct: ['city'],
      });
      return cities.map((c) => c.city).sort();
    } catch (e) {
      console.error('Failed to fetch cities from DB:', e);
      return [];
    }
  },
};
