//Initializes the firebase Admin Resources

import * as firebaseAdmin from 'firebase-admin';

firebaseAdmin.initializeApp();

export const db = firebaseAdmin.firestore(); //references the firestore sdk
export const auth = firebaseAdmin.auth(); //references the auth sdk