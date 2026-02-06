import { Request, Response, NextFunction } from 'express';
import { CheckoutRequestBody, InvoiceRequestBody } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\-+() ]{8,20}$/;
const VALID_PLAN_IDS = ['light', 'standard', 'premium'];

function sanitize(input: string): string {
  return input.trim().slice(0, 200);
}

export function validateCheckout(req: Request, res: Response, next: NextFunction): void {
  const body = req.body as CheckoutRequestBody;

  const errors: string[] = [];

  if (!body.planId || !VALID_PLAN_IDS.includes(body.planId)) {
    errors.push('有効なプランを選択してください');
  }
  if (!body.companyName || body.companyName.trim().length === 0) {
    errors.push('会社名を入力してください');
  }
  if (!body.contactName || body.contactName.trim().length === 0) {
    errors.push('担当者名を入力してください');
  }
  if (!body.email || !EMAIL_REGEX.test(body.email)) {
    errors.push('有効なメールアドレスを入力してください');
  }
  if (!body.phone || !PHONE_REGEX.test(body.phone)) {
    errors.push('有効な電話番号を入力してください');
  }

  if (errors.length > 0) {
    res.status(400).json({ error: errors.join(', ') });
    return;
  }

  // Sanitize inputs
  req.body.companyName = sanitize(body.companyName);
  req.body.contactName = sanitize(body.contactName);
  req.body.email = body.email.trim().toLowerCase();
  req.body.phone = body.phone.trim();

  next();
}

export function validateInvoice(req: Request, res: Response, next: NextFunction): void {
  // Same validation as checkout
  validateCheckout(req, res, next);
}
