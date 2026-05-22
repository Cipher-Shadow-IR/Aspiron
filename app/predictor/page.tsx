'use client';

import React, { useState } from 'react';
import { PredictResult } from '../../types';
import { useComparison } from '../../components/ComparisonContext';
import { ErrorState, EmptyState } from '../../components/FeedbackStates';
import {
  Award,
  Search,
  IndianRupee,
  Briefcase,
  Star,
  MapPin,
  Check,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

export default function PredictorPage() {
  const [exam, setExam] = useState<'JEE Main' | 'GUJCET'>('JEE Main');
  const [rank, setRank] = useState('');
  
  // Results states
  const [results, setResults] = useState<PredictResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { addToCompare, removeFromCompare, isCompared } = useComparison();

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setError(null);
    setResults(null);

    // Frontend validation
    const numRank = Number(rank.trim());
    if (!rank || isNaN(numRank) || numRank <= 0 || !Number.isInteger(numRank)) {
      setValidationError('Please enter a valid positive integer for your rank.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exam,
          rank: numRank,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Failed to predict colleges');
      }

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred during prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 pb-32">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 pb-5 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl flex items-center gap-2 dark:text-gray-100">
          <Award className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
          <span>Admission Predictor Tool</span>
        </h1>
        <p className="text-gray-500 text-xs mt-1 dark:text-gray-400">
          Estimate your college admissions. Enter your exam score and rank to find eligible options based on historical cutoff boundaries.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column: input form */}
        <div className="lg:col-span-1">
          <form
            onSubmit={handlePredict}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2 dark:text-gray-100 dark:border-gray-800">
              Enter Credentials
            </h3>

            {/* Exam selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 dark:text-gray-300">
                Entrance Exam
              </label>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value as 'JEE Main' | 'GUJCET')}
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-400"
              >
                <option value="JEE Main">JEE Main</option>
                <option value="GUJCET">GUJCET</option>
              </select>
            </div>

            {/* Rank Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 dark:text-gray-300">
                All India / State Rank
              </label>
              <input
                type="text"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                placeholder="e.g. 12000"
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400"
              />
              {validationError && (
                <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{validationError}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 py-2.5 text-xs font-bold text-white shadow hover:bg-indigo-700 focus:outline-none disabled:opacity-50 transition-colors dark:bg-indigo-600 dark:hover:bg-indigo-750"
            >
              {loading ? 'Finding Eligible Colleges...' : 'Predict Recommended Colleges'}
            </button>
          </form>
        </div>

        {/* Right column: Results listing */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 w-44 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-28 w-full border border-gray-200 bg-white animate-pulse rounded-lg dark:border-gray-800 dark:bg-gray-900" />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error} />
          ) : results === null ? (
            /* Idle initial view */
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Awaiting Prediction Inputs</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs max-w-sm">
                Fill in your entrance exam name and rank in the form on the left, then click predict to fetch eligible colleges.
              </p>
            </div>
          ) : results.length === 0 ? (
            /* Empty results state */
            <EmptyState
              title="No Recommendations Found"
              message={`No colleges accept a rank of ${Number(rank).toLocaleString('en-IN')} for ${exam}. Please try entering a different rank or exam to discover options.`}
            />
          ) : (
            /* Recommendations listing */
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 dark:text-gray-100">
                Eligible Options ({results.length} colleges found)
              </h2>

              <div className="space-y-4">
                {results.map((result) => {
                  const college = result.college;
                  const compared = isCompared(college.id);

                  return (
                    <div
                      key={result.ruleId}
                      className="flex flex-col sm:flex-row gap-4 p-5 rounded-lg border border-indigo-150 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden dark:border-indigo-950/60 dark:bg-gray-900"
                    >
                      {/* Left: college avatar image */}
                      <div className="h-20 w-full sm:w-28 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={college.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=200"}
                          alt={college.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Center: Details & Cutoff range info */}
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link href={`/college/${college.id}`}>
                            <h3 className="font-bold text-gray-900 hover:text-indigo-600 text-sm sm:text-base leading-snug line-clamp-1 dark:text-gray-100 dark:hover:text-indigo-400">
                              {college.name}
                            </h3>
                          </Link>
                          <span className="inline-flex items-center gap-0.5 rounded bg-yellow-50 px-1.5 py-0.5 text-[10px] font-bold text-yellow-700 border border-yellow-200 dark:bg-yellow-500/10 dark:border-yellow-500/30 dark:text-yellow-400">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-500 dark:fill-yellow-500" />
                            {college.rating.toFixed(1)}
                          </span>
                        </div>

                        <p className="flex items-center gap-1 text-gray-500 text-xs dark:text-gray-400">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span>{college.city}, {college.state}</span>
                        </p>

                        <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 font-medium dark:text-gray-300">
                          <span className="flex items-center">
                            <IndianRupee className="h-3.5 w-3.5 mr-0.5 text-gray-400 dark:text-gray-500" />
                            Fees: ₹{college.fees.toLocaleString('en-IN')}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="h-3.5 w-3.5 mr-1 text-gray-400 dark:text-gray-500" />
                            Avg Placement: {college.avgPackage} LPA
                          </span>
                        </div>

                        {/* Cutoff Range Badge */}
                        <div className="mt-3">
                          <span className="inline-flex items-center rounded-md bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/30 dark:border-indigo-900/60 dark:text-indigo-400">
                            Eligible Rank Range: {result.minRank.toLocaleString('en-IN')} - {result.maxRank.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex sm:flex-col justify-center gap-2 flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-4 dark:border-gray-800">
                        <Link
                          href={`/college/${college.id}`}
                          className="flex-1 sm:flex-none text-center rounded-md border border-gray-300 bg-white py-1.5 px-3 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors dark:border-gray-750 dark:bg-gray-850 dark:text-gray-300 dark:hover:bg-gray-750"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => (compared ? removeFromCompare(college.id) : addToCompare(college))}
                          className={`flex-1 sm:flex-none flex items-center justify-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors ${
                            compared
                              ? 'bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-950/40 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-900/50'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-750'
                          }`}
                        >
                          {compared ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Compared</span>
                            </>
                          ) : (
                            <>
                              <Plus className="h-3.5 w-3.5" />
                              <span>Compare</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
