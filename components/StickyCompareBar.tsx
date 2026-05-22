'use client';

import React from 'react';
import { useComparison } from './ComparisonContext';
import Link from 'next/link';
import { X, GitCompare } from 'lucide-react';

export default function StickyCompareBar() {
  const { selectedColleges, removeFromCompare, clearCompare } = useComparison();

  if (selectedColleges.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-indigo-200 bg-indigo-50 shadow-lg py-4 px-4 sm:px-6 lg:px-8 dark:border-indigo-900 dark:bg-indigo-950/90 dark:backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
            <GitCompare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Compare Colleges</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Selected {selectedColleges.length} of 3 colleges to compare side-by-side.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Selected items */}
          <div className="flex flex-wrap gap-2">
            {selectedColleges.map((college) => (
              <div
                key={college.id}
                className="flex items-center gap-1.5 rounded-md border border-indigo-200 bg-white py-1.5 pl-3 pr-2 shadow-sm dark:border-indigo-900/60 dark:bg-gray-900"
              >
                <span className="max-w-[120px] truncate font-medium text-gray-800 dark:text-gray-200 text-xs sm:max-w-[180px]">
                  {college.name.split(' (')[0]}
                </span>
                <button
                  onClick={() => removeFromCompare(college.id)}
                  className="rounded-full p-0.5 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
                  title="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-2 py-1.5"
            >
              Clear All
            </button>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-700"
            >
              Compare Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
