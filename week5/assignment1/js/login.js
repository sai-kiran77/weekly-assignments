const mobileInput = document.querySelector('#mobile')
const loginButton = document.querySelector('#login')
const loginStatus = document.querySelector('#status')
const invalidInput = document.querySelector('.input-error')
const formLoader = document.querySelector('#form-loader')

mobileInput.addEventListener('keyup', (e) => {
    loginStatus.innerText = ""
    if (e.target.value.length === 12) {
        invalidInput.style.display = 'none'
        mobileInput.classList.add('valid')
        mobileInput.classList.remove('not-valid')
        loginButton.classList.remove('invalid-button')
        loginButton.disabled = false
    } else {
        invalidInput.style.display = 'block'
        loginButton.classList.add('invalid-button')
        mobileInput.classList.add('not-valid')
        mobileInput.classList.remove('valid')
        loginButton.disabled = true
    }
})

function callback(data) {
    if (data.token) {
        $.ajax({
            type: 'GET',
            url: "https://netco-indo-test.nfrnds.net:20003/fmcg-dd/initialData",
            headers: {
                'Netco-JWT': data.token
            },
            success: function (data) {
                console.log(data)
                formLoader.style.display = 'none'
                loginStatus.innerText = 'Login success'
                loginStatus.classList.add('success')
                loginStatus.classList.remove('error')
                location.href = '../html/app.html'
            },
            error: function (request, textStatus, errorThrown) {
                console.log(request)
                console.log(textStatus)
                console.log(errorThrown)
                if(request.responseJSON.status === 403){
                    loginStatus.innerText = 'unAuthorised!'
                }
                formLoader.style.display = 'none'
                loginStatus.classList.add('error')
                loginStatus.classList.remove('success')
            }
        })
    } else {
        console.log(data)
        formLoader.style.display = 'none'
        loginStatus.innerText = data.responseDesc
        loginStatus.classList.add('error')
        loginStatus.classList.remove('success')
    }
}

loginButton.addEventListener('click', (e) => {
    formLoader.style.display = 'block'
    //post request using jquery ajax
    jQuery.ajax({
        'type': 'POST',
        'url': "https://netco-indo-test.nfrnds.net:20003/fmcg-dd/login",
        'contentType': 'application/json',
        'dataType': 'json',
        'data': JSON.stringify({
            msisdn: mobileInput.value,
            loginType: "KAIZALA",
            groupId: "",
            KIS: "",
            actionPackageId: "",
            version: "",
            minorVersion: ""
        }),
        success: callback,
        error: function (request, textStatus, errorThrown) {
            console.log(request)
            console.log(textStatus);
            console.log(errorThrown);
            formLoader.style.display = 'none'
            loginStatus.innerText = 'unable to verify data'
            loginStatus.classList.add('error')
            loginStatus.classList.remove('success')
        }
    })

    //post request using fetch
    // const response = fetch("https://netco-indo-test.nfrnds.net:20003/fmcg-dd/login", {
    //     method: "post",
    //     headers: new Headers({ 'Content-Type': 'application/json' }),
    //     body: JSON.stringify({
    //         msisdn: mobileInput.value,
    //         loginType: "KAIZALA",
    //         groupId: "",
    //         KIS: "",
    //         actionPackageId: "",
    //         version: "",
    //         minorVersion: ""
    //     })
    // })

    // response.then((res) => {
    //     res.json().then(data => {
    //         if (data.responseCode == 200) {
    //             fetch('https://netco-indo-test.nfrnds.net:20003/fmcg-dd/initialData', {
    //                 method: 'get',
    //                 headers: { 'Netco-JWT': data.token }
    //             }).then(response => {
    //                 response.json().then(obj => {
    //                     console.log(obj)
    //                     loginStatus.innerText = 'Login success'
    //                     loginStatus.classList.add('success')
    //                     loginStatus.classList.remove('error')
    //                 })
    //             })
    //         }
    //         else {
    //             console.log(data)
    //             loginStatus.innerText = data.responseDesc
    //             loginStatus.classList.add('error')
    //             loginStatus.classList.remove('success')

    //         }

    //     })
    // }).catch(err => {
    //     console.log(err);
    //     loginStatus.innerText = 'unable to fetch data'
    //     loginStatus.classList.add('error')
    //     loginStatus.classList.remove('success')
    // })
})