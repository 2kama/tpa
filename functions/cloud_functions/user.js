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
        referralCode : user.referralCode,
        affiliateCode : ""
    }

    const noty = {
        noty : [
            {
                title : "Welcome to TPA Capitals",
                message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                link : false,
                time : new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
                uid : user.uid
            }
        ]
    }


    const log = {
        log : [
            {
                time : new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
                info : "You created an account with TPA",
                uid : user.uid
            }
        ]
    }


    try {

        const promises = []

        promises.push(await db.doc(`users/${user.uid}`).set(newUser))
        promises.push(await db.doc(`users/${user.uid}/private/info`).set(privateInfo))
        promises.push(await db.doc(`users/${user.uid}/private/noty`).set(noty))
        promises.push(await db.doc(`users/${user.uid}/private/log`).set(log))

        return Promise.all(promises)

    } catch (err) {
        return console.log(err)
    }

})

exports.deleteUnapprovedUser = functions.firestore.document("/users/{userId}/private/info").onDelete(async (data, context) => {
    try {
        await admin.firestore().doc(`users/${data.data().uid}`).delete();
        const user = await admin.auth().getUserByEmail(data.data().email)
        await admin.auth().deleteUser(user.uid);
    } catch (error) {
        console.log(error.message)
    }
});

