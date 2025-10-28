// متغیرهای اصلی
var total = 0;
var cartList = document.getElementById("cart-items");
var totalDisplay = document.getElementById("total-price");
var buttons = document.getElementsByClassName("add-to-cart");
var cartCount = document.getElementById("cart-count");
var itemCount = 0;

var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// تابع حذف محصول از سبد خرید
function removeCartItem(name, price, liElement) {
  liElement.style.transition = "all 0.3s ease";
  liElement.style.opacity = "0";
  liElement.style.transform = "translateX(-50px)";

  setTimeout(() => {
    cartList.removeChild(liElement);
  }, 300);

  total -= price;
  itemCount--;
  totalDisplay.innerText = "مجموع:" + total.toLocaleString() + " ریال";
  cartCount.innerText = "(" + itemCount + ")";

  cartItems = cartItems.filter(item => !(item.name === name && item.price === price));
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartTotal", total);
}

// تابع ساخت آیتم سبد خرید با دکمه حذف
function createCartItemElement(item) {
  const li = document.createElement("li");
  li.textContent = item.name + " - " + item.price.toLocaleString() + " ریال ";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.className = "remove-item";
  li.appendChild(removeBtn);

  removeBtn.addEventListener('click', function() {
    removeCartItem(item.name, item.price, li);
  });

  return li;
}

// بارگذاری آیتم‌ها از localStorage
window.addEventListener('load', function() {
  // اطلاعات کاربر
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

  // بارگذاری سبد خرید
  const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  savedCart.forEach(item => {
    const li = createCartItemElement(item);
    cartList.appendChild(li);
    total += item.price;
    itemCount++;
  });

  totalDisplay.innerText = "مجموع:" + total.toLocaleString() + " ریال";
  cartCount.innerText = "(" + itemCount + ")";
});

// افزودن محصول جدید به سبد خرید
for (var i = 0; i < buttons.length; i++){
  buttons[i].onclick = function() {
    var product = this.parentElement;
    var name = product.getElementsByTagName("h3")[0].innerText;
    var priceText = product.getElementsByClassName("price")[0].innerText;
    var price = parseInt(priceText.replace(/\D/g, ""));

    var newItemObj = { name: name, price: price };
    cartItems.push(newItemObj);

    var newLi = createCartItemElement(newItemObj);
    cartList.appendChild(newLi);

    total += price;
    totalDisplay.innerText = "مجموع:" + total.toLocaleString() + " ریال";

    itemCount++;
    cartCount.innerText = "(" + itemCount + ")";

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartTotal", total);
  }; 
}

// فرم اطلاعات کاربر
const infoForm = document.getElementById('infoForm');
infoForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const numberInput = document.getElementById('number');
  const addressInput = document.getElementById('address');

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const numberValue = numberInput.value.trim();
  const addressValue = addressInput.value.trim();

  if(nameValue && emailValue && numberValue && addressValue) {
    localStorage.setItem("userName", nameValue);
    localStorage.setItem("userEmail", emailValue);
    localStorage.setItem("userNumber", numberValue);
    localStorage.setItem("userAddress", addressValue);

    alert(
      "✅ اطلاعات ثبت شد!\n\n" +
      "نام: " + nameValue + "\n" +
      "ایمیل: " + emailValue + "\n" +
      "شماره تلفن: " + numberValue + "\n" +
      "آدرس: " + addressValue
    );

    infoForm.reset();
  } else {
    alert("⚠ لطفاً همه فیلدها را پر کنید.");
  }
});

// حذف اطلاعات ذخیره‌شده
const clearButton = document.getElementById('clear-data');
clearButton.addEventListener('click' , function(){
  if (confirm("آیا مطمئن هستید که میخواهید اطلاعات را حذف کنید؟")){
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userNumber");
    localStorage.removeItem("userAddress");

    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('number').value = "";
    document.getElementById('address').value = "";

    alert("✅اطلاعات ذخیره شده با موفقیت حذف شد");
  }
});

// دکمه ثبت نهایی سفارش
const confirmOrder = document.getElementById('confirm-order');
confirmOrder.addEventListener('click', function(event) {
  event.preventDefault(); // جلوگیری از ارسال فرم

  if (cartItems.length === 0) {
    alert("❌ سبد خرید شما خالی است!");
    return;
  }

  const nameValue = localStorage.getItem("userName") || "";
  const addressValue = localStorage.getItem("userAddress") || "";

  if (!nameValue || !addressValue) {
    alert("⚠ لطفاً ابتدا اطلاعات کاربر را وارد کنید!");
    return;
  }

  alert(
    "✅ سفارش شما با موفقیت ثبت شد!\n\n" +
    "مشتری: " + nameValue + "\n" +
    "آدرس: " + addressValue + "\n" +
    "مجموع پرداختی: " + total.toLocaleString() + " ریال"
  );

  // پاک‌کردن اطلاعات پس از ثبت نهایی
  localStorage.clear();
  cartList.innerHTML = "";
  totalDisplay.innerText = "مجموع: 0 ریال";
  cartCount.innerText = "(0)";
  itemCount = 0;
  total = 0;
});
