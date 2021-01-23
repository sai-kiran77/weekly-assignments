const submitButton = document.querySelector('#submit')
const signupButton = document.querySelector('#signup')
const danger = document.querySelector('.danger')

submitButton.addEventListener('click',(e)=>{
    e.preventDefault()

    let formValid = true

    const data = {
        email:document.querySelector('#email').value,
        password:document.querySelector('#password').value
    }

    for (let key in data) {
        if (data[key] === null || data[key] === "") {
            danger.innerText = `${key} should not be empty`
            formValid = false
        }
    }

    if(formValid){
        const getData = localStorage.getItem('data')
        const parsedData = JSON.parse(getData)
        // console.log(parsedData)
        parsedData.body.forEach(element =>{
            if(element.email === data.email && element.password === data.password){
                element.loggedIn = true
                localStorage.setItem('data',JSON.stringify(parsedData))
                location.href = '../html/dashboard.html?login=true'
                danger.innerText = ''
            }else{
                danger.innerText = 'unable to login'
            }
        })
    }
})

signupButton.addEventListener('click',(e)=>{
    e.preventDefault()
    location.href = '../html/signup.html'
})