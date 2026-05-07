import { useState } from 'react';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { formatCurrency } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">View your upcoming payments</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-accent">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-accent">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7">
          {weekDays.map((day) => (
            <div key={day} className="px-2 py-3 text-center text-sm font-medium text-muted-foreground border-b">
              {day}
            </div>
          ))}

          {days.map((day) => {
            const daySubs = getSubscriptionsForDay(day);
            const dayTotal = getDayTotal(day);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <div
                key={day.toString()}
                className={`min-h-[100px] border-b border-r p-2 ${
                  !isCurrentMonth ? 'bg-muted/30' : ''
                } ${isToday ? 'bg-primary/5' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${
                    isToday
                      ? 'flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium'
                      : !isCurrentMonth
                      ? 'text-muted-foreground/50'
                      : ''
                  }`}>
                    {format(day, 'd')}
                  </span>
                  {dayTotal > 0 && (
                    <span className="text-xs font-medium text-muted-foreground">
                      {formatCurrency(dayTotal, 'USD')}
                    </span>
                  )}
                </div>

                <div className="mt-1 space-y-1">
                  {daySubs.slice(0, 2).map((sub) => (
                    <div
                      key={sub._id}
                      className="rounded px-1.5 py-0.5 text-xs truncate bg-primary/10 text-primary"
                      title={`${sub.name} - ${formatCurrency(sub.price, sub.currency)}`}
                    >
                      {sub.name}
                    </div>
                  ))}
                  {daySubs.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{daySubs.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold mb-4">Payment Summary - {format(currentDate, 'MMMM yyyy')}</h3>
        <div className="space-y-3">
          {subscriptions
            .filter((sub) => {
              const billingDate = parseISO(sub.nextBillingDate);
              return billingDate >= monthStart && billingDate <= monthEnd;
            })
            .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())
            .map((sub) => (
              <div key={sub._id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(sub.nextBillingDate), 'MMM d')} - {sub.billingCycle}
                  </p>
                </div>
                <p className="font-medium">
                  {formatCurrency(sub.price, sub.currency)}
                </p>
              </div>
            ))}
          {subscriptions.filter((sub) => {
            const billingDate = parseISO(sub.nextBillingDate);
            return billingDate >= monthStart && billingDate <= monthEnd;
          }).length === 0 && (
            <p className="text-muted-foreground text-center py-4">No payments this month</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
