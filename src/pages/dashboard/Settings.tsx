import React, { useState } from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { Button } from '@/src/components/ui/Button';
import { User, Mail, Lock, Bell, Globe, Save, CheckCircle2 } from 'lucide-react';

export function Settings() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-600">Manage your profile, preferences, and security.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <User className="h-5 w-5 text-brand-600" /> Profile Information
            </h2>
            <p className="text-sm text-slate-500 mt-1">Update your personal details.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="email" 
                    value={user.email || ''}
                    disabled
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-slate-500">Email cannot be changed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-600" /> Preferences
            </h2>
            <p className="text-sm text-slate-500 mt-1">Customize your experience.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-900 font-medium">Email Notifications</h3>
                <p className="text-sm text-slate-500">Receive updates about new courses and offers.</p>
              </div>
              <button 
                type="button"
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifications ? 'bg-brand-500' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${emailNotifications ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="h-px bg-slate-100"></div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-900 font-medium">Language</h3>
                <p className="text-sm text-slate-500">Select your preferred language for the dashboard.</p>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="en">English</option>
                <option value="bn">Bengali</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Lock className="h-5 w-5 text-amber-600" /> Security
            </h2>
            <p className="text-sm text-slate-500 mt-1">Keep your account secure.</p>
          </div>
          <div className="p-6">
            <Button type="button" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              Change Password
            </Button>
            <p className="text-sm text-slate-500 mt-3">
              We will send a password reset link to your email address.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit"
            disabled={saving || saved}
            className={`min-w-[140px] ${saved ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-brand-600 hover:bg-brand-500'} text-white`}
          >
            {saving ? 'Saving...' : saved ? <><CheckCircle2 className="h-4 w-4 mr-2" /> Saved</> : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
