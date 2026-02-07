import { Router, Request, Response } from 'express';
import { stripe } from '../config/stripe';
import Stripe from 'stripe';

const router = Router();

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/', async (req: Request, res: Response): Promise<void> => {
  if (!stripe) {
    res.status(503).json({ error: 'Stripe not configured' });
    return;
  }
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    res.status(500).json({ error: 'Webhook secret not configured' });
    return;
  }

  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${message}`);
    res.status(400).json({ error: `Webhook Error: ${message}` });
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Checkout completed: ${session.id}`);
      console.log(`Customer: ${session.customer_email}`);
      console.log(`Metadata:`, session.metadata);
      // TODO: Send confirmation email, update database, etc.
      break;
    }

    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`Invoice paid: ${invoice.id}`);
      console.log(`Customer: ${invoice.customer_email}`);
      // TODO: Activate subscription, send confirmation, etc.
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`Invoice payment failed: ${invoice.id}`);
      console.log(`Customer: ${invoice.customer_email}`);
      // TODO: Notify customer, retry logic, etc.
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`Subscription cancelled: ${subscription.id}`);
      // TODO: Deactivate service, send notification, etc.
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

export default router;
