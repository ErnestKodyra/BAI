import express from 'express';

const exchangeRouter = express.Router();

let exchangeRates = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.75,
    'JPY': 110,
    'PLN': 3.95
};

exchangeRouter.get('/', (req, res) => {
    res.json(exchangeRates);
});

export default exchangeRouter;
