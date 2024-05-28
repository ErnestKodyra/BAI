import express from 'express';
const router = express.Router();

let portfolios = [
    { userId: 1, items: [{ name: 'Item 1', quantity: 10 }, { name: 'Item 2', quantity: 5 }] },
    { userId: 2, items: [{ name: 'Item 1', quantity: 7 }, { name: 'Item 3', quantity: 3 }] },
];

router.get('/:userId', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const { userId } = req.params;
    const portfolio = portfolios.find(p => p.userId === parseInt(userId));
    if (portfolio) {
        res.json(portfolio);
    } else {
        res.status(404).json({ message: 'Portfolio not found' });
    }
});

router.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const { items } = req.body;
    const portfolio = portfolios.find(p => p.userId === parseInt(userId));
    if (portfolio) {
        portfolio.items = items;
        res.json(portfolio);
    } else {
        res.status(404).json({ message: 'Portfolio not found' });
    }
});

export default router;
