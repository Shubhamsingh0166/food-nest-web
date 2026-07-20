const cart = {};

function addToCart(name, price) {
    if (cart[name]) {
        cart[name].qty++;
    } else {
        cart[name] = {
            price: price,
            qty: 1
        };
    }

    updateCart();
}

function increase(name) {
    cart[name].qty++;
    updateCart();
}

function decrease(name) {
    cart[name].qty--;

    if (cart[name].qty <= 0) {
        delete cart[name];
    }

    updateCart();
}

function removeItem(name) {
    delete cart[name];
    updateCart();
}

function updateCart() {

    let items = document.getElementById("cartItems");
    let total = 0;
    let count = 0;

    items.innerHTML = "";

    for (let name in cart) {

        let item = cart[name];

        total += item.price * item.qty;
        count += item.qty;

        items.innerHTML += `
        <div class="cart-item" style="display:block;margin-bottom:18px;border-bottom:1px solid #333;padding-bottom:10px;">

            <strong>${name}</strong>

            <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center;">

                <div>

                    <button onclick="decrease('${name}')">−</button>

                    <span style="padding:0 10px;">
                        ${item.qty}
                    </span>

                    <button onclick="increase('${name}')">+</button>

                </div>

                <div>

                    ₹${item.price * item.qty}

                </div>

            </div>

            <button
            onclick="removeItem('${name}')"
            style="
            margin-top:8px;
            background:red;
            color:white;
            border:none;
            padding:6px 12px;
            border-radius:6px;
            cursor:pointer;">
            Remove
            </button>

        </div>
        `;
    }

    if (count == 0) {
        items.innerHTML = "No Items Added";
    }

    document.getElementById("count").innerHTML = count;
    document.getElementById("total").innerHTML = total;
}


/* SEARCH */

const search = document.querySelector(".search-box input");

search.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {

        let text = card.querySelector("h3").innerText.toLowerCase();

        if (text.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});


/* CATEGORY FILTER */

const buttons = document.querySelectorAll(".categories button");

buttons.forEach(btn => {

    btn.addEventListener("click", function () {

        let category = this.innerText.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {

            let name = card.querySelector("h3").innerText.toLowerCase();

            if (category == "all") {

                card.style.display = "block";

            } else if (name.includes(category)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});

function openPopup(){
    document.getElementById("checkoutPopup").style.display = "flex";
}

function closePopup(){
    document.getElementById("checkoutPopup").style.display = "none";
}