<template>
  <dialog class="login-popup-box">
    <img src="../assets/money.png" class="money-logo-topright">
      <form class="popup-content" @submit.prevent="register">
        <h1 class= "stylized-text">FinManager</h1>
        <h2 class="bold-text">JOIN</h2>
        <div>
        <label for="email" class="regular-text">E-mail:</label>
        <input type="text" id="email" v-model="email" required class="input-text" value="E-MAIL">
        </div>
        <div>
        <label for="password" class="regular-text">Password:</label>
        <input type="password" id="password" v-model="password" required class="input-text" value="PASSWORD">
        </div>
        <div>
        <label for="confirmPassword" class="regular-text">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required class="input-text" value="PASSWORD">
        </div>
        <button type="submit" class="filled-button-green" @click="verifyCredentials()">
          <p class="button-text">Register</p>
        </button>
        <p class="stylized-text">Already a member?</p>
          <router-link to="/login" class="stylized-text">Log in here!</router-link>
      </form>
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
const confirmPassword = ref('')

watch(() => store.userID, (newVal) => {
  if (newVal) {
    router.push(`/portfolio/${newVal}`);
  }
}, { immediate: true });

async function verifyCredentials() {
  if (password.value !== '' && confirmPassword.value !== '') {
    if (password.value === confirmPassword.value) {
      store.registerUser(email.value, password.value);
    } else {
      console.log("Passwords do not match!");
    }
  } else {
    console.log("Passwords cannot be empty!");
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
