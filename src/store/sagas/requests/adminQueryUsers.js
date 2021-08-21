import firebase from '../../../utils/Firebase'

const db = firebase.firestore()

export const getUnapprovedUsers = async () => {
    let unapprovedUsers = []
    let data = await db.collectionGroup('private')
        .where('isApproved', '==', false)
        .orderBy('createdAt', 'desc')
        .get()
    for (let user of data.docs) {
        let userData = await db.doc(`newUser/${user.data().email}`).get()
        unapprovedUsers.push({...userData.data(), ...user.data()})
    }
    return unapprovedUsers
}

export const getAllTraders = async () => {
    let traders = []
    let data = await db.collectionGroup('private')
        .where('role.isTrader', '==', true)
        .where('isApproved', '==', true)
        .get()
    for (let userInfo of data.docs) {
        let user = await db.collection('users').doc(userInfo.data().uid).get()
        traders.push({ ...user.data(), ...userInfo.data() })
    }
    return traders
}

export const getAllUsers = async () => {
    let users = []
    let data = await db.collectionGroup('private')
        .where('role.isUser', '==', true)
        .where('isApproved', '==', true)
        .get()
    for (let userInfo of data.docs) {
        if (!userInfo.data().role.isAffiliate) {
            let user = await db.collection('users').doc(userInfo.data().uid).get()
            users.push({ ...user.data(), ...userInfo.data() })
        }
    }
    return users
}

export const getAllAffiliates = async () => {
    let affiliates = []
    let data = await db.collectionGroup('private')
        .where('role.isAffiliate', '==', true)
        .where('isApproved', '==', true)
        .get()
    for (let userInfo of data.docs) {
        let user = await db.collection('users').doc(userInfo.data().uid).get()
        affiliates.push({ ...user.data(), ...userInfo.data() })
    }
    return affiliates
}

export const getAllAdmins = async () => {
    let admins = []
    let data = await db.collectionGroup('private')
        .where('role.isAdmin', '==', true)
        .where('isApproved', '==', true)
        .get()
    for (let userInfo of data.docs) {
        let user = await db.collection('users').doc(userInfo.data().uid).get()
        admins.push({ ...user.data(), ...userInfo.data() })
    }
    return admins
}

export const getAllSuperAdmin = () => {
    let superAdmins = []
     db.collectionGroup('private')
        .where('role.isSuperAdmin', '==', true)
        .get()
        .then(async data => {
            for (let userInfo of data.docs) {
                let user = await db.collection('users').doc(userInfo.data().uid).get()
                superAdmins.push({ ...user.data(), ...userInfo.data() })
            }
        })
    return superAdmins
}

export const alterUser = (data) => {
    db.doc(`users/${data.uid}`).update({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone
    })
    return db.doc(`users/${data.uid}/private/info`).update({
        role: data.role,
        isApproved: true,
        ROI: data.role.isUser && data.ROI > 0 ?  data.ROI : 0,
        referralCode: data.referralCode,
        assignedTrader: data.role.isUser ? data.assignedTrader : "",
        affiliateCode: data.role.isAffiliate ? data.affiliateCode : ""
    })
}

export const deleteUserData = data => {
    return db.doc(`users/${data.uid}/private/info`).delete()
}


export const requestGetPendingTransactions = () => {
    let pendingTransactions = []
    db.collection('transactions').where("status", "==", "inProgress").orderBy("time", "asc")
    .get()
    .then(async data => {

        for (let transactionsInfo of data.docs) {
            let user = await db.doc(`users/${transactionsInfo.data().uid}`).get()
            pendingTransactions.push({ ...transactionsInfo.data(), ...user.data() })
        }

    })
    return pendingTransactions
}



export const requestGetProcessedTransactions = () => {
    let processedTransactions = []
    db.collection('transactions').where("status", "in", ['declined', 'approved']).orderBy("time", "desc")
    .get()
    .then(async data => {

        for (let transactionsInfo of data.docs) {
            let user = await db.doc(`users/${transactionsInfo.data().uid}`).get()
            processedTransactions.push({ ...transactionsInfo.data(), ...user.data() })
        }

    })

    return processedTransactions
}


export const requestSendTransactionResponse = transactionResponse => {

    const {reference, status, reason, uid, txType, amount} = transactionResponse

    
    
    db.doc(`users/${uid}/private/info`).get().then(doc => {

        const {pendingCredit, pendingDebit, available, realFund} = doc.data().wallet

        const newWallet = {
            pendingCredit : txType === "credit" ? pendingCredit - amount : pendingCredit,
            pendingDebit : txType === "debit" ? pendingDebit - amount : pendingDebit,
            available : status === "approved" ? (txType === "credit" ? available + amount : available) : (txType === "credit" ? available : available + amount),
            realFund : status === "approved" ? (txType === "credit" ? realFund + amount : realFund - amount) : (realFund)
        }

        if(newWallet.realFund >= 0) {

            db.doc(`users/${uid}/private/info`).update({
                wallet : newWallet
            }).then(() => {
    
                db.doc(`transactions/${reference}`).update({
                    status,
                    reason
                })
                return true
            })

        }else {
            return false
        }

        

    })

}