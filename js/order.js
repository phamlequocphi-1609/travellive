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

  updateOrder();

  const orderForm = document.getElementById("delivery-form");
  const placeOrderBtn = document.getElementById("place-order-btn");
  placeOrderBtn.addEventListener("click", function (event) {
    event.preventDefault();

    let isValid = true;
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const city = document.getElementById("city");
    const district = document.getElementById("district");
    const address = document.getElementById("address");

    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    function showError(input, message) {
      const errorElem = input.nextElementSibling;
      if (errorElem && errorElem.classList.contains("error-message")) {
        errorElem.textContent = message;
      }
      isValid = false;
    }

    if (!name.value.trim().match(/^[a-zA-ZÀ-ỹ\s]+$/)) {
      showError(name, "Vui lòng nhập tên hợp lệ.");
    }

    if (!phone.value.trim().match(/^(0|\+84)[3-9][0-9]{8}$/)) {
      showError(phone, "Số điện thoại không hợp lệ.");
    }

    if (!email.value.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showError(email, "Email không hợp lệ.");
    }

    if (city.value === "") {
      showError(city, "Vui lòng chọn thành phố.");
    }

    if (district.value === "") {
      showError(district, "Vui lòng chọn quận/huyện.");
    }

    if (address.value.trim().length < 5) {
      showError(address, "Địa chỉ phải có ít nhất 5 ký tự.");
    }

    if (items.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      isValid = false;
    }

    if (isValid) {
      alert("✅ Đơn hàng của bạn đã được xác nhận!");
      orderForm.submit();
    }
  });
});
