import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import ReactJson from 'react-json-view';
import { portfolioExample } from '../../examples/portfolio-example';

const sampleInput = {
    client: {
        name: 'John Doe',
        email: 'john@example.com',
        accountNumber: 'ACC123'
    },
    securities: [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            classification: 'STOCK',
            initialValue: 150,
            quantity: 10
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            classification: 'STOCK',
            initialValue: 280,
            quantity: 5
        },
        {
            symbol: 'AGG',
            name: 'iShares Core U.S. Aggregate Bond ETF',
            classification: 'BOND',
            initialValue: 100,
            quantity: 20
        }
    ],
    spendingFunds: [
        {
            name: 'Emergency Fund',
            lowerLimit: 10000,
            upperLimit: 20000,
            currentBalance: 15000
        },
        {
            name: 'Monthly Expenses',
            lowerLimit: 5000,
            upperLimit: 10000,
            currentBalance: 7500
        }
    ],
    transactions: [
        {
            type: 'DEPOSIT',
            date: '2023-01-01',
            amount: 5000
        },
        {
            type: 'BUY',
            date: '2023-02-15',
            securityId: 'AAPL',
            quantity: 5,
            price: 155
        },
        // ... more transactions
    ]
};

function App() {
    const [input, setInput] = useState(sampleInput);
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const calculatePerformance = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await portfolioExample(input);
            setOutput(result);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Portfolio Performance Calculator
            </Typography>
            <Grid container spacing={3}>
                {/* Input Section */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: '80vh', overflow: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                            Input Configuration
                        </Typography>
                        <ReactJson 
                            src={input} 
                            name={false} 
                            theme="monokai"
                            enableClipboard={false}
                            onEdit={edit => setInput(edit.updated_src)}
                            onAdd={add => setInput(add.updated_src)}
                            onDelete={del => setInput(del.updated_src)}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Button 
                                variant="contained" 
                                onClick={calculatePerformance}
                                disabled={loading}
                            >
                                Calculate Performance
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Output Section */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: '80vh', overflow: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                            Results and Analysis
                        </Typography>
                        {loading && (
                            <Typography>Calculating...</Typography>
                        )}
                        {error && (
                            <Typography color="error">{error}</Typography>
                        )}
                        {output && (
                            <Box>
                                <Typography variant="h6">Portfolio Performance</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <Typography>
                                        Time-Weighted Return: {(output.timeWeightedReturn * 100).toFixed(2)}%
                                    </Typography>
                                    <Typography>
                                        Annualized Return: {(output.annualizedReturn * 100).toFixed(2)}%
                                    </Typography>
                                </Box>

                                <Typography variant="h6">Spending Funds Status</Typography>
                                {output.spendingFunds.map((fund, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1">{fund.name}</Typography>
                                        <Typography>
                                            Current Balance: ${fund.currentBalance.toLocaleString()}
                                        </Typography>
                                        <Typography>
                                            Limits: ${fund.lowerLimit.toLocaleString()} - ${fund.upperLimit.toLocaleString()}
                                        </Typography>
                                        {fund.needsRebalancing && (
                                            <Typography color="warning.main">
                                                Needs Rebalancing
                                            </Typography>
                                        )}
                                    </Box>
                                ))}

                                <Typography variant="h6">Transaction Analysis</Typography>
                                <ReactJson 
                                    src={output.transactions} 
                                    name={false} 
                                    theme="monokai"
                                    collapsed={1}
                                />
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App; 