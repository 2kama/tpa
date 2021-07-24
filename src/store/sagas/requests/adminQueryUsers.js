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
            unapprovedUsers.push({...userData.data(), id: user.data().uid})
        }
        return unapprovedUsers
    } catch (error) {
        console.log(error)
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
        traders.push({ ...user.data(), id: userInfo.data().uid })
    }
    return traders
}

export const approveUser = async (data) => {
    console.log(data)
    await db.doc(`users/${data.id}/private/info`).update({
        role: data.role,
        isApproved: true,
        ROI: data.roi ? data.roi : "", 
        assignedTrader: data.assignedTrader ? data.assignedTrader : "",
        affiliateCode: data.affiliateCode ? data.affiliateCode : ""
    })
    await db.doc(`users/${data.id}`).update({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone
    })
    console.log('done?')
    return true
}