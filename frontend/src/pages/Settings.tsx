import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { CURRENCIES } from '@/types';
import { Sun, Moon, Download, Save } from 'lucide-react';
import { SettingsSVG } from '@/components/AnimatedSVG';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } as any,
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100 },
  },
};

const Settings = () => {
  const user = useAuthStore((state) => state.user);
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);
  const [currency, setCurrency] = useState(user?.baseCurrency || 'USD');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const exportData = () => {
    const data = localStorage.getItem('subsday-data');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'subsday-export.json';
      a.click();
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-2xl"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <SettingsSVG />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="card p-6" whileHover={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
        <h3 className="font-semibold mb-4">Account</h3>
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <label className="label">Name</label>
            <input className="input mt-1" value={user?.name || ''} disabled />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <label className="label">Email</label>
            <input className="input mt-1" value={user?.email || ''} disabled />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <label className="label">Base Currency</label>
            <select
              className="input mt-1"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </motion.div>
          <motion.button
            className="btn-primary gap-2"
            onClick={handleSave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Save size={16} />
            {saved ? 'Saved!' : 'Save Changes'}
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="card p-6" whileHover={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
        <h3 className="font-semibold mb-4">Appearance</h3>
        <div className="flex gap-4">
          <motion.button
            className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
              theme === 'light'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-muted-foreground'
            }`}
            onClick={() => setTheme('light')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sun size={24} className="mx-auto mb-2" />
            <p className="text-sm font-medium">Light</p>
          </motion.button>
          <motion.button
            className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
              theme === 'dark'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-muted-foreground'
            }`}
            onClick={() => setTheme('dark')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Moon size={24} className="mx-auto mb-2" />
            <p className="text-sm font-medium">Dark</p>
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="card p-6" whileHover={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
        <h3 className="font-semibold mb-4">Data</h3>
        <div className="space-y-3">
          <motion.button
            className="btn-secondary w-full justify-start gap-2"
            onClick={exportData}
            whileHover={{ scale: 1.01, x: 4 }}
            whileTap={{ scale: 0.99 }}
          >
            <Download size={16} />
            Export Data (JSON)
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;