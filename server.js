const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

const portfolioManager = require('./portfolio');

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

const fetch = require('node-fetch');

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  const regex = /^[a-z0-9]+$/i;
  const found = username.match(regex);
  if(!username) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if(username.toLowerCase() === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  if (!found) {
    res.status(401).json({ error: 'auth-invalid' });
    return;
}
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.addUserData(username, portfolioManager.createPortfolio());
  }
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getPortfolio());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    sessions.deleteSession(sid);
  }
  res.json({ username });
});

app.get('/api/portfolio', (req, res) => {

  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!username || !sid){
    res.status(401).json({error: 'auth-missing'});
    return;
  }

  const portfolio = users.getUserData(username);
  res.json(portfolio.getPortfolio());  

});

app.post('/api/stock', (req, res) => {
  
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!username || !sid){
    res.status(401).json({error: 'auth-missing'});
    return;
  }
  const stockSymbol = req.body.symbol;
  if(!stockSymbol){
    res.status(400).json({error: 'required-symbol'});
    return;
  }
  const stockQuantity = req.body.quantity;
  if(!stockQuantity){
    res.status(400).json({error: 'required-quantity'});
    return;
  }

  if(stockQuantity < 1){
    res.status(400).json({error: 'invalid-quantity'});
    return;
  }
  const portfolio = users.getUserData(username);
  const url = `https://financialmodelingprep.com/api/v3/quote/${stockSymbol.toUpperCase()}?apikey=da709399e236d218a9127911dabc918d`;
  fetch(url)
    .then(_res => _res.json())
    .then(data => {
      
      if (data.length > 0) {
        const stockData = data[0];
        res.json(portfolio.addStock({...stockData, quantity: stockQuantity}));
        return;
      }
      res.status(400).json({error: 'invalidSymbol'});
    })
    .catch(err => {
      res.status(400).json({error: err});
    });
})

app.patch('/api/stock/:symbol', (req, res) => {
  
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { symbol } = req.params;
  const { quantity } = req.body;
  const portfolio = users.getUserData(username);
  if(!portfolio.contains(symbol)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${symbol}` });
    return;
  }
  portfolio.updateStock(symbol, quantity);
  res.json(portfolio.getStock(symbol));
});

app.delete('/api/stock/:symbol', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { symbol } = req.params;
  const portfolio = users.getUserData(username);
  
  const exists = portfolio.contains(symbol);
  if(exists) {
    portfolio.deleteStock(symbol);
  }
  res.json({ message: exists ? `stock ${symbol} deleted` : `stock ${symbol} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));