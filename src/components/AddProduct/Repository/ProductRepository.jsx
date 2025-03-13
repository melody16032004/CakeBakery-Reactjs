import { collection, query, where, addDoc, getDocs } from 'firebase/firestore';
import firebaseInstance from '../../../Account/Firebase Singleton Pattern/firebaseConfig';

const db = firebaseInstance.db;
const productsCollection = collection(db, 'products');

const ProductRepository = {
    getCategories: async () => {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    checkDuplicateProductName: async (name) => {
        const q = query(productsCollection, where('name', '==', name.toLowerCase()));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    },

    addProduct: async (productData) => {
        return await addDoc(productsCollection, productData);
    }
};

export default ProductRepository;
