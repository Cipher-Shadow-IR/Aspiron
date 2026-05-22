'use client';

import React, { useState, useEffect } from 'react';
import { useComparison } from '../../components/ComparisonContext';
import { CollegeParsed } from '../../types';
import {
  ArrowLeft,
  Search,
  X,
  Star,
  MapPin,
  IndianRupee,
  Briefcase,
  Percent,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const { selectedColleges, addToCompare, removeFromCompare, clearCompare } = useComparison();

  // Search state for adding a college from empty slots
  const [allColleges, setAllColleges] = useState<CollegeParsed[]>([]);
  const [searchQueries, setSearchQueries] = useState<{ [slotIndex: number]: string }>({});
  const [dropdownOpenSlot, setDropdownOpenSlot] = useState<number | null>(null);

  // Fetch list of colleges to populate search dropdown in empty slots
  useEffect(() => {
    async function fetchAllForSelection() {
      try {
        const res = await fetch('/api/colleges?limit=100');
        if (res.ok) {
          const json = await res.json();
          setAllColleges(json.colleges || []);
        }
      } catch (err) {
        console.error('Failed to load colleges for comparison selection:', err);
      }
    }
    fetchAllForSelection();
  }, []);

  const handleSearchChange = (slotIdx: number, val: string) => {
    setSearchQueries((prev) => ({ ...prev, [slotIdx]: val }));
    setDropdownOpenSlot(slotIdx);
  };

  const handleSelectCollege = (slotIdx: number, college: CollegeParsed) => {
    addToCompare(college);
    setSearchQueries((prev) => ({ ...prev, [slotIdx]: '' }));
    setDropdownOpenSlot(null);
  };

  // Determine how many columns to show (fixed 3 slots)
  const slots = [0, 1, 2];

  // Helper to filter out already compared colleges from selection dropdown
  const getAvailableColleges = (query: string) => {
    const q = query.toLowerCase().trim();
    return allColleges.filter((college) => {
      const isAlreadySelected = selectedColleges.some((c) => c.id === college.id);
      if (isAlreadySelected) return false;
      if (!q) return true;
      return college.name.toLowerCase().includes(q) || college.city.toLowerCase().includes(q);
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-20">
      {/* Back button and page title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-gray-800 pb-5 mb-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-2 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Discovery</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">Compare Colleges</h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
            Compare key parameters side-by-side to make an informed decision.
          </p>
        </div>

        {selectedColleges.length > 0 && (
          <button
            onClick={clearCompare}
            className="self-start sm:self-center text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 rounded-md px-3.5 py-2 shadow-sm transition-colors"
          >
            Reset Comparison
          </button>
        )}
      </div>

      {/* Main Grid View */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-x-auto">
        <table className="w-full border-collapse text-left min-w-[700px] table-fixed">
          {/* Header Row: Images & Selectors */}
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="w-64 p-5 bg-gray-50 dark:bg-gray-950 align-top">
                <div className="flex h-full flex-col justify-between">
                  <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">Key Features</span>
                  <div className="text-gray-400 dark:text-gray-500 text-xs font-normal mt-4">
                    Comparison criteria is listed on the left column.
                  </div>
                </div>
              </th>

              {slots.map((idx) => {
                const college = selectedColleges[idx];
                return (
                  <th key={idx} className="p-5 border-l border-gray-200 dark:border-gray-800 align-top relative">
                    {college ? (
                      <div className="space-y-4">
                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCompare(college.id)}
                          className="absolute top-4 right-4 rounded-full p-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-850 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 shadow-sm transition-colors"
                          title="Remove from compare"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                        
                        {/* Image */}
                        <div className="h-28 w-full rounded-md overflow-hidden bg-gray-100 dark:bg-gray-850 shadow-inner">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={college.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=300"}
                            alt={college.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Name and Location */}
                        <div>
                          <Link href={`/college/${college.id}`}>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 text-sm leading-snug">
                              {college.name}
                            </h3>
                          </Link>
                          <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mt-1.5">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span>{college.city}, {college.state}</span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6 px-2 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg text-center h-[200px]">
                        <span className="text-gray-400 dark:text-gray-500 text-xs mb-2">Slot {idx + 1} Empty</span>
                        
                        {/* Search and Select Selector */}
                        <div className="w-full relative">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                            <input
                              type="text"
                              value={searchQueries[idx] || ''}
                              onChange={(e) => handleSearchChange(idx, e.target.value)}
                              onFocus={() => setDropdownOpenSlot(idx)}
                              placeholder="Search to add..."
                              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-850 py-1.5 pl-8 pr-3 text-xs text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:outline-none"
                            />
                            {searchQueries[idx] && (
                              <button
                                onClick={() => handleSearchChange(idx, '')}
                                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                              >
                                <X className="h-3 3" />
                              </button>
                            )}
                          </div>

                          {/* Dropdown menu */}
                          {dropdownOpenSlot === idx && (
                            <div className="absolute z-10 left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-750 bg-white dark:bg-gray-800 text-left shadow-lg text-xs">
                              {getAvailableColleges(searchQueries[idx] || '').length > 0 ? (
                                getAvailableColleges(searchQueries[idx] || '').map((col) => (
                                  <button
                                    key={col.id}
                                    onClick={() => handleSelectCollege(idx, col)}
                                    className="w-full text-left px-3 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border-b border-gray-100 dark:border-gray-750 last:border-0 font-medium text-gray-700 dark:text-gray-300"
                                  >
                                    <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">{col.name.split(' (')[0]}</div>
                                    <div className="text-[10px] text-gray-400 dark:text-gray-500">{col.city}, {col.state}</div>
                                  </button>
                                ))
                              ) : (
                                <div className="px-3 py-3 text-gray-400 text-center">No colleges available</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body rows */}
          <tbody>
            {/* Rating row */}
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="p-4 bg-gray-50 dark:bg-gray-950 font-bold text-gray-700 dark:text-gray-300 text-xs">Overall Rating</td>
              {slots.map((idx) => {
                const college = selectedColleges[idx];
                return (
                  <td key={idx} className="p-4 border-l border-gray-200 dark:border-gray-800 text-xs">
                    {college ? (
                      <span className="inline-flex items-center gap-1 font-bold text-gray-900 dark:text-gray-100 rounded bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-250 dark:border-yellow-900/50 px-2 py-0.5">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-500" />
                        {college.rating.toFixed(1)} / 5.0
                      </span>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-700">-</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Location row */}
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="p-4 bg-gray-50 dark:bg-gray-950 font-bold text-gray-700 dark:text-gray-300 text-xs">Location</td>
              {slots.map((idx) => {
                const college = selectedColleges[idx];
                return (
                  <td key={idx} className="p-4 border-l border-gray-200 dark:border-gray-800 text-xs text-gray-800 dark:text-gray-200 font-semibold">
                    {college ? `${college.city}, ${college.state}` : <span className="text-gray-300 dark:text-gray-700">-</span>}
                  </td>
                );
              })}
            </tr>

            {/* Tuition Fees row */}
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="p-4 bg-gray-50 dark:bg-gray-950 font-bold text-gray-700 dark:text-gray-300 text-xs">Annual Fees (INR)</td>
              {slots.map((idx) => {
                const college = selectedColleges[idx];
                return (
                  <td key={idx} className="p-4 border-l border-gray-200 dark:border-gray-800 text-xs">
                    {college ? (
                      <span className="font-extrabold text-gray-900 dark:text-gray-100 flex items-center">
                        <IndianRupee className="h-3.5 w-3.5 mr-0.5 text-gray-600 dark:text-gray-400" />
                        ₹{college.fees.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-700">-</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Placement Rate row */}
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="p-4 bg-gray-50 dark:bg-gray-950 font-bold text-gray-700 dark:text-gray-300 text-xs">Placement Rate</td>
              {slots.map((idx) => {
                const college = selectedColleges[idx];
                return (
                  <td key={idx} className="p-4 border-l border-gray-200 dark:border-gray-800 text-xs">
                    {college ? (
                      <span className="font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                        <Percent className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                        {college.placementPercentage}%
                      </span>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-700">-</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Average Package row */}
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="p-4 bg-gray-50 dark:bg-gray-950 font-bold text-gray-700 dark:text-gray-300 text-xs">Average Package</td>
              {slots.map((idx) => {
                const college = selectedColleges[idx];
                return (
                  <td key={idx} className="p-4 border-l border-gray-200 dark:border-gray-800 text-xs">
                    {college ? (
                      <span className="font-extrabold text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                        {college.avgPackage} LPA
                      </span>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-700">-</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Highest Package row */}
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="p-4 bg-gray-50 dark:bg-gray-950 font-bold text-gray-700 dark:text-gray-300 text-xs">Highest Package</td>
              {slots.map((idx) => {
                const college = selectedColleges[idx];
                return (
                  <td key={idx} className="p-4 border-l border-gray-200 dark:border-gray-800 text-xs">
                    {college ? (
                      <span className="font-extrabold text-green-700 dark:text-green-400 flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                        {college.highestPackage} LPA
                      </span>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-700">-</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Exams Accepted row */}
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="p-4 bg-gray-50 dark:bg-gray-950 font-bold text-gray-700 dark:text-gray-300 text-xs">Exams Accepted</td>
              {slots.map((idx) => {
                const college = selectedColleges[idx];
                return (
                  <td key={idx} className="p-4 border-l border-gray-200 dark:border-gray-800 text-xs">
                    {college ? (
                      <div className="flex flex-wrap gap-1.5">
                        {college.examAccepted.map((exam) => (
                          <span
                            key={exam}
                            className="rounded bg-indigo-50 border border-indigo-150 dark:bg-indigo-950/40 dark:border-indigo-900 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-400"
                          >
                            {exam}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-700">-</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Courses Offered row */}
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="p-4 bg-gray-50 dark:bg-gray-950 font-bold text-gray-700 dark:text-gray-300 text-xs align-top">Courses Offered</td>
              {slots.map((idx) => {
                const college = selectedColleges[idx];
                return (
                  <td key={idx} className="p-4 border-l border-gray-200 dark:border-gray-800 text-xs align-top">
                    {college ? (
                      <ul className="list-disc pl-4 space-y-1 text-gray-700 dark:text-gray-300 font-medium">
                        {college.courses.map((course, cIdx) => (
                          <li key={cIdx}>{course}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-700">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Dropdown closer click-away background listener */}
      {dropdownOpenSlot !== null && (
        <div
          className="fixed inset-0 z-0 bg-transparent"
          onClick={() => setDropdownOpenSlot(null)}
        />
      )}
    </div>
  );
}
