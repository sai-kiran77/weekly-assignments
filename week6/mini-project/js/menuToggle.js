const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.links');
const menuOpen = document.querySelector("#menu-open");
const menuClose = document.querySelector("#menu-close");

menu.addEventListener('click', (e) => {
    menuOpen.classList.toggle('hide');
    menuClose.classList.toggle('hide');
})

menuOpen.addEventListener('click',()=>{
    navLinks.classList.add('show-links');
    navLinks.classList.remove('hide-links');
})

menuClose.addEventListener('click',(e)=>{
    navLinks.classList.add('hide-links');
    navLinks.classList.remove('show-links');
})