import cors from 'cors';

const allowedOrigins = [
  'https://otasukeai.jp',
  'https://www.otasukeai.jp',
  'https://otasukeai.com',
  'https://www.otasukeai.com',
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

// Allow localhost in development
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:8080');
  allowedOrigins.push('http://localhost:3000');
  allowedOrigins.push('http://127.0.0.1:8080');
}

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (same-origin, mobile apps, curl, etc.)
    if (!origin) {
      callback(null, true);
      return;
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};
