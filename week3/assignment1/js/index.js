const partnerSection = document.querySelector('#partners');
const leftArrow = document.querySelector('#leftArrow');
const rightArrow = document.querySelector('#rightArrow');
const customerStoriesWrapper = document.querySelector('.customerStoriesWrapper');
const customerStories = document.querySelector('#customer-stories');

const partnersJson = {
    "partners": [
        {
            "imgUrl": "../images/amazon.png",
            "className":'amazon'
        },
        {
            "imgUrl": "../images/google.png",
            "className":'google'
        },
        {
            "imgUrl": "../images/master-card.png",
            "className":'master-card'
        },
        {
            "imgUrl": "../images/microsoft.png",
            "className":'microsoft'
        },
        {
            "imgUrl": "../images/paypal.png",
            "className":'paypal'
        },
        {
            "imgUrl": "../images/unilever.png",
            "className":'unilever'
        },
        {
            "imgUrl": "../images/visa.png",
            "className":'visa'
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
};

const div = document.createElement('div');
const logosArray = [];
let pagination = 1;
let j = (pagination - 1) * 5;
if (pagination === 1) {
    leftArrow.classList.add('disable')
}

// function paginationFunc(pagination) {
//     while (div.hasChildNodes()) {
//         div.removeChild(div.firstChild);
//     }
//     // for (let i = 0 + ((pagination - 1) * 5); i < pagination * 5; i++) {
//     //     if (i >= logosArray.length) {
//     //         break;
//     //     }
//     //     div.appendChild(logosArray[i]);
//     // }
//     for (let i = (pagination - 1) * 5; i < (pagination * 5); i++) {
//         if (j >= logosArray.length || j < 0) {
//             j = 0
//         }
//         console.log(j)
//         div.appendChild(logosArray[j]);
//         j++;
//     }
//     partnerSection.insertBefore(div, partnerSection.children[1]);
//     console.log('break')
// }

const paginationForward = (pagination) => {
    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }

    for (let i = (pagination - 1) * 5; i < (pagination * 5); i++) {
        if (j >= logosArray.length || j < 0) {
            j = 0
        }
        div.appendChild(logosArray[j]);
        j++;
    }
    partnerSection.insertBefore(div, partnerSection.children[1]);
    console.log('break')
}

const paginationBackward = (pagination) => {
    console.log(pagination,"p")
    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }

    for (let i = (pagination - 1) * 5; i < (pagination * 5); i++) {
        j--;
        if (j < 0) {
            j = 6
        }
        div.appendChild(logosArray[j]);
    }
    partnerSection.insertBefore(div, partnerSection.children[1]);
}

function renderLogos() {
    div.classList.add('logos');
    partnersJson.partners.map(partner => {
        const img = document.createElement('img');
        img.src = partner.imgUrl;
        // console.log(partner.className)
        img.classList.add(partner.className)
        logosArray.push(img);
    })
    paginationForward(pagination);
}

renderLogos();

rightArrow.addEventListener('click', (e) => {
    pagination++;
    if (pagination > 1) {
        leftArrow.classList.remove('disable')
    }
    paginationForward(pagination);
})

leftArrow.addEventListener('click', (e) => {
    if (pagination > 1) {
        pagination--;
        paginationBackward(pagination);
    }
    if (pagination === 1) {
        leftArrow.classList.add('disable')
    }
})

const div1 = document.createElement('div');
const h3 = document.createElement('h3');
const p = document.createElement('p');
let count = 1;

function storiesRenderFunc(count) {
    if (count === 4) {
        count = 1;
    }
    customerStoriesWrapper.style = `background-image:url(${storiesJson.stories[count - 1].imgUrl});`;
    h3.innerText = storiesJson.stories[count - 1].head;
    p.innerText = storiesJson.stories[count - 1].body;
    div1.appendChild(h3);
    div1.appendChild(p);
    customerStories.insertBefore(div1, customerStories.children[1]);
    setTimeout(() => storiesRenderFunc(++count), 10000);
}

storiesRenderFunc(count);