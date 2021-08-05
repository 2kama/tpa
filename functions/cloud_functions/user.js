const functions = require('firebase-functions');
const admin = require('firebase-admin')

const db = admin.firestore()

exports.userCreated = functions.auth.user().onCreate(async (user) => {

    

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
            pendingDebit : 0,
            pendingCredit : 0,
            available : 0
        },
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
        referralCode : "",
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

});



exports.deleteUnapprovedUser = functions.firestore.document("/users/{userId}/private/info").onDelete(async (data, context) => {


    try {
        await db.doc(`users/${data.data().uid}`).delete();
        const user = await admin.auth().getUserByEmail(data.data().email)
        await admin.auth().deleteUser(user.uid);
    } catch (error) {
        console.log(error.message)
    }
});




exports.sendTransaction = functions.firestore.document('transactions/{txID}').onCreate(async (data, context) => {


    const {uid, txType, amount, reference} = data.data()
    const checkType = ["deCapitalization", "roi", "affiliateBonus"]

    try {

        db.doc(`users/${uid}/private/info`).get().then(doc => {

            const {pendingCredit, pendingDebit, available} = doc.data().wallet

            newWallet = {
                pendingCredit : txType == "credit" ? pendingCredit + amount : pendingCredit,
                pendingDebit : txType == "debit" ? pendingDebit + amount : pendingDebit,
                available : checkType.indexOf(txType) != -1 ? available + amount : txType == "deCapitalizationFee" || txType == "debit" ? available - amount : available
            }

            db.doc(`users/${uid}/private/info`).update({
                wallet : newWallet
            })
        }).then(() => db.doc(`transactions/${reference}`).update({ status : "inProgress" }))
        
    } catch (err) {
        console.log(err)
    }


});
