const prevBtn = document.querySelector('.leftArrow');
const nextBtn = document.querySelector('.rightArrow');
const carouselmgContainer = document.querySelector('.carousel-images-container');
const carouselBtnNav = document.querySelector('.carousel-nav')
const carouselNavBtns = document.querySelectorAll('.carousel-nav--btn')
const carouselNavBtnsArray = Array.from(carouselNavBtns)

let direction;

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-btn');
    targetDot.classList.add('current-btn');
}

function changeElementsOrder() {
    const logoWidth = parseInt(getComputedStyle(carouselmgContainer.firstElementChild).getPropertyValue('flex-basis'));

    if (direction === 1) {
        for (let i = logoWidth; i <= 100; i = i + logoWidth) {
            carouselmgContainer.appendChild(carouselmgContainer.firstElementChild);
        }
    } else if (direction === -1) {
        for (let i = logoWidth; i <= 100; i = i + logoWidth) {
            carouselmgContainer.prepend(carouselmgContainer.lastElementChild);
        }
    }
}

const prevBtnClick = () => {
    prevBtn.disabled = true;
    direction = -1;

    const currentDot = carouselBtnNav.querySelector('.current-btn')
    let targetDot = currentDot.previousElementSibling;
    if (!targetDot) targetDot = carouselBtnNav.lastElementChild

    carouselmgContainer.style.transition = 'none';
    carouselmgContainer.style.transform = 'translateX(-100%)';

    changeElementsOrder();
    updateDots(currentDot, targetDot)

    setTimeout(() => carouselmgContainer.style.transition = 'transform 500ms ease-in-out');
    setTimeout(() => carouselmgContainer.style.transform = 'translateX(0%)');
}

const nextBtnClick = (e) => {
    nextBtn.disabled = true;
    direction = 1;

    const currentDot = carouselBtnNav.querySelector('.current-btn')
    let targetDot = currentDot.nextElementSibling;
    if (!targetDot) targetDot = carouselBtnNav.firstElementChild

    carouselmgContainer.style.transform = 'translateX(-100%)';

    updateDots(currentDot, targetDot)
}

prevBtn.addEventListener('click', prevBtnClick)

nextBtn.addEventListener('click', nextBtnClick)

carouselmgContainer.addEventListener('transitionend', () => {
    carouselmgContainer.style.transition = 'none';
    if (direction === 1)
        changeElementsOrder();
    carouselmgContainer.style.transform = 'translateX(0%)';
    setTimeout(() => {
        carouselmgContainer.style.transition = 'transform 500ms ease-in-out';
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    })
})

carouselBtnNav.addEventListener('click', (e) => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;
    const currentDot = carouselBtnNav.querySelector('.current-btn')
    const currentIndex = carouselNavBtnsArray.findIndex(btn => btn === currentDot)
    const targetIndex = carouselNavBtnsArray.findIndex(btn => btn === targetDot)
    if(targetIndex - currentIndex === 1){
        nextBtnClick()
    }else{
        prevBtnClick()
    }
    updateDots(currentDot, targetDot)
})