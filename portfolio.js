function createPortfolio() {
    
    const portfolio = {}
    const stocks = {}
    
    portfolio.getPortfolio = function getPortfolio() {
        return stocks;
    };

    portfolio.addStock = function addStock(stock) {
        let savedStock = stock
        if (stocks[stock.symbol]) {
            savedStock.quantity = parseInt(savedStock.quantity) + parseInt(stocks[stock.symbol].quantity)
        }
        savedStock.isPositive = (stock.change >= 0)
        savedStock.totalValue = parseFloat(parseFloat(stock.price) * savedStock.quantity).toFixed(2)
        
        stocks[stock.symbol] = savedStock
        return savedStock
    };

    portfolio.getStock = function getStock(symbol) {
        return stocks[symbol];
    };

    portfolio.updateStock = function updateStock(symbol, quantity) {
        const stock = stocks[symbol];
        stocks[symbol].quantity = quantity;
        stocks[symbol].totalValue = stock.price * quantity
    };

    portfolio.deleteStock = function deleteStock(symbol) {
        delete stocks[symbol];
    };

    portfolio.contains = function contains(symbol) {
        return !!stocks[symbol];
    };

    return portfolio;
}

module.exports = {
    createPortfolio,
}