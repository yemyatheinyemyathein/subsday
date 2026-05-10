import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStats } from '@/hooks/useSubscriptions';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { formatCurrency, getDaysUntil } from '@/lib/utils';
import { ArrowUpRight, CalendarDays, CreditCard, DollarSign, TrendingUp, Plus, AlertCircle } from 'lucide-react';
import { DashboardStatsSVG } from '@/components/AnimatedSVG';
import { format } from 'date-fns';

const Dashboard = () => {
  const { data: statsData, isLoading: statsLoading } = useStats();
  const { data: subsData, isLoading: subsLoading } = useSubscriptions({ status: 'active' });

  const stats = statsData;
  const subscriptions = subsData?.subscriptions || [];

  const upcomingPayments = subscriptions
    .filter((sub) => sub.status === 'active')
    .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())
    .slice(0, 5);

  if (statsLoading || subsLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-6">
              <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
              <div className="h-8 w-32 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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
      transition: { type: 'spring', stiffness: 100 } as any,
    },
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
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DashboardStatsSVG />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground">Overview of your subscriptions</p>
          </div>
        </div>
        <Link to="/subscriptions" className="btn-primary gap-2 hover:shadow-lg hover:shadow-primary/25 transition-shadow">
          <Plus size={16} />
          Add Subscription
        </Link>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants} className="card p-6 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Spending</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {formatCurrency(stats?.monthlySpending || 0, stats?.baseCurrency)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card p-6 hover:shadow-lg hover:shadow-green-500/10 transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Yearly Projection</p>
              <p className="text-2xl font-bold">
                {formatCurrency(stats?.yearlyProjection || 0, stats?.baseCurrency)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <CreditCard size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Subs</p>
              <p className="text-2xl font-bold">{stats?.totalActive || 0}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card p-6 hover:shadow-lg hover:shadow-orange-500/10 transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <CalendarDays size={20} className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Payment</p>
              <p className="text-2xl font-bold">
                {upcomingPayments[0]
                  ? formatCurrency(upcomingPayments[0].price, upcomingPayments[0].currency)
                  : '$0'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="font-semibold">Upcoming Payments</h2>
            <Link to="/calendar" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y">
            {upcomingPayments.length === 0 ? (
              <div className="px-6 py-8 text-center text-muted-foreground">
                <AlertCircle size={24} className="mx-auto mb-2 opacity-50" />
                <p>No upcoming payments</p>
              </div>
            ) : (
              upcomingPayments.map((sub, idx) => {
                const days = getDaysUntil(sub.nextBillingDate);
                return (
                  <motion.div
                    key={sub._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${sub.name.toLowerCase().replace(/\s+/g, '')}.com&sz=32`}
                        alt=""
                        className="h-8 w-8 rounded-lg object-contain bg-muted"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div>
                        <p className="font-medium">{sub.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(sub.nextBillingDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(sub.price, sub.currency)}
                      </p>
                      <p className={`text-xs ${days <= 3 ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="font-semibold">Spending by Category</h2>
            <Link to="/stats" className="text-sm text-primary hover:underline flex items-center gap-1">
              Details <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="p-6">
            {stats?.categoryBreakdown.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>No data available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats?.categoryBreakdown.slice(0, 5).map((cat: { category: string; total: number }, idx: number) => {
                  const percentage = stats.monthlySpending
                    ? (cat.total / stats.monthlySpending) * 100
                    : 0;
                  return (
                    <div key={cat.category} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{cat.category}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(cat.total, stats.baseCurrency)}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-700 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
