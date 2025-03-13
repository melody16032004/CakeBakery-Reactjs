// src/viewmodels/AddProductViewModel.js
import { useState, useEffect } from 'react';
import ProductRepository from '../Repository/ProductRepository';
import FirebaseStorageService from '../Service/FirebaseStorageService';

const useAddProductViewModel = ({ setLoading }) => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productQuantity, setProductQuantity] = useState(10);
    const [productImage, setProductImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDuplicateName, setIsDuplicateName] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');



    useEffect(() => {
        const fetchCategories = async () => {
            const data = await ProductRepository.getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const checkDuplicate = async () => {
            if (productName) {
                const exists = await ProductRepository.checkDuplicateProductName(productName);
                setIsDuplicateName(exists);
            }
        };
        checkDuplicate();
    }, [productName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (isDuplicateName) {
            setErrorMessage('Tên sản phẩm đã tồn tại.');
            return;
        }

        if (!productName || !productImage || !selectedCategory) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        setLoading(true); // Bắt đầu loading

        try {
            const imageUrl = await FirebaseStorageService.uploadProductImage(productImage);
            await ProductRepository.addProduct({
                name: productName,
                description: productDescription,
                price: productPrice,
                quantity: productQuantity,
                imageUrl,
                categoryId: selectedCategory,
                sold: 0,
            });

            alert('Sản phẩm đã được thêm thành công!');
            setProductName('');
            setProductDescription('');
            setProductPrice(0);
            setProductQuantity(10);
            setProductImage(null);
            setSelectedCategory('');
        } catch (error) {
            setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        productName, setProductName,
        productDescription, setProductDescription,
        productPrice, setProductPrice,
        productQuantity, setProductQuantity,
        productImage, setProductImage,
        categories, selectedCategory, setSelectedCategory,
        isLoading, isDuplicateName, errorMessage, handleSubmit
    };
};

export default useAddProductViewModel;
