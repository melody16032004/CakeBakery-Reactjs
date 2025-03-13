import React from 'react';
import HomePresenter from './HomePresenter';
import useProductsObserver from './Observer Pattern/useProductsObserver';

const HomeContainer = () => {
    const { products, loading } = useProductsObserver();
    // Dùng Observer để fetch dữ liệu

    return <HomePresenter products={products} loading={loading} />;
};

export default HomeContainer;
