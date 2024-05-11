import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: null,
        portfolio: [],
        funds: 0,
        transactions: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setPortfolio(state, portfolio) {
            state.portfolio = portfolio
        },
        setFunds(state, funds) {
            state.funds = funds
        },
        addTransaction(state, transaction) {
            state.transactions.push(transaction)
        }
    },
    actions: {
        fetchUser({ commit }, user) {
            // Fetch user from API and commit the mutation
        },
        fetchPortfolio({ commit }, portfolio) {
            // Fetch portfolio from API and commit the mutation
        },
        fetchFunds({ commit }, funds) {
            // Fetch funds from API and commit the mutation
        },
        createTransaction({ commit }, transaction) {
            // Create transaction and commit the mutation
        }
    },
    getters: {
        user: state => state.user,
        portfolio: state => state.portfolio,
        funds: state => state.funds,
        transactions: state => state.transactions
    }
})

export default store