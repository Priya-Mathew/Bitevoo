let isLoggedIn = false;
menuPrices = {
    "Margherita Pizza": 17,
    "Pepperoni Pizza": 20,
    "Veggie Delight Pizza": 11,
    "BBQ Pizza": 10,
    "Grandma Pizza": 15,
    "Lasagna Pizza": 18,
    "Burger": 17,
    "Salad": 20,
    "Wraps": 11,
    "Dessert": 10,
    "Milk Shake": 15,
    "Nuggets": 18,
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.length == null ? 0 : cart.length;
    document.getElementById('cart-count').textContent = count;
}
function updateAuthUI() {
    isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const signOutBtn = document.getElementById("signOutBtn");
    const loginBtn = document.querySelector('button[onclick="toggleLoginModal()"]');

    // Always get these elements
    const cartIcon = document.querySelector('.fa-shopping-cart')?.parentElement;
    const recentOrdersIcon = document.querySelector('.fa-clock')?.parentElement;
    const adminOrdersIcon = document.querySelector('.fa-tasks')?.parentElement;

    if (isLoggedIn) {
        signOutBtn?.classList.remove("hidden");
        loginBtn?.classList.add("hidden");

        if (isAdmin) {
            // Admin: show admin, hide cart and recent
            cartIcon?.classList.add("hidden");
            recentOrdersIcon?.classList.add("hidden");
            adminOrdersIcon?.classList.remove("hidden");
        } else {
            // Normal user: show cart and recent, hide admin
            cartIcon?.classList.remove("hidden");
            recentOrdersIcon?.classList.remove("hidden");
            adminOrdersIcon?.classList.add("hidden");
        }
    } else {
        // Not logged in: show everything
        signOutBtn?.classList.add("hidden");
        loginBtn?.classList.remove("hidden");

        cartIcon?.classList.remove("hidden");
        recentOrdersIcon?.classList.remove("hidden");
        adminOrdersIcon?.classList.remove("hidden");
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

    const userId = localStorage.getItem("loggedInUser");
    if (!userId) return;

    const saved = localStorage.getItem(`cardDetails_${userId}`);
    if (!saved) return;

    const { cardNumber, expiry } = JSON.parse(saved);

    // Prefill form
    document.getElementById("cardNumber").value = cardNumber || '';
    document.getElementById("expiry").value = expiry || '';

});

function signOut() {
    isLoggedIn = false;
    localStorage.removeItem("isLoggedIn"); // ✅ clear login state
    localStorage.removeItem("loggedInUser");

    localStorage.removeItem("cart"); // optional
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
        updateCartCount();
    }
    updateAuthUI();
    localStorage.removeItem("isAdmin");
    showToast("👋 You have been signed out.");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500); // wait 1.5 seconds so the toast is visible
}

