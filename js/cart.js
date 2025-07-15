const menuPrices = {
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
        //const price = menuPrices[item.name.trim()] || 0;
        let updatedPrices = JSON.parse(localStorage.getItem("updatedPrices")) || {};
        let dynamicPrice = 0;

        for (const restaurant in updatedPrices) {
            const itemInfo = updatedPrices[restaurant].find(i => i.name.trim() === item.name.trim());
            if (itemInfo) {
                dynamicPrice = parseFloat(itemInfo.price.replace("$", "")) || 0;
                break;
            }
        }

        const price = dynamicPrice || 0;

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

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            showToast("🛒 Your cart is empty. Redirecting to Home menu...");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);

        }
        else {
            showToast("🚀 Proceeding to payment gateway...");
            setTimeout(() => {
                window.location.href = "payment.html";
            }, 2000);
        }
    });
});


// On page load
loadCart();


