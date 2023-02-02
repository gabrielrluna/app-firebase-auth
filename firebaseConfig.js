import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgQfcxeTLAbYZan-h3oHwGaXni71dAtJU",
  authDomain: "app-autenticacao-d436c.firebaseapp.com",
  projectId: "app-autenticacao-d436c",
  storageBucket: "app-autenticacao-d436c.appspot.com",
  messagingSenderId: "60811913208",
  appId: "1:60811913208:web:96dd28355140c9927e580d",
  measurementId: "G-Q2SHQPWSX0",
};

export const app = initializeApp(firebaseConfig);

// Exportando os recursos de autenticação da biblioteca
export const auth = getAuth(app);

const analytics = getAnalytics(app);
