import firebase from 'firebase'

import 'firebase/firebase-firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAo1ihfg30P79qJFzN-mbbfd91Orbhx-gk",
    authDomain: "react-native-firebase-c4894.firebaseapp.com",
    databaseURL: "https://react-native-firebase-c4894.firebaseio.com",
    projectId: "react-native-firebase-c4894",
    storageBucket: "react-native-firebase-c4894.appspot.com",
    messagingSenderId: "165914502039",
    appId: "1:165914502039:web:25371d91b22d6ec44b5ad2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default{
    firebase,
    db
}