import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Bundle {
  id: string;
  title: string;
  originalPrice: number;
  bundlePrice: number;
  isPopular: boolean;
  items: string[];
}

interface BundleContextType {
  bundles: Bundle[];
  addBundle: (bundle: Omit<Bundle, 'id'>) => void;
  updateBundle: (id: string, bundle: Omit<Bundle, 'id'>) => void;
  deleteBundle: (id: string) => void;
}

const initialBundles: Bundle[] = [
  {
    id: 'b1',
    title: 'HSC Humanities Premium Notes',
    originalPrice: 800,
    bundlePrice: 450,
    isPopular: false,
    items: [
      'History 1st & 2nd Paper PDF',
      'Civics 1st & 2nd Paper PDF',
      'Economics 1st & 2nd Paper PDF',
      'Exclusive Suggestion 2024'
    ]
  },
  {
    id: 'b2',
    title: 'SSC Science Full Mastery Bundle',
    originalPrice: 1200,
    bundlePrice: 599,
    isPopular: true,
    items: [
      'Physics Complete Guide PDF',
      'Chemistry Complete Guide PDF',
      'Biology Complete Guide PDF',
      'Higher Math Solution PDF',
      '10 Model Test Papers'
    ]
  }
];

const BundleContext = createContext<BundleContextType | undefined>(undefined);

export function BundleProvider({ children }: { children: React.ReactNode }) {
  const [bundles, setBundles] = useState<Bundle[]>(() => {
    const saved = localStorage.getItem('grihopathshala_bundles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialBundles;
      }
    }
    return initialBundles;
  });

  useEffect(() => {
    localStorage.setItem('grihopathshala_bundles', JSON.stringify(bundles));
  }, [bundles]);

  const addBundle = (newBundleData: Omit<Bundle, 'id'>) => {
    const newBundle: Bundle = {
      ...newBundleData,
      id: Date.now().toString()
    };
    setBundles(prev => [newBundle, ...prev]);
  };

  const updateBundle = (id: string, updatedData: Omit<Bundle, 'id'>) => {
    setBundles(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
  };

  const deleteBundle = (id: string) => {
    setBundles(prev => prev.filter(b => b.id !== id));
  };

  return (
    <BundleContext.Provider value={{ bundles, addBundle, updateBundle, deleteBundle }}>
      {children}
    </BundleContext.Provider>
  );
}

export function useBundles() {
  const context = useContext(BundleContext);
  if (context === undefined) {
    throw new Error('useBundles must be used within a BundleProvider');
  }
  return context;
}
