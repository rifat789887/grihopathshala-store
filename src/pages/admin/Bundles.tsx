import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, ArrowLeft, Tag, FileText, CheckCircle2, AlertCircle, Edit2, ExternalLink, Package, Sparkles } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useBundles } from '@/src/contexts/BundleContext';
import { Badge } from '@/src/components/ui/Badge';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  text: string;
}

export function Bundles() {
  const { bundles, addBundle, updateBundle, deleteBundle } = useBundles();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Smart Form State
  const [formData, setFormData] = useState({
    title: '',
    originalPrice: '',
    bundlePrice: '',
    isPopular: false
  });

  const [items, setItems] = useState<Item[]>([
    { id: '1', text: '' }
  ]);

  const handleEdit = (bundle: any) => {
    setFormData({
      title: bundle.title,
      originalPrice: bundle.originalPrice.toString(),
      bundlePrice: bundle.bundlePrice.toString(),
      isPopular: bundle.isPopular
    });
    setItems(bundle.items.length > 0 
      ? bundle.items.map((f: string, i: number) => ({ id: i.toString(), text: f }))
      : [{ id: '1', text: '' }]
    );
    setEditingId(bundle.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({
      title: '', originalPrice: '', bundlePrice: '', isPopular: false
    });
    setItems([{ id: '1', text: '' }]);
    setEditingId(null);
    setIsAdding(false);
  };

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleAddItem = () => {
    setItems([...items, { id: Date.now().toString(), text: '' }]);
  };

  const handleUpdateItem = (id: string, text: string) => {
    setItems(items.map(f => f.id === id ? { ...f, text } : f));
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(f => f.id !== id));
  };

  const handleSave = async () => {
    setLoading(true);
    
    const bundleData = {
      title: formData.title || 'Untitled Bundle',
      originalPrice: Number(formData.originalPrice) || 0,
      bundlePrice: Number(formData.bundlePrice) || 0,
      isPopular: formData.isPopular,
      items: items.map(f => f.text).filter(Boolean)
    };

    if (editingId) {
      updateBundle(editingId, bundleData);
    } else {
      addBundle(bundleData);
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      resetForm();
    }, 1500);
  };

  // Smart Calculations
  const discount = formData.originalPrice && formData.bundlePrice && Number(formData.originalPrice) > Number(formData.bundlePrice)
    ? Math.round(((Number(formData.originalPrice) - Number(formData.bundlePrice)) / Number(formData.originalPrice)) * 100)
    : 0;

  if (!isAdding) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Manage Bundles</h1>
            <p className="text-slate-400">Create, edit, and organize bundle offers.</p>
          </div>
          <Button onClick={() => { resetForm(); setIsAdding(true); }} className="bg-brand-600 hover:bg-brand-500 text-white">
            <Plus className="h-5 w-5 mr-2" /> Add New Bundle
          </Button>
        </div>

        {bundles.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
              <Package className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No bundles yet</h3>
            <p className="text-slate-400 mb-6 max-w-md">You haven't added any bundle offers to your store yet. Click the button above to create your first bundle.</p>
            <Button onClick={() => { resetForm(); setIsAdding(true); }} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
              Create First Bundle
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundles.map((bundle) => (
              <div key={bundle.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex flex-col relative">
                {bundle.isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-500 to-teal-400 text-white px-3 py-1 rounded-bl-lg text-xs font-bold shadow-md flex items-center gap-1 z-10">
                    <Sparkles className="h-3 w-3" /> Popular
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-5 w-5 text-brand-400" />
                    <Badge variant="secondary" className="bg-slate-900/80 text-white border-slate-700 uppercase shadow-sm">
                      Bundle Offer
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2">{bundle.title}</h3>
                  <div className="flex items-center gap-2 mb-4 mt-auto">
                    <span className="text-xl font-bold text-brand-400">৳{bundle.bundlePrice}</span>
                    {bundle.originalPrice > bundle.bundlePrice && (
                      <span className="text-sm text-slate-500 line-through">৳{bundle.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-slate-700">
                    <Button variant="outline" onClick={() => handleEdit(bundle)} className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                      <Edit2 className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Link to={`/bundles`}>
                      <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-3">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={() => deleteBundle(bundle.id)} className="border-slate-600 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/30 px-3">
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
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Bundles
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-brand-400" /> Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Bundle Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., SSC Science Full Mastery Bundle"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Bundle Price (৳)</label>
                  <input 
                    type="number" 
                    name="bundlePrice"
                    value={formData.bundlePrice}
                    onChange={handleChange}
                    placeholder="e.g., 599"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Original Price (৳)</label>
                  <input 
                    type="number" 
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    placeholder="e.g., 1200"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input 
                  type="checkbox" 
                  id="isPopular"
                  name="isPopular"
                  checked={formData.isPopular}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-brand-500 focus:ring-brand-500 focus:ring-offset-slate-800"
                />
                <label htmlFor="isPopular" className="text-sm font-medium text-slate-300">
                  Mark as "Popular / Best Value"
                </label>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Tag className="h-5 w-5 text-brand-400" /> Included Items
              </h2>
              <Button onClick={handleAddItem} variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white h-8">
                <Plus className="h-4 w-4 mr-1" /> Add Item
              </Button>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-2"
                  >
                    <div className="flex-1 relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-400 font-medium">
                        {index + 1}
                      </div>
                      <input 
                        type="text" 
                        value={item.text}
                        onChange={(e) => handleUpdateItem(item.id, e.target.value)}
                        placeholder="e.g., Physics Complete Guide PDF"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => handleRemoveItem(item.id)}
                      className="border-slate-700 text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 px-3"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && (
                <div className="text-center py-6 border border-dashed border-slate-700 rounded-lg">
                  <p className="text-slate-500 text-sm">No items added yet.</p>
                </div>
              )}
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            disabled={loading}
            className={`w-full h-12 text-lg font-medium transition-all ${
              success ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-brand-600 hover:bg-brand-500 text-white'
            }`}
          >
            {loading ? (
              <span className="flex items-center"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> Saving...</span>
            ) : success ? (
              <span className="flex items-center"><CheckCircle2 className="h-5 w-5 mr-2" /> Saved Successfully!</span>
            ) : (
              <span className="flex items-center"><Save className="h-5 w-5 mr-2" /> {editingId ? 'Update Bundle' : 'Save Bundle'}</span>
            )}
          </Button>
        </div>

        {/* Live Preview Section */}
        <div className="lg:sticky lg:top-6 h-fit">
          <h2 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Live Preview</h2>
          
          <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-brand-500 shadow-brand-500/20">
            {formData.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-teal-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1">
                <Sparkles className="h-4 w-4" /> Best Value
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                {formData.title || 'Bundle Title'}
              </h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-4">
                <span className="line-through">৳ {formData.originalPrice || '0'}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-slate-900 tracking-tight">৳ {formData.bundlePrice || '0'}</span>
              </div>
              {discount > 0 && (
                <div className="mt-3 inline-block bg-red-50 text-red-700 font-bold px-3 py-1 rounded-md text-sm border border-red-100">
                  Save ৳ {Number(formData.originalPrice) - Number(formData.bundlePrice)}
                </div>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <p className="font-bold text-slate-900 flex items-center gap-2">
                <Package className="h-5 w-5 text-brand-500" /> Includes
              </p>
              <ul className="space-y-3">
                {items.filter(f => f.text).length > 0 ? (
                  items.filter(f => f.text).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item.text}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-3 text-slate-400 italic">
                    <CheckCircle2 className="h-5 w-5 text-slate-300 shrink-0 mt-0.5" />
                    <span>Items will appear here...</span>
                  </li>
                )}
              </ul>
            </div>

            <Button 
              size="lg" 
              className="w-full text-lg h-14 font-bold border-none rounded-xl shadow-lg bg-[#25D366] text-white shadow-emerald-500/25 pointer-events-none"
            >
              Order via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
