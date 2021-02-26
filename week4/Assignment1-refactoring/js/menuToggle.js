const menu = document.querySelector('.menu')
const navLinks = document.querySelector('.links')
const menuOpen = document.querySelector("#menu-open")
const menuClose = document.querySelector("#menu-close")

menu.addEventListener('click', (e) => {
    menuOpen.classList.toggle('hide')
    menuClose.classList.toggle('hide')
})

menuOpen.addEventListener('click',()=>{
    navLinks.style.right = "0%"
    navLinks.style.display = 'block'
})

menuClose.addEventListener('click',(e)=>{
    navLinks.style.right = "100%"
})