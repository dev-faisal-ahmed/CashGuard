import express from 'express';
import cors from 'cors';
import { AppRouter } from '../routes/routes';
import { GlobalErrorHandler } from '../middleware/global-error-handler';

// app
export const app = express();

// parser
app.use(express.json());
app.use(cors());

// main apis
app.use('/api/v1', AppRouter);

// greeter
app.get('/', async (_, res) => {
  res.status(200).json({ message: 'Hi Form CashGuard' });
});

// global error handler
app.use(GlobalErrorHandler);
