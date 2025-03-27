const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

async function portfolioExample(input) {
    try {
        // Create a client
        const clientResponse = await axios.post(`${API_BASE_URL}/clients`, input.client);
        const client = clientResponse.data;
        console.log('Created client:', client);

        // Add securities
        for (const security of input.securities) {
            const securityResponse = await axios.post(
                `${API_BASE_URL}/clients/${client.id}/securities`,
                security
            );
            console.log('Added security:', securityResponse.data);
        }

        // Add spending funds
        for (const fund of input.spendingFunds) {
            const fundResponse = await axios.post(
                `${API_BASE_URL}/clients/${client.id}/spending-funds`,
                fund
            );
            console.log('Added spending fund:', fundResponse.data);
        }

        // Add transactions
        for (const transaction of input.transactions) {
            const transactionResponse = await axios.post(
                `${API_BASE_URL}/clients/${client.id}/transactions`,
                transaction
            );
            console.log('Added transaction:', transactionResponse.data);
        }

        // Calculate performance
        const performanceResponse = await axios.get(
            `${API_BASE_URL}/clients/${client.id}/performance`,
            {
                params: {
                    startDate: '2023-01-01',
                    endDate: '2023-12-31'
                }
            }
        );

        // Get spending fund status
        const spendingFundsResponse = await axios.get(
            `${API_BASE_URL}/clients/${client.id}/spending-funds`
        );

        return {
            timeWeightedReturn: performanceResponse.data.timeWeightedReturn,
            annualizedReturn: performanceResponse.data.annualizedReturn,
            spendingFunds: spendingFundsResponse.data,
            transactions: input.transactions.map((t, index) => ({
                ...t,
                id: `T${index + 1}`,
                date: new Date(t.date).toISOString(),
                explanation: getTransactionExplanation(t)
            }))
        };

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        throw error;
    }
}

function getTransactionExplanation(transaction) {
    switch (transaction.type) {
        case 'DEPOSIT':
            return `Initial deposit of $${transaction.amount}`;
        case 'BUY':
            return `Bought ${transaction.quantity} shares of ${transaction.securityId} at $${transaction.price} per share`;
        case 'SELL':
            return `Sold ${transaction.quantity} shares of ${transaction.securityId} at $${transaction.price} per share`;
        case 'DIVIDEND':
            return `Received dividend of $${transaction.amount} from ${transaction.securityId}`;
        case 'SPENDING_FUND_DEPOSIT':
            return `Deposited $${transaction.amount} to ${transaction.spendingFundId}`;
        case 'SPENDING_FUND_WITHDRAWAL':
            return `Withdrew $${Math.abs(transaction.amount)} from ${transaction.spendingFundId}`;
        case 'REBALANCE_UP':
            return `Rebalanced ${transaction.spendingFundId} up by $${transaction.amount}`;
        case 'REBALANCE_DOWN':
            return `Rebalanced ${transaction.spendingFundId} down by $${Math.abs(transaction.amount)}`;
        default:
            return 'Transaction executed';
    }
}

module.exports = {
    portfolioExample
}; 