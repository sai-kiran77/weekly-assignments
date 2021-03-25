//selecting HTML elements
const wholesalersDropdown = document.querySelector('#wholesalers');
const outletsDropdown = document.querySelector('#outlets');
const categoriesDiv = document.querySelector('.catogeries');
const productsContainer = document.querySelector('.card-container');

//getting token from localstorage
const getLoginData = localStorage.getItem('userData');
const parseLoginData = JSON.parse(getLoginData);

if (parseLoginData === null) location.replace('../html/login.html')

const currentWholesaler = localStorage.getItem('currentWhs')
const currentOutlet = localStorage.getItem('currentOutlet')
console.log(currentOutlet);

//URL's
const initaialDataUrl = 'https://netco-indo-test.nfrnds.net:20003/fmcg-dd/initialData';
const userUrl = 'https://netco-indo-test.nfrnds.net:20003/fmcg-dd/user';
const wholesalersUrl = 'https://netco-indo-test.nfrnds.net:20003/fmcg-dd/whs/v2';
const outletsUrl = 'https://netco-indo-test.nfrnds.net:20003/fmcg-dd/outlets/v2';
const categoriesUrl = 'https://netco-indo-test.nfrnds.net:20003/fmcg-dd/catalog?whsId=';
const categoriesPreImgUrl = 'https://res.cloudinary.com/nfrnds/image/upload/fmcgdd';

let userId = null;
let productsCatalog = [];
let categories = [];

//initaialData API
$.ajax({
    type: 'GET',
    url: initaialDataUrl,
    headers: {
        'Netco-JWT': parseLoginData.token,
        // "Access-Control-Allow-Origin": "*",
    },
    success: function (res) {
        console.log(res);
    },
    error: function (request, textStatus, errorThrown) {
        if (request.status == 403) console.log('unAuthorized!');
        else if (request.status == 404) console.log(request.responseJSON.error);
        else if (request.status == 0) console.log('unavle to connect!');
        else console.log(request);
        console.log(textStatus);
    }
})

//user details API
$.ajax({
    type: 'GET',
    url: userUrl,
    headers: {
        'Netco-JWT': parseLoginData.token
    },
    success: function (res) {
        console.log(res);
        userId = res.userId
    },
    error: function (request, textStatus, errorThrown) {
        if (request.status == 403) console.log('unAuthorized!');
        else if (request.status == 404) console.log(request.responseJSON.error);
        else if (request.status == 0) console.log('unable to connect!');
        else console.log(request);
        console.log(textStatus);
    }
})

const currentWholesalerFunc = (whs) => {
    console.log(whs);
    localStorage.setItem('currentWhs', whs)
    //fetching outlets and categories only if the response is fulfilled
    localStorage.getItem('outletsData') ? outletsHandler(undefined, whs) : fetchOutlets(whs);
    currentOutletFunc(undefined)
    fetchCategories(whs);
}

const wholesalersHandler = (res = JSON.parse(localStorage.getItem('wholesalersData'))) => {
    //removing all child elements of wholesalers dropdown
    console.log(res);
    localStorage.setItem('wholesalersData', JSON.stringify(res))
    Array.from(wholesalersDropdown.children).forEach(ele => ele.remove());
    // localStorage.setItem('requiredData', JSON.stringify([]))
    //handling response to append wholesalers
    res.organizations.forEach(organization => {
        const option = document.createElement('option');
        option.innerText = organization.orgName;
        option.value = organization.orgId;
        if (option.value == localStorage.getItem('currentWhs')) {
            // console.log('a')
            option.selected = true;
        };
        wholesalersDropdown.add(option);
    })
    const currentWholesaler = localStorage.getItem('currentWhs') !== null
    const whs = currentWholesaler ? localStorage.getItem('currentWhs') : wholesalersDropdown.value;
    currentWholesalerFunc(whs)
}

//wholesalers API
const fetchWholesaler = () => {
    $.ajax({
        type: 'GET',
        url: wholesalersUrl,
        headers: {
            'Netco-JWT': parseLoginData.token
        },
        success: (res) => wholesalersHandler(res),
        error: function (request, textStatus, errorThrown) {
            if (request.status == 403) console.log('unAuthorized!');
            else if (request.status == 404) console.log(request.responseJSON.error);
            else if (request.status == 0) console.log('unable to connect!');
            else console.log(request);
            console.log(textStatus)
        }
    })
}

currentWholesaler ? wholesalersHandler() : fetchWholesaler()

function currentOutletFunc(outlet = outletsDropdown.value) {
    console.log(outlet);
    localStorage.setItem('currentOutlet', outlet)
}

function outletsHandler(res = JSON.parse(localStorage.getItem('outletsData')), whsId) {
    console.log(res);
    localStorage.setItem('outletsData', JSON.stringify(res))
    //removing all elements of outlets dropdown
    Array.from(outletsDropdown.children).forEach(ele => ele.remove());

    //handling response to display outlets dropdown
    res.organizations.forEach(organization => {
        organization.whs.forEach(obj => {
            if (obj.whsOrgId == whsId) {
                const option = document.createElement('option');
                option.innerText = organization.orgName;
                option.value = organization.orgId;
                if (option.value == localStorage.getItem('currentOutlet')) option.selected = true;
                outletsDropdown.add(option);
            }
        })
    })
    const outlet = localStorage.getItem('currentOutlet') !== null;
    const currentOutlet = outlet ? localStorage.getItem('currentOutlet') : undefined
    console.log(currentOutlet);
    currentOutletFunc(currentOutlet)
}

function fetchOutlets(whsId) {
    console.log('a');
    //outlets API
    $.ajax({
        type: 'GET',
        url: outletsUrl,
        headers: {
            'Netco-JWT': parseLoginData.token
        },
        success: (res) => outletsHandler(res, whsId),
        error: function (request, textStatus, errorThrown) {
            if (request.status == 403) console.log('unAuthorized!');
            else if (request.status == 404) console.log(request.responseJSON.error);
            else if (request.status == 0) console.log('unavle to connect!');
            else console.log(request);
            console.log(textStatus);
        }
    })
}
// console.log(currentOutlet);
// currentOutlet ?
//     null :
//     fetchOutlets(localStorage.getItem('currentWhs'))

// console.log(handleQuantity);

const productsHandler = (whsId) => {
    //getting all categories
    const categoriesChildElements = document.querySelectorAll('.container');

    //making the first category as default
    categoriesChildElements[0].classList.add('active');

    //looping through every category to add a click event
    categoriesChildElements.forEach(container => {
        //adding click event to render the corresponding products
        container.addEventListener('click', () => {
            const requiredDataString = localStorage.getItem('requiredData')
            let requiredData = JSON.parse(requiredDataString)
            if (!requiredDataString) requiredData = []

            //removing the active class for remaining categories
            Array.from(categoriesChildElements).forEach(ele => ele.classList.remove('active'));
            container.classList.add('active');

            //removing all products of last category from the UI
            Array.from(productsContainer.children).forEach(ele => ele.remove());

            //finding the corresponing object of active category from categories response
            const activeCategory = categories.find(obj => {
                return obj.productCategoryId == container.id;
            })

            //finding all the products of the active category and creating HTML elements
            activeCategory.productIds.forEach(id => {
                //finding products from global productsCatalog array
                const productDetails = productsCatalog.find(obj => {
                    return obj.productId == id;
                })

                //getting the price of a product
                const productPriceObj = productDetails.priceList.find(obj => obj.is_default === 'Y');
                const productPrice = productPriceObj.list_price;
                const forProductQuantity = requiredData.find(obj => obj.whsId == whsId && obj.categoryId == container.id && obj.productId == productDetails.productId)
                // console.log(forProductQuantity);
                const productQuantity = forProductQuantity ? forProductQuantity.quantity : 0

                const div = document.createElement('div');
                const imgWrapperDiv = document.createElement('div');
                const img = document.createElement('img');
                const infoDiv = document.createElement('div');
                const infoh2 = document.createElement('h2');
                const infoh3 = document.createElement('h3');
                const btnWrapperDiv = document.createElement('div');
                const plusBtn = document.createElement('button');
                const subBtn = document.createElement('button');
                const outputBtn = document.createElement('button');

                div.classList.add('card');
                imgWrapperDiv.classList.add('img-wrapper')
                infoDiv.classList.add('info');
                plusBtn.classList.add('add');
                subBtn.classList.add('sub');
                outputBtn.classList.add('output');
                btnWrapperDiv.classList.add('btn-wrapper');

                div.id = productDetails.productId;
                productDetails.smallImgUrl ?
                    img.src = categoriesPreImgUrl + productDetails.smallImgUrl :
                    img.src = '../images/istockphoto-1128687123-612x612.jpg';
                infoh2.innerText = productDetails.productName;
                infoh3.innerText = productPrice + '$';
                plusBtn.innerText = '+';
                plusBtn.addEventListener('click', function () { handleQuantity.call(this, 'plus', wholesalersDropdown.value) })
                subBtn.innerText = '-';
                subBtn.addEventListener('click', function () { handleQuantity.call(this, 'sub', wholesalersDropdown.value) })
                outputBtn.innerText = productQuantity;

                imgWrapperDiv.appendChild(img)
                infoDiv.appendChild(infoh2);
                infoDiv.appendChild(infoh3);

                btnWrapperDiv.appendChild(subBtn);
                btnWrapperDiv.appendChild(outputBtn);
                btnWrapperDiv.appendChild(plusBtn);

                div.appendChild(imgWrapperDiv);
                div.appendChild(infoDiv);
                div.appendChild(btnWrapperDiv);
                productsContainer.appendChild(div);

                if (!forProductQuantity) {
                    if (requiredData.length > 0) {
                        requiredData.every(data => {
                            if (data.whsId == whsId &&
                                data.categoryId == activeCategory.productCategoryId &&
                                data.productId == productDetails.productId) {
                                return false;
                            }
                            requiredData.push({
                                whsId: whsId,
                                categoryId: activeCategory.productCategoryId,
                                categoryName: activeCategory.categoryName,
                                imgUrl: activeCategory.imgUrl,
                                productId: productDetails.productId,
                                productName: productDetails.productName,
                                smallImgUrl: productDetails.smallImgUrl,
                                quantity: productQuantity,
                                price: productPrice
                            })
                            return false;
                        })
                    } else {
                        requiredData.push({
                            whsId: whsId,
                            categoryId: activeCategory.productCategoryId,
                            categoryName: activeCategory.categoryName,
                            imgUrl: activeCategory.imgUrl,
                            productId: productDetails.productId,
                            productName: productDetails.productName,
                            smallImgUrl: productDetails.smallImgUrl,
                            quantity: productQuantity,
                            price: productPrice
                        })
                    }
                }
            })
            localStorage.setItem('requiredData', JSON.stringify(requiredData))
            stripeDetails()
        })
    })
    //making the first category as default
    categoriesChildElements[0].click();
}

const categoriesHandler = (res, whsId) => {
    //storing products globally to fetch products
    productsCatalog = res.products;

    //removing all elements of category container
    Array.from(categoriesDiv.children).forEach(ele => ele.remove());

    //handling categories to render the UI
    res.categories.forEach(obj => {

        if (obj.productCategoryId > 0) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const p = document.createElement('p');

            div.classList.add('container');

            div.id = obj.productCategoryId;
            img.src = categoriesPreImgUrl + obj.imgUrl;
            p.innerText = obj.categoryName;

            div.appendChild(img);
            div.appendChild(p);
            categoriesDiv.appendChild(div);
            //pushing all valid category response to a global array
            categories.push(obj);
        }
    })
    setScroll()
    productsHandler(whsId);
}

//fetch categories based on wholesaler id
function fetchCategories(whsId) {
    categories = [];
    $.ajax({
        type: 'get',
        url: categoriesUrl + whsId,
        headers: {
            'Netco-JWT': parseLoginData.token
        },
        success: (res) => categoriesHandler(res, whsId),
        error: function (request, textStatus, errorThrown) {
            if (request.status == 403) console.log('unAuthorized!');
            else if (request.status == 404) console.log(request.responseJSON.error);
            else if (request.status == 0) console.log('unavle to connect!');
            else console.log(request);
            console.log(textStatus);
        }
    })
}

wholesalersDropdown.addEventListener('change', (e) => {
    // console.log('a');
    const products = JSON.parse(localStorage.getItem('requiredData'))
    const productsModified = products.map(obj => {
        obj.quantity = 0
        return obj
    })
    localStorage.setItem('requiredData', JSON.stringify(productsModified))
    localStorage.setItem('cart', JSON.stringify([]))
    // fetchOutlets(e.target.value);
    // fetchCategories(e.target.value);
    currentWholesalerFunc(e.target.value)
})

outletsDropdown.addEventListener('change', (e) => {
    // console.log('b');
    const products = JSON.parse(localStorage.getItem('requiredData'))
    const productsModified = products.map(obj => {
        obj.quantity = 0
        return obj
    })
    localStorage.setItem('requiredData', JSON.stringify(productsModified))
    localStorage.setItem('cart', JSON.stringify([]))
    productsHandler(wholesalersDropdown.value)
    currentOutletFunc(e.target.value)
})

