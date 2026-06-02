import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxE06kpk8XMSmRi_95212mhGvDYBL39Yg",
  authDomain: "bc-coursefinder-royal.firebaseapp.com",
  projectId: "bc-coursefinder-royal",
  storageBucket: "bc-coursefinder-royal.firebasestorage.app",
  messagingSenderId: "1074400040882",
  appId: "1:1074400040882:web:1794aec9833fa490d976ab"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };