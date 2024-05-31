import { defineStore } from 'pinia';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const useStore = defineStore('auth', {
  state: () => ({
    user: null, // This will store the user's auth object or null
    userProfile: {}, // This could store additional user information from Firestore
  }),
  actions: {
    async registerUser(email, password) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          this.user = userCredential.user;
  
          // Set initial data in Firestore
          const userData = {
            wallet: 1000,  // Set initial wallet balance
            stocks: [],     // Prepare for storing stock data
            transactions: []
          };
          
          await setDoc(doc(db, "users", this.user.uid), userData);
  
          // Optionally fetch the newly set profile to update local state
          this.userProfile = userData;
  
          return true;
        } catch (error) {
          console.error('Registration Error:', error);
          return false;
        }
      },
    async loginUser(email, password) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        this.user = response.user;
        return true;
      } catch (error) {
        console.error('Login Error:', error);
        return false;
      }
    },
    async logoutUser() {
      try {
        await signOut(auth);
        this.user = null;
        this.userProfile = {};
        return true;
      } catch (error) {
        console.error('Logout Error:', error);
        return false;
      }
    },
    async fetchUserProfile() {
      if (!this.user) return;
      const docRef = doc(db, 'users', this.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.userProfile = docSnap.data();
      } else {
        console.log("No such profile!");
      }
    },
  }
});

// Firebase Auth State Persistence
onAuthStateChanged(auth, (user) => {
  const store = useStore();
  if (user) {
    store.user = user;
    store.fetchUserProfile();
  } else {
    store.user = null;
    store.userProfile = {};
  }
});

export default useStore;