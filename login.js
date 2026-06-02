import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  loginMessage.style.color = "white";
  loginMessage.textContent = "Logging in...";

  // Basic validation
  if (!email || !password) {
    loginMessage.style.color = "red";
    loginMessage.textContent = "Please enter email and password.";
    return;
  }

  try {

    await signInWithEmailAndPassword(auth, email, password);

    loginMessage.style.color = "green";
    loginMessage.textContent = "Login successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "index.html"; // your course finder page
    }, 1200);

  } catch (error) {

    console.log(error.code);

    loginMessage.style.color = "red";

    // CLEAN ERROR HANDLING (IMPORTANT)
    switch (error.code) {

      case "auth/user-not-found":
        loginMessage.textContent = "No account found with this email.";
        break;

      case "auth/wrong-password":
        loginMessage.textContent = "Incorrect password. Please try again.";
        break;

      case "auth/invalid-email":
        loginMessage.textContent = "Invalid email format.";
        break;

      case "auth/too-many-requests":
        loginMessage.textContent = "Too many attempts. Try again later.";
        break;

      default:
        loginMessage.textContent = "Login failed. Please try again.";
        break;
    }
  }
});