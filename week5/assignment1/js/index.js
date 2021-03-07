// const partnerSection = document.querySelector('#partners');
// const leftArrow = document.querySelector('#leftArrow');
// const rightArrow = document.querySelector('#rightArrow');
const customerStoriesWrapper = document.querySelector('.customerStoriesWrapper');
const customerStories = document.querySelector('#customer-stories');
const contentImg = document.querySelector('#content-img') ;
const contentHead = document.querySelector('#content-head'); 
const contentBody = document.querySelector('#content-body');
// const partnerLogosRenderDiv = document.querySelector('.renderlogos');
const contentLinks = document.querySelectorAll('.link');


// const partnersJson = {
//     "partners": [
//         {
//             "imgUrl": "../images/amazon.png",
//             "className":'amazon'
//         },
//         {
//             "imgUrl": "../images/google.png",
//             "className":'google'
//         },
//         {
//             "imgUrl": "../images/master-card.png",
//             "className":'master-card'
//         },
//         {
//             "imgUrl": "../images/microsoft.png",
//             "className":'microsoft'
//         },
//         {
//             "imgUrl": "../images/paypal.png",
//             "className":'paypal'
//         },
//         {
//             "imgUrl": "../images/unilever.png",
//             "className":'unilever'
//         },
//         {
//             "imgUrl": "../images/visa.png",
//             "className":'visa'
//         }
//     ]
// };

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

const solutionsObj = {
    banking:{
        imgUrl:"http://www.nfrnds.com/wp-content/uploads/2017/07/stratigic_icon.png",
        head:"Mobile and Branchless banking solutions for driving financial Inclusion.",
        body:"Providing end-to-end mobile financial services and engagement capabilities through our strategic SaaS solutions.",
        color:"#ffaf00"
    },
    agriculture:{
        imgUrl:"http://www.nfrnds.com/wp-content/uploads/2017/07/agricuture@2x.png",
        head:"Automating and streamlining agricultural supply chains, and processes.",
        body:"Providing analytics, oversight, traceability and ongoing interactive capabilities to enterprises along every stage of the supply chain.",
        color:"#9ec000"
    },
    health:{
        imgUrl:"http://www.nfrnds.com/wp-content/uploads/2017/07/health@2x.png",
        head:"Addressing the specific challenges of healthcare systems in emerging markets.",
        body:"Digitizing healthcare services and increasing access to medical information",
        color:"#21b334"
    },
    fmcg:{
        imgUrl:"http://www.nfrnds.com/wp-content/uploads/2017/07/fmcg@2x.png",
        head:"Streamline distribution channels in emerging markets even to the most remote dealer/outlet.",
        body:"Providing mobile financial services and complete oversight to supply and distribution chains.",
        color:"#00b0bd"
    },
    government:{
        imgUrl:"http://www.nfrnds.com/wp-content/uploads/2017/07/government@2x.png",
        head:"Digitizing government services for universal access and improved policymaking",
        body:"Enabling government to equalize service delivery, collect information and implement digital programs and policies for all its citizens.",
        color:"#10a1df"
    },
    msme:{
        imgUrl:"http://www.nfrnds.com/wp-content/uploads/2017/07/msme@2x.png",
        head:"Providing modern business tools and practices to MSMEs",
        body:"Enabling medium, small and micro enterprises (MSMEs) to benefit from digital accounting tools and business services.",
        color:"#0767b2"
    },
    retail:{
        imgUrl:"http://www.nfrnds.com/wp-content/uploads/2017/07/retail@2x.png",
        head:"Expanding the potential of retailers serving the mass market.",
        body:"Enabling retailers to gain valuable insights and tailor their marketing and sale strategies to their customers’ needs",
        color:"#0f4ef7"
    },
}

function setContent(id,element){
    contentImg.src = solutionsObj[id].imgUrl;
    contentHead.innerText = solutionsObj[id].head;
    contentHead.style.color = solutionsObj[id].color;
    contentBody.innerText = solutionsObj[id].body;
    element.style.color = solutionsObj[id].color;
 }

contentLinks.forEach(element =>{
    element.addEventListener('click',(e)=>{
        console.log(this)
        contentLinks.forEach(ele=>ele.style.color = "#fff");
        setContent(e.target.id,element);
    })
})

setContent("banking",document.querySelector('#banking'));


// const div = document.createElement('div');
// const logosArray = [];
// let pagination = 1;
// let j = (pagination - 1) * 5;
// if (pagination === 1) {
//     leftArrow.classList.add('disable')
// }

// const paginationForward = (pagination) => {
//     while (div.hasChildNodes()) {
//         div.removeChild(div.firstChild);
//     }

//     for (let i = (pagination - 1) * 5; i < (pagination * 5); i++) {
//         if (j >= logosArray.length || j < 0) {
//             j = 0;
//         }
//         div.appendChild(logosArray[j]);
//         j++;
//     }
//     partnerLogosRenderDiv.insertBefore(div, partnerLogosRenderDiv.children[1]);
// }

// const paginationBackward = (pagination) => {
//     while (div.hasChildNodes()) {
//         div.removeChild(div.firstChild);
//     }

//     for (let i = (pagination - 1) * 5; i < (pagination * 5); i++) {
//         j--;
//         if (j < 0) {
//             j = 6;
//         }
//         div.appendChild(logosArray[j]);
//     }
//     partnerLogosRenderDiv.insertBefore(div, partnerLogosRenderDiv.children[1]);
// }

// function renderLogos() {
//     div.classList.add('logos');
//     partnersJson.partners.map(partner => {
//         const img = document.createElement('img');
//         img.src = partner.imgUrl;
//         img.classList.add(partner.className);
//         logosArray.push(img);
//     })
//     paginationForward(pagination);
// }

// renderLogos();

// rightArrow.addEventListener('click', (e) => {
//     pagination++;
//     if (pagination > 1) {
//         leftArrow.classList.remove('disable');
//     }
//     paginationForward(pagination);
// })

// leftArrow.addEventListener('click', (e) => {
//     if (pagination > 1) {
//         pagination--;
//         paginationBackward(pagination);
//     }
//     if (pagination === 1) {
//         leftArrow.classList.add('disable');
//     }
// })

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
    // setTimeout(() => storiesRenderFunc(++count), 10000);
}

storiesRenderFunc(count);

// console.log(getComputedStyle(partnerLogosRenderDiv))