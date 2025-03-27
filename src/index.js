const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const Client = require('./models/Client');
const Security = require('./models/Security');
const Transaction = require('./models/Transaction');
const SpendingFund = require('./models/SpendingFund');
const TimeWeightedReturnService = require('./services/TimeWeightedReturnService');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize services
const twrService = new TimeWeightedReturnService();

// In-memory storage (replace with database in production)
const clients = new Map();

// Validation middleware
const validateClient = [
    body('name').notEmpty().trim(),
    body('email').isEmail(),
    body('accountNumber').notEmpty().trim()
];

const validateTransaction = [
    body('type').isIn(['BUY', 'SELL', 'DIVIDEND', 'DEPOSIT', 'WITHDRAWAL', 'REBALANCE_UP', 'REBALANCE_DOWN', 'SPENDING_FUND_DEPOSIT', 'SPENDING_FUND_WITHDRAWAL']),
    body('date').isISO8601(),
    body('amount').isNumeric()
];

const validateSpendingFund = [
    body('name').notEmpty().trim(),
    body('lowerLimit').isNumeric(),
    body('upperLimit').isNumeric(),
    body('currentBalance').isNumeric(),
    body('cashAllocation').optional().isFloat({ min: 0, max: 1 }),
    body('maxCashAllocation').optional().isFloat({ min: 0, max: 1 }),
    body('minCashAllocation').optional().isFloat({ min: 0, max: 1 })
];

// Routes
app.post('/api/clients', validateClient, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const client = new Client(req.body);
    clients.set(client.id, client);
    res.status(201).json(client);
});

app.post('/api/clients/:clientId/securities', (req, res) => {
    const client = clients.get(req.params.clientId);
    if (!client) {
        return res.status(404).json({ error: 'Client not found' });
    }

    const security = new Security(req.body);
    client.addSecurity(security);
    res.status(201).json(security);
});

app.post('/api/clients/:clientId/spending-funds', validateSpendingFund, (req, res) => {
    const client = clients.get(req.params.clientId);
    if (!client) {
        return res.status(404).json({ error: 'Client not found' });
    }

    const spendingFund = new SpendingFund(req.body);
    client.addSpendingFund(spendingFund);
    res.status(201).json(spendingFund);
});

app.get('/api/clients/:clientId/spending-funds', (req, res) => {
    const client = clients.get(req.params.clientId);
    if (!client) {
        return res.status(404).json({ error: 'Client not found' });
    }

    const spendingFundsStatus = client.spendingFunds.map(fund => ({
        id: fund.id,
        name: fund.name,
        currentBalance: fund.getBalance(),
        cashAmount: fund.getCashBalance(),
        investedAmount: fund.getInvestedBalance(),
        cashAllocation: fund.cashAllocation,
        maxCashAllocation: fund.maxCashAllocation,
        minCashAllocation: fund.minCashAllocation,
        lowerLimit: fund.lowerLimit,
        upperLimit: fund.upperLimit,
        transactions: fund.transactions
    }));

    res.json(spendingFundsStatus);
});

app.post('/api/clients/:clientId/transactions', validateTransaction, (req, res) => {
    const client = clients.get(req.params.clientId);
    if (!client) {
        return res.status(404).json({ error: 'Client not found' });
    }

    const { type, date, securityId, spendingFundId, quantity, price, amount } = req.body;
    let transaction;

    try {
        switch (type) {
            case 'BUY':
                transaction = Transaction.createBuyTransaction(
                    Date.now().toString(),
                    new Date(date),
                    securityId,
                    quantity,
                    price
                );
                break;
            case 'SELL':
                transaction = Transaction.createSellTransaction(
                    Date.now().toString(),
                    new Date(date),
                    securityId,
                    quantity,
                    price
                );
                break;
            case 'DIVIDEND':
                transaction = Transaction.createDividendTransaction(
                    Date.now().toString(),
                    new Date(date),
                    securityId,
                    amount
                );
                break;
            case 'DEPOSIT':
                transaction = Transaction.createDepositTransaction(
                    Date.now().toString(),
                    new Date(date),
                    amount
                );
                break;
            case 'WITHDRAWAL':
                transaction = Transaction.createWithdrawalTransaction(
                    Date.now().toString(),
                    new Date(date),
                    amount
                );
                break;
            case 'SPENDING_FUND_DEPOSIT':
                transaction = Transaction.createSpendingFundDepositTransaction(
                    Date.now().toString(),
                    new Date(date),
                    spendingFundId,
                    amount
                );
                // Update the spending fund
                const fundForDeposit = client.spendingFunds.find(f => f.id === spendingFundId);
                if (fundForDeposit) {
                    fundForDeposit.deposit(amount);
                }
                break;
            case 'SPENDING_FUND_WITHDRAWAL':
                transaction = Transaction.createSpendingFundWithdrawalTransaction(
                    Date.now().toString(),
                    new Date(date),
                    spendingFundId,
                    amount
                );
                // Update the spending fund
                const fundForWithdrawal = client.spendingFunds.find(f => f.id === spendingFundId);
                if (fundForWithdrawal) {
                    fundForWithdrawal.withdraw(amount);
                }
                break;
        }

        client.addTransaction(transaction);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/clients/:clientId/performance', (req, res) => {
    const client = clients.get(req.params.clientId);
    if (!client) {
        return res.status(404).json({ error: 'Client not found' });
    }

    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
    }

    try {
        const twr = twrService.calculateTimeWeightedReturn(client, new Date(startDate), new Date(endDate));
        const annualizedReturn = twrService.calculateAnnualizedReturn(twr, new Date(startDate), new Date(endDate));

        res.json({
            timeWeightedReturn: twr,
            annualizedReturn: annualizedReturn
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 