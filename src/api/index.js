import express from 'express';
import usersRouter from './routes/users';
import portfolioRouter from './routes/portfolio';
import exchangeRouter from './routes/exchange';
import stockRouter from './routes/stock';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/portfolio', portfolioRouter);
router.use('/exchange', exchangeRouter);
router.use('/stock', stockRouter);

export default router;
