class Security {
    constructor(data) {
        this.id = data.symbol || String(Date.now());
        this.symbol = data.symbol;
        this.name = data.name;
        this.type = data.type;
        this.benchmark = data.benchmark || 'SPY'; // Default to S&P 500 ETF
        this.dailyValuations = data.dailyValuations || [];
        this.currentPrice = data.currentPrice || 0;
    }

    toJSON() {
        return {
            id: this.id,
            symbol: this.symbol,
            name: this.name,
            type: this.type,
            benchmark: this.benchmark,
            currentPrice: this.currentPrice,
            dailyValuations: this.dailyValuations
        };
    }

    getValuation(date) {
        // Find the closest valuation date that's not after the requested date
        return this.dailyValuations
            .filter(v => new Date(v.date) <= new Date(date))
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    }

    getBenchmarkReturn(startDate, endDate) {
        const startValuation = this.getValuation(startDate);
        const endValuation = this.getValuation(endDate);
        
        if (!startValuation || !endValuation) {
            return 0;
        }
        
        // Use the benchmark index values instead of arbitrary benchmark prices
        return (endValuation.benchmarkValue - startValuation.benchmarkValue) / startValuation.benchmarkValue;
    }

    getReturn(startDate, endDate) {
        const startValuation = this.getValuation(startDate);
        const endValuation = this.getValuation(endDate);
        
        if (!startValuation || !endValuation) {
            return 0;
        }
        
        return (endValuation.price - startValuation.price) / startValuation.price;
    }

    // Calculate alpha (excess return over benchmark)
    calculateAlpha(startDate, endDate) {
        const securityReturn = this.getReturn(startDate, endDate);
        const benchmarkReturn = this.getBenchmarkReturn(startDate, endDate);
        return securityReturn - benchmarkReturn;
    }

    // Calculate beta (measure of volatility/systematic risk compared to benchmark)
    calculateBeta() {
        if (!this.dailyValuations || this.dailyValuations.length < 2) return 1.0;

        const returns = [];
        const benchmarkReturns = [];

        for (let i = 1; i < this.dailyValuations.length; i++) {
            const securityReturn = (this.dailyValuations[i].price - this.dailyValuations[i-1].price) / this.dailyValuations[i-1].price;
            const benchReturn = (this.dailyValuations[i].benchmarkValue - this.dailyValuations[i-1].benchmarkValue) / this.dailyValuations[i-1].benchmarkValue;
            returns.push(securityReturn);
            benchmarkReturns.push(benchReturn);
        }

        // Calculate covariance and variance
        const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
        const avgBenchReturn = benchmarkReturns.reduce((a, b) => a + b, 0) / benchmarkReturns.length;

        let covariance = 0;
        let variance = 0;

        for (let i = 0; i < returns.length; i++) {
            covariance += (returns[i] - avgReturn) * (benchmarkReturns[i] - avgBenchReturn);
            variance += Math.pow(benchmarkReturns[i] - avgBenchReturn, 2);
        }

        covariance /= returns.length;
        variance /= returns.length;

        return variance === 0 ? 1.0 : covariance / variance;
    }
}

module.exports = Security; 