const express = require('express');
const router = express.Router();

let stocks = [
    // trzeba ustalic ile maksymalnie prices przechowujemy na potrzeby robienia z tego wykresu itp
    { symbol: 'AAPL', prices: [
        { date: '2021-01-01 19:27:00', open: 92.86, high: 93.05, low: 91.20, close: 91.55 },
        { date: '2021-01-01 19:27:15', open: 92.00, high: 93.09, low: 92.00, close: 93.05 },
        { date: '2021-01-01 19:27:30', open: 92.50, high: 93.20, low: 92.30, close: 92.80 },
        { date: '2021-01-01 19:27:45', open: 92.90, high: 93.50, low: 92.70, close: 93.30 }
    ]},
    { symbol: 'TSL', prices: [
        { date: '2021-01-01 19:27:00', open: 92.86, high: 93.05, low: 91.20, close: 91.55 },
        { date: '2021-01-01 19:27:15', open: 92.00, high: 93.09, low: 92.00, close: 93.05 },
        { date: '2021-01-01 19:27:30', open: 92.50, high: 93.20, low: 92.30, close: 92.80 },
        { date: '2021-01-01 19:27:45', open: 92.90, high: 93.50, low: 92.70, close: 93.30 }
    ]}
];

// zrobic logike zajmujaca sie generowaniem nowych cen akcji co 15 sekund zgodnie z trendem, po kilkunastu tickach trend sie zmienia

router.get('/:symbol', (req, res) => {
    const { symbol } = req.params;
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
        res.json(stock.prices);
    } else {
        res.status(404).json({ message: 'Stock not found' });
    }
});

module.exports = router;