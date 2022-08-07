let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem('data')) || [];

//copy lai function tinh total do trong gio hang
let cartTotal = () => {
    let cartIcon = document.querySelector(".cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
  }
  
cartTotal();


//function tao ra cac item trong gio hang
let generateCartItems = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x)=> {
            let { id, item } = x;
            let search = shopData.find((y) => y.id === id) || []
            return `
            <div class = 'cart-items'> 
                <img width="100" src="${search.img}" />
                <div class="details">

                <div class="title-price-x"> 
                    <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">${search.price}</p>
                    </h4>
                    <p onclick="removeItem(${id})">X</p>
                </div>

                <div class="cart-buttons"> 
                    <div>
                    <span>Qty:</span>  
                    <input id=quant-${id} class="quantity" type="number" min="0"  value="${item}" onchange="updateFunc(${id},this.value)"/>
                    </div>
                </div>
                <h3>${item * search.price}</h3>
                </div>
            </div>
            `;
        }).join("");
    }
    else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href = "index.html">
            <button class="homeBtn"> Continue shopping </button>
        </a>
        `;
    }
}

generateCartItems();

//function update gio hang
let updateFunc = (id,val) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem)
    search.item = +val;
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    totalAmount();
    cartTotal();
}

//function xoa item trong gio hang
let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    totalAmount();
    cartTotal();
}

//function tinh tong tien hoa don
let totalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x + y, 0);
        label.innerHTML = `
        <h2>Total: ${amount}VND</h2>
        <a href = "index.html">
            <button class="homeBtn"> Continue shopping </button>
        </a>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear all</button>
        `
    } else return
}

totalAmount();

//function xoa het items trong gio hang
let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}