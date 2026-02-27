import { motion } from 'framer-motion';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { CheckCircle2, MessageCircle, Package, Sparkles, TrendingDown, Layers } from 'lucide-react';
import { useTranslation } from '@/src/contexts/LanguageContext';
import { useBundles } from '@/src/contexts/BundleContext';

export function Bundles() {
  const { t } = useTranslation();
  const { bundles } = useBundles();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 lg:py-24 border-b border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-6"
          >
            <motion.div variants={fadeIn} className="flex justify-center">
              <Badge variant="accent" className="bg-accent-500/20 text-accent-300 border-accent-500/30 px-4 py-1.5 text-sm">
                <Sparkles className="h-4 w-4 mr-2 text-accent-400" /> {t('nav.bundles')}
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl lg:text-6xl font-bold tracking-tight">
              {t('bundles.title')}
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-300 font-light leading-relaxed">
              {t('bundles.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Bundles Grid - Center Stage Effect (Decoy Pricing) */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {bundles.map((bundle, idx) => (
              <motion.div 
                key={bundle.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className={`relative bg-white rounded-3xl p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  bundle.isPopular 
                    ? 'border-2 border-brand-500 shadow-brand-500/20 lg:scale-105 z-10' 
                    : 'border border-slate-200 shadow-slate-200/50 z-0'
                }`}
              >
                {bundle.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-teal-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1">
                    <Sparkles className="h-4 w-4" /> {t('bundles.best_value')}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{bundle.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-4">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    {t('bundles.value')} <span className="line-through">৳ {bundle.originalPrice}</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold text-slate-900 tracking-tight">৳ {bundle.bundlePrice}</span>
                  </div>
                  <div className="mt-3 inline-block bg-red-50 text-red-700 font-bold px-3 py-1 rounded-md text-sm border border-red-100">
                    {t('bundles.save')} ৳ {bundle.originalPrice - bundle.bundlePrice}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="font-bold text-slate-900 flex items-center gap-2">
                    <Package className="h-5 w-5 text-brand-500" /> {t('bundles.includes')}
                  </p>
                  <ul className="space-y-3">
                    {bundle.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  size="lg" 
                  onClick={() => window.open(`https://wa.me/+8801300424328?text=${encodeURIComponent(`Hello, I want to order the bundle: ${bundle.title}`)}`, '_blank')}
                  className={`w-full text-lg h-14 font-bold border-none rounded-xl shadow-lg ${
                    bundle.isPopular 
                      ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-emerald-500/25' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
                  }`}
                >
                  <MessageCircle className="mr-2 h-6 w-6" /> {t('bundles.cta')}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bundles Section - Logic & Reassurance */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">{t('bundles.why.title')}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-4">
                <Layers className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('bundles.why.1.title')}</h3>
              <p className="text-slate-600">{t('bundles.why.1.desc')}</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto bg-accent-50 rounded-2xl flex items-center justify-center text-accent-600 mb-4">
                <TrendingDown className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('bundles.why.2.title')}</h3>
              <p className="text-slate-600">{t('bundles.why.2.desc')}</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('bundles.why.3.title')}</h3>
              <p className="text-slate-600">{t('bundles.why.3.desc')}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
