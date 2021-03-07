const imagesContainer = document.querySelector('.carousel-images')
const leftArrow = document.querySelector('.carousel-button--left')
const rightArrow = document.querySelector('.carousel-button--right')
const images = document.querySelectorAll('.carousel-image')
const navBtns = document.querySelector('.carousel-nav')
const dots = document.querySelectorAll('.carousel-nav--btn')
//returns a array object by taking any iterable object
const imagesArray = Array.from(images)
const dotsArray = Array.from(dots)
//gets the exact width of a image
const imageWidth = imagesArray[0].getBoundingClientRect().width //image.width same but returns rounded value
let direction;
console.log("ab")

const updateImagePosition = (currentSlide, targetSlide, imgpos = -100) => {
    console.log(imgpos)
    imagesContainer.style.transform = `translateX(${imgpos}%)`
    currentSlide.classList.remove('current-image')
    targetSlide.classList.add('current-image')
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-btn')
    targetDot.classList.add('current-btn')
}

leftArrow.addEventListener('click', (e) => {
    direction = -1;
    leftArrow.disabled = true
    const currentSlide = imagesContainer.querySelector('.current-image')
    const prevSlide = currentSlide.previousElementSibling
    const currentDot = navBtns.querySelector('.current-btn')
    let prevDot = currentDot.previousElementSibling;

    if (!prevDot) prevDot = navBtns.lastElementChild

    updateImagePosition(currentSlide, prevSlide, 0)
    updateDots(currentDot, prevDot)
})

rightArrow.addEventListener('click', (e) => {
    direction = 1
    rightArrow.disabled = true
    const currentSlide = imagesContainer.querySelector('.current-image')
    const nextSlide = currentSlide.nextElementSibling
    const currentDot = navBtns.querySelector('.current-btn')
    let nextDot = currentDot.nextElementSibling;

    if (!nextDot) nextDot = navBtns.firstElementChild

    updateImagePosition(currentSlide, nextSlide, -200)
    updateDots(currentDot, nextDot)
})


navBtns.addEventListener('click', (e) => {
    let imgpos;
    const targetDot = e.target.closest('button')
    direction = null
    if (!targetDot) return

    const currentImage = imagesContainer.querySelector('.current-image')
    const currentDot = navBtns.querySelector('.current-btn')
    const currentIndex = dotsArray.findIndex(dot => dot === currentDot)
    const targetIndex = dotsArray.findIndex(dot => dot === targetDot)
    const targetImage = imagesArray[targetIndex]
    // console.log(dotsArray)
    // console.log(currentIndex)
    // console.log(targetIndex)
    if (targetIndex - currentIndex === 1) {
        imgpos = -200
    } else if (targetIndex - currentIndex === -1) {
        imgpos = 0
    } else if (targetIndex - currentIndex == 2) {
        imagesContainer.appendChild(imagesContainer.firstElementChild)
        imgpos = -200
        // imagesContainer.style.transition = "transform 100ms ease-in-out"
        // updateImagePosition(currentImage, currentImage.nextElementSibling, -200)
        // setTimeout(() => updateImagePosition(currentImage.nextElementSibling, targetImage, -200), 120)
        // updateDots(currentDot, targetDot)
        // return
    } else if (targetIndex - currentIndex == -2) {
        // debugger
        imagesContainer.prepend(imagesContainer.lastElementChild)
        imgpos = 0
        // console.log("a");
        // imagesContainer.style.transition = "transform 100ms ease-in-out"
        // updateImagePosition(currentImage, currentImage.previousElementSibling, 0)
        // console.log(currentImage.previousElementSibling)
        // setTimeout(() => updateImagePosition(currentImage.previousElementSibling, targetImage, 0), 120)
        // updateDots(currentDot, targetDot, imgpos)
        // return
    }
    updateImagePosition(currentImage, targetImage, imgpos)
    updateDots(currentDot, targetDot)
})

imagesContainer.addEventListener('transitionend', (e) => {
    if (direction === 1) {
        imagesContainer.appendChild(imagesContainer.firstElementChild)
        rightArrow.disabled = false
    }
    else if (direction === -1) {
        imagesContainer.prepend(imagesContainer.lastElementChild)
        leftArrow.disabled = false
    } else {
        const currentImage = document.querySelector('.current-image')
        if (!currentImage.nextElementSibling) imagesContainer.appendChild(imagesContainer.firstElementChild)
        else if (!currentImage.previousElementSibling) imagesContainer.prepend(imagesContainer.lastElementChild)
    }

    imagesContainer.style.transition = `none`
    imagesContainer.style.transform = `translateX(-100%)`
    // imagesContainer.style.transition = `transform 500ms ease-in-out`
    setTimeout(() => imagesContainer.style.transition = `transform 500ms ease-in-out`);
})

imagesContainer.prepend(imagesContainer.lastElementChild)
































































































































// const setImagePositions = (element,index) =>{
//     element.style.left = `${100 * index}%`
// }

// imagesArray.forEach(setImagePositions)

// const updateImagePosition = (currentImage, targetImage, imgpos, index = 1,) => {
//     imagesContainer.style.transform = `translateX(${imgpos * index}%)`
//     console.log(-100 * index)
//     // imagesContainer.style.transform = `translateX(-100%)`
//     currentImage.classList.remove('current-image')
//     targetImage.classList.add('current-image')
// }

// leftArrow.addEventListener('click', (e) => {
//     const currentImage = imagesContainer.querySelector('.current-image')
//     let prevImage = currentImage.previousElementSibling
//     if (direction === 1) {
//         debugger;
//         imagesContainer.prepend(imagesContainer.lastElementChild)
//         imagesContainer.classList.add('show-prev-slide')
//         let prevImage = currentImage.previousElementSibling
//         updateImagePosition(currentImage, prevImage,100)
//     } else if (direction === -1) {
//         updateImagePosition(currentImage, prevImage,100)
//     }
//     else {
//         imagesContainer.classList.add('show-prev-slide')
//         currentImage.classList.remove('current-image')
//         imagesContainer.lastElementChild.classList.add('current-image')
//     }
//     direction = -1;
//     // updateImagePosition(currentImage, prevImage)
// })

// rightArrow.addEventListener('click', (e) => {
//     if(direction === -1){
//         imagesContainer.appendChild(imagesContainer.firstElementChild)
//         imagesContainer.classList.remove('show-prev-slide')
//     }
//     direction = 1;
//     const currentImage = imagesContainer.querySelector('.current-image')
//     const nextImage = currentImage.nextElementSibling
//     updateImagePosition(currentImage, nextImage,-100)
//     // imagesContainer.appendChild(imagesContainer.firstElementChild)
// })

// imagesContainer.addEventListener('transitionend', (e) => {

//     console.log("A")
//     if (direction === 1)
//         imagesContainer.appendChild(imagesContainer.firstElementChild)
//     else if (direction === -1)
//         imagesContainer.prepend(imagesContainer.lastElementChild)

//     imagesContainer.style.transition = `none`
//     imagesContainer.style.transform = `translateX(0)`
//     // imagesContainer.style.transition = `transform 500ms ease-in-out`
//     setTimeout(() => imagesContainer.style.transition = `transform 500ms ease-in-out`)
// })

// navBtns.addEventListener('click', (e) => {
//     const targetDot = e.target.closest('button')
//     if (!targetDot) return;

//     const currentImage = imagesContainer.querySelector('.current-image')
//     const currentDot = navBtns.querySelector('.current-btn')
//     const targetDotIndex = dotsArray.findIndex(dot => dot === targetDot)
//     const targetImage = dotsArray[targetDotIndex]
//     updateImagePosition(currentImage, targetImage, targetDotIndex)
//     console.log(currentImage, targetDotIndex, targetImage)
// })





// rightArrow.addEventListener('click', (e) => {
//     const currentImagePositon = imagesArray.findIndex(ele => ele === imagesContainer.querySelector('.current-image'))
//     const currentImage = imagesArray[currentImagePositon]
//     let nextImage = imagesArray[currentImagePositon + 1]
//     if (!nextImage) {
//         nextImage = imagesArray[0]
//     }
//     updateImagePosition(currentImage, nextImage, ++counter)

//     // if (currentImagePositon === imagesArray.length - 1) {
//     // console.log(currentImagePositon === imagesArray.length - 1)
//     // imagesArray.unshift(imagesArray[imagesArray.length - 1])
//     // imagesArray.pop()
//     // console.log(imagesArray)
//     // let nextImage = imagesArray[0]
//     // updateImagePosition(imagesContainer, currentImage, nextImage)
//     // imagesArray.forEach(setImagesPosition)
//     // }
//     // if (!nextImage) {
//     //     //     // imagesArray.push(imagesArray[0])
//     //     //     // imagesArray.shift()
//     //     //     // imagesArray.forEach(setImagesPosition)
//     //     //     // console.log(imagesArray)
//     //     imagesArray.unshift(imagesArray[imagesArray.length - 1])
//     //     imagesArray.pop()
//     //     imagesArray.forEach(setImagesPosition)
//     //     console.log(imagesArray)
//     //     // imagesArray.forEach(setImagesPosition)
//     //     nextImage = imagesContainer.children[0]
//     //     updateImagePosition(imagesContainer, currentImage, nextImage)
//     //     return;
//     // }
//     // if (nextImage)
//     //     updateImagePosition(imagesContainer, currentImage, nextImage)
// })

// leftArrow.addEventListener('click', (e) => {
//     imagesArray.unshift(imagesArray[imagesArray.length - 1])
//     imagesArray.pop()
//     // imagesArray.forEach(setImagesPosition)
//     console.log(imagesArray)
// })