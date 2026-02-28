import React, { useState } from 'react';
import { Moon, Sun, MonitorPlay, Shield, Bell, Save, CheckCircle2 } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export function Settings() {
  const [nightMode, setNightMode] = useState(true); // Default dark for admin
  const [demoMode, setDemoMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage your admin panel preferences and system settings.</p>
      </div>

      <div className="grid gap-6">
        {/* Appearance Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Moon className="h-5 w-5 text-brand-400" /> Appearance
            </h2>
            <p className="text-sm text-slate-400 mt-1">Customize how the admin panel looks.</p>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Night Mode</h3>
                <p className="text-sm text-slate-400">Toggle dark theme for the admin interface.</p>
              </div>
              <button 
                onClick={() => setNightMode(!nightMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${nightMode ? 'bg-brand-500' : 'bg-slate-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${nightMode ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <MonitorPlay className="h-5 w-5 text-emerald-400" /> System
            </h2>
            <p className="text-sm text-slate-400 mt-1">Manage core system behaviors.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Demo Mode</h3>
                <p className="text-sm text-slate-400">Enable demo mode to safely showcase the admin panel without modifying real data.</p>
              </div>
              <button 
                onClick={() => setDemoMode(!demoMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${demoMode ? 'bg-emerald-500' : 'bg-slate-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${demoMode ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="h-px bg-slate-700"></div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Email Notifications</h3>
                <p className="text-sm text-slate-400">Receive emails when new users register or purchase products.</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-brand-500' : 'bg-slate-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-400" /> Security
            </h2>
            <p className="text-sm text-slate-400 mt-1">Update your security preferences.</p>
          </div>
          <div className="p-6">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
              Change Admin Password
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave} 
            disabled={saving || saved}
            className={`min-w-[140px] ${saved ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-brand-600 hover:bg-brand-500'} text-white`}
          >
            {saving ? 'Saving...' : saved ? <><CheckCircle2 className="h-4 w-4 mr-2" /> Saved</> : <><Save className="h-4 w-4 mr-2" /> Save Settings</>}
          </Button>
        </div>
      </div>
    </div>
  );
}
