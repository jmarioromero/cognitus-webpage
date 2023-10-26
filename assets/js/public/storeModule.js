let storeModule = ((localStorageUtil, formDataUtil) => {

    let _this = {};
    const INVENTORY_LS_KEY = 'inventory';

    let getInventoryFromLocalStorage = () => localStorageUtil.get(INVENTORY_LS_KEY) || [];

    _this.loadInventory = () => {

        let basicCard = document.querySelector('#basic-card');
        let itemList = document.querySelector('section.item-list');

        itemList.innerHTML = '';

        inventoryArray = getInventoryFromLocalStorage();

        inventoryArray.forEach((item, index) => {

            if (item.status == '1') {

                let newCard = basicCard.cloneNode(true);

                newCard.removeAttribute('id');
    
                newCard.querySelector('h3.item-name').textContent = item.name + ` - (${item.sku})` || '';
                newCard.querySelector('img.item-image').src = item.imageUrl;
                newCard.querySelector('p.item-description').textContent = item.description;
                newCard.querySelector('span.item-price').textContent = item.price;
                newCard.querySelector('span.item-stock').textContent = item.stock;
    
                newCard.querySelector('button.add-to-cart-button')
                    .addEventListener('click',  (event) => {
                    event.preventDefault();
                    localStorageUtil.save('cart', JSON.stringify(item));
                    return false;
                });

                itemList.appendChild(newCard);    
            }
        });
    };

    return _this;

})(localStorageUtil, formDataUtil);

document.addEventListener("DOMContentLoaded", () => {

    storeModule.loadInventory();

});
