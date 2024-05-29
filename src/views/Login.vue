<template>
  <dialog class="login-popup-box">
    <img src="../assets/money.png" class="money-logo-topright">
    <div class="popup-content">
      <h1 class= "stylized-text">FinManager</h1>
      <h2 class="bold-text">LOGIN</h2>
      <form @submit.prevent="login">
        <div>
        <label for="email" class="regular-text">E-mail:</label>
        <input type="text" id="email" v-model="email" required class="input-text" value="E-MAIL">
        </div>
        <div>
        <label for="password" class="regular-text">Password: </label>
        <input type="password" id="password" v-model="password" required class="input-text" value="PASSWORD" >
        </div>
        <div class="login-button" > 
          <button class="filled-button-green" type="submit" @click="verifyCredentials">
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
import { ref, watch } from 'vue'
import useStore from '../store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const email = ref('')
const password = ref('')

watch(() => store.userID, (newVal) => {
  if (newVal) {
    router.push(`/portfolio/${newVal}`);
  }
}, { immediate: true });

async function verifyCredentials() {
  if (password.value !== '') {
    await store.signUserIn(email.value, password.value);
  } else {
    console.log("Password cannot be empty!");
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
