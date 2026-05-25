import express from 'express';
import cors from 'cors';
import handler from './api/chat.js';

const app = express();
app.use(express.json());
app.use(cors());

// Wrap Vercel serverless handler as Express route
app.all('/api/chat', (req, res) => handler(req, res));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
