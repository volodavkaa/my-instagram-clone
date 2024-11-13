import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, onSnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyC0_NN1BViQT6YhNg_Fm9PFcCoi4d3Dyco",
  authDomain: "my-instagram-clone-aec8c.firebaseapp.com",
  projectId: "my-instagram-clone-aec8c",
  storageBucket: "my-instagram-clone-aec8c.firebasestorage.app",
  messagingSenderId: "287837507651",
  appId: "1:287837507651:web:c30508cf7e4170c8ca04f6",
  measurementId: "G-L80FXGPQM2" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



export const addPost = async (postContent) => {
    try {
        const docRef = await addDoc(collection(db, 'posts'), {
            content: postContent.content,
            imageUrl: postContent.imageUrl,
            createdAt: new Date(),
        });
        console.log('Документ додано з ID: ', docRef.id);
    } catch (error) {
        console.error('Помилка додавання документу: ', error);
    }
};



export const getPosts = (setPosts) => {
    const q = query(collection(db, 'posts'));
    onSnapshot(q, (snapshot) => {
        const postsArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setPosts(postsArray);
    });
};
export { auth, db, storage };