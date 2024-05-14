<template>
  <div class="profile">
    <h2>Profile</h2>
    <p>Username: {{ user.username }}</p>
<!--    todo: add more information-->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import api from '../api'
import { getProfile} from "../api";

const store = useStore()
const userProfile = ref({})

onMounted(async () => {
  const userId = store.state.user.id
  const response = await api.getProfile(userId)
  userProfile.value = response.data
})
</script>

<style scoped>
.profile {
}
</style>