export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    baseCurrency: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ISubscription {
    _id?: string;
    user: string;
    name: string;
    price: number;
    currency: string;
    billingCycle: 'monthly' | 'yearly' | 'weekly' | 'custom';
    nextBillingDate: Date;
    category: string;
    status: 'active' | 'canceled';
    logo?: string;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IStats {
    monthlySpending: number;
    yearlyProjection: number;
    categoryBreakdown: {
        category: string;
        total: number;
        count: number;
    }[];
    upcomingPayments: {
        name: string;
        price: number;
        currency: string;
        date: Date;
    }[];
    totalActive: number;
}
//# sourceMappingURL=index.d.ts.map