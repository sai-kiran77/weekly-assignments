const getLoginData = localStorage.getItem('userData')
const parseLoginData = JSON.parse(getLoginData)

$.ajax({
    type: 'GET',
    url: "https://netco-indo-test.nfrnds.net:20003/fmcg-dd/initialData",
    headers: {
        'Netco-JWT': parseLoginData.token
    },
    success: function (res) {
        console.log(res)
    },
    error: function (request, textStatus, errorThrown) {
        console.log(request)
        console.log(textStatus)
    }
})