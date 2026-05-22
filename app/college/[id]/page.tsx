'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CollegeParsed } from '../../../types';
import { useComparison } from '../../../components/ComparisonContext';
import { ErrorState } from '../../../components/FeedbackStates';
import {
  ArrowLeft,
  MapPin,
  Star,
  IndianRupee,
  Briefcase,
  GraduationCap,
  Percent,
  TrendingUp,
  Award,
  Plus,
  Check,
} from 'lucide-react';
import Link from 'next/link';

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? Number(params.id) : null;

  const [college, setCollege] = useState<CollegeParsed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCompare, removeFromCompare, isCompared } = useComparison();

  useEffect(() => {
    if (!id || isNaN(id)) {
      setError('Invalid College ID provided');
      setLoading(false);
      return;
    }

    async function fetchCollegeDetails() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/colleges/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('College not found');
          }
          throw new Error('Failed to load college details');
        }
        const json = await res.json();
        setCollege(json);

        // Record visit in recently viewed list (optional feature)
        try {
          const recentKey = 'recently_viewed_colleges';
          const existing = localStorage.getItem(recentKey);
          interface RecentCollege {
            id: number;
            name: string;
            city: string;
            fees: number;
            rating: number;
            imageUrl: string;
          }
          let recentList: RecentCollege[] = existing ? JSON.parse(existing) : [];
          
          // Filter out if duplicate, and prepend
          recentList = recentList.filter((item) => item.id !== json.id);
          recentList.unshift({
            id: json.id,
            name: json.name,
            city: json.city,
            fees: json.fees,
            rating: json.rating,
            imageUrl: json.imageUrl,
          });

          // Limit to 5 items
          localStorage.setItem(recentKey, JSON.stringify(recentList.slice(0, 5)));
        } catch (e) {
          console.error('Failed to update recently viewed list:', e);
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching details.');
      } finally {
        setLoading(false);
      }
    }

    fetchCollegeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-6" />
        <div className="h-64 bg-gray-200 animate-pulse rounded-lg mb-8" />
        <div className="space-y-4">
          <div className="h-8 w-2/3 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
          <div className="h-24 w-full bg-gray-200 animate-pulse rounded mt-6" />
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Discovery</span>
        </button>
        <ErrorState message={error || 'College details missing'} onRetry={() => router.refresh()} />
      </div>
    );
  }

  const compared = isCompared(college.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 pb-20">
      {/* Back navigation */}
      <button
        onClick={() => router.push('/')}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to College Discovery</span>
      </button>

      {/* Hero Header */}
      <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden mb-8">
        <div className="h-64 sm:h-80 w-full relative bg-gray-100 dark:bg-gray-850">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={college.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200"}
            alt={college.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="flex items-center gap-1 rounded bg-yellow-400 px-2.5 py-0.5 text-xs font-bold text-gray-900 shadow">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>{college.rating.toFixed(1)} / 5.0</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{college.name}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-gray-200 dark:text-gray-300 text-sm">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{college.city}, {college.state}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side: Overview & Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* About section */}
          <section className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">
              Institution Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {college.description}
            </p>
          </section>

          {/* Placement Statistics */}
          <section className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
              Placements & Career Insights
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-850 p-4 text-center">
                <Percent className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                <span className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Placement Rate</span>
                <span className="block text-xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">{college.placementPercentage}%</span>
              </div>
              <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-850 p-4 text-center">
                <Briefcase className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                <span className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Average Package</span>
                <span className="block text-xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">{college.avgPackage} LPA</span>
              </div>
              <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-850 p-4 text-center">
                <TrendingUp className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                <span className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Highest Package</span>
                <span className="block text-xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">{college.highestPackage} LPA</span>
              </div>
            </div>
          </section>

          {/* Courses Offered */}
          <section className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
              Programs & Courses Offered
            </h2>
            {college.courses.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {college.courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-md border border-gray-150 dark:border-gray-800 p-3 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-850 transition-colors"
                  >
                    <GraduationCap className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{course}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No specific course listings provided.</p>
            )}
          </section>
        </div>

        {/* Right Side: Quick Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-2">
              Quick Facts
            </h3>

            {/* Fee information */}
            <div>
              <span className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                <IndianRupee className="h-3.5 w-3.5" />
                Annual Tuition Fee
              </span>
              <p className="text-2xl font-extrabold text-indigo-600">
                ₹{college.fees.toLocaleString('en-IN')}
                <span className="text-gray-500 dark:text-gray-400 text-xs font-normal ml-1">/ year</span>
              </p>
            </div>

            {/* Entrance exams accepted */}
            <div>
              <span className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
                <Award className="h-3.5 w-3.5" />
                Admissions Accepted Via
              </span>
              <div className="flex flex-wrap gap-2">
                {college.examAccepted.length > 0 ? (
                  college.examAccepted.map((exam) => (
                    <span
                      key={exam}
                      className="rounded bg-indigo-50 border border-indigo-150 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-400"
                    >
                      {exam}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Direct Admission</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <button
                onClick={() => (compared ? removeFromCompare(college.id) : addToCompare(college))}
                className={`w-full flex items-center justify-center gap-2 rounded-md py-2.5 text-xs font-bold shadow-sm transition-colors ${
                  compared
                    ? 'bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-950/40 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-900/50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700'
                }`}
              >
                {compared ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Added to Compare</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Add to Comparison</span>
                  </>
                )}
              </button>
              
              <Link
                href="/predictor"
                className="block w-full text-center rounded-md border border-gray-300 bg-white py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-750 transition-colors"
              >
                Predict Admission Odds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
