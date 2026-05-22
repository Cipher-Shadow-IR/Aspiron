import React from 'react';
import Link from 'next/link';
import { CollegeParsed } from '../types';
import { useComparison } from './ComparisonContext';
import { MapPin, Star, IndianRupee, Briefcase, Plus, Check } from 'lucide-react';

interface CollegeCardProps {
  college: CollegeParsed;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const { addToCompare, removeFromCompare, isCompared } = useComparison();
  const compared = isCompared(college.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (compared) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college);
    }
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow dark:border-gray-800 dark:bg-gray-900">
      {/* College Image */}
      <div className="relative h-44 w-full bg-gray-100 dark:bg-gray-850">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={college.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600"}
          alt={college.name}
          className="h-full w-full object-cover"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded bg-yellow-400 px-2 py-0.5 text-xs font-bold text-gray-900 shadow">
          <Star className="h-3 w-3 fill-current" />
          <span>{college.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* College Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <Link href={`/college/${college.id}`}>
            <h3 className="font-semibold text-gray-900 hover:text-indigo-600 dark:text-gray-100 dark:hover:text-indigo-400 line-clamp-1">
              {college.name}
            </h3>
          </Link>
          <p className="mt-1 flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span>{college.city}, {college.state}</span>
          </p>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-xs line-clamp-2 leading-relaxed">
            {college.description}
          </p>
        </div>

        {/* Key Stats */}
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div>
            <span className="block text-gray-400 dark:text-gray-500 text-[10px] font-semibold uppercase tracking-wider">Annual Fees</span>
            <span className="flex items-center text-sm font-bold text-gray-900 dark:text-gray-100 mt-0.5">
              <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
              {college.fees.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="block text-gray-400 dark:text-gray-500 text-[10px] font-semibold uppercase tracking-wider">Avg Placement</span>
            <span className="flex items-center text-sm font-bold text-gray-900 dark:text-gray-100 mt-0.5">
              <Briefcase className="h-3.5 w-3.5 mr-1 text-gray-500 dark:text-gray-400" />
              {college.avgPackage} LPA
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-2 pt-2">
          <Link
            href={`/college/${college.id}`}
            className="flex-1 text-center rounded-md border border-gray-300 bg-white py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-750 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-750 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={handleCompareClick}
            className={`flex items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-semibold shadow-sm transition-colors ${
              compared
                ? 'bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-950/40 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-900/50'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700'
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
    </div>
  );
}
