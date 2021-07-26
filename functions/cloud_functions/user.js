const functions = require('firebase-functions');
const admin = require('firebase-admin')

exports.userCreated = functions.auth.user().onCreate(async (user) => {

    const db = admin.firestore()

    const newUser = {
        firstName : "",
        lastName : "",
        middleName : "",
        phone : "",
        kinFirstName : "",
        kinLastName : "",
        kinMiddleName : "",
        kinPhone : "",
        bankName : "",
        accountName : "",
        accountNumber : ""
    }

    const privateInfo = {
        uid : user.uid,
        createdAt : new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
        email : user.email,
        wallet : {
            pending : 0,
            available : 0
        },
        walletTransactions : [],
        role : {
            isAdmin : false,
            isSuperAdmin : false,
            isUser : true,
            isAffiliate : false,
            isTrader : false
        },
        ROI : 0,
        assignedTrader : "",
        isApproved : false,
        affiliate : "",
        affiliateCode : ""
    }


    try {

        const promises = []

        promises.push(await db.doc(`users/${user.uid}`).set(newUser))
        promises.push(await db.doc(`users/${user.uid}/private/info`).set(privateInfo))

        return Promise.all(promises)

    } catch (err) {
        return console.log(err)
    }

})

exports.userApproved = functions.firestore.document("/users/{userId}/private/info").onUpdate(async (change, context) => {
    try {
        await admin.firestore().doc(`newUser/${change.before.data().email}`).delete();
    } catch (error) {
        console.log(error.message)
    }
});

exports.deleteUnapprovedUser = functions.firestore.document("/users/{userId}/private/info").onDelete(async (data, context) => {
    try {
        await admin.firestore().doc(`newUser/${data.data().email}`).delete();
        await admin.firestore().doc(`users/${data.data().uid}`).delete();
        const user = await admin.auth().getUserByEmail(data.data().email)
        await admin.auth().deleteUser(user.uid);
    } catch (error) {
        console.log(error.message)
    }
});

