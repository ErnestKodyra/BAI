<template>
  <div>
    <h1>Your Portfolio</h1>
    <p>Wallet Balance: {{ userProfile.wallet }}</p>
    <button @click="addFunds">Add $100</button>
  </div>
</template>

<script>
import { useStore } from '@/store';  // Importing useStore from your Pinia store
import { updateUserWallet } from '@/firestore';  // Importing Firestore operations

export default {
  setup() {
    const store = useStore();  // Using the Pinia store

    const addFunds = async () => {
      if (!store.user) {
        alert("You are not logged in!");
        return;
      }
      const newWalletAmount = store.userProfile.wallet + 100;
      await updateUserWallet(store.user.uid, newWalletAmount);
      await store.fetchUserProfile();  // Refresh the user profile after updating
    };

    return {
      userProfile: store.userProfile,
      addFunds
    };
  }
};
</script>

