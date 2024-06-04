import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { getAuth, updateProfile as firebaseUpdateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const auth = getAuth();

export async function updateProfile(user, updates) {
  try {
    await firebaseUpdateProfile(user, updates);
    return true;
  } catch (error) {
    console.error('Update Profile Error:', error);
    return false;
  }
}

export const useStore = defineStore('auth', {
  state: () => ({
    user: null,
    userProfile: {},
  }),
  actions: {
    async registerUser(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;

        const userData = {
          wallet: 1000,
          stocks: [],
          transactions: []
        };
        
        await setDoc(doc(db, "users", this.user.uid), userData);

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
        await this.fetchUserProfile();
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
    async changePassword(currentPassword, newPassword) {
      try {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);

        return true;
      } catch (error) {
        console.error('Change Password Error:', error);
        return false;
      }
    },
  }
});

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