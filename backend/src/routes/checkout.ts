import { Router, Request, Response } from 'express';
import { stripe, getPlan } from '../config/stripe';
import { validateCheckout } from '../middleware/validateRequest';
import { CheckoutRequestBody } from '../types';

const router = Router();

router.post('/', validateCheckout, async (req: Request, res: Response): Promise<void> => {
  try {
    const { planId, companyName, contactName, email, phone } = req.body as CheckoutRequestBody;
    const plan = getPlan(planId);

    if (!plan) {
      res.status(400).json({ error: '無効なプランです' });
      return;
    }

    if (!plan.priceId) {
      res.status(500).json({ error: 'Stripe Price IDが設定されていません。管理者にお問い合わせください。' });
      return;
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        planId,
        companyName,
        contactName,
        phone,
      },
      success_url: `${frontendUrl}/payment/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/payment/cancel.html`,
      locale: 'ja',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout session creation failed:', err);
    res.status(500).json({ error: '決済セッションの作成に失敗しました。しばらく経ってからお試しください。' });
  }
});

export default router;
