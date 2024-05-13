import express from 'express';
import routes from './routes/test.js';
import usersRouter from './routes/users.js';
import exchangeRouter from './routes/exchange.js';
import portfolioRouter from './routes/portfolio.js';
import stockRouter from './routes/stock.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/exchange', exchangeRouter);
app.use('/portfolio', portfolioRouter);
app.use('/stock', stockRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
