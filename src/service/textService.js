// textService.js
import firebaseInstance from '../Account/Firebase Singleton Pattern/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const addText = async (text) => {

    if (text.length < 10) {
        alert('Vui lòng nhập ít nhất 10 kí tự...');
    } else {
        try {
            const uid = uuidv4();
            // Add the text to Firestore
            await setDoc(doc(firebaseInstance.firebaseInstance.db, 'subscribe', uid), {
                uid: uid,
                text: text,
                createdAt: new Date(),
            });
            alert('Cám ơn bạn đã Subscribe trang web của chúng tôi!');
        } catch (error) {
            console.error('Lỗi khi thêm văn bản:', error);
            alert('Đã xảy ra lỗi khi gửi dữ liệu. Vui lòng thử lại.');
        }
    }
};

export { addText };
