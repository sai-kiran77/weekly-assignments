const cartBtn = document.querySelector('.cart');
const strip = document.querySelector('.strip')
// const closeStrip = document.querySelector('.close')
const cartItemsDisplay = document.querySelector('.cart-number')
const cartPrice = document.querySelector('.price-number')
const wholesalers = document.querySelector('#wholesalers')

const cartItems = localStorage.getItem('cart') || '{}';
const parsedCartItems = JSON.parse(cartItems)
let stripeDisplay = null;
let totalPrice = null;

if (location.href.endsWith('app.html')) {
    cartBtn ? cartBtn.addEventListener('click', (e) => {
        location.href = `../html/checkout.html?whsId=${wholesalersDropdown.value}&outId=${outletsDropdown.value}&userId=${userId}`
    }) : null;

    // closeStrip ? closeStrip.addEventListener('click', () => {
    //     strip.style.display = 'none'
    // }) : null
}
const stripeDetails = (value) => {
    const productData = JSON.parse(localStorage.getItem('requiredData'))
    // productData.forEach(obj => {
    // if (obj.whsId == wholesalersDropdown.value && obj.quantity > 0) {
    // stripeDisplay = true;
    // const cartItem = parsedCartItems.find(object => {
    //     return object.whsId == obj.whsId && obj.categoryId == object.categoryId && object.productId === obj.productId 
    // })
    const whsId = wholesalers ? wholesalersDropdown.value : value;
    const cartItems = productData.filter(object => object.whsId == whsId &&
        object.quantity > 0)
        // console.log(cartItems);
    // parsedCartItems[whsId] = cartItems
    // console.log(cartItem);
    // if(!cartItem){
    //     console.log('push');
    //     parsedCartItems.push(obj)
    // }else{
    //     console.log('else');
    //     cartItem.quantity = obj.quantity
    // }
    // }
    // })
    localStorage.setItem('cart', JSON.stringify(cartItems))
    if (location.href.endsWith('app.html')) {
        stripeDisplay = cartItems.length > 0
        strip.style.display = stripeDisplay ? 'flex' : 'none';

        cartItemsDisplay.innerText = cartItems.length;
        cartPrice.innerText = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
    if(location.href.search('checkout.html')>=0){
        updatePrice()
    }
}