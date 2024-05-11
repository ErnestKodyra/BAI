<template>
  <div class="profile">
    <h2>Profile</h2>
    <p>Username: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
    <!-- todo: add more information -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref(null)

async function fetchProfile() {
  try {
    const response = await axios.get('/api/profile')
    user.value = response.data.user
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

onMounted(fetchProfile)
</script>

<style scoped>
.profile {
}
</style>
