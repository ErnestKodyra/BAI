<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>

      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { registerUser } from '../api'
import { ref } from 'vue'

const store = useStore()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

async function register() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }
  try {
    const response = await registerUser({ username: username.value, password: password.value })
    store.commit('setUser', response.data.user)
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
</script>

<style scoped>
.register {
}
</style>
