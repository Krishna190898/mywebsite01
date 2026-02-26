window.onload = function () {

    updateCartCount();
    checkLoginStatus();

    let params = new URLSearchParams(window.location.search);
    let productId = params.get("id");

    if (productId) {
        fetchProduct(productId);
    }
};


// FETCH PRODUCT
function fetchProduct(id) {

    fetch("https://fakestoreapi.com/products/" + id)
        .then(res => res.json())
        .then(product => {
            showProduct(product);
        })
        .catch(err => console.log(err));
}


// SHOW PRODUCT DETAILS
function showProduct(product) {

    let container = document.getElementById("productDetails");

    container.innerHTML = `
        <div class="product-container">
            
            <div class="product-image">
                <img src="${product.image}">
            </div>

            <div class="product-info">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <div class="product-price">₹ ${product.price}</div>
                <button class="add-cart-btn" onclick='addToCart(${JSON.stringify(product)})'>
                    Add To Cart
                </button>
            </div>

        </div>
    `;
}


// ADD TO CART
function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert("Product Added To Cart ✅");
}


// UPDATE CART COUNT
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item => total += item.quantity);

    document.getElementById("cartCount").innerText = total;
}


// LOGIN CHECK
function checkLoginStatus() {

    let loginStatus = sessionStorage.getItem("isLoggedIn");
    let username = sessionStorage.getItem("username");

    if (loginStatus === "true" && username) {

        document.getElementById("registerBtn").style.display = "none";

        let userArea = document.getElementById("userArea");
        userArea.style.display = "inline";
        userArea.innerText = username;
    }
}


// NAVIGATION
function goHome() {
    window.location.href = "index.html";
}

function goToRegister() {
    window.location.href = "registration.html";
}