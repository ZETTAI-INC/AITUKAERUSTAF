export interface PlanConfig {
  name: string;
  priceId: string;
  amount: number;
  description: string;
}

export interface CheckoutRequestBody {
  planId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

export interface InvoiceRequestBody {
  planId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

export type PlanId = 'light' | 'standard' | 'premium';

export interface ContactRequestBody {
  lastName: string;
  firstName: string;
  companyName: string;
  email: string;
  phone: string;
  inquiryType: string;
  inquiryDetail: string;
  privacyConsent: boolean;
}
