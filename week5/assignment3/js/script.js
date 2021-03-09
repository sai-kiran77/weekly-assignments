const startButton = document.querySelector('.start')
const wrapper = document.querySelector('.wrapper')
const body = document.querySelector('body')
const stopContainer = document.querySelector('.stop-container')
const stopButton = document.querySelector('.stop')
const restartButton = document.querySelector('.restart')
const scoreContainer = document.querySelector('.score')
const actualScore = document.querySelector('.score-value')
const gameOver = document.querySelector('.game-over')
let score = 0
let id = 0;
let createBubbleInterval;

function createBubble() {
    let letter = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    const alphabet = document.createElement('button')
    id++
    alphabet.id = id
    alphabet.classList.add('btn-bubble')
    alphabet.style.left = `${Math.floor(Math.random() * 95)}%`
    alphabet.value = letter
    alphabet.innerText = letter
    body.appendChild(alphabet)
    alphabet.addEventListener('animationend', () => {
        gameOver.style.display = 'block'
        stopGame()
        scoreContainer.classList.add('center-score')
    })
}

const stopGame = (e) => {
    id = 0;
    clearInterval(createBubbleInterval)
    const btnBubble = document.querySelectorAll('.btn-bubble')
    btnBubble.forEach(element => element.style['animation-play-state'] = 'paused')
    scoreContainer.classList.add('center-score')
}

startButton.addEventListener('click', (e) => {
    wrapper.style.opacity = 0.2
    startButton.disabled = true
    stopContainer.style.display = 'flex'
    scoreContainer.style.display = 'flex'
    scoreContainer.classList.remove('center-score')
    createBubbleInterval = setInterval(createBubble, 1000)
})

stopButton.addEventListener('click', stopGame)

restartButton.addEventListener('click', (e) => {
    id = 0;
    wrapper.style.opacity = 1
    startButton.disabled = false
    stopContainer.style.display = 'none'
    scoreContainer.style.display = 'none'
    gameOver.style.display = 'none'
    clearInterval(createBubbleInterval)
    const btnBubble = document.querySelectorAll('.btn-bubble')
    btnBubble.forEach(element => element.remove())
})

window.addEventListener('keydown', (e) => {
    const bubbles = Array.from(document.querySelectorAll('.btn-bubble'))
    bubbles.every(element => {
        if (element.value === e.key.toLowerCase()) {
            actualScore.innerText = ++score
            element.remove()
            return false
        }
        return true
    })
})


// const arr = [1, 2, 3, 4]

// arr.forEach(value=>{
//     if(value === 2){
//         break;
//     console.log(value)
// }
// })

// arr.every(value => {
//     if (value === 3) {
//         return false;
//     }
//     console.log(value)
//     return true
// })