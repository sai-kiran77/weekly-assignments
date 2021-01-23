const outputdiv = document.querySelector('#output')
const logoutButton = document.querySelector('#logout')

const queryParamString = location.search
const queryParamsObject = {}

const queryParams = queryParamString.substr(1).split('&')
queryParams.map(ele => {
    const [key, value] = ele.split('=')
    queryParamsObject[key] = value
})

const getData = localStorage.getItem('data')
const parsedData = JSON.parse(getData)
const loginData = parsedData.body.find(obj => obj.loggedIn === true)
// console.log(loginData)

for (let key in queryParamsObject) {
    if (key === 'signup' && loginData) {
        outputdiv.innerText = `Welcome ${loginData.name}! Your Registration successful!`
    } else if (key === 'login' && loginData) {
        outputdiv.innerText = `Welcome ${loginData.name}! loggedin succesfully`
    }
}

logoutButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (loginData) {
        loginData.loggedIn = false
        parsedData.body.map(obj => {
            if (obj.email === loginData.email) {
                obj = loginData
            }
        })
        localStorage.setItem('data', JSON.stringify(parsedData))
    }
    location.href = '../html/login.html'
})