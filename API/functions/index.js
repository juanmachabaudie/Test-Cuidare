const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

//Este archivo levanta la aplicacion en firebase

initializeApp({
    credential: applicationDefault(),
})

const db = getFirestore();

module.exports = { db };