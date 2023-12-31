import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH5Nsal1f79Kvv5MmTvS2fNqq85HikVJM",
  authDomain: "estoque-camisas.firebaseapp.com",
  projectId: "estoque-camisas",
  storageBucket: "estoque-camisas.appspot.com",
  messagingSenderId: "553205019752",
  appId: "1:553205019752:web:6c880bf1242ec45c1837dd",
  measurementId: "G-LF7RP33TKY",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
