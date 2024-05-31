<template>
  <dialog class="login-popup-box">
    <img src="../assets/money.png" class="money-logo-topright">
    <div class="popup-content">
      <h1 class= "stylized-text">Change Password</h1>
      <form @submit.prevent="changePassword">
        <div class="input-container">
          <label for="currentPassword" class="regular-text">Current Password</label>
          <input type="password" id="currentPassword" v-model="currentPassword" required class="input-text">
        </div>
        <div class="input-container">
          <label for="newPassword" class="regular-text">New Password: </label>
          <input type="password" id="newPassword" v-model="newPassword" required class="input-text">
        </div>
        <div class="change-password-button" >
          <button class="filled-button-green" type="submit" @click="changePassword">
            <p class="button-text">Change Password</p>
          </button>
        </div>
      </form>
    </div>
    <img src="../assets/money.png" class="money-logo-bottomleft">
  </dialog>
</template>

<script>
import { ref } from 'vue';
import { useStore } from '@/store';

export default {
  setup() {
    const currentPassword = ref('');
    const newPassword = ref('');
    const store = useStore();

    const changePassword = async () => {
      console.log("Button clicked!");
      if (!await store.changePassword(currentPassword.value, newPassword.value)) {
        window.alert("Password change failed!");
      } else {
        window.alert("Password changed successfully!");
      }
    };

    return { currentPassword, newPassword, changePassword };
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

.change-password-button {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
</style>
