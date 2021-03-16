import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/analytics';

var firebaseConfig = {
    apiKey: "AIzaSyDxQI6FosHQM8EqWnE-uqpfQJI2BFX-M00",
    authDomain: "mnft-b983b.firebaseapp.com",
    projectId: "mnft-b983b",
    storageBucket: "mnft-b983b.appspot.com",
    messagingSenderId: "403907320876",
    appId: "1:403907320876:web:9dd8ba87c1dd1590248589",
    measurementId: "G-2RR9692KS0"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firestoreRef = firebase.firestore();
const firebaseStorageRef = firebase.storage();

export {firestoreRef, firebaseStorageRef};
