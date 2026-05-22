'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CollegeCard from '../components/CollegeCard';
import StickyCompareBar from '../components/StickyCompareBar';
import {
  LoadingSkeleton,
  ErrorState,
  EmptyState,
} from '../components/FeedbackStates';
import { GetCollegesResponse } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  // Filter & Search states
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [city, setCity] = useState('');
  const [maxFees, setMaxFees] = useState('');
  const [minRating, setMinRating] = useState('');
  
  // Sort states
  const [sortOption, setSortOption] = useState('default'); // 'default', 'rating-desc', 'rating-asc', 'fees-asc', 'fees-desc'

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 6; // Limit items per page to show pagination working cleanly

  // Data states
  const [data, setData] = useState<GetCollegesResponse | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search input to prevent firing requests on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset to page 1 on new search
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch unique cities for filter select
  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch('/api/colleges/cities');
        if (!res.ok) throw new Error('Failed to fetch cities');
        const json = await res.json();
        setCities(json.cities || []);
      } catch (err) {
        console.error('Failed to load cities:', err);
      } finally {
        setCitiesLoading(false);
      }
    }
    fetchCities();
  }, []);

  // Fetch colleges list whenever filters or pagination parameters change
  const fetchColleges = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (debouncedSearch) queryParams.append('search', debouncedSearch);
      if (city) queryParams.append('city', city);
      if (maxFees) queryParams.append('maxFees', maxFees);
      if (minRating) queryParams.append('minRating', minRating);
      
      // Map sort values to API structure
      if (sortOption !== 'default') {
        const [by, order] = sortOption.split('-');
        queryParams.append('sortBy', by);
        queryParams.append('sortOrder', order);
      }
      
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());

      const res = await fetch(`/api/colleges?${queryParams.toString()}`);
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Failed to fetch college list');
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong while fetching colleges.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, city, maxFees, minRating, sortOption, page, limit]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const handleReset = () => {
    setSearch('');
    setCity('');
    setMaxFees('');
    setMinRating('');
    setSortOption('default');
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (!data || newPage < 1 || newPage > data.totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-32">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Discover Top Engineering Colleges
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Find and filter top Indian colleges accepting JEE Main and GUJCET based on your preference.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-4 mb-4">
              <span className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-gray-100 text-sm">
                <SlidersHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                Filters
              </span>
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                Clear All
              </button>
            </div>

            {/* Keyword Search */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search college name..."
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setPage(1);
                  }}
                  disabled={citiesLoading}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-400"
                >
                  <option value="" className="dark:bg-gray-800">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c} className="dark:bg-gray-800">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fee Filter */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Max Annual Fee
                </label>
                <select
                  value={maxFees}
                  onChange={(e) => {
                    setMaxFees(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-400"
                >
                  <option value="" className="dark:bg-gray-800">Any Fee</option>
                  <option value="5000" className="dark:bg-gray-800">Under ₹5,000</option>
                  <option value="100000" className="dark:bg-gray-800">Under ₹1,00,000</option>
                  <option value="150000" className="dark:bg-gray-800">Under ₹1,50,000</option>
                  <option value="200000" className="dark:bg-gray-800">Under ₹2,00,000</option>
                  <option value="250000" className="dark:bg-gray-800">Under ₹2,50,000</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Min Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => {
                    setMinRating(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-400"
                >
                  <option value="" className="dark:bg-gray-800">Any Rating</option>
                  <option value="4.5" className="dark:bg-gray-800">4.5+ Stars</option>
                  <option value="4.0" className="dark:bg-gray-800">4.0+ Stars</option>
                  <option value="3.5" className="dark:bg-gray-800">3.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Content */}
        <div className="lg:col-span-3">
          {/* Top toolbar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {loading ? (
                <span>Searching...</span>
              ) : data ? (
                <span>
                  Showing <b>{data.colleges.length}</b> of <b>{data.total}</b> colleges
                </span>
              ) : (
                <span>0 colleges</span>
              )}
            </p>

            {/* Sorting controls */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4.5 w-4.5 text-gray-400 dark:text-gray-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Sort By:</span>
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setPage(1);
                }}
                className="rounded-md border border-gray-300 bg-white py-1.5 px-3 text-xs text-gray-700 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-indigo-400"
              >
                <option value="default" className="dark:bg-gray-800">Default</option>
                <option value="rating-desc" className="dark:bg-gray-800">Rating: High to Low</option>
                <option value="rating-asc" className="dark:bg-gray-800">Rating: Low to High</option>
                <option value="fees-asc" className="dark:bg-gray-800">Fees: Low to High</option>
                <option value="fees-desc" className="dark:bg-gray-800">Fees: High to Low</option>
              </select>
            </div>
          </div>

          {/* List display */}
          {loading ? (
            <LoadingSkeleton count={limit} />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchColleges} />
          ) : !data || data.colleges.length === 0 ? (
            <EmptyState onReset={handleReset} />
          ) : (
            <>
              {/* College Cards Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {/* Pagination controls */}
              {data.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-750"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === data.totalPages}
                      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-750"
                    >
                      Next
                    </button>
                  </div>

                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Page <b>{data.page}</b> of <b>{data.totalPages}</b>
                      </p>
                    </div>
                    <div>
                      <nav className="inline-flex -space-x-px rounded-md shadow-sm bg-white dark:bg-gray-900" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(page - 1)}
                          disabled={page === 1}
                          className="inline-flex items-center rounded-l-md px-2.5 py-2 text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                        >
                          <ChevronLeft className="h-4.5 w-4.5" />
                        </button>
                        {Array.from({ length: data.totalPages }).map((_, idx) => {
                          const pIdx = idx + 1;
                          const isCurrent = pIdx === page;
                          return (
                            <button
                              key={pIdx}
                              onClick={() => handlePageChange(pIdx)}
                              className={`inline-flex items-center border px-4 py-2 text-xs font-semibold ${
                                isCurrent
                                  ? 'z-10 border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-600'
                                  : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900'
                              }`}
                            >
                              {pIdx}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => handlePageChange(page + 1)}
                          disabled={page === data.totalPages}
                          className="inline-flex items-center rounded-r-md px-2.5 py-2 text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                        >
                          <ChevronRight className="h-4.5 w-4.5" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Sticky Compare Bar */}
      <StickyCompareBar />
    </div>
  );
}
