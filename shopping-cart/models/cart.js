
module.exports = function Cart(oldCart) {
    // untuk seluruh produk dalam cart
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id]; // => untuk SEBUAH produk dalam cart
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty:0, price: 0}; // => untuk SEBUAH produk dalam cart
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }

        return arr;
    }
};