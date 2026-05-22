'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useComparison } from './ComparisonContext';
import { Award, Compass, GitCompare, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { selectedColleges } = useComparison();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const links = [
    { href: '/', label: 'Discover Colleges', icon: Compass },
    { href: '/predictor', label: 'Rank Predictor', icon: Award },
    {
      href: '/compare',
      label: `Compare ${selectedColleges.length > 0 ? `(${selectedColleges.length})` : ''}`,
      icon: GitCompare,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400 text-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Aspiron_logo.png"
            alt="Aspiron Logo"
            className="h-8 w-8 object-contain"
          />
          <span>Aspiron</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-6">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
