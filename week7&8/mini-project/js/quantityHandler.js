function handleQuantity(btnType, whsId) {
    // console.log(whsId);
    // if(whsId) wholesalersDropdown.value = whsId
    let productId = this.parentElement.parentElement.id;
    if (location.href.search('checkout.html') > 0) {
        productId = this.parentElement.parentElement.parentElement.id;
    }
    if (btnType === 'plus') {
        const data = JSON.parse(localStorage.getItem('requiredData'))
        data.map(obj => {
            if (obj.whsId == whsId && obj.productId == productId) {
                const qty = this.previousElementSibling.innerText
                // const [string, qty] = this.previousElementSibling.innerText.split(':')
                this.previousElementSibling.innerText = +qty + 1
                obj.quantity = +qty + 1
            }
        })
        localStorage.setItem('requiredData', JSON.stringify(data))
        stripeDetails(whsId)
    }
    if (btnType === 'sub') {
        const data = JSON.parse(localStorage.getItem('requiredData'))
        data.map(obj => {
            if (obj.whsId == whsId && obj.productId == productId) {
                const qty = this.nextElementSibling.innerText
                // const [string, qty] = this.nextElementSibling.innerText.split(':')
                if (qty > 0) {
                    this.nextElementSibling.innerText = +qty - 1
                    obj.quantity = +qty - 1
                }
            }
        })
        localStorage.setItem('requiredData', JSON.stringify(data))
        stripeDetails(whsId)
    }
}