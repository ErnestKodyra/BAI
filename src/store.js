import { createStore } from 'vuex'
import api from './api' // Import the api module
import { v4 as uuidv4 } from 'uuid';


const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        userProfile: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        setUserProfile(state, userProfile) {
            state.userProfile = userProfile
        },
    },
    actions: {
        updateUser({ commit }, user) {
            commit('setUser', user)
        },
        logout({ commit }) {
            commit('setUser', null)
        },
        async login({ commit }, { username, password }) { // Destructure the credentials object into username and password
            const response = await api.login(username, password) // Pass username and password as separate arguments
            commit('SET_USER', response.data.user)
        },
        async fetchUserProfile({ commit, state }) {
            if (state.user) {
                const userId = state.user.id
                const response = await api.getProfile(userId)
                commit('setUserProfile', response.data)
            } else {
                console.log('User is not defined')
            }
        },
        async register({ commit }, user) {
            user.id = uuidv4(); // Generate a unique ID for the new user
            const response = await api.register(user);
            commit('SET_USER', response.data.user);
        },
    },
    getters: {
        user: state => state.user
    }
});

export default store;