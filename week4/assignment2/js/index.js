const radioButtons = document.querySelectorAll(`[name="face"]`);
const cubeWrapper = document.querySelector('.cube-wrapper')

// let topSide = document.querySelector('.top');
// const bottomSide = document.querySelector('.bottom');
// const leftSide = document.querySelector('.left')
// const rightSide = document.querySelector('.right');
// const frontSide = document.querySelector('.front');
// const backSide = document.querySelector('.back');
// console.log(topSide)
radioButtons.forEach(element => {
    element.addEventListener('click', (e) => {
        console.log(element.id)
        if(element.id === 'front'){
            cubeWrapper.style.transform = "translateZ(-100px) rotateY(0deg)"
        }
        if(element.id === 'back'){
            cubeWrapper.style.transform = "translateZ(-100px) rotateY(-180deg)"
        }
        if(element.id === 'top'){
            cubeWrapper.style.transform = "translateZ(-100px) rotateX(-90deg)";
        }
        if(element.id === 'bottom'){
            cubeWrapper.style.transform = "translateZ(-100px) rotateX(90deg)"
        }
        if(element.id === 'left'){
            cubeWrapper.style.transform = "translateZ(-100px) rotateY(90deg)"
        }
        if(element.id === 'right'){
            cubeWrapper.style.transform = "translateZ(-100px) rotateY(-90deg)"
        }
    })
})