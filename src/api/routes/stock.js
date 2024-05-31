import express from 'express';
const router = express.Router();

let stocks = [
    { symbol: 'AAPL', prices: [
        { date: Date(), open: 92.86, high: 93.05, low: 91.20, close: 91.55 },
    ]},
    { symbol: 'TSL', prices: [
        { date: Date(), open: 92.86, high: 93.05, low: 91.20, close: 91.55 }
    ]},
    { symbol: 'ASS', prices: [
        { date: Date(), open: 55.56, high: 57.01, low: 54.87, close: 56.33 }
    ]},
    { symbol: 'GOOGL', prices: [
            { date: Date(), open: 1000.00, high: 1005.00, low: 995.00, close: 1000.00 }
        ]},
    { symbol: 'MSFT', prices: [
            { date: Date(), open: 210.00, high: 215.00, low: 205.00, close: 212.00 }
        ]},
    { symbol: 'AMZN', prices: [
            { date: Date(), open: 3100.00, high: 3150.00, low: 3050.00, close: 3120.00 }
        ]},
    { symbol: 'FB', prices: [
            { date: Date(), open: 250.00, high: 255.00, low: 245.00, close: 252.00 }
        ]},
    { symbol: 'TSLA', prices: [
            { date: Date(), open: 600.00, high: 610.00, low: 590.00, close: 605.00 }
        ]},
    { symbol: 'NVDA', prices: [
            { date: Date(), open: 500.00, high: 510.00, low: 490.00, close: 505.00 }
        ]},
    { symbol: 'PYPL', prices: [
            { date: Date(), open: 220.00, high: 225.00, low: 215.00, close: 222.00 }
        ]}
];

router.get('/symbols', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const symbols = stocks.map(stock => stock.symbol);
    res.json(symbols);
});

stocks.forEach(stock => {
    let tickCounter = 0;
    let tickAmount = 15;
    let trend = 'stable';

    setInterval(() => {
            const lastPrice = stock.prices[stock.prices.length - 1];
            const newPrice = generateNewPrice(lastPrice);
            stock.prices.push(newPrice);
            if (stock.prices.length > 500) {
                stock.prices.shift();
            }
            tickCounter++;
        }
    , 1000);

    function generateNewPrice(lastPrice) {
        let newPrice;

        if (tickCounter % 20 === 0) {
            let random = Math.random();
            if (random < 0.32) {
                trend = 'stable';
            } else if (random < 0.50) {
                trend =  'slightly up';
            } else if (random < 0.68) {
                trend =  'slightly down';
            } else if (random < 0.80) {
                trend =  'up';
            } else if (random < 0.92) {
                trend =  'down';
            } else trend =  'volatile';
            tickAmount = Math.round(Math.random() * 50);
        }

        switch (trend) {
            case 'stable':
                let deviation = Math.random() < 0.5 ? (Math.random() * 0.2) : -(Math.random() * 0.2);
                newPrice = {
                date: new Date(),
                open: parseFloat((lastPrice.close).toFixed(2)),
                high: parseFloat((lastPrice.close + Math.random() * 0.5).toFixed(2)),
                low: parseFloat((lastPrice.close - Math.random() * 0.5).toFixed(2)),
                close: parseFloat((lastPrice.close + deviation).toFixed(2))
                };
                break;
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
            case 'slightly up':
                newPrice = {
                date: new Date(),
                open: parseFloat((lastPrice.close).toFixed(2)),
                high: parseFloat((lastPrice.close + Math.random() * 1.25).toFixed(2)),
                low: parseFloat((lastPrice.close - Math.random() * 1.25).toFixed(2)),
                close: parseFloat((lastPrice.close + Math.random() * 1.25).toFixed(2))
                };
                break;
            case 'slightly down':
                newPrice = {
                date: new Date(),
                open: parseFloat((lastPrice.close).toFixed(2)),
                high: parseFloat((lastPrice.close + Math.random() * 1.25).toFixed(2)),
                low: parseFloat((lastPrice.close - Math.random() * 1.25).toFixed(2)),
                close: parseFloat((lastPrice.close - Math.random() * 1.25).toFixed(2))
                };
                break;
            case 'volatile':
                newPrice = {
                date: new Date(),
                open: parseFloat((lastPrice.close).toFixed(2)),
                high: parseFloat((lastPrice.close + Math.random() * 6).toFixed(2)),
                low: parseFloat((lastPrice.close - Math.random() * 6).toFixed(2)),
                close: parseFloat((lastPrice.close + Math.random() * 6 - Math.random() * 6).toFixed(2))
                };
                break;
        }

        if (newPrice.close < 1) {
            newPrice.close = 1;
        }

        return newPrice;
    }
});

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
