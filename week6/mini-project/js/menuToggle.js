const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.links');
const menuOpen = document.querySelector("#menu-open");
const menuClose = document.querySelector("#menu-close");

menu.addEventListener('click', (e) => {
    menuOpen.classList.toggle('hide');
    menuClose.classList.toggle('hide');
})

menuOpen.addEventListener('click',()=>{
    navLinks?navLinks.classList.add('show-links'):null;
    navLinks?navLinks.classList.remove('hide-links'):null;
})

menuClose.addEventListener('click',(e)=>{
    navLinks?navLinks.classList.add('hide-links'):null;
    navLinks?navLinks.classList.remove('show-links'):null;
})