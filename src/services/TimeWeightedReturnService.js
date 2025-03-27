const moment = require('moment');
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/calculations.log' })
    ]
});

class TimeWeightedReturnService {
    constructor() {
        this.logger = logger;
    }

    calculateTimeWeightedReturn(client, startDate, endDate) {
        this.logger.info('Starting Time-Weighted Return calculation', {
            clientId: client.id,
            startDate: startDate,
            endDate: endDate
        });

        // Get all transactions in the period
        const transactions = client.getTransactionsInPeriod(startDate, endDate);
        
        // Sort transactions by date
        transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Initialize variables
        let twr = 1;
        let currentPeriodStart = startDate;
        let currentPeriodValue = this.getPortfolioValue(client, startDate);

        this.logger.info('Initial portfolio value', {
            value: currentPeriodValue,
            date: startDate
        });

        // Process each transaction
        for (const transaction of transactions) {
            const transactionDate = new Date(transaction.date);
            
            // Calculate portfolio value right before the cash flow
            const preFlowValue = this.getPortfolioValue(client, transactionDate);
            
            // Calculate sub-period return (before cash flow)
            const subPeriodReturn = (preFlowValue - currentPeriodValue) / currentPeriodValue;
            
            this.logger.info('Sub-period calculation', {
                periodStart: currentPeriodStart,
                periodEnd: transactionDate,
                startValue: currentPeriodValue,
                endValue: preFlowValue,
                upcomingCashFlow: transaction.getCashFlow(),
                subPeriodReturn: subPeriodReturn
            });

            // Link returns geometrically
            twr *= (1 + subPeriodReturn);

            // Set up next period - starting value is after cash flow
            currentPeriodStart = transactionDate;
            currentPeriodValue = preFlowValue + transaction.getCashFlow();
        }

        // Calculate final period if needed
        if (currentPeriodStart < endDate) {
            const finalValue = this.getPortfolioValue(client, endDate);
            const finalSubPeriodReturn = (finalValue - currentPeriodValue) / currentPeriodValue;
            
            this.logger.info('Final sub-period calculation', {
                periodStart: currentPeriodStart,
                periodEnd: endDate,
                startValue: currentPeriodValue,
                endValue: finalValue,
                subPeriodReturn: finalSubPeriodReturn
            });

            twr *= (1 + finalSubPeriodReturn);
        }

        const finalTWR = twr - 1;
        
        this.logger.info('Time-Weighted Return calculation completed', {
            finalTWR: finalTWR,
            startDate: startDate,
            endDate: endDate
        });

        return finalTWR;
    }

    calculateAnnualizedReturn(twr, startDate, endDate) {
        const years = moment(endDate).diff(moment(startDate), 'years', true);
        return Math.pow(1 + twr, 1 / years) - 1;
    }

    getPortfolioValue(client, date) {
        let totalValue = 0;
        
        // Add cash balance
        totalValue += client.getCashBalance(date);
        
        // Add securities value
        for (const security of client.securities) {
            const valuation = this.getSecurityValuation(security, date);
            if (valuation) {
                const holdings = client.getSecurityHoldings(security.id, date);
                totalValue += holdings * valuation.price;
            }
        }
        
        // Add spending funds
        for (const fund of client.spendingFunds) {
            totalValue += fund.getBalance(date);
        }
        
        return totalValue;
    }

    getSecurityValuation(security, date) {
        // Find the closest valuation date that's not after the requested date
        return security.dailyValuations
            .filter(v => moment(v.date).isSameOrBefore(date))
            .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf())[0];
    }

    calculateBenchmarkReturn(security, startDate, endDate) {
        const startValuation = this.getSecurityValuation(security, startDate);
        const endValuation = this.getSecurityValuation(security, endDate);
        
        if (!startValuation || !endValuation) {
            return 0;
        }
        
        return (endValuation.benchmarkPrice - startValuation.benchmarkPrice) / startValuation.benchmarkPrice;
    }
}

module.exports = TimeWeightedReturnService; 