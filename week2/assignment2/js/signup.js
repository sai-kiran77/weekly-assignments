const submitButton = document.querySelector('#submit')
const loginButton = document.querySelector('#login')
const danger = document.querySelector('.danger')

const regexForEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const regexForPasswordInvalid = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    let formValid = true
    // let gender = document.querySelector('input[name="gender"]:checked')
    // .forEach(radio => {
    //     if(radio.checked){
    //         return radio.value
    //     }
    // })

    const data = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        mobile: document.querySelector('#mobile').value,
        DOB: document.querySelector('#DOB').value,
        password: document.querySelector('#password').value,
        confirmPassword: document.querySelector('#confirmPassword').value,
        gender: document.querySelector('input[name="gender"]:checked')
    }

    const userDate = data.DOB.split('-')

    for (let key in data) {
        if (data[key] === null || data[key] === "") {
            danger.innerText = `${key} should not be empty`
            formValid = false
            return
        } if (key === 'name' && data.name.length <= 6) {
            danger.innerText = `${key} length should not be less than 6`
            formValid = false
            return
        } if (key === 'email' && !regexForEmail.test(data.email)) {
            danger.innerText = `${key} is not valid`
            formValid = false
            return
        } if (key === 'mobile' && data.mobile.length !== 10) {
            danger.innerText = `${key} length should be equal to 10`
            formValid = false
            return
        }
        if (key === 'DOB' && (new Date(userDate[0],userDate[1]-1,userDate[2]).getTime() > new Date().getTime())) {
            danger.innerText = `${key} cannot be greater than current date`
            formValid = false
            return
        }
        if (key === 'password' && regexForPasswordInvalid.test(data.password)) {
            danger.innerText = `${key} is not valid`
            formValid = false
            return
        } if (data.password !== data.confirmPassword) {
            danger.innerText = 'password and confirm password are not matched'
            formValid = false
            return
        } if (key === 'gender' && data.gender === null) {
            danger.innerText = `gender should not be empty`
            formValid = false
            return
        } else if (key === 'gender' && data.gender.value !== null) {
            // debugger
            data.gender = data.gender.value
        }
    }

    if (formValid) {
        let getData = localStorage.getItem('data')
        data.loggedIn = true
        if (getData === null) {
            getData = { body: [] }
            getData.body.push(data)
            localStorage.setItem('data', JSON.stringify(getData))
        } else {
            const jsonObj = JSON.parse(getData)
            const existingEmail = jsonObj.body.find(obj => obj.email === data.email)
            if (!existingEmail) {
                jsonObj.body.push(data)
                localStorage.setItem('data', JSON.stringify(jsonObj))
            } else {
                danger.innerText = 'Email already exists! try login'
                return
            }
        }
        location.href = '../html/dashboard.html?signup=true'
    }
})

loginButton.addEventListener('click', (e) => {
    e.preventDefault()
    location.href = '../html/login.html'
})