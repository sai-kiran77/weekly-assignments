const catogeriesDivForScroll = document.querySelector('.catogeries')

const setScroll = () => {
    if(catogeriesDivForScroll.childElementCount * 100 >= window.innerWidth){
        catogeriesDivForScroll.style['overflow-x'] = 'scroll'
    }else{
        catogeriesDivForScroll.style['overflow-x'] = ''
    }
}