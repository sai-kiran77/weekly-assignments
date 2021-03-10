const imagesContainer = document.querySelector('.carousel-images');
const leftArrow = document.querySelector('.carousel-button--left');
const rightArrow = document.querySelector('.carousel-button--right');
const images = document.querySelectorAll('.carousel-image');
const navBtns = document.querySelector('.carousel-nav');
const dots = document.querySelectorAll('.carousel-nav--btn');

//returns a array object by taking any iterable object
const imagesArray = Array.from(images);
const dotsArray = Array.from(dots);

//gets the exact width of a image
const imageWidth = imagesArray[0].getBoundingClientRect().width; //image.width same but returns rounded value
let direction;

const updateImagePosition = (currentSlide, targetSlide, imgpos = -100) => {
    imagesContainer.style.transform = `translateX(${imgpos}%)`;
    currentSlide.classList.remove('current-image');
    targetSlide.classList.add('current-image');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-btn');
    targetDot.classList.add('current-btn');
}

leftArrow.addEventListener('click', (e) => {
    direction = -1;
    leftArrow.disabled = true;
    const currentSlide = imagesContainer.querySelector('.current-image');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = navBtns.querySelector('.current-btn');
    let prevDot = currentDot.previousElementSibling;

    if (!prevDot) prevDot = navBtns.lastElementChild;

    updateImagePosition(currentSlide, prevSlide, 0);
    updateDots(currentDot, prevDot);
})

rightArrow.addEventListener('click', (e) => {
    direction = 1;
    rightArrow.disabled = true;
    const currentSlide = imagesContainer.querySelector('.current-image');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = navBtns.querySelector('.current-btn');
    let nextDot = currentDot.nextElementSibling;

    if (!nextDot) nextDot = navBtns.firstElementChild

    updateImagePosition(currentSlide, nextSlide, -200);
    updateDots(currentDot, nextDot);
})


navBtns.addEventListener('click', (e) => {
    let imgpos;
    const targetDot = e.target.closest('button');
    direction = null;
    if (!targetDot) return;

    const currentImage = imagesContainer.querySelector('.current-image');
    const currentDot = navBtns.querySelector('.current-btn');
    const currentIndex = dotsArray.findIndex(dot => dot === currentDot);
    const targetIndex = dotsArray.findIndex(dot => dot === targetDot);
    const targetImage = imagesArray[targetIndex];

    if (targetIndex - currentIndex === 1) {
        imgpos = -200;
    } else if (targetIndex - currentIndex === -1) {
        imgpos = 0;
    } else if (targetIndex - currentIndex == 2) {
        imagesContainer.appendChild(imagesContainer.firstElementChild);
        imgpos = -200;
    } else if (targetIndex - currentIndex == -2) {
        imagesContainer.prepend(imagesContainer.lastElementChild)
        imgpos = 0;
    }
    updateImagePosition(currentImage, targetImage, imgpos);
    updateDots(currentDot, targetDot);
})

imagesContainer.addEventListener('transitionend', (e) => {
    if (direction === 1) {
        imagesContainer.appendChild(imagesContainer.firstElementChild);
        rightArrow.disabled = false;
    }
    else if (direction === -1) {
        imagesContainer.prepend(imagesContainer.lastElementChild);
        leftArrow.disabled = false;
    } else {
        const currentImage = document.querySelector('.current-image');
        if (!currentImage.nextElementSibling) imagesContainer.appendChild(imagesContainer.firstElementChild);
        else if (!currentImage.previousElementSibling) imagesContainer.prepend(imagesContainer.lastElementChild);
    }

    imagesContainer.style.transition = `none`;
    imagesContainer.style.transform = `translateX(-100%)`;
    setTimeout(() => imagesContainer.style.transition = `transform 500ms ease-in-out`);
})

imagesContainer.prepend(imagesContainer.lastElementChild);