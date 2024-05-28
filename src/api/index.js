import express from 'express';
import users from './routes/users.js';
import portfolio from './routes/portfolio.js';
import exchange from './routes/exchange.js';
import stock from './routes/stock.js';

async function createServer() {

const api = express();
const router = express.Router();

router.use('/users', users);
router.use('/portfolio', portfolio);
router.use('/exchange', exchange);
router.use('/stock', stock);

api.use(router);

api.listen(4000);
}
createServer();
