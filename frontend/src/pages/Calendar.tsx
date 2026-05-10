import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { formatCurrency } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarSVG } from '@/components/AnimatedSVG';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from 'date-fns';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data } = useSubscriptions({ status: 'active' });

  const subscriptions = data?.subscriptions || [];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getSubscriptionsForDay = (day: Date) => {
    return subscriptions.filter((sub) => {
      const billingDate = parseISO(sub.nextBillingDate);
      return isSameDay(billingDate, day);
    });
  };

  const getDayTotal = (day: Date) => {
    return getSubscriptionsForDay(day).reduce((sum, sub) => sum + sub.price, 0);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <CalendarSVG />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Calendar
          </h1>
          <p className="text-muted-foreground">View your upcoming payments</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card overflow-hidden"
      >
        <div className="flex items-center justify-between border-b px-6 py-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-accent"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.h2
            key={format(currentDate, 'MMMM yyyy')}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-lg font-semibold"
          >
            {format(currentDate, 'MMMM yyyy')}
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-accent"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        <div className="grid grid-cols-7">
          {weekDays.map((day) => (
            <div key={day} className="px-2 py-3 text-center text-sm font-medium text-muted-foreground border-b bg-muted/30">
              {day}
            </div>
          ))}

          {days.map((day, idx) => {
            const daySubs = getSubscriptionsForDay(day);
            const dayTotal = getDayTotal(day);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <motion.div
                key={day.toString()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.01 }}
                className={`min-h-[100px] border-b border-r p-2 relative ${
                  !isCurrentMonth ? 'bg-muted/30' : ''
                } ${isToday ? 'bg-primary/5' : ''}`}
                whileHover={{ backgroundColor: 'rgba(var(--primary), 0.05)' }}
              >
                <div className="flex items-center justify-between">
                  <motion.span
                    className={`text-sm ${
                      isToday
                        ? 'flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium'
                        : !isCurrentMonth
                        ? 'text-muted-foreground/50'
                        : ''
                    }`}
                    animate={isToday ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {format(day, 'd')}
                  </motion.span>
                  {dayTotal > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs font-medium text-muted-foreground"
                    >
                      {formatCurrency(dayTotal, 'USD')}
                    </motion.span>
                  )}
                </div>

                <div className="mt-1 space-y-1">
                  <AnimatePresence>
                    {daySubs.slice(0, 2).map((sub, i) => (
                      <motion.div
                        key={sub._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="rounded px-1.5 py-0.5 text-xs truncate bg-primary/10 text-primary cursor-pointer"
                        title={`${sub.name} - ${formatCurrency(sub.price, sub.currency)}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {sub.name}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {daySubs.length > 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-muted-foreground"
                    >
                      +{daySubs.length - 2} more
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h3 className="font-semibold mb-4">Payment Summary - {format(currentDate, 'MMMM yyyy')}</h3>
        <div className="space-y-3">
          <AnimatePresence>
            {subscriptions
              .filter((sub) => {
                const billingDate = parseISO(sub.nextBillingDate);
                return billingDate >= monthStart && billingDate <= monthEnd;
              })
              .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())
              .map((sub, idx) => (
                <motion.div
                  key={sub._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <div>
                    <p className="font-medium">{sub.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(sub.nextBillingDate), 'MMM d')} - {sub.billingCycle}
                    </p>
                  </div>
                  <motion.p
                    className="font-medium"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, delay: idx * 0.1, repeat: Infinity }}
                  >
                    {formatCurrency(sub.price, sub.currency)}
                  </motion.p>
                </motion.div>
              ))}
          </AnimatePresence>
          {subscriptions.filter((sub) => {
            const billingDate = parseISO(sub.nextBillingDate);
            return billingDate >= monthStart && billingDate <= monthEnd;
          }).length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-center py-4"
            >
              No payments this month
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Calendar;