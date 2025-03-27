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
        // Validate transaction
        if (!transaction || !transaction.type) {
            throw new Error('Invalid transaction');
        }

        // Add transaction to client's transaction history
        this.transactions.push(transaction);

        // Handle transaction based on type
        switch (transaction.type) {
            case 'DEPOSIT':
                this.handleDeposit(transaction);
                break;
            case 'BUY':
                this.handleBuy(transaction);
                break;
            case 'SELL':
                this.handleSell(transaction);
                break;
            case 'DIVIDEND':
                this.handleDividend(transaction);
                break;
            case 'SPENDING_FUND_DEPOSIT':
                this.handleSpendingFundDeposit(transaction);
                break;
            default:
                throw new Error(`Unsupported transaction type: ${transaction.type}`);
        }

        // Rebalance all spending funds after any transaction
        this.rebalanceSpendingFunds();
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
        // Rebalance each spending fund
        this.spendingFunds.forEach(fund => {
            try {
                fund.rebalance();
            } catch (error) {
                console.error(`Error rebalancing fund ${fund.name}:`, error);
            }
        });
    }

    handleDeposit(transaction) {
        // Handle deposit transaction
        console.log(`Processing deposit of $${transaction.amount}`);
    }

    handleBuy(transaction) {
        // Handle buy transaction
        console.log(`Processing buy of ${transaction.quantity} shares of ${transaction.securityId}`);
    }

    handleSell(transaction) {
        // Handle sell transaction
        console.log(`Processing sell of ${transaction.quantity} shares of ${transaction.securityId}`);
    }

    handleDividend(transaction) {
        // Handle dividend transaction
        console.log(`Processing dividend of $${transaction.amount} from ${transaction.securityId}`);
    }

    handleSpendingFundDeposit(transaction) {
        // Handle spending fund deposit
        const fund = this.spendingFunds.find(f => f.id === transaction.spendingFundId);
        if (fund) {
            fund.deposit(transaction.amount);
            console.log(`Processing spending fund deposit of $${transaction.amount} to ${fund.name}`);
        }
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