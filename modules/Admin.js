const { initializeApp } = require('firebase/app');
const { getFirestore, collection,doc, addDoc,setDoc, getDoc } = require('firebase/firestore');




const firebaseConfig = {
  apiKey: "AIzaSyBF0BG-AGAm4YFt4Vm2r1svPN-qbotuNB0",
  authDomain: "jlug-interview.firebaseapp.com",
  projectId: "jlug-interview",
  storageBucket: "jlug-interview.appspot.com",
  messagingSenderId: "542177141719",
  appId: "1:542177141719:web:1c68f1cef96b986b3be192",
  measurementId: "G-4YLL9RMX2J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Task = collection(db, 'Task');

const addTask=()=>{
    
}