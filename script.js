let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

// open cart
cartIcon.addEventListener('click', () => {
    cart.classList.add('active')
})
// close cart
closeCart.addEventListener('click', () => {
    cart.classList.remove('active')
})


// cart working js
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready) 
    
}else{
    ready();
}

// making function
function ready() {
    //remove items from cart
    let removeCartButtons = document.querySelectorAll('.cart-remove')

    removeCartButtons.forEach(element => {
        element.addEventListener('click', removeCartItem)
    })

    // quantity chages
    var quantityInputs = document.querySelectorAll('.cart-quantity');
    quantityInputs.forEach(element => {
        var input = element;
        input.addEventListener('change', quantityChanged)
    })
    //Add to cart
    var addCart = document.querySelectorAll('.add-cart')
     addCart.forEach(item => {
        var button = item;
        button.addEventListener('click', addCartClicked)
     })

    //  Buy button Working
    document.querySelectorAll('.btn-buy')[0].addEventListener('click', buyButtonClicked )
}
// ****************************  functions start ********************************
//remove items from cart
    function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    updateTotal();
 }
//quantity changed function
function quantityChanged(event) {
  var input = event.target
  if(isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateTotal()
}
// add to cart function
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.querySelectorAll('.product-title')[0].innerText
  var price = shopProducts.querySelectorAll('.price')[0].innerText
  var productImg = shopProducts.querySelectorAll('.product-img')[0].src
//    console.log(title,price,productImg);
   addProductToCart(title,price,productImg);
   updateTotal();
}
function addProductToCart(title,price,productImg) {
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box') 
    var cartItems = document.querySelectorAll('.cart-content')[0];
    var cartItemsNames = cartItems.querySelectorAll('.cart-product-title')
    cartItemsNames.forEach(e => {
        // alert('!bu karti zaten eklediniz')
        return;
    })
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- remove cart -->
    <i class="bx bxs-trash-alt cart-remove"></i>
`
   cartShopBox.innerHTML = cartBoxContent;
   cartItems.append(cartShopBox)
   cartShopBox.querySelectorAll('.cart-remove')[0].addEventListener('click',removeCartItem)
   cartShopBox.querySelectorAll('.cart-quantity')[0].addEventListener('change',quantityChanged)
}

//  update total
function updateTotal() {
    var cartContent = document.querySelectorAll('.cart-content')[0]
    var cartBoxes = cartContent.querySelectorAll('.cart-box')
    var total = 0;
 
    cartBoxes.forEach(element => {
        var cartBox = element;
        var priceElement = cartBox.querySelectorAll('.cart-price')[0]
        var quantityElement = cartBox.querySelectorAll('.cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('£', ''))
        var quantity = quantityElement.value;
        total = total +  (price * quantity);
    })
        // if price contain some cents valu
        total = Math.round(total * 100) / 100
        document.querySelectorAll('.total-price')[0].innerText = '£' + total;
    
}

function buyButtonClicked() {
    alert('Siparişiniz Alındı');
    var cartContent = document.querySelectorAll('.cart-content')[0]
    while(cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal();
}
// ****************************  functions End ********************************