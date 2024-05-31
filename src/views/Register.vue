<template>
  <dialog class="login-popup-box">
    <img src="../assets/money.png" class="money-logo-topright">
    <form class="popup-content" @submit.prevent="register">
      <h1 class= "stylized-text">Register</h1>
      <div class="input-container">
        <label for="email" class="regular-text">E-mail:</label>
        <input type="text" id="email" v-model="email" required class="input-text" value="E-MAIL">
      </div>
      <div class="input-container">
        <label for="password" class="regular-text">Password:</label>
        <input type="password" id="password" v-model="password" required class="input-text" value="PASSWORD">
      </div>
      <button type="submit" class="filled-button-green" @click="register">
        <p class="button-text">Register</p>
      </button>
      <p class="stylized-text">Already a member?</p>
      <router-link to="/login" class="stylized-text">Log in here!</router-link>
    </form>
    <img src="../assets/money.png" class="money-logo-bottomleft">
  </dialog>
</template>

<script>
import { ref } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const store = useStore();
    const router = useRouter();

    const register = async () => {
      if (!await store.registerUser(email.value, password.value)) {
        window.alert("Registration failed!");
      } else {
        router.push('/profile');
      }
    };

    return { email, password, register };
  }
};
</script>

<style scoped>

h1.stylized-text {
  margin: 10px;
  font-family: 'Newsreader';
  color: black;
  font-size: 3em;
}

.popup-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-text {
  margin: 10px 0;
}
</style>