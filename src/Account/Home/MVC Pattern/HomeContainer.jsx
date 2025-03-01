import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePresenter from './HomePresenter';
import useProductsObserver from './Observer Pattern/useProductsObserver';

const HomeContainer = () => {
    const { products, loading } = useProductsObserver(); // Dùng Observer thay vì fetch thủ công
    // const [open, setOpen] = useState(false);
    // const navigate = useNavigate();

    return <HomePresenter products={products} loading={loading} />;
};

export default HomeContainer;
