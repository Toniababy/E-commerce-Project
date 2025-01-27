const cartItem = document.getElementById("cartItem");
const cartAmount = document.getElementById("cartAmount");
const totalPriceElement = document.getElementById("totalPrice");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display cart items
function displayCart() {
  cartItem.innerHTML = ""; // Clear cart items

  if (cart.length === 0) {
    cartItem.innerHTML = "<p>Your cart is empty</p>";
    totalPriceElement.textContent = "Total: ₦0";
    updateCartCount();
    return;
  }

  cart.forEach((item) => {
    cartItem.innerHTML += `
      <div class="cart-item">
             <div class="row-img">
                <img src="${item.image}" alt="${item.name}" class="rowing">
            </div>
        <p>${item.name}</p>
        <p class="totalPrice">₦${item.price}</p>
        <div class="quantity-controls">
          <button class="increase" data-id="${item.id}">+</button>
          <span>${item.quantity}</span>
          <button class="decrease" data-id="${item.id}">-</button>
        </div>
        <i class='fa-solid fa-trash remove' data-id="${item.id}"></i>
        
      </div>
    `;
  });

  // Add Proceed to Checkout button
  cartItem.innerHTML += `
    <button id="checkoutBtn" class="checkout-btn">Proceed to Checkout</button>
  `;

  setupEventListeners();
  updateTotalPrice();
  updateCartCount();
}

// Update total price
function updateTotalPrice() {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceElement.textContent = `Total: ₦${totalPrice}`;
}

// Update cart count
function updateCartCount() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartAmount.textContent = totalQuantity;
}

// Setup event listeners
function setupEventListeners() {
  document.querySelectorAll(".increase").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const item = cart.find((p) => p.id === id);
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    })
  );

  document.querySelectorAll(".decrease").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const item = cart.find((p) => p.id === id);
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart = cart.filter((p) => p.id !== id);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    })
  );

  document.querySelectorAll(".remove").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    })
  );

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", proceedToCheckout);
  }
}

// Proceed to checkout
function proceedToCheckout() {
    Toastify({
        text: "Proceeding to Checkout!",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // "top" or "bottom"
        position: "right", // "left", "center", or "right"
        style: {
          background: "linear-gradient(to right, #088178, #088178)",
          color: "#fff",
        },
      }).showToast();
    
//   alert("Proceeding to checkout!");
  window.location="./checkout.html"
}

// Initialize
displayCart();
