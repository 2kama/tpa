import firebase from '../../../utils/Firebase'

const db = firebase.firestore()

export const getUnapprovedUsers = async () => {
    try {
        let data = await db.collectionGroup('private')
            .where('isApproved', '==', false)
            .orderBy('createdAt', 'desc')
            .get()
        let unapprovedUsers = []
        for (let user of data.docs) {
            let userData = await db.doc(`newUser/${user.data().email}`).get()
            unapprovedUsers.push({...userData.data(), ...user.data()})
        }
        return unapprovedUsers
    } catch (error) {
        return []
    }
}

export const getAllTraders = async () => {
    let data = await db.collectionGroup('private')
        .where('role.isTrader', '==', true)
        .get()
    let traders = []
    for (let userInfo of data.docs) {
        let user = await db.collection('users').doc(userInfo.data().uid).get()
        traders.push({ ...user.data(), uid: userInfo.data().uid })
    }
    return traders
}

export const alterUser = async (data) => {
    await db.doc(`users/${data.uid}/private/info`).update({
        role: data.role,
        isApproved: true,
        ROI: data.roi ? data.roi : "", 
        assignedTrader: data.assignedTrader ? data.assignedTrader : "",
        affiliateCode: data.affiliateCode ? data.affiliateCode : ""
    })
    
    db.doc(`users/${data.uid}`).update({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone
    })
    return true
}

export const deleteUnapprovedUser = async data => {
    await db.doc(`users/${data.uid}/private/info`).delete()
    return true
}
