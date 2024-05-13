<template>
  <div>
    <h2>User Profile</h2>
    <div v-if="user">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchUserProfile } from '../api.js';

export default {
  name: 'UserProfile',
  setup() {
    const user = ref(1); //tymczasowo

    onMounted(async () => {
      try {
        const userId = 1;
        const response = await fetchUserProfile(userId);
        user.value = response.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    });

    return { user };
  },
};
</script>
