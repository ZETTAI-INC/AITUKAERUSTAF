import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { corsOptions } from './config/cors';
import checkoutRouter from './routes/checkout';
import invoiceRouter from './routes/invoice';
import contactRouter from './routes/contact';
import webhooksRouter from './routes/webhooks';

const app = express();
const PORT = process.env.PORT || 3001;

// Security headers
app.use(helmet());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  message: { error: 'リクエストが多すぎます。しばらく経ってからお試しください。' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Webhook route needs raw body for signature verification
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhooksRouter);

// CORS and JSON parsing for API routes
app.use(cors(corsOptions));
app.use(express.json());

// Apply rate limiting to API routes
app.use('/api/checkout', apiLimiter, checkoutRouter);
app.use('/api/invoice', apiLimiter, invoiceRouter);
app.use('/api/contact', apiLimiter, contactRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
