import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.products': { en: 'All Products', bn: 'সকল প্রোডাক্ট' },
  'nav.bundles': { en: 'Bundles', bn: 'বান্ডেল অফার' },
  'nav.about': { en: 'About Us', bn: 'আমাদের সম্পর্কে' },
  'nav.signin': { en: 'Sign In', bn: 'লগইন' },
  
  // Hero
  'hero.badge': { en: 'Premium Educational Resources', bn: 'প্রিমিয়াম এডুকেশনাল রিসোর্স' },
  'hero.title1': { en: 'Master Your Studies with', bn: 'আপনার পড়াশোনায় সেরা হোন' },
  'hero.desc': { en: 'The most trusted platform for Bangladeshi students. Get access to premium PDFs, courses, and physical study materials curated by experts.', bn: 'বাংলাদেশের শিক্ষার্থীদের জন্য সবচেয়ে বিশ্বস্ত প্ল্যাটফর্ম। এক্সপার্টদের তৈরি প্রিমিয়াম পিডিএফ, কোর্স এবং স্টাডি ম্যাটেরিয়ালস পান।' },
  'hero.cta.primary': { en: 'Explore Products', bn: 'প্রোডাক্ট দেখুন' },
  'hero.cta.secondary': { en: 'View Bundles', bn: 'বান্ডেল দেখুন' },
  
  // Trust Bar
  'trust.students': { en: '10,000+ Students', bn: '১০,০০০+ শিক্ষার্থী' },
  'trust.access': { en: 'Instant Access', bn: 'ইনস্ট্যান্ট এক্সেস' },
  'trust.quality': { en: 'Expert Curated', bn: 'এক্সপার্ট দ্বারা তৈরি' },
  'trust.authentic': { en: '100% Authentic', bn: '১০০% অথেন্টিক' },
  'trust.guarantee': { en: '100% Money-Back Guarantee', bn: '১০০% মানি-ব্যাক গ্যারান্টি' },

  // How it works
  'hiw.title': { en: 'How Ordering Works', bn: 'অর্ডার করার নিয়ম' },
  'hiw.desc': { en: 'A simple, secure process to get your study materials instantly.', bn: 'আপনার স্টাডি ম্যাটেরিয়ালস পাওয়ার সহজ ও নিরাপদ উপায়।' },
  'hiw.step1.title': { en: '1. Browse & Select', bn: '১. পছন্দ করুন' },
  'hiw.step1.desc': { en: 'Find the perfect PDF, course, or bundle for your academic needs.', bn: 'আপনার প্রয়োজনীয় পিডিএফ, কোর্স বা বান্ডেলটি খুঁজে বের করুন।' },
  'hiw.step2.title': { en: '2. Order via WhatsApp', bn: '২. হোয়াটসঅ্যাপে অর্ডার' },
  'hiw.step2.desc': { en: 'Click the WhatsApp button to confirm your order and make payment securely.', bn: 'হোয়াটসঅ্যাপ বাটনে ক্লিক করে অর্ডার কনফার্ম করুন এবং পেমেন্ট করুন।' },
  'hiw.step3.title': { en: '3. Instant Access', bn: '৩. ইনস্ট্যান্ট এক্সেস' },
  'hiw.step3.desc': { en: 'Once approved, access your materials immediately from your dashboard.', bn: 'অ্যাপ্রুভ হওয়ার সাথে সাথেই ড্যাশবোর্ড থেকে এক্সেস পেয়ে যাবেন।' },

  // Products
  'prod.featured': { en: 'Featured Resources', bn: 'ফিচার্ড রিসোর্স' },
  'prod.featured.desc': { en: 'Handpicked materials for your success.', bn: 'আপনার সাফল্যের জন্য বাছাইকৃত ম্যাটেরিয়ালস।' },
  'prod.viewall': { en: 'View all', bn: 'সব দেখুন' },
  'prod.bestseller': { en: 'Best Seller', bn: 'বেস্ট সেলার' },
  'prod.viewdetails': { en: 'View Details', bn: 'বিস্তারিত দেখুন' },

  // Product Details
  'pd.save': { en: 'Save', bn: 'সাশ্রয়' },
  'pd.secure': { en: 'Secure payment via WhatsApp', bn: 'হোয়াটসঅ্যাপের মাধ্যমে নিরাপদ পেমেন্ট' },
  'pd.order_wa': { en: 'Order on WhatsApp', bn: 'হোয়াটসঅ্যাপে অর্ডার করুন' },
  'pd.wa_note': { en: 'Clicking this will open WhatsApp to confirm your order directly with our team.', bn: 'ক্লিক করলে আমাদের টিমের সাথে সরাসরি অর্ডার কনফার্ম করার জন্য হোয়াটসঅ্যাপ ওপেন হবে।' },
  'pd.instant': { en: 'Instant Access*', bn: 'ইনস্ট্যান্ট এক্সেস*' },
  'pd.lifetime': { en: 'Lifetime Validity', bn: 'লাইফটাইম ভ্যালিডিটি' },
  'pd.what_you_get': { en: 'What you\'ll get', bn: 'যা যা পাচ্ছেন' },
  'pd.description': { en: 'Full Description', bn: 'বিস্তারিত বিবরণ' },
  'pd.faq': { en: 'Frequently Asked Questions', bn: 'সাধারণ জিজ্ঞাসা' },
  'pd.support': { en: 'Still have questions?', bn: 'আরও কিছু জানার আছে?' },
  'pd.contact': { en: 'Contact Support', bn: 'সাপোর্টে যোগাযোগ করুন' },

  // Bundles
  'bundles.title': { en: 'Premium Bundle Offers', bn: 'প্রিমিয়াম বান্ডেল অফার' },
  'bundles.subtitle': { en: 'Get complete preparation packages at unbeatable prices. Maximize your results while saving money.', bn: 'অবিশ্বাস্য মূল্যে সম্পূর্ণ প্রস্তুতির প্যাকেজগুলো সংগ্রহ করুন। টাকা বাঁচান এবং সেরা প্রস্তুতি নিন।' },
  'bundles.value': { en: 'Total Value:', bn: 'মোট মূল্য:' },
  'bundles.save': { en: 'You Save', bn: 'আপনার সাশ্রয়' },
  'bundles.includes': { en: 'This bundle includes:', bn: 'এই বান্ডেলে যা যা থাকছে:' },
  'bundles.cta': { en: 'Order Bundle via WhatsApp', bn: 'হোয়াটসঅ্যাপে বান্ডেল অর্ডার করুন' },
  'bundles.best_value': { en: 'Best Value', bn: 'সেরা অফার' },
  'bundles.why.title': { en: 'Why Choose Our Bundles?', bn: 'আমাদের বান্ডেল কেন বেছে নেবেন?' },
  'bundles.why.1.title': { en: 'Complete Preparation', bn: 'সম্পূর্ণ প্রস্তুতি' },
  'bundles.why.1.desc': { en: 'Everything you need for a subject in one place.', bn: 'একটি বিষয়ের জন্য প্রয়োজনীয় সবকিছু এক জায়গায়।' },
  'bundles.why.2.title': { en: 'Huge Savings', bn: 'বিশাল সাশ্রয়' },
  'bundles.why.2.desc': { en: 'Save up to 50% compared to buying individually.', bn: 'আলাদাভাবে কেনার চেয়ে ৫০% পর্যন্ত সাশ্রয় করুন।' },
  'bundles.why.3.title': { en: 'Structured Learning', bn: 'সুশৃঙ্খল পড়াশোনা' },
  'bundles.why.3.desc': { en: 'Materials designed to be studied together for maximum effect.', bn: 'সর্বোচ্চ ফলাফলের জন্য একসাথে পড়ার উপযোগী করে তৈরি।' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('bn'); // Default to Bangla for BD market

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][lang];
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
