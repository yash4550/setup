import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const config = {
    apiKey: "AIzaSyB3gCUnXVbdOtWCQTFc9z5cnlCG1LDgsrk",
    authDomain: "mlslisting.firebaseapp.com",
    projectId: "mlslisting",
    storageBucket: "mlslisting.appspot.com",
    messagingSenderId: "614594401488",
    appId: "1:614594401488:web:4742372df877abb199fad5",
    measurementId: "G-BYX446GCR7"
}


const firebase = initializeApp(config);
const db = getFirestore(firebase);

export { db, firebase }