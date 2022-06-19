import React from 'react';
import { useState, useContext, useEffect } from 'react';
import './Modal.css';
import portfolioContext from './portfolioContext';

function Modal({ setOpenModal }) {

    const [stockSymbol, setStockSymbol] = useState('')
    const [stockQuantity, setStockQuantity] = useState('')
    const { onAdd } = useContext(portfolioContext);
    const { error } = useContext(portfolioContext);
    const [ errorCode, setErrorCode ] = useState(error.error)

    const MESSAGES = {
        invalidSymbol: 'Entered Symbol is invalid, Please try again'
      };

    useEffect(() => {
        if (error) {
            setErrorCode(error.error)
            setStockSymbol('')
            setStockQuantity('')
        }
    }, [error])  

    return (
        <div className="modal-background">
            <div className="modal-container">
                <button className="title-close"
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    X
                </button>
                <div className="title">
                    <h1>Enter symbol of the stock you want to add </h1>
                </div>
                <div className="body">
                    <input 
                        placeholder='Enter stock symbol' 
                        value={stockSymbol} 
                        onChange={(e) => {
                            setErrorCode(null)
                            setStockSymbol(e.target.value)
                        }}
                    ></input>
                    {" "}
                    <input 
                        placeholder='Enter stock quantity' 
                        value={stockQuantity} 
                        onChange={(e) => {
                            setErrorCode(null)
                            setStockQuantity(e.target.value)
                        }}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    ></input>
                    {error && 
                    <div className="body-error">
                        {MESSAGES[errorCode]}
                    </div>
                }
                </div> 
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancel-btn"
                    >
                        Cancel
                    </button>
                    <button
                        className={(stockQuantity && stockSymbol) ? 'add-button' : 'add-button-disabled'}
                        onClick={() => {
                            onAdd(stockSymbol, stockQuantity)
                        }}
                        disabled = {!stockQuantity || !stockSymbol}
                    >Add</button>
                </div>
            </div>
        </div>
    )
}

export default Modal