const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: "AIzaSyBeU9l_-znGUCql14Y6byQYlGXxE1jAFUo",
  authDomain: "marketplace-uptc.firebaseapp.com",
  projectId: "marketplace-uptc",
  storageBucket: "marketplace-uptc.appspot.com",
  messagingSenderId: "537754638950",
  appId: "1:537754638950:web:ecc08b0654ff4ed6b82ba7",
  measurementId: "G-H4WZLKLWW5"
};

const serviceAccount = require('./marketplace-uptc-firebase-adminsdk-2h19f-8a002154ac.json');

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseConfig.storageBucket
});

const bucket = firebaseApp.storage().bucket();

module.exports = { bucket };