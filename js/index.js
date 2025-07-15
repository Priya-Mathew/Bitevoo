

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
    const modal = document.getElementById("otpModal");
    modal.classList.remove("hidden");
}
function closeModal(id) {
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

const restaurantMenus = {
    "Mario's Pizza": [
        { name: "Margherita Pizza", price: "$17", image: "./images/Menu/margherita-pizza.jpg" },
        { name: "Pepperoni Pizza", price: "$20", image: "./images/Menu/Pepperoni-Pizza.jpg" },
        { name: "Veggie Delight Pizza", price: "$11", image: "./images/Menu/VeggieDelight.webp" },
        { name: "BBQ Pizza", price: "$10", image: "./images/Menu/BBQ-Chicken-Pizza.jpg" },
        { name: "Lasagna Pizza", price: "$18", image: "./images/Menu/Pizza-Lasagna.jpg" },
        { name: "Grandma Pizza", price: "$15", image: "./images/Menu/Grandma Pizza.webp" },

    ],
    "Chick-fil-A": [
        { name: "Burger", price: "$17", image: "./images/Menu/Chick-fil-a-Sandwiches.webp" },
        { name: "Salad", price: "$20", image: "./images/Menu/Chick-fil-A-Salad.jpg" },
        { name: "Wraps", price: "$11", image: "./images/Menu/Chick-Fil-A-Cool-Wrap.webp" },
        { name: "Dessert", price: "$10", image: "./images/Menu/Chick-Fil-A-Brownies.jpg" },
        { name: "Milk Shake", price: "$15", image: "./images/Menu/chick-fil-a-strawberry-milkshake.jpg" },
        { name: "Nuggets ", price: "$18", image: "./images/Menu/Nuggets_Chick.jpg" },
    ],
};



function goToCart() {
    window.location.href = 'cart.html';
}

// Call it on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedMenus = JSON.parse(localStorage.getItem("updatedPrices"));
    if (savedMenus) {
        Object.assign(restaurantMenus, savedMenus);
    }

    updateCartCount();
});



function showMenu(restaurantName) {
    const container = document.getElementById("foodItemsContainer");
    const list = document.getElementById("foodList");
    const foods = restaurantMenus[restaurantName] || [];
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    list.innerHTML = ""; // Clear previous

    foods.forEach(item => {
        const li = document.createElement("li");
        li.className = "bg-white rounded-2xl shadow-md overflow-hidden";

        li.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-cover" />
    <div class="p-4">
        <h4 class="text-lg font-bold text-gray-800 mb-1">${item.name}</h4>
        <p class="text-pink-700 font-semibold mb-3" id="price-${item.name}">${item.price}</p>

        ${isAdmin ? `
        <input type="text" placeholder="New Price" id="new-price-${item.name}" 
               class="border rounded px-2 py-1 mb-2 text-sm w-24">
        <button onclick="updatePrice('${item.name}')"
                class="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-800 ml-2">
            Update Price
        </button>` : ''}

        ${!isAdmin ? `
    <button onclick="handleAddToCart('${item.name}')"
        class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-800 mt-2 block">
        Add to Cart
    </button>` : ''}

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
function updatePrice(itemName) {
    const newPrice = document.getElementById(`new-price-${itemName}`).value;
    if (!newPrice.startsWith("$")) {
        showToast("❌ Price must start with $");
        return;
    }

    // Update in-memory menu
    for (const restaurant in restaurantMenus) {
        const item = restaurantMenus[restaurant].find(i => i.name === itemName);
        if (item) {
            item.price = newPrice;
        }
    }

    // Update DOM
    document.getElementById(`price-${itemName}`).textContent = newPrice;

    // Persist updated prices
    localStorage.setItem("updatedPrices", JSON.stringify(restaurantMenus));

    showToast(`✅ Price for ${itemName} updated to ${newPrice}`);
}


//document.addEventListener('DOMContentLoaded', updateCartCount);

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

function addToCart(itemName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name.trim() === itemName.trim());

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name: itemName, qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`✅ ${itemName} added to cart`);

    const user = localStorage.getItem("loggedInUser");
    if (user) {
        const currentOrderKey = `currentOrder_${user}`;
        let currentOrder = JSON.parse(localStorage.getItem(currentOrderKey)) || {
            id: "ORD" + Date.now(),
            date: new Date().toLocaleString(),
            items: []
        };

        const existingItem = currentOrder.items.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            currentOrder.items.push({ name: itemName, qty: 1 });
        }

        localStorage.setItem(currentOrderKey, JSON.stringify(currentOrder));
    }


}

function goToCart() {
    window.location.href = 'cart.html';
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

    if (email == null || email == '') {
        message.textContent = "❌ Please enter a valid email address!";
        message.style.color = "red";
        return false;
    }
    else if (password == null || password == '') {
        message.textContent = "❌ Please enter password!";
        message.style.color = "red";
        return false;
    }

    if (!isValidEmail(email, message)) {
        return false;
    }

    if (email === "admin@gmail.com" && password === "admin") {
        localStorage.setItem("isAdmin", "true");
    }

    if ((email === "abc@gmail.com" && password === "123") || (email === "cba@gmail.com" && password === "123") || (email === "admin@gmail.com" && password === "admin")) {
        message.textContent = "✅ Login Successfully!";
        message.className = "mt-4 text-green-600 font-semibold text-center";
        isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUser", email);   // ✅ Set unique user ID
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

    if (email == null || email == '') {
        message.textContent = "❌ Please enter a valid email address!";
        message.style.color = "red";
        return false;
    }
    else if (number == null || number == '') {
        message.textContent = "❌ Please enter your phone number!";
        message.style.color = "red";
        return false;
    }
    else if (password == null || password == '') {
        message.textContent = "❌ Please enter password!";
        message.style.color = "red";
        return false;
    }
    else if (confPassword == null || confPassword == '') {
        message.textContent = "❌ Please enter confirm password!";
        message.style.color = "red";
        return false;
    }

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
function goToRecentOrders() {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        showToast("⚠️ Please log in to view your recent orders.");
        toggleLoginModal(); // open login modal
        return;
    }

    const ordersKey = "recentOrders";
    const currentOrderKey = `currentOrder_${user}`;

    const allOrders = JSON.parse(localStorage.getItem(ordersKey) || "{}");
    const currentOrder = JSON.parse(localStorage.getItem(currentOrderKey));


    if (currentOrder && currentOrder.items.length > 0) {
        if (!allOrders[user]) allOrders[user] = [];
        allOrders[user].push(currentOrder);

        localStorage.setItem(ordersKey, JSON.stringify(allOrders));
        localStorage.removeItem(currentOrderKey);
        localStorage.removeItem("cart");
        updateCartCount();
    }

    window.location.href = "recentorder.html";
}

function goToAdminOrders() {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        showToast("⚠️ Please log in to view your recent orders.");
        toggleLoginModal(); // open login modal
        return;
    }
    else {
        window.location.href = "orderList.html";
    }
}