import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";





const firebaseConfig = {
  apiKey: "AIzaSyB8s3kCDpTMwUURPJo_j702cxJovA83aoY",
  authDomain: "pkpq-74307.firebaseapp.com",
  projectId: "pkpq-74307",
  storageBucket: "pkpq-74307.appspot.com",
  messagingSenderId: "121681989018",
  appId: "1:121681989018:web:de20042926774a60857e23",
  measurementId: "G-3TGX77JF0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
