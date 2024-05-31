<template>
  <dialog class="login-popup-box">
    <img src="../assets/money.png" class="money-logo-topright">
    <div class="popup-content">
      <h1 class= "stylized-text">Login</h1>
      <form @submit.prevent="login">
        <div class="input-container">
          <label for="email" class="regular-text">E-mail:</label>
          <input type="text" id="email" v-model="email" required class="input-text" value="E-MAIL">
        </div>
        <div class="input-container">
          <label for="password" class="regular-text">Password: </label>
          <input type="password" id="password" v-model="password" required class="input-text" value="PASSWORD" >
        </div>
        <div class="login-button" >
          <button class="filled-button-green" type="submit" @click="login">
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

<script>
import { ref } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const store = useStore();
    const router = useRouter();

    const login = async () => {
      if (!await store.loginUser(email.value, password.value)) {
        Swal.fire('Error!', 'Login failed!', 'error');
      } else {
        router.push('/portfolio');
      }
    };

    return { email, password, login };
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
  margin: 10px 0; }

.filled-button-green {
  cursor: pointer;
}
</style>
