window.onload = function () {
  const status = localStorage.getItem("paymentStatus");
  const user = localStorage.getItem("loggedInUser");

  if (status === "success" && user) {
    document.getElementById("paymentModal").classList.remove("hidden");
    localStorage.removeItem("paymentStatus");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) return;


    const allOrders = JSON.parse(localStorage.getItem("recentOrders")) || {};
    if (!Array.isArray(allOrders[user])) {
      allOrders[user] = [];
    }

    const newOrder = {
      id: "ORD" + Date.now(),
      date: new Date().toLocaleString(),
      user: user,
      items: cart.map(item => ({
        name: item.name,
        qty: item.qty,
        price: menuPrices[item.name] || 0
      })),
      status: "preparing"
    };

    allOrders[user].push(newOrder);
    localStorage.setItem("recentOrders", JSON.stringify(allOrders));


    localStorage.removeItem("cart");
    localStorage.removeItem(`currentOrder_${user}`);
  }
};


function closeModal() {
  document.getElementById("paymentModal").classList.add("hidden");
}
document.getElementById("paymentModal").classList.remove("hidden");