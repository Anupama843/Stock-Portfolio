import './App.css';
import React, { useState, useEffect, useReducer } from 'react';
import Login from './Login';
import Header from './Header';
import loginContext from './loginContext';
import portfolioContext from './portfolioContext';
import Portfolio from './Portfolio';

import { 
  fetchAddStock, 
  fetchDeleteStock, 
  fetchLogin,
  fetchLogout, 
  fetchSession, 
  fetchPortfolio, 
  fetchUpdateStock
} from './service';
import { 
  reducer, 
  initialState,
  loginAction,
  logoutAction, 
  errorAction,
  addStockAction,
  updateStockAction,
  deleteStockAction,
} from './reducer';


function App() {

  const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const MESSAGES = {
    networkError: 'Trouble connecting to the network. Please try again',
    default: 'Something went wrong. Please try again',
    "auth-insufficient": 'Invalid Username, Please try again',
    "auth-invalid": 'Invalid username, only alphanumeric characters allowed',
    "required-username": 'Username is required, Please try again',
    "auth-missing": 'Session expired, Please logout and login again',
    invalidSymbol: 'Entered Symbol is invalid, Please try with again'
  };

  useEffect(() => {
    fetchSession()
      .then(session => {
        fetchPortfolio()
          .then(portfolio => dispatch(loginAction(session.username, portfolio)))
          .catch(error => dispatch(errorAction(error)))
      })
  }, [])

  function onLoginSubmit(username) {
    fetchLogin(username)
      .then(portfolio => dispatch(loginAction(username, portfolio)))
      .catch(error => dispatch(errorAction(error)))
  }
  function onLogout() {
    fetchLogout()
      .then(() => dispatch(logoutAction()))
      .catch(error => dispatch(errorAction(error)))
  }

  function onDelete(symbol) {
    fetchDeleteStock(symbol)
      .then(() => dispatch(deleteStockAction(symbol)))
  }

  function onAdd(stockSymbol, stockQuantity) {
    fetchAddStock(stockSymbol, stockQuantity)
    .then(stock => {
      setShowAddPortfolioModal(false)
      dispatch(addStockAction(stock))
    })
    .catch(error => {
      if (error.error === 'invalidSymbol') {
        dispatch(errorAction(error))
      } else {
        setShowAddPortfolioModal(false)
        dispatch(errorAction(error))
      }
    })
  }

  function onUpdate(stockSymbol, stockQuantity) {
    if (stockQuantity === 0) {
      onDelete(stockSymbol)
    } else {
      fetchUpdateStock(stockSymbol, stockQuantity)
        .then(stock => dispatch(updateStockAction(stock)))
        .catch(error => dispatch(errorAction(error)))
    }
  }

  function didClickPortfolioItemDetail(symbol) {
    dispatch(updateStockAction(state.portfolio[symbol]))
  }

  function onAddProfileModalOpen(isOpen) {
    if (!isOpen) {
      dispatch(errorAction(''))
    }
    setShowAddPortfolioModal(isOpen)
  }

  return (
  <div className="app">
    <Header username={state.username} onLogout={onLogout} />
    {!state.isLoggedIn && (
      <loginContext.Provider value={{ onLoginSubmit }}>
        <Login/>
      </loginContext.Provider>
    )}
    {state.error && !showAddPortfolioModal && (
      <div className="error-message">{MESSAGES[state.error.error]}</div>
    )}
    {state.isLoggedIn && (
      <>
        <portfolioContext.Provider value={ {showAddPortfolioModal, onAddProfileModalOpen, onAdd, onUpdate, onDelete, error: state.error, didClickPortfolioItemDetail} }>
          <Portfolio portfolio={state.portfolio} selectedStock={state.selectedStock}/>
        </portfolioContext.Provider>
      </>
    )}
  </div>)
}

export default App;