<template>
  <div class="profile-container">
    <h2 class="stylized-text">Your profile</h2>
    <div v-if="user" class="user-details">
      <p class="regular-text">Username: {{ user.username }}</p>
      <p class="regular-text">Email: {{ user.email }}</p>
    </div>
    <div v-else>
      <p class="loading-text">Loading...</p>
    </div>
    <router-link to="/change-password" class="change-password-link">Change Password</router-link>
  </div>
</template>

<script>
/*import { ref, onMounted } from 'vue';
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
};*/
</script>
<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.stylized-text {
  font-size: 2em;
  color: #333;
}

.user-details {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.regular-text {
  font-size: 1.2em;
  color: #666;
}

.loading-text {
  font-size: 1.2em;
  color: #999;
}
.change-password-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #20871E;  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2em;
  transition: background-color 0.3s ease;
}

.change-password-link:hover {
  background-color: #20871E;}
</style>