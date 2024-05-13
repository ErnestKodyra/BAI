<template>
  <dialog class="login-popup-box">
    <img src="../assets/money.png" class="money-logo-topright">
    <div class="popup-content">
      <h1 class= "stylized-text">FinManager</h1>
      <h2 class="bold-text">LOGIN</h2>
      <form @submit.prevent="login">
        <div>
        <label for="username" class="regular-text">Username:</label>
        <input type="text" id="username" v-model="username" required class="input-text" value="USERNAME">
        </div>
        <div>
        <label for="password" class="regular-text">Password: </label>
        <input type="password" id="password" v-model="password" required class="input-text" value="PASSWORD" >
        </div>
        <div class="login-button"> 
          <button class="filled-button-green" type="submit">
            <p class="button-text">Login Now</p>
          </button>
          <p class="stylized-text">Not a member?</p>
          <router-link to="/register" class="stylized-text">Sign up here!</router-link>
      </div>
      </form>
  </div>
  <img src="../assets/money.png" class="money-logo-bottomleft">
</dialog>
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

h1.stylized-text {
  margin: 10px;
  font-family: 'Newsreader';
  color: black;
  font-size: 3em;
}

</style>
