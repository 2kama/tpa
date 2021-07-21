const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.userCreated = functions.auth.user().onCreate(async user => {

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
        role : "user",
        ROI : 0,
        assignedTrader : "",
        approved : false,
        affiliate : ""
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