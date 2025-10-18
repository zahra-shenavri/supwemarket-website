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
