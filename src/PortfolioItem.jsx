import React, { useContext } from 'react';
import './PortfolioItem.css';
import portfolioContext from './portfolioContext';

function PortfolioItem({stock, isSelected}){
    
    const { onUpdate, onDelete } = useContext(portfolioContext);
    const { didClickPortfolioItemDetail } = useContext(portfolioContext);
    const className = isSelected ? 'portfolio_item item_selected' : 'portfolio_item';

    return(
        <li className={className} onClick={() => didClickPortfolioItemDetail(stock.symbol) }>
            <div className='portfolio_item_left'>
                <span className="stock_symbol">
                    {stock.symbol}
                </span>
                <br />
                <span className="stock_name">
                    {stock.name}
                </span>
                <br />
                <span className={stock.isPositive ? 'stock_price positive' : 'stock_price negative'}>
                    ${stock.price}
                </span>
            </div>
            <dir className='portfolio_item_right'>
                <div className='portfolio_item_right_stock'>
                    <span className="stock_quantity">
                        <button
                            className="stock_quantity_button decrease"
                            onClick={ () => {onUpdate(stock.symbol, (stock.quantity-1)) }
                            }
                            disabled={stock.quantity <= 1}
                        > − </button>
                        {" " + stock.quantity + " "}
                        <button
                            className="stock_quantity_button increase"
                            onClick={() => onUpdate(stock.symbol, parseInt(stock.quantity)+1)}
                        > + </button>
                    </span>
                    <br />
                    <span>
                        {"x "}
                        <span className='stock_quantity_price'>
                            ${stock.price}
                        </span>
                    </span>
                    <span>{"= "}
                        <span className="stock_total_price">
                            ${Number(stock.totalValue).toFixed(2)} 
                        </span>
                    </span>
                </div>
                <button
                    type="button"
                    className='portfolio_item_right_delete'
                    onClick={ () => onDelete(stock.symbol) }
                >
                    ✕
                </button>
            </dir>
        </li>
    )

}

export default PortfolioItem