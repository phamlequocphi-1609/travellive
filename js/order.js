document.addEventListener("DOMContentLoaded", function () {
  const orderItems = document.getElementById("order-items");
  const subtotalElem = document.getElementById("subtotal");
  const totalElem = document.getElementById("total");
  const deliveryFee = 2.0;

  let items = [
    { name: "Taco", price: 5.0, quantity: 1 },
    { name: "Burrito", price: 7.5, quantity: 1 },
  ];

  function updateOrder() {
    orderItems.innerHTML = "";
    let subtotal = 0;
    items.forEach((item, index) => {
      subtotal += item.price * item.quantity;
      orderItems.innerHTML += `
                        <div class="order-items">
                            <span>${item.name} - $${item.price.toFixed(
        2
      )}</span>
                            <div>
                                <button onclick="changeQuantity(${index}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="changeQuantity(${index}, 1)">+</button>
                                <button onclick="removeItem(${index})">❌</button>
                            </div>
                        </div>
                    `;
    });
    subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    totalElem.textContent = `$${(subtotal + deliveryFee).toFixed(2)}`;
  }

  window.changeQuantity = function (index, delta) {
    items[index].quantity += delta;
    if (items[index].quantity <= 0) {
      if (confirm("Do you want to remove this item?")) {
        items.splice(index, 1);
      } else {
        items[index].quantity = 1;
      }
    }
    updateOrder();
  };

  window.removeItem = function (index) {
    if (confirm("Are you sure you want to remove this item?")) {
      items.splice(index, 1);
      updateOrder();
    }
  };

  document
    .getElementById("place-order-btn")
    .addEventListener("click", function () {
      if (items.some((item) => item.quantity === 0)) {
        alert("Some items have zero quantity. Remove them before ordering.");
      } else {
        alert("Order placed successfully!");
      }
    });

  updateOrder();
});
