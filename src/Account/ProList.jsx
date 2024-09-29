import React from 'react';

const ProductList = ({ addToCart }) => {
    const products = [
        { id: 1, name: "Cake 0", price: "94", image: "img/cake-feature/c-feature-1.jpg", image_L: "img/product/product-details-1.jpg" },
        { id: 2, name: "Cake 1", price: "56", image: "img/cake-feature/c-feature-2.jpg", image_L: "img/product/product-details-2.jpg" },
        { id: 3, name: "Cake 2", price: "20", image: "img/cake-feature/c-feature-3.jpg", image_L: "img/product/product-details-3.jpg" },
        { id: 4, name: "Cake 3", price: "39", image: "img/cake-feature/c-feature-4.jpg", image_L: "img/cake-feature/c-feature-4.jpg" },
        { id: 5, name: "Cake 4", price: "40", image: "img/cake-feature/c-feature-5.jpg", image_L: "img/product/product-details-5.jpg" },
        { id: 6, name: "Cake 5", price: "44", image: "img/cake-feature/c-feature-6.jpg", image_L: "img/product/product-details-6.jpg" },
        { id: 7, name: "Cake 6", price: "95", image: "img/cake-feature/c-feature-7.jpg", image_L: "img/product/product-details-7.jpg" },
        { id: 8, name: "Cake 7", price: "77", image: "img/cake-feature/c-feature-8.jpg", image_L: "img/product/product-details-8.jpg" },
        { id: 9, name: "Cake 8", price: "84", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
    ];

    return (
        <div className="product-list">
            <h2>Product List</h2>
            {products.map((product) => (
                <div key={product.id} className="product-item">
                    <div>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                    </div>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
