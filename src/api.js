import axios from 'axios'

const FINAGE_API_URL = 'https://api.finage.co.uk'
const FINAGE_API_KEY = 'API_KEYb07A0WXBEHIHUJQHPMB7EI6XJRIMP38C'
const API_URL = 'http://localhost:8000/api'

export function fetchUserProfile(userId) {
    return axios.get(`http://localhost:8000/api/profile/${userId}`)
}

export async function getProfile(userId) {
    const response = await axios.get(`${API_URL}/profile/${userId}`)
    return response.data
}

export function fetchPortfolio(userId) {
    return axios.get(`http://localhost:8000/api/portfolio/${userId}`)
}

export function fetchStock(stockSymbol) {
    return axios.get(`${FINAGE_API_URL}/last/stock/APPL?apikey=${FINAGE_API_KEY}`)
    // return axios.get(`${FINAGE_API_URL}/last/stock/${stockSymbol}?apikey=${FINAGE_API_KEY}`)
}

export function fetchExchangeRates() {
    return axios.get(`${FINAGE_API_URL}/exchange?apikey=${FINAGE_API_KEY}`)
}

// Add a default export
export default {
    fetchUserProfile,
    getProfile,
    fetchPortfolio,
    fetchStock,
    fetchExchangeRates
}