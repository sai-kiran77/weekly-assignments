const prevBtn = document.querySelector('.leftArrow')
const nextBtn = document.querySelector('.rightArrow')
const carouselmgContainer = document.querySelector('.carousel-images-container')

let direction;

function changeElementsOrder() {
    const logoWidth = parseInt(getComputedStyle(carouselmgContainer.firstElementChild).getPropertyValue('flex-basis'))
    
    if (direction === 1) {
        for (let i = logoWidth; i <= 100; i = i + logoWidth) {
            carouselmgContainer.appendChild(carouselmgContainer.firstElementChild)
        }
    } else if (direction === -1) {
        for (let i = logoWidth; i <= 100; i = i + logoWidth) {
            carouselmgContainer.prepend(carouselmgContainer.lastElementChild)
        }
    }
}

prevBtn.addEventListener('click', () => {
    prevBtn.disabled = true
    direction = -1
    carouselmgContainer.style.transition = 'none'
    carouselmgContainer.style.transform = 'translateX(-100%)'
    changeElementsOrder()
    setTimeout(() => carouselmgContainer.style.transition = 'transform 500ms ease-in-out')
    setTimeout(()=>carouselmgContainer.style.transform = 'translateX(0%)') 
})

nextBtn.addEventListener('click', (e) => {
    nextBtn.disabled = true
    direction = 1
    carouselmgContainer.style.transform = 'translateX(-100%)'
})

carouselmgContainer.addEventListener('transitionend', () => {
    carouselmgContainer.style.transition = 'none'
    if (direction === 1)
        changeElementsOrder()
    carouselmgContainer.style.transform = 'translateX(0%)'
    setTimeout(() => {
        carouselmgContainer.style.transition = 'transform 500ms ease-in-out'
        prevBtn.disabled = false
        nextBtn.disabled = false
    })
})