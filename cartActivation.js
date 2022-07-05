var cartList = [];
var priceList = [];

function AddToCart(elem) {
    name = elem.parentNode.parentNode.id;
    cartList.push(name);

    price = elem.parentNode.querySelector('.price').innerHTML;
    priceList.push(price);

    elem.style.display = "none";
    parent = document.getElementById(name);
    children_temp = parent.querySelector('.purchase');
    children = children_temp.querySelector('.buttonRemove');
    children.style.display = "block";

    sessionStorage.setItem('cartName', cartList);
    sessionStorage.setItem('cartPrice', priceList);
}

function RemoveFromCart(elem) {
    name = elem.parentNode.parentNode.id;
    indexName = cartList.indexOf(name);
    cartList.splice(indexName, 1);

    price = elem.parentNode.querySelector('.price').innerHTML;
    indexPrice = priceList.indexOf(price);
    priceList.splice(indexPrice, 1);

    elem.style.display = "none"
    parent = document.getElementById(name);
    children_temp = parent.querySelector('.purchase'); 
    children = children_temp.querySelector('.buttonCart');
    children.style.display = "block";

    sessionStorage.setItem('cartName', cartList);
    sessionStorage.setItem('cartPrice', priceList);
}

function CheckoutList() {
    container = document.getElementById('checkout');

    dataName = sessionStorage.getItem('cartName');
    dataPrice = sessionStorage.getItem('cartPrice');
    //nth left in cart
    if (dataName == "") { 
        return;
    };
    
    checkoutName = dataName.split(",");
    checkoutPrice = dataPrice.split(",");

    for (i = 0; i < checkoutName.length; i++) {
        name = checkoutName[i];
        price = checkoutPrice[i];

        info = document.createElement('tr');
        info.className = "productLine";
        info.id = `${name} productLine`;
        detailsTD = document.createElement('td');

        image = document.createElement("img");
        image_name = `images/${name}.jpeg`;
        image.setAttribute("src", image_name);

        details = document.createElement('div');
        details.className = "details";

        details.appendChild(image);

        productInfo = document.createElement('div');
        productInfo.className = "productInfo";
        title = document.createElement('p'); 
        title.className = "cartProductName";
        title.innerHTML = name;
        productInfo.appendChild(title);

        priceText = document.createElement('small');
        priceText.className = "priceProduct";
        priceText.innerHTML = `Price: ${price}`;
        productInfo.appendChild(priceText);

        removeOption = document.createElement('a');
        removeOption.href = "";
        removeOption.className = "removeListing";
        removeOption.innerHTML = "Remove";
        removeOption.onclick = function () {
            RemoveProduct(this.parentNode.querySelector('.cartProductName').innerHTML)
        };
        productInfo.appendChild(removeOption);

        details.appendChild(productInfo);
        detailsTD.append(details)
        info.appendChild(detailsTD);

        quantityOption = document.createElement('td');
        input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.className = "quantityProduct";
        input.value = "1";

        input.onchange = function () {
            //types negative value into input field
            if (this.parentNode.querySelector('.quantityProduct').value.includes("-")) {
                this.parentNode.querySelector('.quantityProduct').value = Math.abs(this.parentNode.querySelector('.quantityProduct').value);

            }
            //type decimal into input field 
            if (this.parentNode.querySelector('.quantityProduct').value.includes(".")) {
                this.parentNode.querySelector('.quantityProduct').value = Math.round(this.parentNode.querySelector('.quantityProduct').value);
            }

            //after rounding becomes 0/manually type 0
            if (this.parentNode.querySelector('.quantityProduct').value == 0) {
                this.parentNode.querySelector('.quantityProduct').value = 1;
            }

            CalculateAmount(
                (this.parentNode.parentNode.querySelector('.priceProduct').innerHTML),
                this.parentNode.querySelector('.quantityProduct').value,
                this.parentNode.parentNode.querySelector('.cartProductName').innerHTML
            )
        };


        quantityOption.appendChild(input);
        info.appendChild(quantityOption);

        subtotalCalculation = document.createElement('td');
        subtotalCalculation.innerHTML = `${price}`;
        subtotalCalculation.id = `${name} Subtotal`;
        info.appendChild(subtotalCalculation);
        container.appendChild(info);
    };

    CalculateTotalPrice(checkoutPrice);
}

function CalculateAmount(data, quantity, name) {
    dataName = sessionStorage.getItem('cartName');
    dataPrice = sessionStorage.getItem('cartPrice');
    checkoutName = dataName.split(",");
    checkoutPrice = dataPrice.split(",");

    requiredIndex = checkoutName.indexOf(name);

    price = data.split("$")[1];
    newSubtotal = (price * quantity).toFixed(2);

    document.getElementById(`${name} Subtotal`).innerHTML = `$${newSubtotal}`
    dataPriceList = dataPrice.split(",")
    dataPriceList[requiredIndex] = `$${newSubtotal}`;
    sessionStorage.setItem('cartPrice', dataPriceList);

    CalculateTotalPrice(dataPriceList);
}

function RemoveProduct(parent) {
    container = document.getElementById('checkout');
    removedName = `${parent} productLine`;
    removedDIV = document.getElementById(removedName);

    dataName = sessionStorage.getItem('cartName');
    checkoutName = dataName.split(",");
    dataPrice = sessionStorage.getItem('cartPrice');
    checkoutPrice = dataPrice.split(",");

    removedIndex = checkoutName.indexOf(parent);
    checkoutName.splice(removedIndex, 1);
    checkoutPrice.splice(removedIndex, 1);

    sessionStorage.setItem('cartName', checkoutName);
    sessionStorage.setItem('cartPrice', checkoutPrice);
    removedDIV.remove();
}

function CalculateTotalPrice(checkoutPrice) {
    var initialAmount = 0;

    for (i = 0; i < checkoutPrice.length; i++) {
        initialAmount = (parseFloat(initialAmount) + parseFloat(checkoutPrice[i].substring(1,))).toFixed(2)
    };

    subtotal = document.getElementById('initialAmount');
    subtotal.innerHTML = `$${initialAmount}`;

    var gst = (initialAmount * 0.07).toFixed(2);
    tax = document.getElementById(`tax`);
    tax.innerHTML = `$${gst}`;

    var total = (parseFloat(initialAmount) + parseFloat(gst)).toFixed(2);
    finalAmount = document.getElementById("finalAmount");
    finalAmount.innerHTML = `$${total}`;
}
