import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js'
//  "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js"  // "firebase/app"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9vbrDC-WKP4Ye9V0jpqmcjCFzD2OmDb4",
  authDomain: "hjelpeliste.firebaseapp.com",
  projectId: "hjelpeliste",
  storageBucket: "hjelpeliste.appspot.com",
  messagingSenderId: "441828294705",
  appId: "1:441828294705:web:ec584295add5fbc81f9510"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);


export default app
