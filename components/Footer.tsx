import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 mt-auto dark:border-gray-800 dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Aspiron. All rights reserved.</p>
        <p className="mt-2 text-gray-400 text-xs dark:text-gray-500">
          Built for College Discovery and Admission fit predictions.
        </p>
        <div className="mt-4 border-t border-gray-200/50 pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-400 dark:border-gray-800/50 dark:text-gray-500">
          <span>
            Made by <strong className="text-gray-600 dark:text-gray-300 font-semibold">Ishaan Ray</strong> (Full Stack Engineer)
          </span>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-700">|</span>
          <div className="flex gap-4">
            <a
              href="https://galaxir.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="Portfolio"
              aria-label="Portfolio"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </a>
            <a
              href="https://github.com/Cipher-Shadow-IR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="GitHub"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/ishaan-ray-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

