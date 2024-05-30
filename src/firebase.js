import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyASjp0ygjWuCrzGfBKGSUaacjLnFsOFVIk",
    authDomain: "finmanager-77b5e.firebaseapp.com",
    projectId: "finmanager-77b5e",
    storageBucket: "finmanager-77b5e.appspot.com",
    messagingSenderId: "145607513741",
    appId: "1:145607513741:web:a9e9b14da7269b4e2474c4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
