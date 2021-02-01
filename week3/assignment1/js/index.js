const partnerSection = document.querySelector('#partners')
const leftArrow = document.querySelector('#leftArrow')
const rightArrow = document.querySelector('#rightArrow')
const customerStoriesWrapper = document.querySelector('.customerStoriesWrapper')
const customerStories = document.querySelector('#customer-stories')
const navBar = document.querySelector('nav')

const partnersJson = {
    "partners": [
        {
            "imgUrl": "../images/amazon.png"
        },
        {
            "imgUrl": "../images/google.png"
        },
        {
            "imgUrl": "../images/master-card.png"
        },
        {
            "imgUrl": "../images/microsoft.png"
        },
        {
            "imgUrl": "../images/paypal.png"
        },
        {
            "imgUrl": "../images/unilever.png"
        },
        {
            "imgUrl": "../images/visa.png"
        }
    ]
}

const storiesJson = {
    "stories": [
        {
            imgUrl: "http://www.nfrnds.com/wp-content/uploads/2017/07/banner-box-kategori-product-btpn-wow-pembayaran_dmr_3680.jpg",
            head: "Branchless Banking",
            body: "N-Frnds has partnered with Indonesian Bank, BTPN Wow, to provide one of the world’s largest branchless banking solutions in the world, bringing over 3.5 million mass market users into the financial system."
        },
        {
            imgUrl: "http://www.nfrnds.com/wp-content/uploads/2017/07/stories_bg.jpg",
            head: "Digitalized Agriculture",
            body: "N-Frnds has partnered with the Rwandan Ministry of Agriculture and Animal Resources to digitize services and processes, making the opportunities of SaaS accessible to more than 80% of the country’s population."
        },
        {
            imgUrl: "http://www.nfrnds.com/wp-content/uploads/2017/07/C8GY0wBXQAEt-6D.jpg",
            head: "Accessible Goverment",
            body: "N-Frnds has partnered with RwandaOnline to make over 100 government services accessible to Rwanda’s 12 million citizens and small businesses."
        },
    ]
}

const div = document.createElement('div')
const logosArray = []
let pagination = 1

function paginationFunc(pagination) {
    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild)
    }
    for (let i = 0 + ((pagination - 1) * 5); i < pagination * 5; i++) {
        console.log(pagination * 5, logosArray.length)

        if (i >= logosArray.length) {
            break;
        }
        div.appendChild(logosArray[i])
    }
    partnerSection.insertBefore(div, partnerSection.children[1])
}

function renderLogos() {
    div.classList.add('logos')
    partnersJson.partners.map(partner => {
        const img = document.createElement('img')
        img.src = partner.imgUrl
        logosArray.push(img)
    })
    paginationFunc(pagination)
}

renderLogos()

rightArrow.addEventListener('click', (e) => {
    pagination++
    paginationFunc(pagination)
})

leftArrow.addEventListener('click', (e) => {
    pagination--
    paginationFunc(pagination)
})

const div1 = document.createElement('div')
const h1 = document.createElement('h1')
const p = document.createElement('p')
let count = 1

function storiesRenderFunc(count) {
    if (count === 4) {
        count = 1
    }
    customerStoriesWrapper.style = `background-image:url(${storiesJson.stories[count - 1].imgUrl});`
    h1.innerText = storiesJson.stories[count - 1].head
    p.innerText = storiesJson.stories[count - 1].body
    div1.appendChild(h1)
    div1.appendChild(p)
    customerStories.insertBefore(div1, customerStories.children[1])
    setTimeout(() => storiesRenderFunc(++count), 2000)
}

storiesRenderFunc(count)

window.addEventListener('scroll', (e) => {
    if(window.scrollY > 80){
        navBar.classList.add('opened')
    }else{
        navBar.classList.remove('opened')
    }
})