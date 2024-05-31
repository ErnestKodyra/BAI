import axios from 'axios'

const API_URL = 'http://localhost:4000'

export function fetchStockSymbols() {
    return axios.get(`${API_URL}/stock/symbols`);
}

export function fetchStock(stockSymbol) {
    return axios.get(`${API_URL}/stock/${stockSymbol}`)
}

export default {
    fetchStockSymbols,
    fetchStock
}