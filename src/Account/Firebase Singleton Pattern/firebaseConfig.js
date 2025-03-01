import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDELCOsFBbIPufg9Rtz1We9oxctP7_Uazs",
    authDomain: "fir-15597.firebaseapp.com",
    projectId: "fir-15597",
    storageBucket: "fir-15597.appspot.com",
    messagingSenderId: "35934640622",
    appId: "1:35934640622:web:b474ea1ec199f2731d56ff"
};

class Firebase {
    constructor() {
        if (!Firebase.instance) {
            this.app = initializeApp(firebaseConfig);
            this.db = getFirestore(this.app);
            this.auth = getAuth(this.app);
            this.storage = getStorage(this.app);
            Firebase.instance = this;
        }
        return Firebase.instance;
    }
}
const firebaseInstance = new Firebase();
export default firebaseInstance;
