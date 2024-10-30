const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, addDoc, setDoc, getDocs, where, query } = require('firebase/firestore');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')

const firebaseConfig = {
  apiKey: "AIzaSyBF0BG-AGAm4YFt4Vm2r1svPN-qbotuNB0",
  authDomain: "jlug-interview.firebaseapp.com",
  projectId: "jlug-interview",
  storageBucket: "jlug-interview.appspot.com",
  messagingSenderId: "542177141719",
  appId: "1:542177141719:web:1c68f1cef96b986b3be192",
  measurementId: "G-4YLL9RMX2J"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Users = collection(db, 'Users');

// Function to add a user document
const addUser = async (data) => {
  try {
    await setDoc(doc(db, 'Users', data.email), data);
    console.log("Document written");
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Function to check if a user exists
const checkUser = async (data, res) => {
  const { email, password } = data;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Query the 'Users' collection where email matches
    const q = query(collection(db, 'Users'), where('email', '==', email));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Get the user document
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Compare the password with the stored password hash
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    
    if (isPasswordValid) {
      const token=jwt.sign(data,"JEC Linux User Group")
      res.cookie("token",token)
      return res.status(200).json({ message: 'Login successful', userData });
    } else {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error during login.' });
  }
}

module.exports = { addUser, checkUser };
