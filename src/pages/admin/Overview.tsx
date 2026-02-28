import React from 'react';
import { useProducts } from '@/src/contexts/ProductContext';
import { useBundles } from '@/src/contexts/BundleContext';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Package, Eye, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Overview() {
  const { products } = useProducts();
  const { bundles } = useBundles();

  // Items that appear on the homepage
  const publishedProducts = products.filter(p => p.status === 'published');
  const featuredProducts = publishedProducts.slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
        <p className="text-slate-400">Summary of items currently visible on the homepage and store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Published Products</h3>
            <div className="p-2 bg-brand-500/10 rounded-lg">
              <Eye className="h-5 w-5 text-brand-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{publishedProducts.length}</p>
          <p className="text-sm text-slate-500 mt-2">Visible to students</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Total Products</h3>
            <div className="p-2 bg-slate-700 rounded-lg">
              <Package className="h-5 w-5 text-slate-300" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{products.length}</p>
          <p className="text-sm text-slate-500 mt-2">In your inventory</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Active Bundles</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{bundles.length}</p>
          <p className="text-sm text-slate-500 mt-2">Available offers</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Homepage Featured</h3>
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Star className="h-5 w-5 text-amber-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{featuredProducts.length}</p>
          <p className="text-sm text-slate-500 mt-2">Max 4 items shown</p>
        </div>
      </div>

      {/* Homepage Preview Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Currently on Homepage</h2>
          <Link to="/" target="_blank" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
            View Live Homepage &rarr;
          </Link>
        </div>
        
        {featuredProducts.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
            <Package className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Products on Homepage</h3>
            <p className="text-slate-400">Publish some products to see them appear here and on the homepage.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="bg-slate-800 border-slate-700 overflow-hidden flex flex-col">
                <div className="aspect-[4/3] bg-slate-900 relative">
                  <img 
                    src={product.imageUrl || undefined} 
                    alt={product.title} 
                    className="object-cover w-full h-full opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge variant="default" className="w-fit bg-brand-500/90 text-white border-none uppercase text-xs">
                      {product.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-white text-lg mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-slate-700">
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-white">৳ {product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-slate-500 line-through mb-0.5">৳ {product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* All Published Products Section */}
      {publishedProducts.length > 4 && (
        <div className="space-y-6 pt-8 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Other Published Products</h2>
            <Link to="/admin/products" className="text-sm text-slate-400 hover:text-white transition-colors">
              Manage Products &rarr;
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-75">
            {publishedProducts.slice(4).map((product) => (
              <Card key={product.id} className="bg-slate-800/50 border-slate-700/50 overflow-hidden flex flex-col">
                <div className="aspect-[4/3] bg-slate-900 relative">
                  <img 
                    src={product.imageUrl || undefined} 
                    alt={product.title} 
                    className="object-cover w-full h-full opacity-60"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="font-medium text-slate-300 text-sm mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="mt-auto pt-3 border-t border-slate-700/50">
                    <span className="text-lg font-bold text-slate-300">৳ {product.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
