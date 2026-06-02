import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  // -------------------------
  // LOGOUT HANDLER
  // -------------------------
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        window.location.href = "login.html";
      } catch (error) {
        console.error("Logout error:", error);
      }
    });
  }

  // -------------------------
  // OPTIONAL: AUTO AUTH GUARD
  // -------------------------
  onAuthStateChanged(auth, (user) => {
    const isLoginPage = window.location.pathname.includes("login.html");
    const isRegisterPage = window.location.pathname.includes("register.html");

    // If NOT logged in and trying to access protected page
    if (!user && !isLoginPage && !isRegisterPage) {
      window.location.href = "login.html";
    }

    // If already logged in and on login page
    if (user && isLoginPage) {
      window.location.href = "index.html";
    }
  });
});

 

