import mongoose, { Schema } from 'mongoose';

export interface ITokenBlacklist extends mongoose.Document {
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

const tokenBlacklistSchema = new Schema<ITokenBlacklist>({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

tokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<ITokenBlacklist>('TokenBlacklist', tokenBlacklistSchema);
