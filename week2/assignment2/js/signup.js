const submitButton = document.querySelector('#submit')
const loginButton = document.querySelector('#login')
const danger = document.querySelector('.danger')

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    let formValid = true
    let gender = document.querySelector('input[name="gender"]:checked')
    if(gender === null){
        return
    }else{
        gender = gender.value
    }
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
        cPassword: document.querySelector('#confirmPassword').value,
        gender,
        loggedIn: true
    }

    for (let key in data) {
        if (data[key] === null || data[key] === "") {
            danger.innerText = `${key} should not be empty`
            formValid = false
        }
    }

    if (formValid) {
        let getData = localStorage.getItem('data')
        if (getData === null) {
            getData = { body: [] }
            getData.body.push(data)
            localStorage.setItem('data', JSON.stringify(getData))
        } else {
            const jsonObj = JSON.parse(getData)
            jsonObj.body.push(data)
            localStorage.setItem('data', JSON.stringify(jsonObj))
        }

        location.href = '../html/dashboard.html?signup=true'
    }
})

loginButton.addEventListener('click', (e) => {
    e.preventDefault()
    location.href = '../html/login.html'
})