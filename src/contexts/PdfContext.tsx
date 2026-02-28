import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Pdf {
  id: string;
  title: string;
  url: string;
  coverImage?: string;
  description?: string;
  assignedUserIds: string[];
}

interface PdfContextType {
  pdfs: Pdf[];
  addPdf: (pdf: Omit<Pdf, 'id'>) => void;
  updatePdf: (id: string, pdf: Partial<Pdf>) => void;
  deletePdf: (id: string) => void;
  assignPdfToUser: (pdfId: string, userId: string) => void;
  removePdfFromUser: (pdfId: string, userId: string) => void;
  getUserPdfs: (userId: string) => Pdf[];
}

const mockPdfs: Pdf[] = [
  {
    id: 'pdf-1',
    title: 'Advanced Mathematics Guide',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    coverImage: 'https://picsum.photos/seed/math/400/600',
    description: 'A comprehensive guide for advanced mathematics.',
    assignedUserIds: ['user-1'],
  },
  {
    id: 'pdf-2',
    title: 'Physics Formula Sheet',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    coverImage: 'https://picsum.photos/seed/physics/400/600',
    description: 'All the physics formulas you need in one place.',
    assignedUserIds: [],
  }
];

const PdfContext = createContext<PdfContextType | undefined>(undefined);

export function PdfProvider({ children }: { children: ReactNode }) {
  const [pdfs, setPdfs] = useState<Pdf[]>(mockPdfs);

  const addPdf = (pdf: Omit<Pdf, 'id'>) => {
    const newPdf = {
      ...pdf,
      id: `pdf-${Date.now()}`,
    };
    setPdfs([...pdfs, newPdf]);
  };

  const updatePdf = (id: string, updatedPdf: Partial<Pdf>) => {
    setPdfs(pdfs.map(p => p.id === id ? { ...p, ...updatedPdf } : p));
  };

  const deletePdf = (id: string) => {
    setPdfs(pdfs.filter(p => p.id !== id));
  };

  const assignPdfToUser = (pdfId: string, userId: string) => {
    setPdfs(pdfs.map(p => {
      if (p.id === pdfId && !p.assignedUserIds.includes(userId)) {
        return { ...p, assignedUserIds: [...p.assignedUserIds, userId] };
      }
      return p;
    }));
  };

  const removePdfFromUser = (pdfId: string, userId: string) => {
    setPdfs(pdfs.map(p => {
      if (p.id === pdfId) {
        return { ...p, assignedUserIds: p.assignedUserIds.filter(id => id !== userId) };
      }
      return p;
    }));
  };

  const getUserPdfs = (userId: string) => {
    return pdfs.filter(p => p.assignedUserIds.includes(userId));
  };

  return (
    <PdfContext.Provider value={{
      pdfs,
      addPdf,
      updatePdf,
      deletePdf,
      assignPdfToUser,
      removePdfFromUser,
      getUserPdfs
    }}>
      {children}
    </PdfContext.Provider>
  );
}

export function usePdfs() {
  const context = useContext(PdfContext);
  if (context === undefined) {
    throw new Error('usePdfs must be used within a PdfProvider');
  }
  return context;
}
