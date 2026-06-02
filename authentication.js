import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

window.addEventListener("DOMContentLoaded", () => {

  const registerBtn = document.getElementById("registerBtn");
  const message = document.getElementById("message");

  registerBtn.addEventListener("click", async () => {

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log("User created:", userCredential.user);

      message.style.color = "green";
      message.textContent = "Account created successfully! Redirecting...";

      // IMPORTANT: give user feedback delay
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);

    } catch (error) {

      console.error(error);

      message.style.color = "red";
      message.textContent = error.message;
    }

  });

});function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password);
}