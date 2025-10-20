var total = 0;
var cartList = document.getElementById("cart-items");
var totalDisplay = document.getElementById("total-price");
var buttons = document.getElementsByClassName("add-to-cart");

for (var i = 0; i < buttons.length; i++){
  buttons[i].onclick = function() {
    var product = this.parentElement;
    var name = product.getElementsByTagName("h3")[0].innerText;
    var priceText = product.getElementsByClassName("price")[0].innerText;
    var price = parseInt(priceText.replace(/\D/g, ""));

    var newItem = document.createElement("li");
    newItem.innerText = name + " - " + price.toLocaleString() + " ریال";
    cartList.appendChild(newItem);

    total += price;
    totalDisplay.innerText = "مجموع: " + total.toLocaleString() + " ریال";
  };
}

const inFrom = document.getElementById('inFrom');
const name = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const address = document.getElementById('address');

inFrom.addEventListener('submit',
  function(event){
    event.preventDefault();


   const nameValue =name.value.trim();
   const emailValue =email.value.trim();
   const numberValue =number.value.trim();
   const addressValue =address.value.trim();

   if(nameValue !== "" && emailValue !== "" && numberValue !== "" && addressValue !== ""){
    alert(
      "✅ اطلاعات ثبت شد!\n\n" +
      "نام: " + name + "\n" +
      "ایمیل: " + email + "\n" +
      "آدرس: " + address + "\n"+
      "شماره تلفن:" + number 
    );

  
    inFrom.reset();
  } else {
    alert("⚠ لطفاً همه فیلدها را پر کنید.");
  }
  });