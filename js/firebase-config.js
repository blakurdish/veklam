// Firebase Configuration using the user's provided credentials
const firebaseConfig = {
  apiKey: "AIzaSyA5jYa-EtqYQ_OK6bUZoLIN5K-Ik_BlKB4",
  authDomain: "veklam-2d88b.firebaseapp.com",
  databaseURL: "https://veklam-2d88b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "veklam-2d88b",
  storageBucket: "veklam-2d88b.firebasestorage.app",
  messagingSenderId: "67462658094",
  appId: "1:67462658094:web:e28951272e2deb17f007bf"
};

// Initialize Firebase using the Compat SDK (required for simple script tags)
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully with user credentials.");
} else {
    console.error("Firebase SDK not loaded. Please check your script tags in index.html.");
}
