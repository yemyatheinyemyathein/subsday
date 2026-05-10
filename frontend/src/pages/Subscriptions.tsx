import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubscriptions, useDeleteSubscription } from '@/hooks/useSubscriptions';
import { formatCurrency, getDaysUntil, getLogoUrl } from '@/lib/utils';
import { CATEGORIES } from '@/types';
import { Plus, Search, Upload, Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import { SubscriptionCardSVG, EmptyStateSVG } from '@/components/AnimatedSVG';
import { format } from 'date-fns';
import Modal from '@/components/Modal';
import SubscriptionForm from '@/components/SubscriptionForm';
import ImportCSV from '@/components/ImportCSV';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 } as any,
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

const Subscriptions = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editingSub, setEditingSub] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const { data, isLoading } = useSubscriptions({
    status: statusFilter || undefined,
    category: categoryFilter || undefined,
  });
  const deleteMutation = useDeleteSubscription();

  const subscriptions = data?.subscriptions || [];

  const filtered = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <SubscriptionCardSVG />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Subscriptions
            </h1>
            <p className="text-muted-foreground">{subscriptions.length} total subscriptions</p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button
            className="btn-secondary gap-2"
            onClick={() => setShowImport(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload size={16} />
            Import
          </motion.button>
          <motion.button
            className="btn-primary gap-2"
            onClick={() => { setEditingSub(null); setShowForm(true); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} />
            Add New
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="input pl-9"
            placeholder="Search subscriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input sm:w-40"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="input sm:w-36"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="canceled">Canceled</option>
        </select>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-6">
                <div className="h-4 w-32 bg-muted rounded animate-pulse mb-4" />
                <div className="h-8 w-24 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="card p-12 text-center"
          >
            <div className="flex justify-center mb-4">
              <EmptyStateSVG />
            </div>
            <p className="text-muted-foreground mb-4">No subscriptions found</p>
            <motion.button
              className="btn-primary"
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add your first subscription
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((sub) => {
              const days = getDaysUntil(sub.nextBillingDate);
              return (
                <motion.div
                  key={sub._id}
                  variants={itemVariants}
                  className="card p-6 relative overflow-hidden group"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(var(--primary), 0.05) 0%, rgba(126, 75, 162, 0.05) 100%)',
                        'linear-gradient(225deg, rgba(var(--primary), 0.1) 0%, rgba(126, 75, 162, 0.1) 100%)',
                        'linear-gradient(135deg, rgba(var(--primary), 0.05) 0%, rgba(126, 75, 162, 0.05) 100%)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDropdownOpen(dropdownOpen === sub._id ? null : sub._id)}
                        className="p-1 rounded-lg hover:bg-accent"
                      >
                        <MoreHorizontal size={16} />
                      </motion.button>
                      <AnimatePresence>
                        {dropdownOpen === sub._id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute right-0 z-20 mt-1 w-36 rounded-lg border bg-card shadow-lg py-1"
                          >
                            <button
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                              onClick={() => { setEditingSub(sub); setShowForm(true); setDropdownOpen(null); }}
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                            <button
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-accent transition-colors"
                              onClick={() => { handleDelete(sub._id); setDropdownOpen(null); }}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.img
                        src={sub.logo || getLogoUrl(sub.name)}
                        alt={sub.name}
                        className="h-10 w-10 rounded-lg object-contain bg-muted"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '';
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      />
                      <div>
                        <h3 className="font-semibold">{sub.name}</h3>
                        <motion.span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            sub.status === 'active'
                              ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                              : 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                          }`}
                          animate={sub.status === 'active' ? { opacity: [1, 0.7, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {sub.status}
                        </motion.span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <span className="font-semibold">
                          {formatCurrency(sub.price, sub.currency)}
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                      >
                        <span className="text-sm text-muted-foreground">Billing</span>
                        <span className="text-sm capitalize">{sub.billingCycle}</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="text-sm text-muted-foreground">Category</span>
                        <span className="text-sm">{sub.category}</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                      >
                        <span className="text-sm text-muted-foreground">Next billing</span>
                        <span className={`text-sm ${days <= 3 && sub.status === 'active' ? 'text-red-500 font-medium' : ''}`}>
                          {format(new Date(sub.nextBillingDate), 'MMM d, yyyy')}
                        </span>
                      </motion.div>
                    </div>

                    {sub.status === 'active' && (
                      <motion.div
                        className="mt-4 pt-4 border-t"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.p
                          className={`text-xs text-center ${
                            days <= 0 ? 'text-red-500 font-medium' :
                            days <= 3 ? 'text-orange-500' : 'text-muted-foreground'
                          }`}
                          animate={days <= 3 ? { scale: [1, 1.05, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {days === 0 ? 'Due today' : days === 1 ? 'Due tomorrow' : `Due in ${days} days`}
                        </motion.p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <Modal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditingSub(null); }}
        title={editingSub ? 'Edit Subscription' : 'Add Subscription'}
      >
        <SubscriptionForm
          subscription={editingSub}
          onSuccess={() => { setShowForm(false); setEditingSub(null); }}
          onCancel={() => { setShowForm(false); setEditingSub(null); }}
        />
      </Modal>

      <Modal
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        title="Import Subscriptions"
      >
        <ImportCSV
          onSuccess={() => setShowImport(false)}
          onCancel={() => setShowImport(false)}
        />
      </Modal>
    </motion.div>
  );
};

export default Subscriptions;