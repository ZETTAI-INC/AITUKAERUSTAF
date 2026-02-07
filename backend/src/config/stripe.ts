import Stripe from 'stripe';
import { PlanConfig, PlanId } from '../types';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('WARNING: STRIPE_SECRET_KEY is not set. Stripe features will be unavailable.');
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-02-24.acacia' })
  : (null as unknown as Stripe);

// Price IDs are set in Stripe Dashboard and configured via environment variables
export const PLANS: Record<PlanId, PlanConfig> = {
  light: {
    name: 'ライトプラン',
    priceId: process.env.STRIPE_PRICE_LIGHT || '',
    amount: 50000,
    description: 'AIニュースレポート、メールサポート',
  },
  standard: {
    name: 'スタンダードプラン',
    priceId: process.env.STRIPE_PRICE_STANDARD || '',
    amount: 300000,
    description: '30時間/月、同時3件、月次レポート',
  },
  premium: {
    name: 'プレミアムプラン',
    priceId: process.env.STRIPE_PRICE_PREMIUM || '',
    amount: 500000,
    description: '60時間/月、無制限、優先対応、専任担当',
  },
};

export function getPlan(planId: string): PlanConfig | undefined {
  if (planId in PLANS) {
    return PLANS[planId as PlanId];
  }
  return undefined;
}
