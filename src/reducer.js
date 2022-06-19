"Use Strict"

export const initialState = {isLoggedIn: false};

export function loginAction(username, portfolio){
    return {
        type: 'login',
        username,
        portfolio, 
    };
}

export function logoutAction(){
    return{
        type: 'logout'
    };
}

export function errorAction(error) {
    return {
      type: 'error',
      error,
    };
}

export function addStockAction(stock) {
    return {
      type: 'addStock',
      stock,
    };
}

export function updateStockAction(stock) {
    return {
      type: 'updateStock',
      stock,
    };
}

export function deleteStockAction(symbol) {
    return {
      type: 'deleteStock',
      symbol,
    };
}

export function reducer(state, action){
    switch(action.type){
        case 'logout':
            return {
                ...state,
                isLoggedIn: false,
                username: '',
                portfolio: {},
                selectedStock: {},
                error: ''
            };
        case 'login':
            return {
                ...state,
                isLoggedIn: true,
                username: action.username,
                portfolio: action.portfolio,
                selectedStock: action.portfolio[Object.keys(action.portfolio)[0]],
                error: ''
            };
        case 'error':
            return { 
                ...state, 
                error: action.error
            };
        case 'addStock':
            return { 
                ...state, 
                portfolio: {
                    ...state.portfolio,
                    [action.stock.symbol]: action.stock
                },
                selectedStock: action.stock,
                error: '',
            };
        case 'updateStock':
            return {
                ...state,
                portfolio: {
                    ...state.portfolio,
                    [action.stock.symbol]: action.stock,
                },
                selectedStock: action.stock,
                error: '',
            }
        case 'deleteStock':
            const { [action.symbol]: remove, ...portfolio } = state.portfolio
            const selectedStock = (state.selectedStock && state.selectedStock.symbol === action.symbol) 
            ? portfolio[Object.keys(portfolio)[0]] 
            : state.selectedStock
            return {
                ...state,
                portfolio: portfolio,
                selectedStock: selectedStock,
                error: '',
            };
        default:
            throw Error(`unknown action: ${action.type}`, action);
    }
}