document.addEventListener("DOMContentLoaded", () => {
    const ordersContainer = document.getElementById("ordersContainer");
    const user = localStorage.getItem("loggedInUser");
    const orders = JSON.parse(localStorage.getItem("recentOrders") || "{}");


    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
        showToast("⚠️ Access denied. Please log in first.");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
        return;
    }

    const userOrders = orders[user] || [];


    if (userOrders.length === 0) {
        ordersContainer.innerHTML = `<p class="text-gray-600 text-lg">No recent orders found.</p>`;
        return;
    }

    userOrders.forEach((order, index) => {
        const orderDiv = document.createElement("div");
        orderDiv.className = "bg-white p-4 rounded shadow";

        const itemsHtml = order.items.map(item => `
            <p class="text-sm text-gray-800">${item.name} - Qty: ${item.qty}</p>
        `).join("");

        console.log('order status before' + order.status);
        const status = order.status || "Pending";
        console.log('order status after' + status);
        const statusClass = getStatusBadgeClass(status);

        orderDiv.innerHTML = `
           <div class="flex justify-between items-center mb-2">
        <p class="text-lg font-bold text-pink-800">Order ID: ${order.id}</p>
        <span class="text-xs px-3 py-1 rounded-full font-semibold ${statusClass}">
          ${status}
        </span>
      </div>
      <div class="text-sm text-gray-500 mb-2">${order.date}</div>
      ${itemsHtml}
        `;

        ordersContainer.appendChild(orderDiv);
    });
});

function getStatusBadgeClass(status) {
    switch (status.toLowerCase()) {
        case "pending": return "bg-yellow-100 text-yellow-800";
        case "preparing": return "bg-blue-100 text-blue-800";
        case "delivered": return "bg-green-100 text-green-800";
        case "cancelled": return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-800";
    }
}