// 🛒 متغیرهای اصلی
var total = 0;
var cartList = document.getElementById("cart-items");
var totalDisplay = document.getElementById("total-price");
var buttons = document.getElementsByClassName("add-to-cart");
var cartCount = document.getElementById("cart-count");
var itemCount = 0;

var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// حذف محصول از سبد خرید
function removeCartItem(index, liElement) {
  liElement.style.transition = "all 0.3s ease";
  liElement.style.opacity = "0";
  liElement.style.transform = "translateX(-50px)";

  setTimeout(() => {
    cartList.removeChild(liElement);
  }, 300);

  total -= cartItems[index].price;
  itemCount--;
  totalDisplay.innerText = "مجموع:" + total.toLocaleString() + " ریال";
  cartCount.innerText = "(" + itemCount + ")";

  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// ساخت آیتم سبد خرید
function createCartItemElement(item, index) {
  const li = document.createElement("li");
  li.textContent = item.name + " - " + item.price.toLocaleString() + " ریال ";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.className = "remove-item";
  li.appendChild(removeBtn);

  removeBtn.addEventListener('click', function() {
    removeCartItem(index, li);
  });

  return li;
}

// بارگذاری اطلاعات ذخیره‌شده
function loadCart() {
  cartList.innerHTML = "";
  total = 0;
  itemCount = 0;

  cartItems.forEach((item, idx) => {
    const li = createCartItemElement(item, idx);
    cartList.appendChild(li);
    total += item.price;
    itemCount++;
  });

  totalDisplay.innerText = "مجموع:" + total.toLocaleString() + " ریال";
  cartCount.innerText = "(" + itemCount + ")";
}

window.addEventListener('load', function() {
  // بارگذاری سبد خرید
  loadCart();

  // بارگذاری اطلاعات کاربر
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const numberInput = document.getElementById('number');
  const addressInput = document.getElementById('address');

  const savedName = localStorage.getItem("userName");
  const savedEmail = localStorage.getItem("userEmail");
  const savedNumber = localStorage.getItem("userNumber");
  const savedAddress = localStorage.getItem("userAddress");

  if(savedName) nameInput.value = savedName;
  if(savedEmail) emailInput.value = savedEmail;
  if(savedNumber) numberInput.value = savedNumber;
  if(savedAddress) addressInput.value = savedAddress;
});

// افزودن محصول به سبد خرید
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    const product = this.parentElement;
    const nameElement = product.querySelector("h3, h2");
    const name = nameElement ? nameElement.innerText : "محصول بدون نام";

    const priceElement = product.querySelector(".price");
    const price = priceElement ? parseInt(priceElement.innerText.replace(/\D/g, "")) : 0;

    const newItemObj = { name: name, price: price };
    cartItems.push(newItemObj);

    loadCart(); // بازسازی سبد خرید
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartTotal", total);
  });
}

// فرم اطلاعات کاربر
const infoForm = document.getElementById('infoForm');
infoForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const nameValue = document.getElementById('name').value.trim();
  const emailValue = document.getElementById('email').value.trim();
  const numberValue = document.getElementById('number').value.trim();
  const addressValue = document.getElementById('address').value.trim();

  if(nameValue && emailValue && numberValue && addressValue) {
    localStorage.setItem("userName", nameValue);
    localStorage.setItem("userEmail", emailValue);
    localStorage.setItem("userNumber", numberValue);
    localStorage.setItem("userAddress", addressValue);
    alert("✅ اطلاعات ثبت شد!");
    infoForm.reset();
  } else {
    alert("⚠ لطفاً همه فیلدها را پر کنید.");
  }
});

// حذف اطلاعات کاربر
const clearButton = document.getElementById('clear-data');
clearButton.addEventListener('click', function() {
  if(confirm("آیا مطمئن هستید؟")){
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userNumber");
    localStorage.removeItem("userAddress");
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('number').value = "";
    document.getElementById('address').value = "";
    alert("✅ اطلاعات حذف شد");
  }
});

// ثبت نهایی سفارش
const confirmOrder = document.getElementById('confirm-order');
confirmOrder.addEventListener('click', function(e) {
  e.preventDefault();
  if(cartItems.length === 0) { alert("❌ سبد خرید شما خالی است!"); return; }

  const nameValue = localStorage.getItem("userName") || "";
  const addressValue = localStorage.getItem("userAddress") || "";
  if(!nameValue || !addressValue) { alert("⚠ لطفاً اطلاعات کاربر را وارد کنید!"); return; }

  alert("✅ سفارش ثبت شد!\nمشتری: " + nameValue + "\nآدرس: " + addressValue + "\nمجموع: " + total.toLocaleString() + " ریال");
  localStorage.clear();
  cartItems = [];
  loadCart();
});
