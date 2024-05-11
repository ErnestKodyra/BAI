const express = require('express');
const router = express.Router();

let exchangeRates = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.75,
    'JPY': 110,
    'PLN': 3.95
};

router.get('/', (req, res) => {
    res.json(exchangeRates);
});

module.exports = router;