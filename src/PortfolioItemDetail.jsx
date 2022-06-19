
import React from 'react'
import './PortfolioItemDetail.css'
import {convertToInternationalCurrencySystem} from './converter.js'

function PortfolioItemDetail({stock}) {
  if (!stock) {
    return (
      <span>Please select stock from list</span>
    )
  }
  const isPositive = (parseFloat(stock.change) >= 0)
  const priceSubValueClassName = isPositive ? 'price-sub-value positive' : 'price-sub-value negative'
  const priceSubValue = `${!isPositive ? '-$' : '$'}${Math.abs(stock.change).toFixed(2)} (${parseFloat(stock.changesPercentage).toFixed(2)}%)`
  
  return (
    <div className='portfolio-item-detail'>
        <h1>{stock.symbol}</h1>
        <h2>{stock.name}</h2>
        <h1>${parseFloat(stock.totalValue).toFixed(2)} 
          <span className='detail-price-quantity'>({stock.price}×{stock.quantity})</span>
        </h1>
        <div className='price'>
          <div className='label'>🏷 Price:</div>
          <div>
            <span className='price-value value'>${stock.price}</span>
            <span className={priceSubValueClassName}>{priceSubValue}</span>
          </div>
        </div>
        <div className='quantity'>
          <div className='label'>🔢 Quantity</div>
          <div className='value'>{stock.quantity} </div>
        </div>
        <div className='day-low'>
          <div className='label'>⬇️ Day Low</div>
          <div className='value'>${parseFloat(stock.dayLow).toFixed(2)}</div>
        </div>
        <div className='day-high'>
          <div className='label'>⬆️ Day High</div>
          <div className='value'>${parseFloat(stock.dayHigh).toFixed(2)}</div>
        </div>
        <div className='volume'>
          <div className='label'>#️⃣ Volume</div>
          <div className='value'>{convertToInternationalCurrencySystem(stock.volume)}</div>
        </div>
        <div className='market-cap'>
          <div className='label'>💰 Market Cap</div>
          <div className='value'>${convertToInternationalCurrencySystem(stock.marketCap)}</div>
        </div>
        <div className='exchange'>
          <div className='label'>📊 Exchange</div>
          <div className='value'>{stock.exchange}</div>
        </div>
    </div>
  )
}

export default PortfolioItemDetail