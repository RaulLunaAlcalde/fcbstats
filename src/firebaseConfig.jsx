// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9pSuYVQYR5KP-0EWjwSMi21vvhhs0l_g",
  authDomain: "uf3-proyecte-nova-tec.firebaseapp.com",
  projectId: "uf3-proyecte-nova-tec",
  storageBucket: "uf3-proyecte-nova-tec.firebasestorage.app",
  messagingSenderId: "774705636905",
  appId: "1:774705636905:web:4087d418a28b2490fb5e38",
  measurementId: "G-C1WTK3PE02"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Usa `app` una vez inicializado
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
