<template>
  <div>
    <h1>Login</h1>
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from '@/store';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const store = useStore();

    const login = async () => {
      if (!await store.loginUser(email.value, password.value)) {
        alert("Login failed!");
      }
    };

    return { email, password, login };
  }
};
</script>
