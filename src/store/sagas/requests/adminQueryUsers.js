import firebase from '../../../utils/Firebase'

const db = firebase.firestore()

export const getUnapprovedUsers = () => {
    let unapprovedUsers = []
    db.collectionGroup('private')
        .where('isApproved', '==', false)
        .orderBy('createdAt', 'desc')
        .get()
        .then(async data => {
            for (let user of data.docs) {
                let userData = await db.doc(`newUser/${user.data().email}`).get()
                unapprovedUsers.push({...userData.data(), ...user.data()})
            }
        })
        return unapprovedUsers
}

export const getAllTraders = () => {
    let traders = []
    db.collectionGroup('private')
        .where('role.isTrader', '==', true)
        .get()
        .then(async data => {
            for (let userInfo of data.docs) {
                let user = await db.collection('users').doc(userInfo.data().uid).get()
                traders.push({ ...user.data(), ...userInfo.data() })
            }
        })
    return traders
}

export const getAllUsers = () => {
    let users = []
    db.collectionGroup('private')
    .where('role.isUser', '==', true)
    .get()
    .then(async data => {
        for (let userInfo of data.docs) {
            if (!userInfo.data().role.isAffiliate) {
                let user = await db.collection('users').doc(userInfo.data().uid).get()
                users.push({ ...user.data(), ...userInfo.data() })
            }
        }
    })
    return users
}

export const getAllAffiliates = () => {
    let affiliates = []
    db.collectionGroup('private')
        .where('role.isAffiliate', '==', true)
        .get()
        .then(async data => {
            for (let userInfo of data.docs) {
                let user = await db.collection('users').doc(userInfo.data().uid).get()
                affiliates.push({ ...user.data(), ...userInfo.data() })
            }
        })
    return affiliates
}

export const getAllAdmins = () => {
    let admins = []
    db.collectionGroup('private')
    .where('role.isAdmin', '==', true)
    .get()
    .then(async data => {
        for (let userInfo of data.docs) {
            if (!userInfo.data().role.isSuperAdmin) {
                let user = await db.collection('users').doc(userInfo.data().uid).get()
                admins.push({ ...user.data(), ...userInfo.data() })
            }
        }
    })
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
        assignedTrader: data.role.isUser ? data.assignedTrader : "",
        affiliateCode: data.role.isAffliate ? data.affiliateCode : "",
        referralCode: data.referralCode
    })
}

export const deleteUnapprovedUser = data => {
    return db.doc(`users/${data.uid}/private/info`).delete()

}
