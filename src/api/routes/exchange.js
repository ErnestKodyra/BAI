import express from 'express';
const router = express.Router();

let exchangeRates = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.75,
    'JPY': 110,
    'PLN': 3.95
};

router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.json(exchangeRates);
});

export default router;
