const orders = JSON.parse(localStorage.getItem("recentOrders")) || {};

document.addEventListener("DOMContentLoaded", () => {
    const signOutBtn = document.getElementById("signOutBtn");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (isAdmin) {
        signOutBtn.classList.remove("hidden");
    }
});

function renderOrders() {
    const container = document.getElementById("ordersContainer");
    container.innerHTML = "";

    Object.keys(orders).forEach(userEmail => {
        orders[userEmail].forEach(order => {
            const card = document.createElement("div");
            card.className = "bg-white shadow-md rounded-lg p-6";

            const itemsHtml = order.items.map(item =>
                `<li>${item.name} x ${item.qty}</li>`).join("");
            console.log('orderstatus' + order.id + " -- " + order.status);

            card.innerHTML = `
            <h2 class="text-xl font-bold text-pink-700">Order: ${order.id}</h2>
            <p><strong>User:</strong> ${userEmail}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <ul class="ml-4 list-disc">${itemsHtml}</ul>
            <div class="mt-4">
              <label class="font-semibold mr-2">Status:</label>
              <select onchange="updateStatus('${userEmail}', '${order.id}', this.value)"
                class="border rounded px-3 py-1">
                <option ${order.status?.toLowerCase() === "pending" ? "selected" : ""}>Pending</option>
                <option ${order.status?.toLowerCase() === "preparing" ? "selected" : ""}>Preparing</option>
                <option ${order.status?.toLowerCase() === "delivered" ? "selected" : ""}>Delivered</option>
                <option ${order.status?.toLowerCase() === "cancelled" ? "selected" : ""}>Cancelled</option>
              </select>
            </div>
          `;
            container.appendChild(card);
        });
    });
}

function updateStatus(email, orderId, newStatus) {
    const orders = JSON.parse(localStorage.getItem("recentOrders")) || {};
    if (orders[email]) {
        const order = orders[email].find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            localStorage.setItem("recentOrders", JSON.stringify(orders));
            showToast("✅ Status updated");
        }
    }
}

renderOrders();