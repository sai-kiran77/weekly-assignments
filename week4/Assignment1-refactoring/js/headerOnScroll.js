const navBar = document.querySelector('nav');
const links = document.querySelector('.links')

const openMenuBar = () => {
    if (window.scrollY > 80 || window.innerWidth <= 768) {
        navBar.classList.add('opened');
    } else if (window.scrollY < 80 && window.innerWidth > 768) {
        navBar.classList.remove('opened');
    }
}

window.addEventListener('scroll', () => {
    openMenuBar()
})

window.addEventListener('resize', () => {
    openMenuBar()
    if (window.innerWidth > 768) {
        links.style.right = '75px'
    } else if (window.innerWidth <= 768) {
        if (links.style.right !== '0%') {
            menuOpen.classList.remove('hide')
            menuClose.classList.add('hide')
            links.style.right = "100%"
        }
    }
})

openMenuBar()