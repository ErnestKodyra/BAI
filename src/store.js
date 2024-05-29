import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyASjp0ygjWuCrzGfBKGSUaacjLnFsOFVIk",
    authDomain: "finmanager-77b5e.firebaseapp.com",
    projectId: "finmanager-77b5e",
    storageBucket: "finmanager-77b5e.appspot.com",
    messagingSenderId: "145607513741",
    appId: "1:145607513741:web:a9e9b14da7269b4e2474c4"
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

const useStore = defineStore('user', {
    state: () => {
        return {
            userID: null
        }
    },
    actions: {
        async signUserIn(email, password) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                this.userID = userCredential.user.uid;
                return true;
            } catch (error) {
                console.log(error.message)
                return false;
            }
        },
        async signUserOut() {
            try {
                await signOut(auth)
                this.userID = null;
                return true;
            } catch (error) {
                console.log(error.message)
                return false;
            }
        },
        async registerUser(email, password) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                this.userID = userCredential.user.uid;
                return true;
            } catch (error) {
                console.log(error.message);
                return false;
            }
        }
    }
})

export default useStore;