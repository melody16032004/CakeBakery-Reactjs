// src/services/FirebaseStorageService.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

const FirebaseStorageService = {
    uploadProductImage: async (file) => {
        const imageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(imageRef, file);
        return getDownloadURL(imageRef);
    }
};

export default FirebaseStorageService;
