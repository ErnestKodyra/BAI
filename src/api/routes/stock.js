import express from 'express';
const router = express.Router();

let stocks = [
    // trzeba ustalic ile maksymalnie prices przechowujemy na potrzeby robienia z tego wykresu itp
    { symbol: 'AAPL', prices: [
        { date: '2021-01-01 19:27:00', open: 92.86, high: 93.05, low: 91.20, close: 91.55 },
    ]},
    { symbol: 'TSL', prices: [
        { date: '2021-01-01 19:27:00', open: 92.86, high: 93.05, low: 91.20, close: 91.55 }
    ]}
];

let tickCounter = 0;
let trend = 'stable';

setInterval(() => {
    stocks.forEach(stock => {
        const lastPrice = stock.prices[stock.prices.length - 1];
        console.log(lastPrice);
        const newPrice = generateNewPrice(lastPrice);
        stock.prices.push(newPrice);
        if (stock.prices.length > 500) {
            stock.prices.shift();
        }
        tickCounter++;
        console.log(trend)
    });
}, 5000);

function generateNewPrice(lastPrice) {
    const trends = ['up', 'down', 'stable', 'sideways', 'volatile'];
    let newPrice;

    if (tickCounter % 20 === 0) {
        trend = trends[Math.floor(Math.random() * trends.length)];
    }
    switch (trend) {
        case 'up':
            newPrice = {
            date: new Date(),
            open: parseFloat((lastPrice.close).toFixed(2)),
            high: parseFloat((lastPrice.close + Math.random() * 2).toFixed(2)),
            low: parseFloat((lastPrice.close - Math.random() * 2).toFixed(2)),
            close: parseFloat((lastPrice.close + Math.random() * 2).toFixed(2))
            };
            break;
        case 'down':
            newPrice = {
            date: new Date(),
            open: parseFloat((lastPrice.close).toFixed(2)),
            high: parseFloat((lastPrice.close + Math.random() * 2).toFixed(2)),
            low: parseFloat((lastPrice.close - Math.random() * 2).toFixed(2)),
            close: parseFloat((lastPrice.close - Math.random() * 2).toFixed(2))
            };
            break;
        case 'stable':
            newPrice = {
            date: new Date(),
            open: parseFloat((lastPrice.close).toFixed(2)),
            high: parseFloat((lastPrice.close + Math.random() * 0.5).toFixed(2)),
            low: parseFloat((lastPrice.close - Math.random() * 0.5).toFixed(2)),
            close: parseFloat((lastPrice.close).toFixed(2))
            };
            break;
        case 'sideways':
            newPrice = {
            date: new Date(),
            open: parseFloat((lastPrice.close).toFixed(2)),
            high: parseFloat((lastPrice.close + Math.random() * 0.5).toFixed(2)),
            low: parseFloat((lastPrice.close - Math.random() * 0.5).toFixed(2)),
            close: parseFloat((lastPrice.close + Math.random() * 0.5 - Math.random() * 0.5).toFixed(2))
            };
            break;
        case 'volatile':
            newPrice = {
            date: new Date(),
            open: parseFloat((lastPrice.close).toFixed(2)),
            high: parseFloat((lastPrice.close + Math.random() * 5).toFixed(2)),
            low: parseFloat((lastPrice.close - Math.random() * 5).toFixed(2)),
            close: parseFloat((lastPrice.close + Math.random() * 5 - Math.random() * 5).toFixed(2))
            };
            break;
    }
    return newPrice;
}
    
router.get('/:symbol', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const { symbol } = req.params;
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
        res.json(stock.prices);
    } else {
        res.status(404).json({ message: 'Stock not found' });
    }
});

export default router;
