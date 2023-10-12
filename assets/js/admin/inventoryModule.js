let inventoryModule = (function(localStorageUtil) {
    let _this = {};
    const INVENTORY_LS_KEY = 'inventory';

    let getInventoryArray = function () {
        return localStorageUtil.get(INVENTORY_LS_KEY) || [];
    }

    _this.saveProduct = function(product) {

        inventoryArray = getInventoryArray();

        inventoryArray.find(function() {
            return product.sku != sku;
        })

        localStorageUtil.save(INVENTORY_LS_KEY, product);

    };

    _this.deleteProduct = function(sku) {

        inventoryArray = getInventoryArray();

        newInventoryArray = inventoryArray.filter(function(product) {
            return product.sku != sku;
        });

        localStorageUtil.save(INVENTORY_LS_KEY, newInventoryArray);
    };

    return _this;
})(localStorageUtil);

let product = {
    sku: "NIN001",
    name: "Nintendo",
    description: "Consola de juegos nintento.",
    imageUrl: "http://nintendo.jpg",
    stock: 5,
    price: 500
}

inventoryModule.deleteProduct("NIN001");