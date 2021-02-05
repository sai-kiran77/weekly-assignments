const navBar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if(window.scrollY > 80){
        navBar.classList.add('opened');
    }else{
        navBar.classList.remove('opened');
    }
})