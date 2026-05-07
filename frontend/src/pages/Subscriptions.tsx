import { useState } from 'react';
import { useSubscriptions, useDeleteSubscription } from '@/hooks/useSubscriptions';
import { formatCurrency, getDaysUntil, getLogoUrl } from '@/lib/utils';
import { CATEGORIES } from '@/types';
import { Plus, Search, Filter, Edit2, Trash2, Upload, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import Modal from '@/components/Modal';
import SubscriptionForm from '@/components/SubscriptionForm';
import ImportCSV from '@/components/ImportCSV';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">{subscriptions.length} total subscriptions</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary gap-2" onClick={() => setShowImport(true)}>
            <Upload size={16} />
            Import
          </button>
          <button className="btn-primary gap-2" onClick={() => { setEditingSub(null); setShowForm(true); }}>
            <Plus size={16} />
            Add New
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
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
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card p-6">
              <div className="h-4 w-32 bg-muted rounded animate-pulse mb-4" />
              <div className="h-8 w-24 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-muted-foreground">No subscriptions found</p>
          <button className="btn-primary mt-4" onClick={() => setShowForm(true)}>
            Add your first subscription
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((sub) => {
            const days = getDaysUntil(sub.nextBillingDate);
            return (
              <div key={sub._id} className="card p-6 relative">
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === sub._id ? null : sub._id)}
                      className="p-1 rounded-lg hover:bg-accent"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {dropdownOpen === sub._id && (
                      <div className="absolute right-0 z-10 mt-1 w-36 rounded-lg border bg-card shadow-lg py-1">
                        <button
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
                          onClick={() => { setEditingSub(sub); setShowForm(true); setDropdownOpen(null); }}
                        >
                          <Edit2 size={14} /> Edit
                        </button>
                        <button
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-accent"
                          onClick={() => { handleDelete(sub._id); setDropdownOpen(null); }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={sub.logo || getLogoUrl(sub.name)}
                    alt={sub.name}
                    className="h-10 w-10 rounded-lg object-contain bg-muted"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '';
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <h3 className="font-semibold">{sub.name}</h3>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      sub.status === 'active'
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                        : 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="font-semibold">
                      {formatCurrency(sub.price, sub.currency)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Billing</span>
                    <span className="text-sm capitalize">{sub.billingCycle}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <span className="text-sm">{sub.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Next billing</span>
                    <span className={`text-sm ${days <= 3 && sub.status === 'active' ? 'text-red-500 font-medium' : ''}`}>
                      {format(new Date(sub.nextBillingDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>

                {sub.status === 'active' && (
                  <div className="mt-4 pt-4 border-t">
                    <p className={`text-xs text-center ${
                      days <= 0 ? 'text-red-500 font-medium' :
                      days <= 3 ? 'text-orange-500' : 'text-muted-foreground'
                    }`}>
                      {days === 0 ? 'Due today' : days === 1 ? 'Due tomorrow' : `Due in ${days} days`}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

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
    </div>
  );
};

export default Subscriptions;
