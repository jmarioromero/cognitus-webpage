let inventoryModule = ((localStorageUtil, formDataUtil) => {

    let _this = {};
    const INVENTORY_LS_KEY = 'inventory';

    let getInventoryFromLocalStorage = () => localStorageUtil.get(INVENTORY_LS_KEY) || [];

    _this.saveProduct = product => {
        inventoryArray = getInventoryFromLocalStorage();
        inventoryArray.push(product);
        localStorageUtil.save(INVENTORY_LS_KEY, inventoryArray);
    };

    _this.deleteProduct = sku => {
        inventoryArray = getInventoryFromLocalStorage();
        newInventoryArray = inventoryArray.filter(product => product.sku != sku);
        localStorageUtil.save(INVENTORY_LS_KEY, newInventoryArray);
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

        const editProductAction = (item, index) => {
            
            let modal = document.querySelector('div#myModal');

            modal.style.display = 'block';

            modal.querySelector('#item-id').value = index;
            modal.querySelector('#item-name').value = item.name;
            modal.querySelector('#item-sku').value = item.sku;
            modal.querySelector('#item-image-url').value = item.imageUrl;
            modal.querySelector('#item-description').value = item.description;
            modal.querySelector('#item-price').value = item.price;
            modal.querySelector('#item-stock').value = item.stock;

            modal.querySelector('span.close').addEventListener('click', event => {
                event.preventDefault();
                modal.style.display = 'none';
                return;
            });

            modal.querySelector('button#edit-item').addEventListener('click', event => {
                event.preventDefault();
                const form = document.querySelector('form#item-form-edit');
                const data = formDataUtil.formToObject(form);
                
                

                return;
            });
        };

        inventoryArray.forEach((item, index) => {

            let newCard = basicCard.cloneNode(true);

            newCard.removeAttribute('id');

            newCard.querySelector('h3.item-name').textContent = item.name + ` - (${item.sku})` || '';
            newCard.querySelector('img.item-image').src = item.imageUrl;
            newCard.querySelector('p.item-description').textContent = item.description;
            newCard.querySelector('span.item-price').textContent = item.price;
            newCard.querySelector('span.item-stock').textContent = item.stock;

            newCard.querySelector('button.item-delete-button')
                .addEventListener('click', () => {
                    deleteProductAction(item);
                });

            newCard.querySelector('button.item-edit-button')
                .addEventListener('click',  () => {
                    editProductAction(item, index);
                });

            itemList.appendChild(newCard);
        });
    };

    _this.initSaveItemForm = () => {

        const saveItemButton = document.querySelector('#save-item');
    
        saveItemButton.addEventListener('click', event => {
    
            event.preventDefault();
    
            const form = document.querySelector('form#item-form-create');

            product = formDataUtil.formToObject(form);
    
            inventoryModule.saveProduct(product);
    
            inventoryModule.loadInventory();

            form.reset();
        
            return false;
        });
    };

    return _this;

})(localStorageUtil, formDataUtil);

document.addEventListener("DOMContentLoaded", () => {

    inventoryModule.loadInventory();
    inventoryModule.initSaveItemForm();

});
