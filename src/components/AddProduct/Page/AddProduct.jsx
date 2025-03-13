import React, { useState } from 'react';
import useAddProductViewModel from '../ViewModel/AddProductViewModel';
import AddProductForm from '../Component/AddProductForm';
import LoadingOverlay from '../../../Account/Home/MVC Pattern/Factory Pattern/LoadingOverlay';

const AddProduct = () => {
    const [loading, setLoading] = useState(false);// Trạng thái loading
    const viewModel = useAddProductViewModel(setLoading);

    return (
        <>
            <LoadingOverlay loading={loading} /> {/* Hiển thị khi loading */}
            <AddProductForm {...viewModel} />
        </>
    );
};

export default AddProduct;
