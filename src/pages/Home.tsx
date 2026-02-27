import { Button } from '@/src/components/ui/Button';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { ArrowRight, BookOpen, CheckCircle2, MessageCircle, ShieldCheck, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/src/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useProducts } from '@/src/contexts/ProductContext';

export function Home() {
  const { t, lang } = useTranslation();
  const { products } = useProducts();
  
  // Get only published products, max 4 for the homepage
  const featuredProducts = products.filter(p => p.status === 'published').slice(0, 4);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - High Conversion Structure */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/library/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <motion.div variants={fadeIn} className="flex justify-center">
              <Badge variant="secondary" className="bg-brand-500/10 text-brand-400 border-brand-500/20 px-4 py-1.5 text-sm">
                <Star className="h-4 w-4 mr-2 fill-brand-400" /> {t('hero.badge')}
              </Badge>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              {lang === 'en' ? (
                <>Master Your Studies with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-200">Grihopathshala Store</span></>
              ) : (
                <><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-200">গৃহপাঠশালা স্টোর</span>-এর সাথে আপনার পড়াশোনায় সেরা হোন</>
              )}
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              {t('hero.desc')}
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link to="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/25 transition-all hover:scale-105">
                  {t('hero.cta.primary')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/bundles" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white transition-all">
                  {t('hero.cta.secondary')}
                </Button>
              </Link>
            </motion.div>

            {/* Trust Signals Under Hero */}
            <motion.div variants={fadeIn} className="pt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-400" /> {t('trust.students')}
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" /> {t('trust.access')}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-brand-400" /> {t('trust.quality')}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works - Cognitive Fluency & Friction Removal */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t('hiw.title')}</h2>
            <p className="text-lg text-slate-600">{t('hiw.desc')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-brand-100 via-brand-200 to-emerald-100 -z-10" />
            
            <motion.div whileHover={{ y: -5 }} className="text-center space-y-6 bg-white p-6 rounded-2xl">
              <div className="w-20 h-20 mx-auto bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm border border-brand-100">
                <BookOpen className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('hiw.step1.title')}</h3>
                <p className="text-slate-600 leading-relaxed">{t('hiw.step1.desc')}</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center space-y-6 bg-white p-6 rounded-2xl">
              <div className="w-20 h-20 mx-auto bg-accent-50 rounded-2xl flex items-center justify-center text-accent-600 shadow-sm border border-accent-100">
                <MessageCircle className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('hiw.step2.title')}</h3>
                <p className="text-slate-600 leading-relaxed">{t('hiw.step2.desc')}</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center space-y-6 bg-white p-6 rounded-2xl">
              <div className="w-20 h-20 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('hiw.step3.title')}</h3>
                <p className="text-slate-600 leading-relaxed">{t('hiw.step3.desc')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products - Value Perception & Anchoring */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{t('prod.featured')}</h2>
              <p className="text-lg text-slate-600">{t('prod.featured.desc')}</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="font-semibold bg-white">
                {t('prod.viewall')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div key={product.id} whileHover={{ y: -8 }} transition={{ duration: 0.2 }}>
                <Card className="group overflow-hidden border-slate-200 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 transition-all h-full flex flex-col bg-white">
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <Badge variant="default" className="w-fit shadow-sm uppercase">{product.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-end gap-2 mb-5">
                        <span className="text-2xl font-bold text-slate-900">৳ {product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-slate-400 line-through mb-1">৳ {product.originalPrice}</span>
                        )}
                      </div>
                      <Link to={`/products/${product.slug}`}>
                        <Button className="w-full font-semibold" variant="outline">
                          {t('prod.viewdetails')}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
