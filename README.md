# Portfolio Performance Calculator

A Node.js application for calculating Time-Weighted Return (TWR) for investment portfolios. This system helps track and analyze portfolio performance over time, taking into account various factors such as client account details, portfolio goals, transactions, and security valuations.

## Features

- Time-Weighted Return calculation
- Portfolio performance tracking
- Transaction history management
- Security valuation tracking
- Goal-based portfolio analysis
- Detailed logging of calculations
- Interactive input adjustment

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-performance-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

## Project Structure

```
portfolio-performance-calculator/
├── src/
│   ├── models/           # Data models
│   ├── services/         # Business logic
│   ├── utils/           # Utility functions
│   └── config/          # Configuration files
├── tests/               # Test files
├── logs/               # Application logs
└── data/               # Sample data and mocks
```

## Usage

1. Start the application using `npm start`
2. Access the application through your web browser
3. Input portfolio details and transactions
4. View calculated Time-Weighted Returns
5. Adjust inputs to see different scenarios

## Time-Weighted Return Calculation

The Time-Weighted Return is calculated using the following formula:
```
TWR = [(1 + HP1) × (1 + HP2) × ... × (1 + HPn)] - 1
```
Where:
- HP = Holding Period Return
- n = Number of periods

Each holding period return is calculated as:
```
HP = (End Value - Beginning Value + Cash Flow) / Beginning Value
```

## Logging

All calculations are logged in the `logs` directory with detailed steps and intermediate values for transparency and debugging.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 