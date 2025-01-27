// Import dependencies
import { getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { colRef } from "./script.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsContainer = document.querySelector(".pro-container");
const cartAmount = document.getElementById("cartAmount");

// Fetch products from Firebase
try {
  const products = [];
  const querySnapshot = await getDocs(colRef);
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  displayProducts(products);
} catch (error) {
  console.error("Error fetching products:", error.message);
}
// Display products
function displayProducts(products) {
  productsContainer.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
    productsContainer.innerHTML += `
      <div class="pro">
        <img src="${product.image}" alt="" class="images">
        <div class="des">
          <h5 style="color: black;">${product.name}</h5>
          <h4>₦ ${product.price}.00</h4>
          <i 
            class="fa-solid fa-cart-shopping add-to-cart-btn" 
            data-id="${product.id}" 
            style="color: #088178; border: 1px solid #cce7d0; border-radius: 50px; background-color: #e8f6ea; padding: 7px; position: absolute; bottom: 20px; right: 15px;">
          </i>
        </div>
      </div>
    `;
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const product = products.find((item) => item.id === productId);
      if (product) {
        addToCart(product);
      }
    });
  });
}

// Add product to cart
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartAmount.textContent = totalQuantity;
}

// Initialize
// fetchProducts();
