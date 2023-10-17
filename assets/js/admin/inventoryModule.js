let inventoryModule = (function(localStorageUtil) {
    let _this = {};
    const INVENTORY_LS_KEY = 'inventory';

    let getInventoryArray = function () {
        return localStorageUtil.get(INVENTORY_LS_KEY) || [];
    }

    _this.saveProduct = function(product) {
        inventoryArray = getInventoryArray();
        inventoryArray.push(product);
        localStorageUtil.save(INVENTORY_LS_KEY, inventoryArray);
    };

    _this.deleteProduct = function(sku) {
        inventoryArray = getInventoryArray();
        newInventoryArray = inventoryArray.filter(function(product) {
            return product.sku != sku;
        });
        localStorageUtil.save(INVENTORY_LS_KEY, newInventoryArray);
    };

    _this.loadInventory = function() {

        let basicCard = document.querySelector('#basic-card');
        let itemList = document.querySelector('section.item-list');

        itemList.innerHTML = '';

        inventoryArray = getInventoryArray();

        inventoryArray.forEach(item => {

            let newCard = basicCard.cloneNode(true);

            newCard.removeAttribute('id');

            newCard.querySelector('h3.item-name').textContent = item.name + ` - (${item.sku})` || '';
            newCard.querySelector('img.item-image').src = item.imageUrl;
            newCard.querySelector('p.item-description').textContent = item.description;
            newCard.querySelector('span.item-price').textContent = item.price;
            newCard.querySelector('span.item-stock').textContent = item.stock;
    
            itemList.appendChild(newCard);
        });
    }

    return _this;
})(localStorageUtil);

document.addEventListener("DOMContentLoaded", function() {

    inventoryModule.loadInventory();

    const saveItemButton = document.querySelector('#save-item');
    
    saveItemButton.addEventListener('click', function(event) {

        event.preventDefault();

        const form = document.querySelector('#item-form');

        let product = {
            sku: form.querySelector('#item-sku').value,
            name: form.querySelector('#item-name').value,
            description: form.querySelector('#item-description').value,
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE1GoxWMlMhCehDo4ghBebuUOnsCeGtD63xw&usqp=CAU",
            stock: form.querySelector('#item-stock').value,
            price: form.querySelector('#item-price').value
        };

        inventoryModule.saveProduct(product);

        inventoryModule.loadInventory();
    
        return false;
    });
});

/*
let product = {
    sku: "NIN",
    name: "Nintendo",
    description: "Consola de juegos nintento.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/NES-Console-Set.png/1200px-NES-Console-Set.png",
    stock: 5,
    price: 500
}

for (let index = 0; index < 10; index++) {

    product.sku = "NIN" + (index + 1)

    inventoryModule.saveProduct(product);   
}

//inventoryModule.deleteProduct("NIN001");
*/