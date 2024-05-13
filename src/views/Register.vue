<template>
  <dialog class="login-popup-box">
    <img src="../assets/money.png" class="money-logo-topright">
      <form class="popup-content" @submit.prevent="register">
        <h1 class= "stylized-text">FinManager</h1>
        <h2 class="bold-text">JOIN</h2>
        <div>
        <label for="username" class="regular-text">Username:</label>
        <input type="text" id="username" v-model="username" required class="input-text" value="USERNAME">
        </div>
        <div>
        <label for="password" class="regular-text">Password:</label>
        <input type="password" id="password" v-model="password" required class="input-text" value="PASSWORD">
        </div>
        <div>
        <label for="confirmPassword" class="regular-text">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required class="input-text" value="PASSWORD">
        </div>
        <button type="submit" class="filled-button-green">
          <p class="button-text">Register</p>
        </button>
        <p class="stylized-text">Already a member?</p>
          <router-link to="/login" class="stylized-text">Log in here!</router-link>
      </form>
      <img src="../assets/money.png" class="money-logo-bottomleft">
    </dialog>
</template>

<script setup>
import { registerUser } from '../api'
import { ref } from 'vue'
import { useStore } from 'vuex'

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
h2.bold-text {
  text-align: center;
  font-size: 2em;
}

h1.stylized-text {
  margin: 10px;
  font-family: 'Newsreader';
  color: black;
  font-size: 3em;
}
</style>
