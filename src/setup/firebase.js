import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// const firebaseConfig = {
//     apiKey: "AIzaSyAET9nyNsU_kTbuG5jMFFJxAn3S2XuXU2o",
//     authDomain: "pixel-war-esd-thomas.firebaseapp.com",
//     projectId: "pixel-war-esd-thomas",
//     storageBucket: "pixel-war-esd-thomas.appspot.com",
//     messagingSenderId: "735644169756",
//     appId: "1:735644169756:web:7c80c4445272d1545a51d9"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCvWTdgWNeecbBbnYDDfW5eaLZmg6FzyOA",
    authDomain: "pixel-war-5b71c.firebaseapp.com",
    projectId: "pixel-war-5b71c",
    storageBucket: "pixel-war-5b71c.appspot.com",
    messagingSenderId: "810374626808",
    appId: "1:810374626808:web:7ec9ae4edb2457496a6a0d"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// const getCollection = async (collectionName) => {
//     const col = collection(db, collectionName);
//     const snapshot = await getDocs(col);
//     return snapshot.docs.map(doc => doc.data());
// }

export default db;