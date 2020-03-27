let finalPrice = document.querySelector('#total');

let totalPriceProduct = document.querySelectorAll('#sub-total span');

let total = 0;

totalPriceProduct.forEach(price => {
    total += Number(price.innerText)
});

finalPrice.innerText = `$ ${total}`



qtyPerProduct = document.querySelectorAll('[data-product] input');

qtyPerProduct.forEach(qty => {

    qty.addEventListener('change', function () {

        let qty = Number(this.value);

        let ptoPrice = this.parentElement.parentElement.querySelector('#price span').innerText;

        let price = Number(qty * ptoPrice);

        let totalPrice = this.parentElement.parentElement.querySelector('#sub-total span').innerText = price;

        let total = 0;
        
        totalPriceProduct.forEach(price => {
            total += Number(price.innerText)
        });

        finalPrice.innerText = `$ ${total}`


    })

})