class SpendingFund {
    constructor(data) {
        this.id = data.name || String(Date.now());
        this.name = data.name;
        this.lowerLimit = data.lowerLimit;
        this.upperLimit = data.upperLimit;
        this.currentBalance = data.currentBalance || 0;
        this.cashAllocation = data.cashAllocation || 0.20; // Default 20% cash allocation
        this.maxCashAllocation = data.maxCashAllocation || 0.30; // Default max 30% cash
        this.minCashAllocation = data.minCashAllocation || 0.10; // Default min 10% cash
        this.transactions = [];
        this.investedAmount = data.currentBalance * (1 - this.cashAllocation);
        this.cashAmount = data.currentBalance * this.cashAllocation;
    }

    deposit(amount) {
        this.currentBalance += amount;
        // Maintain target cash allocation
        this.cashAmount += amount * this.cashAllocation;
        this.investedAmount += amount * (1 - this.cashAllocation);
        this.transactions.push({
            type: 'DEPOSIT',
            amount: amount,
            date: new Date(),
            cashAllocation: this.cashAmount,
            investedAllocation: this.investedAmount
        });
    }

    withdraw(amount) {
        if (amount > this.currentBalance) {
            throw new Error('Insufficient funds');
        }
        this.currentBalance -= amount;
        // Maintain target allocation during withdrawal
        this.cashAmount -= amount * this.cashAllocation;
        this.investedAmount -= amount * (1 - this.cashAllocation);
        this.transactions.push({
            type: 'WITHDRAWAL',
            amount: -amount,
            date: new Date(),
            cashAllocation: this.cashAmount,
            investedAllocation: this.investedAmount
        });
    }

    rebalance() {
        const currentCashRatio = this.cashAmount / this.currentBalance;
        let rebalanceAmount = 0;

        if (currentCashRatio > this.maxCashAllocation) {
            // Too much cash, invest the excess
            const targetCash = this.currentBalance * this.cashAllocation;
            rebalanceAmount = this.cashAmount - targetCash;
            this.cashAmount = targetCash;
            this.investedAmount += rebalanceAmount;
            this.transactions.push({
                type: 'REBALANCE_DOWN',
                amount: -rebalanceAmount,
                date: new Date(),
                cashAllocation: this.cashAmount,
                investedAllocation: this.investedAmount
            });
        } else if (currentCashRatio < this.minCashAllocation) {
            // Too little cash, sell investments
            const targetCash = this.currentBalance * this.cashAllocation;
            rebalanceAmount = targetCash - this.cashAmount;
            this.cashAmount = targetCash;
            this.investedAmount -= rebalanceAmount;
            this.transactions.push({
                type: 'REBALANCE_UP',
                amount: rebalanceAmount,
                date: new Date(),
                cashAllocation: this.cashAmount,
                investedAllocation: this.investedAmount
            });
        }
        return rebalanceAmount;
    }

    getBalance(date) {
        return this.currentBalance;
    }

    getCashBalance() {
        return this.cashAmount;
    }

    getInvestedBalance() {
        return this.investedAmount;
    }

    getCashAllocationRatio() {
        return this.cashAmount / this.currentBalance;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            lowerLimit: this.lowerLimit,
            upperLimit: this.upperLimit,
            currentBalance: this.currentBalance,
            cashAllocation: this.cashAllocation,
            maxCashAllocation: this.maxCashAllocation,
            minCashAllocation: this.minCashAllocation,
            cashAmount: this.cashAmount,
            investedAmount: this.investedAmount,
            transactions: this.transactions
        };
    }
}

module.exports = SpendingFund; 