const navBar = document.querySelector('nav');
const links = document.querySelector('.links');
const header = document.querySelector('header');

const openMenuBar = () => {
    if (window.scrollY > 80 && window.innerWidth > 768) {
        header.classList.add('opened');
    } else if (window.scrollY <= 80 && window.innerWidth > 768) {
        header.classList.remove('opened');
        links ? links.classList.remove('hide-links') : null;
        links ? links.classList.remove('show-links') : null;
    }
}

window.addEventListener('scroll', () => {
    openMenuBar();
})

window.addEventListener('resize', () => {
    location.href.endsWith('app.html') ? setScroll() : null
    if (window.innerWidth > 768) {
        links ? links.classList.remove('show-links', 'hide-links') : null;
        menuClose.classList.add('hide');
        menuOpen.classList.remove('hide');
    }
})

openMenuBar()