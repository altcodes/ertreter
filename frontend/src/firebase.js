import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDej6lMQRemqFddyiHBTNxiOkAbVevShQs',
  authDomain: 'journey-5a029.firebaseapp.com',
  databaseURL: 'https://journey-5a029.firebaseio.com',
  projectId: 'journey-5a029',
  storageBucket: 'journey-5a029.appspot.com',
  messagingSenderId: '473201965944',
  appId: '1:473201965944:web:b96c1fdbdbadfe42c1268d'
};

const fire = firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
export default fire;
