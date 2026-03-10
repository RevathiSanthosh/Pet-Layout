let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image){

let existing = cart.find(item => item.name === name);

if(existing){

existing.qty += 1;

}else{

cart.push({
name:name,
price:price,
image:image,
qty:1
});

}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

alert("Item added to cart 🛒");

}

function updateCartCount(){

document.getElementById("cartCount").innerText = cart.length;

}

updateCartCount();