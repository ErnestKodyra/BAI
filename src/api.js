import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export function loginUser(credentials) {
    return axios.post(`${API_URL}/users/login`, credentials)
}

export function registerUser(details) {
    return axios.post(`${API_URL}/users/register`, details)
}

export function fetchUserProfile(userId) {
    return axios.get(`${API_URL}/users/profile/${userId}`)
}

export function fetchPortfolio(userId) {
    return axios.get(`${API_URL}/portfolio/${userId}`)
}

export function exchangeItem(userId, itemDetails) {
    return axios.post(`${API_URL}/exchange/${userId}`, itemDetails)
}

export function fetchStock(stockSymbol) {
    return axios.get(`${API_URL}/stock/${stockSymbol}`)
}

export function fetchExchangeRates() {
    return axios.get(`${API_URL}/exchange`)
}