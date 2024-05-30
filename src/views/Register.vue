<template>
  <div>
    <h1>Register</h1>
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="register">Register</button>
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

    const register = async () => {
      if (!await store.registerUser(email.value, password.value)) {
        alert("Registration failed!");
      }
    };

    return { email, password, register };
  }
};
</script>
