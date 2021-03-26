const cardContainer = document.querySelector('.card-container')
const locationBtn = document.querySelector('.location-btn')
const locationErrorEle = document.querySelector('.location-error')
const nameErrorDiv = document.querySelector('.name-error')
const phoneErrorDiv = document.querySelector('.phone-error')
const emailErrorDiv = document.querySelector('.email-error')
const inputs = document.querySelectorAll('input')
const placeOrder = document.querySelector('.order')
const isFormValid = document.querySelector('.form-valid')
const totalPriceElement = document.querySelector('.price-number')

let phoneValid = false;
let nameValid = false;
let emailValid = false;
let locationValid = false;

const regexForEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const categoriesPreImgUrl = 'https://res.cloudinary.com/nfrnds/image/upload/fmcgdd'

// const cartItems = JSON.parse(localStorage.getItem('cart'))
// console.log(parsedCartItems);

const paramsObj = {}
const paramString = location.search
if (!paramString) location.replace('../html/app.html')
const params = paramString.slice(1)
// console.log(params);
const paramsArray = params.split('&')
paramsArray.forEach(string => {
    const [key, value] = string.split('=');
    paramsObj[key] = value;
})
// const [key, value] = params.split('=')
// console.log(key, value);
// console.log(paramsObj);

const updateCartItems = () => {
    if (localStorage.getItem('currentWhs') == paramsObj.whsId &&
        localStorage.getItem('currentOutlet') == paramsObj.outId &&
        JSON.parse(localStorage.getItem('userId')).userId == paramsObj.userId) {

        let parsedCartItems = JSON.parse(localStorage.getItem('cart'))
        Array.from(cardContainer.childNodes).forEach(e => e.remove())

        parsedCartItems.forEach(ele => {
            const div = document.createElement('div');
            const imgWrapperDiv = document.createElement('div');
            const img = document.createElement('img');
            const contentDiv = document.createElement('div')
            const infoDiv = document.createElement('div');
            const infoh2 = document.createElement('h2');
            const infoh3 = document.createElement('h3');
            const btnWrapperDiv = document.createElement('div');
            const plusBtn = document.createElement('button');
            const subBtn = document.createElement('button');
            const outputBtn = document.createElement('button');

            div.classList.add('card');
            imgWrapperDiv.classList.add('img-wrapper')
            contentDiv.classList.add('content')
            infoDiv.classList.add('info');
            plusBtn.classList.add('add');
            subBtn.classList.add('sub');
            outputBtn.classList.add('output');
            btnWrapperDiv.classList.add('btn-wrapper');

            div.id = ele.productId;
            img.src = ele.smallImgUrl ?
                categoriesPreImgUrl + ele.smallImgUrl :
                '../images/istockphoto-1128687123-612x612.jpg';
            infoh2.innerText = ele.productName;
            infoh3.innerText = ele.price + '$';
            plusBtn.innerText = '+';
            plusBtn.addEventListener('click', function () { handleQuantity.call(this, 'plus', paramsObj.whsId) })
            subBtn.innerText = '-';
            subBtn.addEventListener('click', function () { handleQuantity.call(this, 'sub', paramsObj.whsId) })
            outputBtn.innerText = ele.quantity;

            imgWrapperDiv.appendChild(img)
            infoDiv.appendChild(infoh2);
            infoDiv.appendChild(infoh3);
            contentDiv.appendChild(infoDiv)

            btnWrapperDiv.appendChild(subBtn);
            btnWrapperDiv.appendChild(outputBtn);
            btnWrapperDiv.appendChild(plusBtn);
            contentDiv.appendChild(btnWrapperDiv)

            div.appendChild(imgWrapperDiv);
            // div.appendChild(infoDiv);
            // div.appendChild(btnWrapperDiv);
            div.appendChild(contentDiv)
            cardContainer.appendChild(div);
        })
        updatePrice()
    }
}

updateCartItems()

function updatePrice() {
    // console.log('z');
    let parsedCartItems = JSON.parse(localStorage.getItem('cart'))
    totalPriceElement.innerText = parsedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    // console.log(totalPriceElement.innerText);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationErrorEle.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            locationErrorEle.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            locationErrorEle.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            locationErrorEle.innerHTML = "An unknown error occurred."
            break;
    }
}
let latitude = null;
let longitude = null;
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude
            longitude = position.coords.longitude
            locationBtn.classList.add('location-success')
            locationBtn.innerText = 'succesful'
            locationBtn.disabled = true
            locationValid = true;
        }, showError);
    } else {
        locationErrorEle.innerHTML = "Geolocation is not supported by this browser.";
    }
})

inputs.forEach(element => {
    if (element["name"] == 'name') {
        element.value = JSON.parse(localStorage.getItem('userId')).fullName
        if (element.value.length < 5) {
            nameValid = false
            nameErrorDiv.innerText = 'name should be atleast 6 characters';
        }else{
            nameValid = true;
        }
    }
    element.addEventListener('keyup', function (e) {
        const tag = this
        switch (tag['name']) {
            case 'name':
                if (tag.value.length < 5) {
                    nameValid = false
                    nameErrorDiv.innerText = 'name should be atleast 6 characters';
                }
                else {
                    nameValid = true;
                    nameErrorDiv.innerText = ''
                }
                if (e.keyCode < 65 || e.keyCode > 90) {
                    e.preventDefault()
                }
                break;
            case 'email':
                if (!regexForEmail.test(tag.value)) {
                    emailValid = false
                    emailErrorDiv.innerText = 'email id is invalid!'
                }
                else {
                    emailValid = true;
                    emailErrorDiv.innerText = '';
                }
                break;
            case 'phone':
                // console.log(e.keyCode);
                if (tag.value.length != 10) {
                    phoneValid = false
                    phoneErrorDiv.innerText = 'mobile number length should be exactly 10!'
                }
                else {
                    phoneValid = true;
                    phoneErrorDiv.innerText = '';
                }
                if (e.keyCode < 48 || e.keyCode > 57) {
                    e.preventDefault()
                    // return true;
                }
                break;
        }
    })
})

placeOrder.addEventListener('click', (e) => {
    if (nameValid && emailValid && phoneValid && locationValid) {
        isFormValid.classList.remove('error')
        isFormValid.style.display = 'none'

        const userDetails = {
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"]').value,
            phone_number: document.querySelector('input[name="phone"]').value,
            latitude,
            longitude
        }

        const orderDetails = {
            items: JSON.parse(localStorage.getItem('cart')),
            userDetails,
            total_price: totalPriceElement.innerText + '$',
            whsOrgId: paramsObj.whsId,
            outletOrgId: paramsObj.outId,
            user_id: paramsObj.userId
        }
        console.log(orderDetails);
        // placeOrder.innerText = 'order placed succesfully!'
        // placeOrder.classList.add('location-success')
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails))
        alert('order placed succefully!')
        const products = JSON.parse(localStorage.getItem('requiredData'))
        const productsModified = products.map(obj => {
            obj.quantity = 0
            return obj
        })
        localStorage.setItem('requiredData', JSON.stringify(productsModified))
        localStorage.setItem('cart', JSON.stringify([]))
        location.replace('../html/app.html')
        // updateCartItems()
        // updatePrice()
        // placeOrder.disabled = true;
    } else {
        // console.log('cannot place the order');
        isFormValid.innerText = 'please provide the valid details!'
        isFormValid.classList.add('error')
        isFormValid.style.display = 'block'
    }
})