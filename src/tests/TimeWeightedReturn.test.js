const Client = require('../models/Client');
const Security = require('../models/Security');
const Transaction = require('../models/Transaction');
const TimeWeightedReturnService = require('../services/TimeWeightedReturnService');

describe('Time-Weighted Return Calculation', () => {
    let client;
    let security;
    let twrService;

    beforeEach(() => {
        // Create a new client
        client = new Client('1', 'John Doe', 'john@example.com', 'ACC123');
        
        // Create a security
        security = new Security('1', 'AAPL', 'Apple Inc.', 'STOCK', 100, 10);
        client.addSecurity(security);

        // Initialize TWR service
        twrService = new TimeWeightedReturnService();
    });

    test('should calculate TWR for a simple period with no transactions', () => {
        const startDate = new Date('2023-01-01');
        const endDate = new Date('2023-12-31');

        // Add valuation for end date
        security.addValuation(endDate, 110);

        const twr = twrService.calculateTimeWeightedReturn(client, startDate, endDate);
        expect(twr).toBeCloseTo(0.10, 2); // 10% return
    });

    test('should calculate TWR with a deposit transaction', () => {
        const startDate = new Date('2023-01-01');
        const depositDate = new Date('2023-06-30');
        const endDate = new Date('2023-12-31');

        // Add valuations
        security.addValuation(depositDate, 105);
        security.addValuation(endDate, 110);

        // Add deposit transaction
        const deposit = Transaction.createDepositTransaction(
            '1',
            depositDate,
            1000
        );
        client.addTransaction(deposit);

        const twr = twrService.calculateTimeWeightedReturn(client, startDate, endDate);
        expect(twr).toBeCloseTo(0.10, 2); // Should still be 10% as TWR is not affected by cash flows
    });

    test('should calculate TWR with multiple transactions', () => {
        const startDate = new Date('2023-01-01');
        const buyDate = new Date('2023-03-15');
        const sellDate = new Date('2023-06-30');
        const endDate = new Date('2023-12-31');

        // Add valuations
        security.addValuation(buyDate, 105);
        security.addValuation(sellDate, 110);
        security.addValuation(endDate, 115);

        // Add buy transaction
        const buy = Transaction.createBuyTransaction(
            '1',
            buyDate,
            security.id,
            5,
            105
        );
        client.addTransaction(buy);

        // Add sell transaction
        const sell = Transaction.createSellTransaction(
            '2',
            sellDate,
            security.id,
            3,
            110
        );
        client.addTransaction(sell);

        const twr = twrService.calculateTimeWeightedReturn(client, startDate, endDate);
        expect(twr).toBeCloseTo(0.15, 2); // 15% return
    });

    test('should calculate annualized return', () => {
        const startDate = new Date('2023-01-01');
        const endDate = new Date('2023-12-31');
        const twr = 0.15; // 15% return over one year

        const annualizedReturn = twrService.calculateAnnualizedReturn(twr, startDate, endDate);
        expect(annualizedReturn).toBeCloseTo(0.15, 2); // Should be same as TWR for one year
    });
}); 