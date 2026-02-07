import { Router, Request, Response } from 'express';
import { stripe, getPlan } from '../config/stripe';
import { validateInvoice } from '../middleware/validateRequest';
import { InvoiceRequestBody } from '../types';

const router = Router();

router.post('/', validateInvoice, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!stripe) {
      res.status(503).json({ error: '決済サービスが設定されていません。' });
      return;
    }
    const { planId, companyName, contactName, email, phone } = req.body as InvoiceRequestBody;
    const plan = getPlan(planId);

    if (!plan) {
      res.status(400).json({ error: '無効なプランです' });
      return;
    }

    // Create or find customer
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        name: `${companyName} - ${contactName}`,
        phone,
        metadata: {
          companyName,
          contactName,
          planId,
        },
      });
    }

    // Create invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: 30,
      metadata: {
        planId,
        companyName,
        contactName,
      },
    });

    // Add invoice item
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      amount: plan.amount,
      currency: 'jpy',
      description: `${plan.name} - ${plan.description}（月額・税別）`,
    });

    // Finalize and send the invoice
    await stripe.invoices.finalizeInvoice(invoice.id);
    await stripe.invoices.sendInvoice(invoice.id);

    res.json({
      message: '請求書をメールでお送りしました。ご確認ください。',
      invoiceId: invoice.id,
    });
  } catch (err) {
    console.error('Invoice creation failed:', err);
    res.status(500).json({ error: '請求書の作成に失敗しました。しばらく経ってからお試しください。' });
  }
});

export default router;
