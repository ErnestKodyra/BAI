<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const username = ref('')
const password = ref('')
const store = useStore()

const login = async () => {
  try {
    const response = await axios.post('/api/login', { username: username.value, password: password.value })
    store.commit('setUser', response.data.user)
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
</script>

<style scoped>
.login {
}
</style>
