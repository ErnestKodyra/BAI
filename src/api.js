import axios from 'axios'

const API_URL = 'http://localhost:4000'

export function fetchUserProfile(userId) {
    return axios.get(`${API_URL}/profile/${userId}`)
}

export async function getProfile(userId) {
    return axios.get(`${API_URL}/profile/${userId}`)
}

export function fetchPortfolio(userId) {
    return axios.get(`${API_URL}/portfolio/${userId}`)
}

export function fetchStockSymbols() {
    return axios.get(`${API_URL}/stock/symbols`);
}

export function fetchStock(stockSymbol) {
    return axios.get(`${API_URL}/stock/${stockSymbol}`)
}


export function fetchExchangeRates() {
    return axios.get(`${API_URL}/exchange`)
}



export default {
    fetchUserProfile,
    getProfile,
    fetchPortfolio,
    fetchStock,
    fetchExchangeRates,
    fetchStockSymbols
}