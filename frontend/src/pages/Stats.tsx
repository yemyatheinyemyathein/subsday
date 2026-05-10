import { motion } from 'framer-motion';
import { useStats } from '@/hooks/useSubscriptions';
import { formatCurrency } from '@/lib/utils';
import { StatsSVG } from '@/components/AnimatedSVG';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#6366f1'];

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

const Stats = () => {
  const { data, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="card p-6 h-80">
              <div className="h-full bg-muted/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stats = data;

  const categoryData = stats?.categoryBreakdown.map((cat) => ({
    name: cat.category,
    value: cat.total,
  })) || [];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <StatsSVG />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Statistics
          </h1>
          <p className="text-muted-foreground">Insights into your spending</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Monthly Spending', value: formatCurrency(stats?.monthlySpending || 0, stats?.baseCurrency), color: 'text-primary' },
          { label: 'Yearly Projection', value: formatCurrency(stats?.yearlyProjection || 0, stats?.baseCurrency), color: 'text-green-500' },
          { label: 'Daily Average', value: formatCurrency((stats?.monthlySpending || 0) / 30, stats?.baseCurrency), color: 'text-orange-500' },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            className="card p-6 text-center hover:shadow-lg transition-shadow"
            whileHover={{ y: -4 }}
          >
            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
            <motion.p
              className={`text-3xl font-bold ${item.color}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 + idx * 0.1 }}
            >
              {item.value}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={itemVariants} className="card p-6">
          <h3 className="font-semibold mb-4">Spending by Category</h3>
          {categoryData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              No data available
            </div>
          ) : (
            <>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value, stats?.baseCurrency)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {stats?.categoryBreakdown.slice(0, 5).map((cat, index) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                      />
                      <span>{cat.category}</span>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(cat.total, stats?.baseCurrency)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="card p-6">
          <h3 className="font-semibold mb-4">Category Breakdown</h3>
          {categoryData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              No data available
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value, stats?.baseCurrency)}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    {categoryData.map((_, index) => (
                      <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      </div>

      {stats?.upcomingPayments && stats.upcomingPayments.length > 0 && (
        <motion.div variants={itemVariants} className="card p-6">
          <h3 className="font-semibold mb-4">Upcoming Payments (Next 30 Days)</h3>
          <div className="space-y-3">
            {stats.upcomingPayments.map((payment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div>
                  <p className="font-medium">{payment.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
                <motion.p
                  className="font-medium"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, delay: index * 0.1, repeat: Infinity }}
                >
                  {formatCurrency(payment.price, payment.currency)}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Stats;