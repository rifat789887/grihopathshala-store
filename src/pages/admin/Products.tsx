import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Image as ImageIcon, Save, ArrowLeft, Tag, FileText, CheckCircle2, AlertCircle, Edit2, ExternalLink } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useProducts } from '@/src/contexts/ProductContext';
import { Badge } from '@/src/components/ui/Badge';
import { Link } from 'react-router-dom';

interface Feature {
  id: string;
  text: string;
}

export function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Smart Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'pdf',
    imageUrl: '',
    status: 'published'
  });

  const [features, setFeatures] = useState<Feature[]>([
    { id: '1', text: '' }
  ]);

  const handleEdit = (product: any) => {
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      imageUrl: product.imageUrl,
      status: product.status
    });
    setFeatures(product.features.length > 0 
      ? product.features.map((f: string, i: number) => ({ id: i.toString(), text: f }))
      : [{ id: '1', text: '' }]
    );
    setEditingId(product.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({
      title: '', description: '', price: '', originalPrice: '', category: 'pdf', imageUrl: '', status: 'published'
    });
    setFeatures([{ id: '1', text: '' }]);
    setEditingId(null);
    setIsAdding(false);
  };

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFeature = () => {
    setFeatures([...features, { id: Date.now().toString(), text: '' }]);
  };

  const handleUpdateFeature = (id: string, text: string) => {
    setFeatures(features.map(f => f.id === id ? { ...f, text } : f));
  };

  const handleRemoveFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const handleSave = async () => {
    setLoading(true);
    
    const productData = {
      title: formData.title || 'Untitled Product',
      description: formData.description,
      price: Number(formData.price) || 0,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      category: formData.category,
      imageUrl: formData.imageUrl || `https://picsum.photos/seed/${Date.now()}/400/300`,
      status: formData.status,
      features: features.map(f => f.text).filter(Boolean)
    };

    if (editingId) {
      updateProduct(editingId, productData);
    } else {
      addProduct(productData);
    }

    // Simulate API call to Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      resetForm();
    }, 1500);
  };

  // Smart Calculations
  const discount = formData.originalPrice && formData.price && Number(formData.originalPrice) > Number(formData.price)
    ? Math.round(((Number(formData.originalPrice) - Number(formData.price)) / Number(formData.originalPrice)) * 100)
    : 0;

  if (!isAdding) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Manage Products</h1>
            <p className="text-slate-400">Add, edit, and organize your educational materials.</p>
          </div>
          <Button onClick={() => { resetForm(); setIsAdding(true); }} className="bg-brand-600 hover:bg-brand-500 text-white">
            <Plus className="h-5 w-5 mr-2" /> Add New Product
          </Button>
        </div>

        {products.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
              <PackageIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No products yet</h3>
            <p className="text-slate-400 mb-6 max-w-md">You haven't added any products to your store yet. Click the button above to create your first product.</p>
            <Button onClick={() => { resetForm(); setIsAdding(true); }} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
              Create First Product
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex flex-col">
                <div className="aspect-video relative bg-slate-900">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="secondary" className="bg-slate-900/80 text-white border-slate-700 uppercase shadow-sm backdrop-blur-sm">
                      {product.category}
                    </Badge>
                    {product.status === 'draft' && (
                      <Badge variant="warning" className="shadow-sm">Draft</Badge>
                    )}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2">{product.title}</h3>
                  <div className="flex items-center gap-2 mb-4 mt-auto">
                    <span className="text-xl font-bold text-brand-400">৳{product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-slate-500 line-through">৳{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-slate-700">
                    <Button variant="outline" onClick={() => handleEdit(product)} className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                      <Edit2 className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Link to={`/products/${product.slug}`}>
                      <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-3">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={() => deleteProduct(product.id)} className="border-slate-600 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/30 px-3">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <button 
          onClick={resetForm}
          className="flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Products
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">Status:</span>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-2"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <Button 
            onClick={handleSave} 
            disabled={loading || success}
            className={`${success ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-brand-600 hover:bg-brand-500'} text-white min-w-[120px]`}
          >
            {loading ? 'Saving...' : success ? <><CheckCircle2 className="h-4 w-4 mr-2" /> Saved!</> : <><Save className="h-4 w-4 mr-2" /> Save Product</>}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Smart Form */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* General Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center"><FileText className="h-5 w-5 mr-2 text-brand-400" /> General Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Product Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Complete SSC Physics Guide"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Describe what makes this product great..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <div className="grid grid-cols-3 gap-3">
                  {['pdf', 'course', 'bundle'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`py-2.5 rounded-xl text-sm font-medium capitalize transition-all border ${
                        formData.category === cat 
                          ? 'bg-brand-600/20 border-brand-500 text-brand-300' 
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pricing & Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center"><Tag className="h-5 w-5 mr-2 text-emerald-400" /> Pricing</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Selling Price (৳)</label>
                  <input 
                    type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g., 250"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Original Price (৳) <span className="text-slate-500 font-normal">- Optional</span></label>
                  <input 
                    type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="e.g., 500"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                {discount > 0 && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center gap-2 text-emerald-400 text-sm">
                    <AlertCircle className="h-4 w-4" /> Smart Calculation: {discount}% Discount applied!
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center"><ImageIcon className="h-5 w-5 mr-2 text-purple-400" /> Media</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Cover Image URL</label>
                  <input 
                    type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="h-32 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900 flex flex-col items-center justify-center text-slate-500 relative overflow-hidden">
                  {formData.imageUrl ? (
                    <img src={formData.imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  ) : (
                    <>
                      <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                      <span className="text-sm">Image Preview</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dynamic Features */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center"><CheckCircle2 className="h-5 w-5 mr-2 text-blue-400" /> Key Features</h2>
              <Button size="sm" variant="outline" onClick={handleAddFeature} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Plus className="h-4 w-4 mr-1" /> Add Feature
              </Button>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {features.map((feature, index) => (
                  <motion.div 
                    key={feature.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-slate-900 border border-slate-700 rounded-lg w-8 h-10 flex items-center justify-center text-slate-500 text-sm font-medium shrink-0">
                      {index + 1}
                    </div>
                    <input 
                      type="text" 
                      value={feature.text} 
                      onChange={(e) => handleUpdateFeature(feature.id, e.target.value)} 
                      placeholder="e.g., High-quality PDF format"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <button 
                      onClick={() => handleRemoveFeature(feature.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {features.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-4">No features added yet. Add some to highlight your product!</p>
              )}
            </div>
          </motion.div>

        </div>

        {/* Right Column: Live Preview */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Live Preview</h3>
            
            {/* The Preview Card (Matches public UI) */}
            <motion.div 
              className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-black/20 border border-slate-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Image Area */}
              <div className="aspect-[4/3] bg-slate-100 relative">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {formData.category || 'Category'}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      -{discount}%
                    </span>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                  {formData.title || 'Product Title Preview'}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {formData.description || 'Add a description to see how it looks on the card.'}
                </p>

                {/* Features Preview */}
                {features.some(f => f.text) && (
                  <ul className="space-y-2 mb-6">
                    {features.filter(f => f.text).slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feature.text}</span>
                      </li>
                    ))}
                    {features.filter(f => f.text).length > 3 && (
                      <li className="text-xs text-slate-400 italic">+ {features.filter(f => f.text).length - 3} more features</li>
                    )}
                  </ul>
                )}

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div>
                    {formData.originalPrice && Number(formData.originalPrice) > Number(formData.price) && (
                      <span className="text-sm text-slate-400 line-through block">৳{formData.originalPrice}</span>
                    )}
                    <span className="text-2xl font-bold text-brand-600">
                      {formData.price ? `৳${formData.price}` : 'Free'}
                    </span>
                  </div>
                  <Button className="bg-brand-600 text-white rounded-xl pointer-events-none">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500 flex items-center justify-center">
                <AlertCircle className="h-3 w-3 mr-1" /> This is how customers will see it
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing icon fallback
function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}
