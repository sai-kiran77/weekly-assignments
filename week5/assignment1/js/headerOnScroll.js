const navBar = document.querySelector('nav');
const links = document.querySelector('.links')
const header = document.querySelector('header')

const openMenuBar = () => {
    if (window.scrollY > 80 && window.innerWidth > 768) {
        header.classList.add('opened');
    } else if (window.scrollY <= 80 && window.innerWidth > 768) {
        header.classList.remove('opened');
        links.classList.remove('hide-links')
        links.classList.remove('show-links')
    }
}

window.addEventListener('scroll', () => {
    openMenuBar()
})

window.addEventListener('resize', () => {
    if(window.innerWidth > 768){
        links.classList.remove('show-links','hide-links')
        menuClose.classList.add('hide')
        menuOpen.classList.remove('hide')
        // menuOpen.classList.remove('hide')
        // menuClose.classList.add('hide')
    }
})

openMenuBar()