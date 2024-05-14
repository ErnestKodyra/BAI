import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { fetchUserProfile } from './api'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')

// Fetch user profile if user is logged in
const user = store.state.user
if (user) {
    fetchUserProfile(user.id)
        .then(response => {
            store.commit('setUserProfile', response.data)
        })
        .catch(error => {
            console.error('An error occurred:', error)
        })
}