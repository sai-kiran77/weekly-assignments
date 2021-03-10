const imgContainer = document.querySelectorAll('.img-container');
const leftArrow = document.querySelector('#leftArrow');
const rightArrow = document.querySelector('#rightArrow');
const renderLogosDiv = document.querySelector('.renderlogos');
const imgWrapper = document.querySelector('.img-wrapper');

let currentSlide = 0;

function next(){
    currentSlide = currentSlide - 100;
   imgWrapper.style.transform = `translateX(${currentSlide}%)`;
}

function prev(){
    currentSlide += 100;
    imgWrapper.style.transform = `translateX(${currentSlide}%)`;
}