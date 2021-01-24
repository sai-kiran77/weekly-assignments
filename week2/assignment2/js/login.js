const submitButton = document.querySelector('#submit')
const signupButton = document.querySelector('#signup')
const danger = document.querySelector('.danger')

const regexForEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const regexForPasswordInvalid = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/

submitButton.addEventListener('click', (e) => {
    e.preventDefault()

    let formValid = true

    const data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }

    for (let key in data) {
        if (data[key] === null || data[key] === "") {
            danger.innerText = `${key} should not be empty`
            formValid = false
            return
        } if (key === 'email' && !regexForEmail.test(data.email)) {
            danger.innerText = `${key} is not valid`
            formValid = false
            return
        } if (key === 'password' && regexForPasswordInvalid.test(data.password)) {
            danger.innerText = `${key} is not valid`
            formValid = false
            return
        }
    }

    if (formValid) {
        const getData = localStorage.getItem('data')
        const parsedData = JSON.parse(getData)
        parsedData.body.forEach(element => {
            if (element.email === data.email && element.password === data.password) {
                element.loggedIn = true
                localStorage.setItem('data', JSON.stringify(parsedData))
                danger.innerText = ''
                location.href = '../html/dashboard.html?login=true'
                return
            } else {
                danger.innerText = 'unable to login'
            }
        })
    }
})

signupButton.addEventListener('click', (e) => {
    e.preventDefault()
    location.href = '../html/signup.html'
})