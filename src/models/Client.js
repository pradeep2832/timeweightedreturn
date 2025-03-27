class Client {
    constructor(data) {
        this.id = String(Date.now());
        this.name = data.name;
        this.email = data.email;
        this.accountNumber = data.accountNumber;
        this.portfolioGoals = [];
        this.transactions = [];
        this.securities = [];
        this.spendingFunds = [];
    }

    addPortfolioGoal(goal) {
        this.portfolioGoals.push(goal);
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    addSecurity(security) {
        this.securities.push(security);
    }

    addSpendingFund(spendingFund) {
        this.spendingFunds.push(spendingFund);
    }

    getPortfolioValue(date) {
        let totalValue = this.getCashBalance(date);
        
        // Add securities value
        for (const security of this.securities) {
            const holdings = this.getSecurityHoldings(security.id, date);
            const valuation = security.getValuation(date);
            if (valuation) {
                totalValue += holdings * valuation.price;
            }
        }
        
        // Add spending funds value
        for (const fund of this.spendingFunds) {
            totalValue += fund.getBalance(date);
        }
        
        return totalValue;
    }

    getTransactionsInPeriod(startDate, endDate) {
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }

    getSecurityHoldings(securityId, date) {
        let holdings = 0;
        const transactions = this.getTransactionsInPeriod(new Date(0), date);
        
        for (const transaction of transactions) {
            if (transaction.securityId === securityId) {
                switch (transaction.type) {
                    case 'BUY':
                        holdings += transaction.quantity;
                        break;
                    case 'SELL':
                        holdings -= transaction.quantity;
                        break;
                }
            }
        }
        return holdings;
    }

    getCashBalance(date) {
        let balance = 0;
        const transactions = this.getTransactionsInPeriod(new Date(0), date);
        
        for (const transaction of transactions) {
            switch (transaction.type) {
                case 'DEPOSIT':
                    balance += transaction.amount;
                    break;
                case 'WITHDRAWAL':
                    balance -= transaction.amount;
                    break;
                case 'BUY':
                    balance -= transaction.amount;
                    break;
                case 'SELL':
                    balance += transaction.amount;
                    break;
                case 'DIVIDEND':
                    balance += transaction.amount;
                    break;
                case 'SPENDING_FUND_DEPOSIT':
                    balance -= transaction.amount;
                    break;
                case 'SPENDING_FUND_WITHDRAWAL':
                    balance += transaction.amount;
                    break;
            }
        }
        return balance;
    }

    getSpendingFundsStatus() {
        return this.spendingFunds.map(fund => ({
            id: fund.id,
            name: fund.name,
            currentBalance: fund.getBalance(),
            lowerLimit: fund.lowerLimit,
            upperLimit: fund.upperLimit,
            needsRebalancing: fund.rebalance() !== null
        }));
    }

    rebalanceSpendingFunds() {
        const rebalancingTransactions = [];
        
        for (const fund of this.spendingFunds) {
            const rebalance = fund.rebalance();
            if (rebalance) {
                const transaction = rebalance.type === 'REBALANCE_UP' 
                    ? Transaction.createRebalanceUpTransaction(
                        Date.now().toString(),
                        new Date(),
                        fund.id,
                        rebalance.amount
                    )
                    : Transaction.createRebalanceDownTransaction(
                        Date.now().toString(),
                        new Date(),
                        fund.id,
                        rebalance.amount
                    );
                
                this.addTransaction(transaction);
                fund.addTransaction(transaction);
                rebalancingTransactions.push(transaction);
            }
        }

        return rebalancingTransactions;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            accountNumber: this.accountNumber,
            portfolioGoals: this.portfolioGoals,
            transactions: this.transactions,
            securities: this.securities,
            spendingFunds: this.spendingFunds
        };
    }
}

module.exports = Client; 