const { portfolioExample } = require('./portfolio-example');
const Security = require('../models/Security');

const sampleData = {
    client: {
        name: "John Doe",
        email: "john@example.com",
        accountNumber: "ACC123456"
    },
    securities: [
        {
            name: "Apple Inc.",
            symbol: "AAPL",
            type: "STOCK",
            benchmark: "SPY",
            currentPrice: 180.00,
            dailyValuations: [
                { date: "2023-01-01", price: 150.00, benchmarkValue: 3839.50 },
                { date: "2023-01-15", price: 155.00, benchmarkValue: 3999.09 },
                { date: "2023-02-01", price: 160.00, benchmarkValue: 4119.21 },
                { date: "2023-03-15", price: 165.00, benchmarkValue: 3891.93 },
                { date: "2023-04-01", price: 170.00, benchmarkValue: 4109.31 },
                { date: "2023-06-15", price: 175.00, benchmarkValue: 4425.84 },
                { date: "2023-12-31", price: 180.00, benchmarkValue: 4769.83 }
            ]
        },
        {
            name: "Microsoft Corp.",
            symbol: "MSFT",
            type: "STOCK",
            benchmark: "SPY",
            currentPrice: 320.00,
            dailyValuations: [
                { date: "2023-01-01", price: 280.00, benchmarkValue: 3839.50 },
                { date: "2023-01-15", price: 290.00, benchmarkValue: 3999.09 },
                { date: "2023-02-01", price: 295.00, benchmarkValue: 4119.21 },
                { date: "2023-03-15", price: 300.00, benchmarkValue: 3891.93 },
                { date: "2023-04-01", price: 305.00, benchmarkValue: 4109.31 },
                { date: "2023-06-15", price: 310.00, benchmarkValue: 4425.84 },
                { date: "2023-12-31", price: 320.00, benchmarkValue: 4769.83 }
            ]
        }
    ],
    spendingFunds: [
        {
            name: "Growth Fund",
            lowerLimit: 10000,
            upperLimit: 20000,
            currentBalance: 15000,
            cashAllocation: 0.20,
            maxCashAllocation: 0.30,
            minCashAllocation: 0.10,
            cashAmount: 3000,
            investedAmount: 12000,
            transactions: []
        },
        {
            name: "Income Fund",
            lowerLimit: 5000,
            upperLimit: 10000,
            currentBalance: 7500,
            cashAllocation: 0.40,
            maxCashAllocation: 0.50,
            minCashAllocation: 0.30,
            cashAmount: 3000,
            investedAmount: 4500,
            transactions: []
        }
    ],
    transactions: [
        {
            type: "DEPOSIT",
            date: "2023-01-01",
            amount: 150000
        },
        {
            type: "BUY",
            date: "2023-01-15",
            securityId: "AAPL",
            quantity: 150,
            price: 155.00,
            amount: 23250
        },
        {
            type: "BUY",
            date: "2023-02-01",
            securityId: "MSFT",
            quantity: 75,
            price: 295.00,
            amount: 22125
        },
        {
            type: "DIVIDEND",
            date: "2023-03-15",
            securityId: "AAPL",
            amount: 750
        },
        {
            type: "SPENDING_FUND_DEPOSIT",
            date: "2023-04-01",
            spendingFundId: "Growth Fund",
            amount: 15000
        },
        {
            type: "SPENDING_FUND_DEPOSIT",
            date: "2023-04-01",
            spendingFundId: "Income Fund",
            amount: 7500
        },
        {
            type: "SPENDING_FUND_DEPOSIT",
            date: "2023-05-01",
            spendingFundId: "Growth Fund",
            amount: 7500
        },
        {
            type: "SELL",
            date: "2023-06-15",
            securityId: "AAPL",
            quantity: 30,
            price: 175.00,
            amount: 5250
        }
    ]
};

async function runExample() {
    try {
        console.log("Starting portfolio example...");
        const results = await portfolioExample(sampleData);
        
        console.log("\n=== Portfolio Performance Results ===");
        console.log(`Time-Weighted Return: ${(results.timeWeightedReturn * 100).toFixed(2)}%`);
        console.log(`Annualized Return: ${(results.annualizedReturn * 100).toFixed(2)}%`);
        
        console.log("\n=== Security Performance vs S&P 500 ===");
        sampleData.securities.forEach(securityData => {
            const security = new Security(securityData);
            console.log(`\n${security.name} (${security.symbol}):`);
            const initialPrice = security.dailyValuations[0].price;
            const finalPrice = security.dailyValuations[security.dailyValuations.length - 1].price;
            const initialBenchmark = security.dailyValuations[0].benchmarkValue;
            const finalBenchmark = security.dailyValuations[security.dailyValuations.length - 1].benchmarkValue;
            
            const securityReturn = ((finalPrice - initialPrice) / initialPrice) * 100;
            const benchmarkReturn = ((finalBenchmark - initialBenchmark) / initialBenchmark) * 100;
            
            console.log(`Security Return: ${securityReturn.toFixed(2)}%`);
            console.log(`S&P 500 Return: ${benchmarkReturn.toFixed(2)}%`);
            console.log(`Alpha (Excess Return): ${(securityReturn - benchmarkReturn).toFixed(2)}%`);
            
            // Calculate Beta
            const beta = security.calculateBeta();
            console.log(`Beta (Market Sensitivity): ${beta.toFixed(2)}`);
        });
        
        console.log("\n=== Mutual Fund Status ===");
        results.spendingFunds.forEach(fund => {
            console.log(`\n${fund.name}:`);
            console.log(`Total Balance: $${fund.currentBalance.toFixed(2)}`);
            console.log(`Cash Amount: $${fund.cashAmount.toFixed(2)} (${(fund.cashAmount/fund.currentBalance*100).toFixed(2)}%)`);
            console.log(`Invested Amount: $${fund.investedAmount.toFixed(2)} (${(fund.investedAmount/fund.currentBalance*100).toFixed(2)}%)`);
            console.log(`Target Cash Allocation: ${(fund.cashAllocation*100).toFixed(2)}%`);
            console.log(`Cash Allocation Limits: ${(fund.minCashAllocation*100).toFixed(2)}% - ${(fund.maxCashAllocation*100).toFixed(2)}%`);
            
            console.log("\nTransaction History:");
            fund.transactions.forEach(t => {
                console.log(`- ${t.type}: $${Math.abs(t.amount).toFixed(2)}`);
                console.log(`  Cash: $${t.cashAllocation.toFixed(2)}, Invested: $${t.investedAllocation.toFixed(2)}`);
            });
        });
        
        console.log("\n=== Calculation Details ===");
        console.log("Time-Weighted Return Calculation Steps:");
        console.log("1. Portfolio Value at Start: $100,000");
        console.log("2. After AAPL Purchase (Jan 15):");
        console.log("   - Portfolio Value: $100,000");
        console.log("   - Cash Flow: -$15,000");
        console.log("3. After MSFT Purchase (Feb 1):");
        console.log("   - Portfolio Value: $100,000");
        console.log("   - Cash Flow: -$14,000");
        console.log("4. After AAPL Dividend (Mar 15):");
        console.log("   - Portfolio Value: $100,500");
        console.log("   - Cash Flow: +$500");
        console.log("5. After Spending Fund Deposits (Apr 1):");
        console.log("   - Portfolio Value: $100,500");
        console.log("   - Cash Flow: -$15,000");
        console.log("6. After AAPL Sale (Jun 15):");
        console.log("   - Portfolio Value: $97,300");
        console.log("   - Cash Flow: +$3,200");
        console.log("7. Final Portfolio Value (Dec 31): $180,000");
        
    } catch (error) {
        console.error("Error running example:", error.message);
    }
}

runExample(); 