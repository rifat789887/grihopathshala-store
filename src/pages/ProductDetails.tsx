import { useParams, Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { CheckCircle2, MessageCircle, ShieldCheck, FileText, Clock, Star, Zap, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/src/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useProducts } from '@/src/contexts/ProductContext';

export function ProductDetails() {
  const { slug } = useParams();
  const { t, lang } = useTranslation();
  const { products } = useProducts();

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
        <p className="text-slate-600 mb-8 text-center">The product you are looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  // Placeholder FAQs (could be added to product model later)
  const faqs = lang === 'en' ? [
    { q: 'How will I receive the product?', a: 'After admin approval, you can access it directly from your dashboard.' },
    { q: 'Is this a one-time payment?', a: 'Yes, you pay once and get lifetime access to the material.' }
  ] : [
    { q: 'আমি প্রোডাক্টটি কীভাবে পাবো?', a: 'অ্যাডমিন অ্যাপ্রুভ করার পর আপনি সরাসরি আপনার ড্যাশবোর্ড থেকে অ্যাক্সেস করতে পারবেন।' },
    { q: 'এটি কি এককালীন পেমেন্ট?', a: 'হ্যাঁ, আপনি একবার পেমেন্ট করবেন এবং আজীবন অ্যাক্সেস পাবেন।' }
  ];

  const waOrderLink = `https://wa.me/+8801300424328?text=${encodeURIComponent(`Hello, I want to order: ${product.title}`)}`;
  const waSupportLink = `https://wa.me/+8801300424328?text=${encodeURIComponent(`Hello, I need some help regarding Grihopathshala Store.`)}`;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Product Hero - Value Perception & Desire Amplification */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Image Gallery - Visual Salience */}
            <div className="lg:col-span-7 space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm"
              >
                <img 
                  src={product.imageUrl || undefined} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Product Info & Conversion Block - Friction Removal & Urgency */}
            <div className="lg:col-span-5 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Badge variant="default" className="bg-brand-600 px-3 py-1 text-sm shadow-sm uppercase">{product.category}</Badge>
                <Badge variant="accent" className="bg-accent-500 px-3 py-1 text-sm shadow-sm flex items-center gap-1">
                  <Zap className="h-3 w-3 fill-current" /> {t('prod.bestseller')}
                </Badge>
                <div className="flex items-center text-amber-500 text-sm font-bold bg-amber-50 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 fill-current mr-1" /> 4.9 (120+)
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {product.title}
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Pricing Anchor Block */}
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                
                <div className="flex items-end gap-3 mb-3 relative z-10">
                  <span className="text-5xl font-bold text-slate-900 tracking-tight">৳ {product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-2xl text-slate-400 line-through mb-1 font-medium">৳ {product.originalPrice}</span>
                      <Badge variant="danger" className="mb-2 ml-2 bg-red-100 text-red-700 border-red-200 font-bold">
                        {t('pd.save')} ৳ {product.originalPrice - product.price}
                      </Badge>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 w-fit px-3 py-1.5 rounded-md relative z-10">
                  <ShieldCheck className="h-4 w-4" /> {t('pd.secure')}
                </div>
              </div>

              {/* Primary CTA - WhatsApp Conversion Logic */}
              <div className="space-y-4 mb-8">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    onClick={() => window.open(waOrderLink, '_blank')}
                    className="w-full text-lg h-16 shadow-xl shadow-emerald-500/20 bg-[#25D366] hover:bg-[#20bd5a] text-white border-none rounded-xl font-bold"
                  >
                    <MessageCircle className="mr-2 h-6 w-6" /> {t('pd.order_wa')}
                  </Button>
                </motion.div>
                <p className="text-center text-sm text-slate-500 font-medium">
                  {t('pd.wa_note')}
                </p>
              </div>

              {/* Trust Reassurance */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 mt-auto">
                <div className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <FileText className="h-5 w-5 text-brand-600 shrink-0" />
                  <span className="text-sm font-bold">{t('pd.instant')}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <Clock className="h-5 w-5 text-brand-600 shrink-0" />
                  <span className="text-sm font-bold">{t('pd.lifetime')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section - Benefit Stacking & Objection Handling */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            
            {/* Highlights */}
            {product.features && product.features.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-accent-500" /> {t('pd.what_you_get')}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.features.map((feature, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx} 
                      className="flex items-start gap-3 bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-brand-300 transition-colors"
                    >
                      <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                      <span className="text-slate-800 font-medium text-lg leading-snug">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Full Description */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('pd.description')}</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 whitespace-pre-wrap">
                {product.description}
              </div>
            </section>
          </div>

          {/* Sidebar - FAQ & Support */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">{t('pd.faq')}</h3>
              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="group">
                    <h4 className="font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{faq.q}</h4>
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="font-bold text-slate-900 mb-4">{t('pd.support')}</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.open(waSupportLink, '_blank')}
                  className="w-full h-12 font-bold border-slate-300 hover:bg-slate-50"
                >
                  {t('pd.contact')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Sticky CTA - Friction Removal */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:hidden z-40">
        <Button 
          size="lg" 
          onClick={() => window.open(waOrderLink, '_blank')}
          className="w-full text-lg h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white border-none rounded-xl font-bold"
        >
          <MessageCircle className="mr-2 h-6 w-6" /> {t('pd.order_wa')}
        </Button>
      </div>
    </div>
  );
}
