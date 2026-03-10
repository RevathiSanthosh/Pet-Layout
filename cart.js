let cart = JSON.parse(localStorage.getItem("cart")) || [];

let shippingCost = 99;
let discount = 0;

/* LOAD CART */
function loadCart(){

let cartBody = document.getElementById("cartItems");
cartBody.innerHTML = "";

cart.forEach((item,index)=>{

let qty = item.qty || 1;
let subtotal = item.price * qty;

cartBody.innerHTML += `
<tr>
<td><button onclick="removeItem(${index})">X</button></td>

<td>${item.name}</td>

<td>₹${item.price}</td>

<td>
<button onclick="changeQty(${index},-1)">-</button>
${qty}
<button onclick="changeQty(${index},1)">+</button>
</td>

<td>₹${subtotal}</td>
</tr>
`;

});

calculateTotal();

}

/* REMOVE ITEM */

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

}

/* CHANGE QUANTITY */

function changeQty(index,value){

if(!cart[index].qty){
cart[index].qty = 1;
}

cart[index].qty += value;

if(cart[index].qty <= 0){
cart[index].qty = 1;
}

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

}

/* CALCULATE TOTAL */

function calculateTotal(){

let subtotal = 0;

cart.forEach(item=>{
let qty = item.qty || 1;
subtotal += item.price * qty;
});

document.getElementById("subtotalPrice").innerText = "₹" + subtotal;

let total = subtotal - discount + shippingCost;

document.getElementById("totalPrice").innerText = "₹" + total;

}

/* APPLY COUPON */

function applyCoupon(){

let code = document.getElementById("couponCode").value.trim().toUpperCase();

let subtotal = 0;

cart.forEach(item=>{
let qty = item.qty || 1;
subtotal += item.price * qty;
});

discount = 0;
shippingCost = 99;

if(code === "SAVE10"){

discount = subtotal * 0.10;
alert("Coupon Applied : 10% Discount");

}

else if(code === "PET20"){

discount = subtotal * 0.20;
alert("Coupon Applied : 20% Discount");

}

else if(code === "FREESHIP"){

shippingCost = 0;
alert("Free Shipping Applied");

}

else{

alert("Invalid Coupon Code");
return;

}

document.getElementById("discountPrice").innerText = "-₹" + discount;

calculateTotal();

}

/* INITIAL LOAD */

loadCart();