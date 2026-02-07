import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { corsOptions } from './config/cors';
import checkoutRouter from './routes/checkout';
import invoiceRouter from './routes/invoice';
import contactRouter from './routes/contact';
import webhooksRouter from './routes/webhooks';

// Catch fatal errors to aid debugging on Render
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});

const app = express();
const PORT = process.env.PORT || 3001;

// Security headers (relaxed for static file serving)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting for API routes only
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

// Serve static files from project root (one level up from backend/)
const staticRoot = path.join(__dirname, '..', '..');
const indexPath = path.join(staticRoot, 'index.html');
const indexExists = fs.existsSync(indexPath);
console.log(`Static root: ${staticRoot}`);
console.log(`index.html exists: ${indexExists}`);
app.use(express.static(staticRoot));

// Fallback: serve index.html for unmatched routes
if (indexExists) {
  app.get('*', (_req, res) => {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('sendFile error:', err);
        res.status(500).send('Internal Server Error');
      }
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
