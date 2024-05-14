<template>
  <dialog class="login-popup-box">
    <img src="../assets/money.png" class="money-logo-topright">
    <div class="popup-content">
      <h1 class= "stylized-text">FinManager</h1>
      <h2 class="bold-text">LOGIN</h2>
      <form>
        <div>
          <label for="username" class="regular-text">Username:</label>
          <input type="text" id="username" v-model="username" required class="input-text" value="USERNAME">
        </div>
        <div>
          <label for="password" class="regular-text">Password: </label>
          <input type="password" id="password" v-model="password" required class="input-text" value="PASSWORD" >
        </div>
        <div class="login-button">
          <button :disabled="!isFormValid" @click="login" type="submit" class="filled-button-green">
            <p class="button-text">Login</p>
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
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const username = ref('')
const password = ref('')
const store = useStore()

const isFormValid = computed(() => {
  return username.value && password.value
})

const login = () => {
  if (isFormValid.value) {
    const user = store.state.user
    if (user && user.username === username.value && user.password === password.value) {
      alert('Logged in successfully')
    } else {
      alert('Invalid username or password')
    }
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