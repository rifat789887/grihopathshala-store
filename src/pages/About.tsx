import { motion } from 'framer-motion';
import { BookOpen, Target, Award, Heart } from 'lucide-react';

export function About() {
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
      <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/library2/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-6"
          >
            <motion.div variants={fadeIn} className="w-16 h-16 mx-auto bg-brand-500/20 rounded-2xl flex items-center justify-center mb-6 border border-brand-500/30">
              <BookOpen className="h-8 w-8 text-brand-400" />
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl lg:text-6xl font-bold tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-200">Grihopathshala Store</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-300 font-light leading-relaxed">
              Empowering students with clarity, confidence, and premium educational resources.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-16"
            >
              {/* Mission */}
              <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-12 h-12 shrink-0 bg-brand-100 rounded-xl flex items-center justify-center mt-1">
                  <Target className="h-6 w-6 text-brand-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    At Grihopathshala Store, we believe quality education should feel clear, inspiring, and deeply supportive. Our mission is to help students learn with confidence through well-structured resources, modern presentation, and a disciplined academic approach that makes studying more effective and meaningful.
                  </p>
                </div>
              </motion.div>

              {/* The Platform */}
              <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-12 h-12 shrink-0 bg-accent-100 rounded-xl flex items-center justify-center mt-1">
                  <BookOpen className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">More Than a Platform</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    We are building more than just an educational platform. Grihopathshala Store is designed to become a trusted learning companion for students and a reliable support system for parents who want focused, high-quality academic guidance. From digital notes, ebooks, and courses to carefully curated learning products, every part of our platform is created to make education more organized, accessible, and result-oriented.
                  </p>
                </div>
              </motion.div>

              {/* The Difference */}
              <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-12 h-12 shrink-0 bg-emerald-100 rounded-xl flex items-center justify-center mt-1">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">The Grihopathshala Store Difference</h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    What makes us different is our commitment to clarity, quality, and student-centered learning. We do not believe in confusing systems or ordinary presentation. We aim to present educational content in a way that is premium, easy to understand, visually appealing, and genuinely helpful for academic success.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our vision is to build one of the most trusted and respected educational brands in Bangladesh — a platform where students find not only products, but also direction, motivation, and confidence for their learning journey.
                  </p>
                </div>
              </motion.div>

              {/* Core Belief (Highlight) */}
              <motion.div variants={fadeIn} className="pt-8">
                <div className="bg-gradient-to-br from-brand-900 to-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-brand-900/20">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/texture/1000/1000')] opacity-5 mix-blend-overlay pointer-events-none" />
                  <Heart className="h-10 w-10 text-accent-500 mx-auto mb-6" />
                  <h3 className="text-xl md:text-2xl font-medium text-brand-100 mb-4">
                    At the heart of Grihopathshala Store is a simple belief:
                  </h3>
                  <p className="text-2xl md:text-4xl font-bold text-white leading-tight">
                    "When students get the right guidance in the right way, they can achieve far more than they imagine."
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
