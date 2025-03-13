class ProductModel {
    constructor(id, name, description, price, quantity, categoryId, imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.categoryId = categoryId;
        this.imageUrl = imageUrl;
    }
}

export default ProductModel;
