import React from 'react';
import { AlertOctagon, RotateCcw, Search } from 'lucide-react';

export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm h-[390px] animate-pulse dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="h-44 w-full bg-gray-200 dark:bg-gray-800" />
          <div className="flex flex-1 flex-col p-4 space-y-3">
            <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-3.5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="space-y-2 mt-4">
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
            <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center my-6 dark:border-red-950/50 dark:bg-red-950/10">
      <AlertOctagon className="h-12 w-12 text-red-600 mb-3" />
      <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-1">An Error Occurred</h3>
      <p className="text-red-700 dark:text-red-400 text-sm max-w-md mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
}

export function EmptyState({
  title = 'No Colleges Found',
  message = 'We couldn\'t find any colleges matching your criteria. Try adjusting your search query or filters.',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-12 text-center my-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Search className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mb-6">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Search & Filters</span>
        </button>
      )}
    </div>
  );
}
