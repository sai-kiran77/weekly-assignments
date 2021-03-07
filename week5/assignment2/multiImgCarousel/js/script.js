const prevBtn = document.querySelector('.leftArrow')
const nextBtn = document.querySelector('.rightArrow')
const carouselmgContainer = document.querySelector('.carousel-images-container')

let direction;

const transitionEnd = (e, transformpercent = 0) => {
    const logoWidth = parseInt(getComputedStyle(carouselmgContainer.firstElementChild).getPropertyValue('flex-basis'))
    carouselmgContainer.style.transition = 'none'
    
    if (direction === 1) {
        for (let i = logoWidth; i <= 100; i = i + logoWidth) {
            carouselmgContainer.appendChild(carouselmgContainer.firstElementChild)
        }
    } else if (direction === -1) {
        for (let i = logoWidth; i <= 100; i = i + logoWidth) {
            console.log('a')
            carouselmgContainer.prepend(carouselmgContainer.lastElementChild)
        }
    }
    
    carouselmgContainer.style.transform = `translateX(${transformpercent}%)`
    setTimeout(() => carouselmgContainer.style.transition = 'transform 500ms ease-in-out')
}

prevBtn.addEventListener('click', (e) => {
    direction = -1
    transitionEnd(undefined, -100)
    direction = null;
    setTimeout(() => carouselmgContainer.style.transform = 'translateX(0)')


})

nextBtn.addEventListener('click', (e) => {
    direction = 1;
    carouselmgContainer.style.transform = 'translateX(-100%)'
})

carouselmgContainer.addEventListener('transitionend', (e) => transitionEnd(e))