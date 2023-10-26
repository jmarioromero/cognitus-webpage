let inventoryModule = ((localStorageUtil, formDataUtil) => {

    let _this = {};
    const INVENTORY_LS_KEY = 'inventory';

    let getInventoryFromLocalStorage = () => localStorageUtil.get(INVENTORY_LS_KEY) || [];

    let saveInventoryInLocalStorage = inventoryArray => {
        localStorageUtil.save(INVENTORY_LS_KEY, inventoryArray);
    };

    _this.saveProduct = product => {
        inventoryArray = getInventoryFromLocalStorage();
        inventoryArray.push(product);
        saveInventoryInLocalStorage(inventoryArray);
    };

    _this.deleteProduct = sku => {
        inventoryArray = getInventoryFromLocalStorage();
        newInventoryArray = inventoryArray.filter(product => product.sku != sku);
        saveInventoryInLocalStorage(newInventoryArray);
    };

    let closeModal = () => {
        let modal = document.querySelector('div#myModal');
        modal.querySelector('span.close').dispatchEvent(new Event('click'));
    };

    const saveProductAction = (item = {}, index = -1) => {
            
        let modal = document.querySelector('div#myModal');

        modal.querySelector('h3.title-form').textContent = (index > -1) ? 'Edit Product' : 'New Product';

        modal.style.display = 'block';

        modal.querySelector('#item-id').value = index;
        modal.querySelector('#item-name').value = item.name || '';
        modal.querySelector('#item-sku').value = item.sku || '';
        modal.querySelector('#item-image-url').value = item.imageUrl || '';
        modal.querySelector('#item-description').value = item.description || '';
        modal.querySelector('#item-price').value = item.price || '';
        modal.querySelector('#item-stock').value = item.stock || '';
        modal.querySelector('#item-status').value = item.status || '';

        modal.querySelector('span.close').addEventListener('click', event => {
            event.preventDefault();
            modal.style.display = 'none';
            return;
        });

        modal.querySelector('button#save-item-button').addEventListener('click', event => {
            event.preventDefault();

            const form = document.querySelector('form#item-form');
            const item = formDataUtil.formToObject(form);

            const itemId = parseInt(item['id'], 10);

            if (typeof item.sku == 'undefined' || item.sku == '') {
                return;
            }

            if (itemId > -1) {

                inventoryArray = getInventoryFromLocalStorage();

                inventoryArray[itemId] = item;
                
                saveInventoryInLocalStorage(inventoryArray);

            } else {
        
                inventoryModule.saveProduct(item);

                form.reset();
            }

            closeModal();
    
            inventoryModule.loadInventory();

            return;
        });
    };

    _this.loadInventory = () => {

        let basicCard = document.querySelector('#basic-card');
        let itemList = document.querySelector('section.item-list');

        itemList.innerHTML = '';

        inventoryArray = getInventoryFromLocalStorage();

        const deleteProductAction = item => {
            if (confirm("Confirm item delete?")) {
                _this.deleteProduct(item.sku);
                _this.loadInventory();
            }
        };

        inventoryArray.forEach((item, index) => {

            let newCard = basicCard.cloneNode(true);

            newCard.removeAttribute('id');

            newCard.querySelector('h3.item-name').textContent = item.name + ` - (${item.sku})` || '';
            newCard.querySelector('img.item-image').src = item.imageUrl;
            newCard.querySelector('p.item-description').textContent = item.description;
            newCard.querySelector('span.item-price').textContent = item.price;
            newCard.querySelector('span.item-stock').textContent = item.stock;
            newCard.querySelector('span.item-status').textContent = (item.status == '1') ? 'Active' : 'Disable';

            newCard.querySelector('button.item-delete-button')
                .addEventListener('click', (event) => {
                    event.preventDefault();
                    deleteProductAction(item);
                    return false;
                });

            newCard.querySelector('button.item-edit-button')
                .addEventListener('click',  (event) => {
                    event.preventDefault();
                    saveProductAction(item, index);
                    return false;
                });

            itemList.appendChild(newCard);
        });
    };

    _this.initSaveItemForm = () => {

        const saveItemButton = document.querySelector('button#item-create-button');
    
        saveItemButton.addEventListener('click', event => {
    
            event.preventDefault();

            saveProductAction();
        
            return false;
        });
    };

    return _this;

})(localStorageUtil, formDataUtil);

document.addEventListener("DOMContentLoaded", () => {

    inventoryModule.loadInventory();
    inventoryModule.initSaveItemForm();

});
