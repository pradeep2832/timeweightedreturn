class Transaction {
    constructor(id, date, type, securityId, quantity, price, amount, spendingFundId = null) {
        this.id = id;
        this.date = date;
        this.type = type; // 'BUY', 'SELL', 'DIVIDEND', 'DEPOSIT', 'WITHDRAWAL', 'REBALANCE_UP', 'REBALANCE_DOWN', 'SPENDING_FUND_DEPOSIT', 'SPENDING_FUND_WITHDRAWAL'
        this.securityId = securityId;
        this.quantity = quantity;
        this.price = price;
        this.amount = amount;
        this.spendingFundId = spendingFundId;
    }

    static createBuyTransaction(id, date, securityId, quantity, price) {
        return new Transaction(id, date, 'BUY', securityId, quantity, price, quantity * price);
    }

    static createSellTransaction(id, date, securityId, quantity, price) {
        return new Transaction(id, date, 'SELL', securityId, quantity, price, quantity * price);
    }

    static createDividendTransaction(id, date, securityId, amount) {
        return new Transaction(id, date, 'DIVIDEND', securityId, 0, 0, amount);
    }

    static createDepositTransaction(id, date, amount) {
        return new Transaction(id, date, 'DEPOSIT', null, 0, 0, amount);
    }

    static createWithdrawalTransaction(id, date, amount) {
        return new Transaction(id, date, 'WITHDRAWAL', null, 0, 0, -amount);
    }

    static createRebalanceUpTransaction(id, date, spendingFundId, amount) {
        return new Transaction(id, date, 'REBALANCE_UP', null, 0, 0, amount, spendingFundId);
    }

    static createRebalanceDownTransaction(id, date, spendingFundId, amount) {
        return new Transaction(id, date, 'REBALANCE_DOWN', null, 0, 0, -amount, spendingFundId);
    }

    static createSpendingFundDepositTransaction(id, date, spendingFundId, amount) {
        return new Transaction(id, date, 'SPENDING_FUND_DEPOSIT', null, 0, 0, amount, spendingFundId);
    }

    static createSpendingFundWithdrawalTransaction(id, date, spendingFundId, amount) {
        return new Transaction(id, date, 'SPENDING_FUND_WITHDRAWAL', null, 0, 0, -amount, spendingFundId);
    }

    getCashFlow() {
        switch (this.type) {
            case 'BUY':
                return -this.amount;
            case 'SELL':
                return this.amount;
            case 'DIVIDEND':
                return this.amount;
            case 'DEPOSIT':
                return this.amount;
            case 'WITHDRAWAL':
                return this.amount;
            case 'REBALANCE_UP':
                return this.amount;
            case 'REBALANCE_DOWN':
                return this.amount;
            case 'SPENDING_FUND_DEPOSIT':
                return this.amount;
            case 'SPENDING_FUND_WITHDRAWAL':
                return this.amount;
            default:
                return 0;
        }
    }

    isSpendingFundTransaction() {
        return this.type.startsWith('SPENDING_FUND_') || this.type.startsWith('REBALANCE_');
    }
}

module.exports = Transaction; 