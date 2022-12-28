import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyARkLno6oHNra1n05SjrzQU-c2zbVjY2ag",
  authDomain: "udemy-3c6bf.firebaseapp.com",
  projectId: "udemy-3c6bf",
  storageBucket: "udemy-3c6bf.appspot.com",
  messagingSenderId: "39539600840",
  appId: "1:39539600840:web:51401bdeae688c4db664fd"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };