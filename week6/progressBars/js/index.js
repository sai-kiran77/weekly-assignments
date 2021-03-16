const loader = document.querySelector('.loader')
const input = document.querySelector('.input')
const linearPercent = document.querySelector('.percent')
const circlePercent = document.querySelector('.circle__fill')
const circularProgress = document.querySelector('.progress')
const lengthOfProgress = circularProgress.getTotalLength()

circularProgress.style.strokeDasharray = lengthOfProgress
circularProgress.style.strokeDashoffset = lengthOfProgress

input.addEventListener('change', (e) => {
    console.log(input.value);

    loader.style.width = `${input.value}%`
    linearPercent.innerText = `${input.value}%`
    circlePercent.innerText = `${input.value}%`
    const onethOfProgress = lengthOfProgress / 100
    circularProgress.style.strokeDashoffset = onethOfProgress * (100 - input.value)
})
