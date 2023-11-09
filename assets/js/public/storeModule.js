let storeModule = ((
    generalUtil, 
    localStorageUtil, 
    formDataUtil
    ) => {

    let _this = {};
    const INVENTORY_LS_KEY = 'inventory';
    const SHOPPING_CART_LS_KEY = 'shopping_cart';
    const INVIOCE_LS_KEY = 'invoices';

    let getInventoryFromLocalStorage = () => localStorageUtil.get(INVENTORY_LS_KEY) || [];
    let getShoppingCartFromLocalStorage = () => localStorageUtil.get(SHOPPING_CART_LS_KEY) || [];

    let saveShoppingCartInLocalStorage = data => {
        localStorageUtil.save(SHOPPING_CART_LS_KEY, data);
    };

    let saveInvoicesInLocalStorage = data => {
        localStorageUtil.save(INVIOCE_LS_KEY, data);
    };

    let updateAddedToCartItemsTotal = () => {
        shoppingCartArray = getShoppingCartFromLocalStorage();
        document.querySelector('span#shopping-cart-total-items').textContent = shoppingCartArray.length;
    };

    _this.loadInventory = () => {

        let basicCard = document.querySelector('#basic-card');
        let itemList = document.querySelector('section.item-list');

        itemList.innerHTML = '';

        inventoryArray = getInventoryFromLocalStorage();

        inventoryArray.forEach(item => {

            if (item.status == '1') {

                let newCard = basicCard.cloneNode(true);

                newCard.removeAttribute('id');
    
                newCard.querySelector('h3.item-name').textContent = item.name + ` - (${item.sku})` || '';
                newCard.querySelector('img.item-image').src = item.imageUrl;
                newCard.querySelector('p.item-description').textContent = item.description;
                newCard.querySelector('span.item-price').textContent = item.price;
                newCard.querySelector('span.item-stock').textContent = item.stock;
                newCard.querySelector('input.item-sku').value = item.sku;
    
                let addToCartButton = newCard.querySelector('button.add-to-cart-button');

                addToCartButton.addEventListener('click',  (event) => {
                    event.preventDefault();
                    
                    let form = addToCartButton.closest('form');

                    let shoppingCartObj = formDataUtil.formToObject(form);

                    shoppingCartArray = getShoppingCartFromLocalStorage();
                    shoppingCartArray.push(shoppingCartObj);
                    saveShoppingCartInLocalStorage(shoppingCartArray);

                    updateAddedToCartItemsTotal();
                    _this.loadShoppingCartItems();

                    return false;
                });

                itemList.appendChild(newCard);    
            }
        });

        updateAddedToCartItemsTotal();
    };

    let updatePricesOnBasket = shoppingCartArray => {

        const inventoryArray = getInventoryFromLocalStorage();

        shoppingCartArray.forEach(item => {
            let itemFound = inventoryArray.find(product => product.sku == item.sku);
            if (itemFound) {
                item['price'] = itemFound['price'];
            }
            item['total'] = item['price'] * item['quantity'];
        });

        return shoppingCartArray;
    }

    let calculateTotalsBasket = shoppingCartArray => {

        let totalQty = 0;
        let totalPrice = 0;

        shoppingCartArray.forEach(item => {
            totalQty = totalQty + parseInt(item['quantity'], 10);
            totalPrice = totalPrice + parseInt(item['total'], 10);
        });

        return {
            'totalQty': totalQty,
            'totalPrice': totalPrice
        };
    }

    _this.loadShoppingCartItems = () => {

        let basketContainer = document.querySelector('table#items-basket-table');
        let basketTbodyContainer = basketContainer.querySelector('tbody')

        basketTbodyContainer.innerHTML = '';

        shoppingCartArray = getShoppingCartFromLocalStorage();

        if (shoppingCartArray.length == 0) {
            basketTbodyContainer.innerHTML = `
            <tr>
                <td class="text-center" colspan="3">
                    <p>Empty Basket.</p>
                </td>
            </tr>
            `;
        }

        updatePricesOnBasket(shoppingCartArray).forEach(item => {

            let rowElem = document.createElement('tr');
            let totalFormatted = generalUtil.formatPrice(item.total);
            
            rowElem.innerHTML = `
            <td>${item.sku}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${totalFormatted}</td>
            <td><a href="javascript:void(0)" class="shopping-cart-delete">[delete]</a></td>
            `;

            basketTbodyContainer.appendChild(rowElem);

            rowElem.querySelector('a.shopping-cart-delete').addEventListener('click',  (event) => {
                event.preventDefault();

                if (confirm("Confirm item delete?")) {

                    shoppingCartArrayToDelete = getShoppingCartFromLocalStorage();
                    newShoppingCartArray = shoppingCartArrayToDelete.filter(product => product.sku != item.sku);
                    saveShoppingCartInLocalStorage(newShoppingCartArray);
    
                    updateAddedToCartItemsTotal();
                    _this.loadShoppingCartItems();
                }

                return false;
            });
        });

        let totalsObj = calculateTotalsBasket(shoppingCartArray);

        basketContainer.querySelector('span#total-qty-basket').textContent = totalsObj.totalQty;
        basketContainer.querySelector('span#total-price-basket').innerHTML = generalUtil.formatPrice(totalsObj.totalPrice);

        document.querySelector('button#button-pay').addEventListener('click',  (event) => {
            event.preventDefault();
            
            if (confirm("Payment confirm?")) {

                let shoppingCartArray = getShoppingCartFromLocalStorage();
                let shoppingCartArrayUpdated = updatePricesOnBasket(shoppingCartArray);
                let totalsObj = calculateTotalsBasket(shoppingCartArray);
                
                let invoice = {
                    'date': generalUtil.getDate(),
                    'items': shoppingCartArrayUpdated,
                    'total': totalsObj.totalPrice
                }

                saveInvoicesInLocalStorage(invoice);
                saveShoppingCartInLocalStorage([]);
            }

            return false;
        });
    };

    return _this;

})(
    generalUtil, 
    localStorageUtil, 
    formDataUtil
);

document.addEventListener("DOMContentLoaded", () => {

    validateLoggedUserUtil.validate('./../../index.html');

    storeModule.loadInventory();
    storeModule.loadShoppingCartItems();

});

function openNav() {
    document.getElementById("mySidenav").style.width = "60%";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}