import express from 'express';
import stock from './routes/stock.js';

async function createServer() {

const api = express();
const router = express.Router();

router.use('/stock', stock);

api.use(router);

api.listen(4000);
}
createServer();
