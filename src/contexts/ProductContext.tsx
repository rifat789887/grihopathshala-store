import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  status: string;
  features: string[];
  slug: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (id: string, product: Omit<Product, 'id' | 'slug'>) => void;
  deleteProduct: (id: string) => void;
}

const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Complete Physics Guide for SSC Candidates',
    description: 'Everything you need to master the subject with clear explanations and practice problems.',
    price: 250,
    originalPrice: 350,
    category: 'pdf',
    imageUrl: 'https://picsum.photos/seed/edu1/400/300',
    status: 'published',
    features: ['100+ Pages', 'Video Solutions', 'Chapter-wise Notes'],
    slug: 'complete-physics-guide-ssc'
  },
  {
    id: '2',
    title: 'Advanced Mathematics Masterclass',
    description: 'Everything you need to master the subject with clear explanations and practice problems.',
    price: 500,
    originalPrice: 700,
    category: 'course',
    imageUrl: 'https://picsum.photos/seed/edu2/400/300',
    status: 'published',
    features: ['50+ Videos', 'Live Support', 'Mock Tests'],
    slug: 'advanced-math-masterclass'
  }
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('grihopathshala_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('grihopathshala_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProductData: Omit<Product, 'id' | 'slug'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now().toString(),
      slug: newProductData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedData: Omit<Product, 'id' | 'slug'>) => {
    setProducts(prev => prev.map(p => p.id === id ? {
      ...p,
      ...updatedData,
      slug: updatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
