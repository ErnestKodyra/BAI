<template>
  <dialog class="login-popup-box">
    <img src="../assets/money.png" class="money-logo-topright">
    <form class="popup-content" @submit.prevent="register">
      <h1 class="stylized-text">Register</h1>
      <div class="input-container">
        <label for="email" class="regular-text">E-mail:</label>
        <input type="text" id="email" v-model="email" required class="input-text">
      </div>
      <div class="input-container">
        <label for="password" class="regular-text">Password:</label>
        <input type="password" id="password" v-model="password" required class="input-text">
      </div>
      <button type="submit" class="filled-button-green">
        <p class="button-text">Register</p>
      </button>
      <p class="stylized-text">Already a member?</p>
      <router-link to="/" class="stylized-text">Log in here!</router-link>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
    <img src="../assets/money.png" class="money-logo-bottomleft">
  </dialog>
</template>

<script>
import { ref } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const store = useStore();
    const router = useRouter();

    const register = async () => {
      const success = await store.registerUser(email.value, password.value);
      if (!success) {
        Swal.fire('Error!', 'Registration failed! Please try again.', 'error');
      } else {
        router.push('/portfolio');
      }
    };

    return { email, password, errorMessage, register };
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

.error-message {
  color: red;
  margin-top: 10px;
}

.filled-button-green {
  cursor: pointer;
}
</style>
