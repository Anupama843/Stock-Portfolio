import React from 'react'
import PortfolioItem from './PortfolioItem';

function PortfolioList({portfolio, selectedStock}) {
  return (
    <div>
        <ul className='portfolio-ul'>
            {
                Object.values(portfolio).map(stock => (
                    <PortfolioItem
                        key={stock.symbol}
                        stock={stock}
                        isSelected = {(stock.symbol === selectedStock.symbol)}
                    />
                ))
            }
        </ul>
    </div>
  )
}

export default PortfolioList