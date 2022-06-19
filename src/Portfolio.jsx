import React, { useState, useEffect } from "react";
import PortfolioAddForm from "./PortfolioAddForm";
import PortfolioList from "./PortfolioList";
import './Portfolio.css';
import PortfolioItemDetail from "./PortfolioItemDetail";

function Portfolio({portfolio, selectedStock}) {

    const [portfolioValue, setPortfolioValue] = useState(0)

    useEffect(() => {
        let totalValue = 0.0;
        for (const key in portfolio) {
            totalValue += parseFloat(portfolio[key].totalValue)
        }
        setPortfolioValue(totalValue)
    }, [portfolio])
    
    return (
        <div className="portfolio">
            <div className='portfolio-top'>
                <div className='portfolio-total'>
                    <span className='portfolio-total-value'>${parseFloat(portfolioValue).toFixed(2)}</span>
                </div>
                <div className='portfolio-add'>
                    <PortfolioAddForm/>
                </div>
            </div>
            {Object.keys(portfolio).length > 0 && (
                <div className="portfolio-bottom">
                    <div className="portfolio-list">
                        <PortfolioList portfolio={portfolio} selectedStock={selectedStock}/>
                    </div>
                    <div className="portfolio-detail" >
                        <PortfolioItemDetail stock={selectedStock}/>
                    </div>
                </div>
            )}
            {Object.keys(portfolio).length === 0 && (
                <div className="portflio-not-created">
                    Portfolio not created,<><br /></>please click "Add Stock" button to create Portfolio
                </div>
            )}
        </div>
    )
}

export default Portfolio;