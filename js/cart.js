const menuPrices = {
    "Margherita Pizza": 17,
    "Pepperoni Pizza": 20,
    "Veggie Delight Pizza": 11,
    "BBQ Pizza": 10,
    "Grandma's Pizza": 15,
    "Lasagna Pizza": 18,
    // Add more as needed
};
let isLoggedIn = false;
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cartList');
    const cartSummary = document.getElementById('cartSummary');
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="text-center py-4 text-gray-600">Your cart is empty.</li>';
        cartSummary.textContent = '';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const price = menuPrices[item.name] || 0;
        total += price * item.qty;

        const li = document.createElement('li');
        li.className = 'flex justify-between items-center py-2';

        li.innerHTML = `
                <div>
                    <span class="font-semibold">${item.name}</span>
                    <span class="text-gray-600 ml-2">($${price} each)</span>
                </div>
                <div class="flex items-center gap-2">
                    <button class="px-2 py-1 bg-gray-200 rounded" onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${item.qty}</span>
                    <button class="px-2 py-1 bg-gray-200 rounded" onclick="changeQuantity(${index}, 1)">+</button>
                    <span class="ml-4 font-semibold">$${(price * item.qty).toFixed(2)}</span>
                </div>
            `;

        cartList.appendChild(li);
    });

    cartSummary.textContent = `Total: $${total.toFixed(2)}`;
    console.log(localStorage.getItem('cart'));
}

function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart[index]) return;

    cart[index].qty += delta;

    // Remove item if qty <= 0
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
    alert('Proceeding to payment gateway... (functionality to be implemented)');
});

// On page load
loadCart();
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.length;
    document.getElementById('cart-count').textContent = count;
}
function updateAuthUI() {
    isLoggedIn = localStorage.getItem("isLoggedIn") === "true";  // ✅ Check from localStorage

    const signOutBtn = document.getElementById("signOutBtn");
    const loginBtn = document.querySelector('button[onclick="toggleLoginModal()"]');

    if (isLoggedIn) {
        signOutBtn?.classList.remove("hidden");
        loginBtn?.classList.add("hidden");
    } else {
        signOutBtn?.classList.add("hidden");
        loginBtn?.classList.remove("hidden");
    }
}
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('opacity-100');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2000);
}
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    updateAuthUI();  // ✅ shows sign out if logged in
});

function signOut() {
    isLoggedIn = false;
    localStorage.removeItem("isLoggedIn"); // ✅ clear login state
    localStorage.removeItem("cart"); // optional
    updateCartCount();
    updateAuthUI();
    showToast("👋 You have been signed out.");
}
