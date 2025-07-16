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
    "French Fries": 17,
    "Burger": 20,
    "Bucket Chicken": 11,
    "Strips": 10,
    "RiceBox": 15,
    "Cola Drink": 18,
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


    const cartIcon = document.querySelector('.fa-shopping-cart')?.parentElement;
    const recentOrdersIcon = document.querySelector('.fa-clock')?.parentElement;
    const adminOrdersIcon = document.querySelector('.fa-tasks')?.parentElement;

    if (isLoggedIn) {
        signOutBtn?.classList.remove("hidden");
        loginBtn?.classList.add("hidden");

        if (isAdmin) {

            cartIcon?.classList.add("hidden");
            recentOrdersIcon?.classList.add("hidden");
            adminOrdersIcon?.classList.remove("hidden");
        } else {

            cartIcon?.classList.remove("hidden");
            recentOrdersIcon?.classList.remove("hidden");
            adminOrdersIcon?.classList.add("hidden");
        }
    } else {
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
    updateAuthUI();

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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");

    localStorage.removeItem("cart");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
        updateCartCount();
    }
    updateAuthUI();
    localStorage.removeItem("isAdmin");
    showToast("👋 You have been signed out.");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

