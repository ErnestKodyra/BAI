<template>
  <dialog class="login-popup-box" open>
    <img src="../assets/money.png" class="money-logo-topright" />
    <div class="popup-content">
      <h1 class="stylized-text">Change Password</h1>
      <form @submit.prevent="changePassword">
        <div class="input-container">
          <label for="currentPassword" class="regular-text">Current Password</label>
          <input type="password" id="currentPassword" v-model="currentPassword" required class="input-text" />
        </div>
        <div class="input-container">
          <label for="newPassword" class="regular-text">New Password</label>
          <input type="password" id="newPassword" v-model="newPassword" required class="input-text" />
        </div>
        <div class="change-password-button">
          <button class="filled-button-green" type="submit">
            <p class="button-text">Change Password</p>
          </button>
        </div>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
    <img src="../assets/money.png" class="money-logo-bottomleft" />
  </dialog>
</template>

<script>
import { ref } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const currentPassword = ref('');
    const newPassword = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');

    const changePassword = async () => {
      const success = await store.changePassword(currentPassword.value, newPassword.value);
      if (success) {
        Swal.fire('Success!', 'Password changed successfully', 'success');
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      } else {
        Swal.fire('Error!', 'Failed to change password', 'error');
      }
    };

    return {
      currentPassword,
      newPassword,
      errorMessage,
      successMessage,
      changePassword,
    };
  },
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