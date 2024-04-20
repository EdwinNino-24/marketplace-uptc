// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeU9l_-znGUCql14Y6byQYlGXxE1jAFUo",
  authDomain: "marketplace-uptc.firebaseapp.com",
  projectId: "marketplace-uptc",
  storageBucket: "marketplace-uptc.appspot.com",
  messagingSenderId: "537754638950",
  appId: "1:537754638950:web:ecc08b0654ff4ed6b82ba7",
  measurementId: "G-H4WZLKLWW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import { getStorage, ref, uploadBytes } from "firebase/storage";
import { readFileSync } from "fs";

// Obtén una referencia al servicio de almacenamiento de Firebase
const storage = getStorage(app);

// Lee el archivo local desde el sistema de archivos
const filePath = 'a.png'; // Nombre del archivo que deseas subir
const fileData = readFileSync(filePath);

// Crea una referencia al lugar en el que deseas almacenar el archivo en Firebase Storage
const storageRef = ref(storage, 'a.png');

// Carga el archivo al Storage
uploadBytes(storageRef, fileData).then((snapshot) => {
  console.log('¡Archivo subido con éxito!');
}).catch((error) => {
  console.error('Error al subir el archivo:', error);
});

