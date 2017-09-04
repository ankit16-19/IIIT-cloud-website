// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var config = {
  apiKey: "AIzaSyDIFDucG98_h1HJm7tA-ozR45RY4h2TbtI",
  authDomain: "iiitcloud-e9d6b.firebaseapp.com",
  databaseURL: "https://iiitcloud-e9d6b.firebaseio.com",
  projectId: "iiitcloud-e9d6b",
  storageBucket: "iiitcloud-e9d6b.appspot.com",
  messagingSenderId: "651547037700"
};
firebase.initializeApp(config);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a sevice worker
//   `messaging.setBackgroundMessageHandler` handler.
