import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

// Define the BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    // Check if it's already installed (standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    
    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
      const hasDismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!hasDismissed) {
        setTimeout(() => {
          setShowPrompt(true);
        }, 3000);
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Check if we should show the prompt (e.g., not dismissed recently)
      const hasDismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!hasDismissed) {
        // Show the prompt after a short delay to not overwhelm the user immediately
        setTimeout(() => {
          setShowPrompt(true);
        }, 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      setShowPrompt(false);
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember that the user dismissed it so we don't annoy them
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 z-50 overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-50 rounded-full opacity-50 blur-2xl" />
          
          <button 
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors p-1"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
              <Download className="h-6 w-6 text-brand-600" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-lg mb-1">Install App</h3>
              
              {isIOS ? (
                <div className="text-sm text-slate-600 mb-4 leading-relaxed">
                  <p className="mb-2">Install Grihopathshala Store on your iPhone/iPad for a faster experience.</p>
                  <p className="font-medium text-slate-800 flex items-center gap-1">
                    Tap <Share className="h-4 w-4 inline" /> then "Add to Home Screen"
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Install Grihopathshala Store on your device for a faster, app-like experience with offline access.
                </p>
              )}
              
              <div className="flex gap-3">
                {!isIOS && (
                  <Button 
                    onClick={handleInstallClick} 
                    className="flex-1 bg-brand-600 hover:bg-brand-500 shadow-md shadow-brand-500/20"
                  >
                    Install Now
                  </Button>
                )}
                <Button 
                  onClick={handleDismiss} 
                  variant="outline" 
                  className="flex-1"
                >
                  {isIOS ? 'Got it' : 'Maybe Later'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
