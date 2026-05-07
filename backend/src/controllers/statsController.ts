import { Request, Response } from 'express';
import Subscription from '../models/Subscription';
import { convertCurrency } from '../services/currency';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  const user = req.user!;
  const baseCurrency = user.baseCurrency || 'USD';

  const subscriptions = await Subscription.find({
    user: user._id,
    status: 'active',
  });

  const categoryMap = new Map<string, { total: number; count: number }>();
  let monthlyTotal = 0;
  const upcomingPayments: any[] = [];

  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  for (const sub of subscriptions) {
    const convertedPrice = await convertCurrency(
      sub.price,
      sub.currency,
      baseCurrency
    );

    let monthlyPrice = convertedPrice;
    if (sub.billingCycle === 'yearly') {
      monthlyPrice = convertedPrice / 12;
    } else if (sub.billingCycle === 'weekly') {
      monthlyPrice = convertedPrice * 4;
    }

    monthlyTotal += monthlyPrice;

    const category = sub.category || 'Other';
    const existing = categoryMap.get(category) || { total: 0, count: 0 };
    categoryMap.set(category, {
      total: existing.total + monthlyPrice,
      count: existing.count + 1,
    });

    const billingDate = new Date(sub.nextBillingDate);
    if (billingDate >= now && billingDate <= thirtyDaysFromNow) {
      upcomingPayments.push({
        name: sub.name,
        price: sub.price,
        currency: sub.currency,
        date: billingDate,
      });
    }
  }

  upcomingPayments.sort((a, b) => a.date.getTime() - b.date.getTime());

  const categoryBreakdown = Array.from(categoryMap.entries()).map(
    ([category, data]) => ({
      category,
      total: Math.round(data.total * 100) / 100,
      count: data.count,
    })
  );

  categoryBreakdown.sort((a, b) => b.total - a.total);

  res.json({
    stats: {
      monthlySpending: Math.round(monthlyTotal * 100) / 100,
      yearlyProjection: Math.round(monthlyTotal * 12 * 100) / 100,
      categoryBreakdown,
      upcomingPayments: upcomingPayments.slice(0, 10),
      totalActive: subscriptions.length,
      baseCurrency,
    },
  });
};
