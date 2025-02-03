const copyright = document.getElementById("copyrigt");
copyright.innerHTML = `&copy; ${new Date().getFullYear()} Eye Belief. All rights reserved.`;

const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');


if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
        // console.log('hello');
        
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
        
    })
}



// cart/shop Functionality






import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";




export const firebaseConfig = {
  apiKey: "AIzaSyBkCMqPUCJYpgJBeEAvsve67gvPq99d4yc",
  authDomain: "javascript-project--e-commerce.firebaseapp.com",
  projectId: "javascript-project--e-commerce",
  storageBucket: "javascript-project--e-commerce.firebasestorage.app",
  messagingSenderId: "478342137748",
  appId: "1:478342137748:web:bfeef9164cbc7b752cf181",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const colRef = collection(db, "Cart Section");
export const userRef = collection(db, "users");
export const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const signInOption = document.getElementById("signInOption");
  const signOutOption = document.getElementById("signOutOption");
  // Listen for authentication state changes
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      if (signInOption && signOutOption) {
        signInOption.style.display = "none";
        signOutOption.style.display = "block";
      }

      // Fetch user details
      await getUserDocumentFromFirestore(user.uid);

      // Add sign-out functionality
      if (signOutOption) {
        signOutOption.addEventListener("click", logoutUser);
      }
    } else {
      // User is not signed in
      if (signInOption && signOutOption) {
        signInOption.style.display = "block";
        signOutOption.style.display = "none";
      }

      // Redirect to login page if not already there
      if (window.location.pathname !== "/login.html") {
        window.location.replace("./login.html");
      }
    }
  });
});

// Function to sign out user
async function logoutUser() {
  try {
    await signOut(auth); // Sign out the user
    localStorage.clear(); // Clear all local storage
    Toastify({
      text: "You have signed out successfully",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #088178, #088178)",
        color: "#fff",
      },
    }).showToast();
    window.location.reload(); // Reload to reset UI
  } catch (error) {
    console.error("Error signing out:", error);
  }
}

// Function to fetch user document from Firestore
async function getUserDocumentFromFirestore(uid) {
  try {
    const userQuery = query(userRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        const userElement = document.getElementById("user");
        if (userElement) {
          userElement.innerHTML = user.username;
        }
      });
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
  }
}





// Producst Array
// let productListHTML = document.getElementById = ('product-container')









