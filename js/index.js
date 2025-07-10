let isLoggedIn = false;

function toggleLoginModal() {
    const modal = document.getElementById("loginModal");
    modal.classList.remove("hidden");
}
function toggleRegisterModal() {
    closeModal("loginModal");
    const modal = document.getElementById("registerModal");
    modal.classList.remove("hidden");
}
function toggleOTPModal() {
    alert('otp');
    const modal = document.getElementById("otpModal");
    modal.classList.remove("hidden");
}
function closeModal(id) {
    alert('alert');
    document.getElementById(id).classList.add("hidden");
}
function filterRestaurants() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const list = document.getElementById("restaurantList");
    const items = document.querySelectorAll(".restaurant-item");
    let hasMatch = false;

    items.forEach(item => {
        const name = item.textContent.toLowerCase();
        if (name.includes(input) && input.trim() !== "") {
            item.style.display = "list-item";
            item.classList.add("cursor-pointer", "hover:text-pink-700");
            item.onclick = () => showMenu(item.textContent);
            hasMatch = true;
        } else {
            item.style.display = "none";
        }
    });

    document.getElementById("foodItemsContainer").classList.add("hidden");

    if (hasMatch) {
        list.classList.remove("hidden");
    } else {
        list.classList.add("hidden");
    }
}
// const restaurantMenus = {
//     "Mario's Pizza": ["Margherita", "Pepperoni", "Veggie Delight"],
//     "KFC": ["Classic Burger", "Cheese Burger", "Veggie Burger"],
//     "Yokohama": ["California Roll", "Spicy Tuna", "Salmon Nigiri"],
//     "Chick-fil-A": ["Chicken Taco", "Beef Taco", "Veggie Taco"],
//     "China Garden Restaurant": ["Butter Chicken", "Paneer Tikka", "Veg Biryani"]
// };
const restaurantMenus = {
    "Mario's Pizza": [
        { name: "Margherita Pizza", price: "$17", image: "./images/Menu/margherita-pizza.jpg" },
        { name: "Pepperoni Pizza", price: "$20", image: "./images/Menu/Pepperoni-Pizza.jpg" },
        { name: "Veggie Delight Pizza", price: "$11", image: "./images/Menu/VeggieDelight.webp" },
        { name: "BBQ Pizza", price: "$10", image: "./images/Menu/BBQ-Chicken-Pizza.jpg" },
        { name: "Grandma's Pizza", price: "$15", image: "./images/Menu/Grandma Pizza.webp" },
        { name: "Lasagna Pizza ", price: "$18", image: "./images/Menu/Pizza-Lasagna.jpg" },
    ],
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.length;
    document.getElementById('cart-count').textContent = count;
}

function goToCart() {
    window.location.href = 'cart.html';
}

// Call it on page load
document.addEventListener('DOMContentLoaded', updateCartCount);


function showMenu(restaurantName) {
    const container = document.getElementById("foodItemsContainer");
    const list = document.getElementById("foodList");
    const foods = restaurantMenus[restaurantName] || [];

    list.innerHTML = ""; // Clear previous

    foods.forEach(item => {
        const li = document.createElement("li");
        li.className = "bg-white rounded-2xl shadow-md overflow-hidden";

        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-cover" />
            <div class="p-4">
                <h4 class="text-lg font-bold text-gray-800 mb-1">${item.name}</h4>
                <p class="text-pink-700 font-semibold mb-3">${item.price}</p>
                <button onclick="handleAddToCart('${item.name}')"
                    class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-800">
                    Add to Cart
                </button>
            </div>
        `;

        list.appendChild(li);
    });

    container.classList.remove("hidden");
}
function handleAddToCart(itemName) {
    if (isLoggedIn) {
        addToCart(itemName);
    } else {
        toggleLoginModal(); // Show login modal
    }
}

document.addEventListener('DOMContentLoaded', updateCartCount);

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

function addToCart(itemName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name: itemName, qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`✅ ${itemName} added to cart`);

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

function signOut() {
    isLoggedIn = false;
    localStorage.removeItem("isLoggedIn"); // ✅ clear login state
    localStorage.removeItem("cart"); // optional
    updateCartCount();
    updateAuthUI();
    showToast("👋 You have been signed out.");
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    updateAuthUI();
});


function goToCart() {
    window.location.href = 'cart.html';
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




function scrollToSearch() {
    const element = document.getElementById("searchSection");
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

//login validation
function isValidEmail(email, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        message.textContent = "❌ Invalid email address!";
        message.style.color = "red";
        return false;
    }
    return true;
}
//phone number validation
function isValidPhonenumber(number, message) {
    const phonenoRegex = /^\+?[0-9]{7,15}$/;
    if (!phonenoRegex.test(number)) {
        message.textContent = "❌ Invalid phone number!";
        message.className = "mt-4 text-red-600 font-semibold text-center";
        return false;
    }
    return true;
}
// password validation
function confirmPassword(password, confPassword, message) {
    if (password !== confPassword) {
        message.textContent = "❌ Passwords do not match!";
        message.className = "mt-4 text-red-600 font-semibold text-center";
        return false;
    }
    return true;
}



//Login
function login() {
    let message = document.getElementById("loginMessage");
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (!isValidEmail(email, message)) {
        return false;
    }

    if (email === "priya@gmail.com" && password === "123") {
        message.textContent = "✅ Login Successfully!";
        message.className = "mt-4 text-green-600 font-semibold text-center";
        isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.removeItem('cart');
        updateCartCount();

        // Close modal after a short delay
        setTimeout(() => {
            closeModal("loginModal");
            message.textContent = "";
            updateAuthUI();
        }, 1000);

        return false; // Prevent form submission and page reload
    } else {
        message.textContent = "❌ Invalid Email or Password!";
        message.className = "mt-4 text-red-600 font-semibold text-center";
        return false;
    }
}

function register() {
    let regmessage = document.getElementById("registerMessage");
    let email = document.getElementById("registerEmail").value;
    let number = document.getElementById("phoneNumber").value;
    let password = document.getElementById("registerPassword").value;
    let confPassword = document.getElementById("confirmPassword").value;

    if (!isValidEmail(email, regmessage) || !isValidPhonenumber(number, regmessage) || !confirmPassword(password, confPassword, regmessage)) {
        return false;
    }

    closeModal("registerModal");
    toggleOTPModal();
    return false;

}
function verifyOTP() {
    const otp = document.getElementById("otp").value;
    const message = document.getElementById("otpMessage");

    if (otp === "123456") {
        message.textContent = "✅ OTP verified successfully!";
        message.className = "mt-4 text-green-600 font-semibold text-center";

        // Set login state
        isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true");
        updateAuthUI();

        // Close OTP modal after short delay
        setTimeout(() => {
            closeModal("otpModal");
            message.textContent = "";
        }, 1000);
    } else {
        message.textContent = "❌ Invalid OTP. Please try again.";
        message.className = "mt-4 text-red-600 font-semibold text-center";
    }

    return false; // prevent form reload
}
