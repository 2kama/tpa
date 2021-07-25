const functions = require("firebase-functions");
const admin = require("firebase-admin")

admin.initializeApp(functions.config().firebase);

const user = require('./cloud_functions/user')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.userCreated = user.userCreated;
exports.userApproved = user.userApproved;
exports.deleteUnapprovedUser = user.deleteUnapprovedUser;
