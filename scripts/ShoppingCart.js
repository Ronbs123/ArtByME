console.log("This is my Shopping Cart page")
// TODO: fix bug when removing item completly the img remains
window.addEventListener('load', ()=> { //post to a route that registers the user to the db
    let removeCartItemButtons = document.getElementsByClassName('product-remove')
    console.log(removeCartItemButtons)
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', async (event)=> {
            console.log('clicked remove button')
            let buttonClicked = event.target
            let product = buttonClicked.parentElement.parentElement
            let quantity = product.getElementsByClassName('product-quantity').item(0)
            let curQnt = quantity.getElementsByClassName('qnt')[0].value
            console.log('Qnt == 1:' + parseInt(curQnt) == 1)
            if (parseInt(curQnt) === 1) {
                buttonClicked.parentElement.parentElement.remove()
            } else {
                quantity.getElementsByClassName('qnt')[0].value = curQnt - 1
            }

            let products = document.getElementsByClassName("product-info")
            if (products.length > 0) {
                updateCartTotal()
            }

        })
    }

    function updateCartTotal() {
        let total = 0
        let numOfItems = 0
        let cartItemContainer = document.getElementsByClassName('products')[0]
        let cartItemInfo = cartItemContainer.getElementsByClassName('product-info')
        for (let i = 0; i < cartItemInfo.length; i++) {
            let cartItemPrice = cartItemInfo[i].getElementsByClassName('product-price')[0].innerHTML
            let cartItemQnt = cartItemInfo[i].getElementsByClassName('product-quantity')[0].getElementsByClassName('qnt')[0].value
            total += parseInt(cartItemPrice)
            numOfItems += parseInt(cartItemQnt)
        }
        console.log(total)
        document.getElementById("total-price").innerText = total + "$"
        document.getElementById("num-of-items").innerText = numOfItems

    }
})
