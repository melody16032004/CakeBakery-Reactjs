import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseInstance from '../../../Account/Firebase Singleton Pattern/firebaseConfig';

class EditProductController {
    constructor(setCategories, setLoading) {
        this.setCategories = setCategories;
        this.setLoading = setLoading;
    }

    // Lấy danh sách danh mục
    async fetchCategories() {
        try {
            const querySnapshot = await getDocs(collection(firebaseInstance.db, 'categories'));
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            this.setCategories(categoriesData);
        } catch (error) {
            console.error('Lỗi khi tải danh mục:', error);
        }
    }

    // Cập nhật sản phẩm
    async updateProduct(product, productData, imageFile) {
        try {
            let newImageUrl = product.imageUrl;

            if (imageFile) {
                const storageRef = ref(firebaseInstance.storage, `images/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                newImageUrl = await getDownloadURL(storageRef);
            }

            await updateDoc(doc(firebaseInstance.db, 'products', product.id), {
                ...productData,
                imageUrl: newImageUrl,
            });

            return { success: true };
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            return { success: false, error };
        }
    }
}

export default EditProductController;
