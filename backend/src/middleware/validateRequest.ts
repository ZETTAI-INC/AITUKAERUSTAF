import { Request, Response, NextFunction } from 'express';
import { CheckoutRequestBody, InvoiceRequestBody, ContactRequestBody } from '../types';

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

const VALID_INQUIRY_TYPES = [
  '詳しく話を聞きたい',
  '資料請求',
  'サービスに関する相談',
  'パートナー・代理店について',
  'その他',
];

export function validateContact(req: Request, res: Response, next: NextFunction): void {
  const body = req.body as ContactRequestBody;
  const errors: string[] = [];

  if (!body.lastName || body.lastName.trim().length === 0) {
    errors.push('姓を入力してください');
  }
  if (!body.firstName || body.firstName.trim().length === 0) {
    errors.push('名を入力してください');
  }
  if (!body.companyName || body.companyName.trim().length === 0) {
    errors.push('会社名を入力してください');
  }
  if (!body.email || !EMAIL_REGEX.test(body.email)) {
    errors.push('有効なメールアドレスを入力してください');
  }
  if (!body.phone || !PHONE_REGEX.test(body.phone)) {
    errors.push('有効な電話番号を入力してください');
  }
  if (!body.inquiryType || !VALID_INQUIRY_TYPES.includes(body.inquiryType)) {
    errors.push('お問い合わせ種別を選択してください');
  }
  if (!body.inquiryDetail || body.inquiryDetail.trim().length === 0) {
    errors.push('お問い合わせ内容を入力してください');
  }
  if (!body.privacyConsent) {
    errors.push('個人情報の取り扱いに同意してください');
  }

  if (errors.length > 0) {
    res.status(400).json({ error: errors.join(', ') });
    return;
  }

  // Sanitize inputs
  req.body.lastName = sanitize(body.lastName);
  req.body.firstName = sanitize(body.firstName);
  req.body.companyName = sanitize(body.companyName);
  req.body.email = body.email.trim().toLowerCase();
  req.body.phone = body.phone.trim();
  req.body.inquiryType = body.inquiryType.trim();
  req.body.inquiryDetail = body.inquiryDetail.trim().slice(0, 2000);

  next();
}
