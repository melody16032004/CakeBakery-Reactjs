import React from 'react';
import ProductListContainer from './ProductList/ProductListContainer';

const ProductList = ({ setSelectedPage }) => {
    return (
        <ProductListContainer setSelectedPage={setSelectedPage} />
    );
};

export default ProductList;