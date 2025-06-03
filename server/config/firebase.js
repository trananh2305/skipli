import admin from "firebase-admin";
import serviceAccount from "./firebase-service.json" assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://skipli-dfc37.firebaseio.com",
  });
}

const db = admin.firestore();

export { admin, db };
