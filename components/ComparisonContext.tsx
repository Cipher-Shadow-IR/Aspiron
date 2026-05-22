'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CollegeParsed } from '../types';

interface ComparisonContextType {
  selectedColleges: CollegeParsed[];
  addToCompare: (college: CollegeParsed) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  isCompared: (id: number) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedColleges, setSelectedColleges] = useState<CollegeParsed[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('compare_colleges');
    if (saved) {
      try {
        setSelectedColleges(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse compare_colleges from localStorage:', e);
      }
    }
  }, []);

  const addToCompare = (college: CollegeParsed) => {
    setSelectedColleges((prev) => {
      if (prev.some((c) => c.id === college.id)) return prev;
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 colleges.');
        return prev;
      }
      const updated = [...prev, college];
      localStorage.setItem('compare_colleges', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCompare = (id: number) => {
    setSelectedColleges((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem('compare_colleges', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCompare = () => {
    setSelectedColleges([]);
    localStorage.removeItem('compare_colleges');
  };

  const isCompared = (id: number) => {
    return selectedColleges.some((c) => c.id === id);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedColleges,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompared,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
