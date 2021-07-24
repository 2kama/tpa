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
            unapprovedUsers.push(userData.data())
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
        traders.push({...user.data(), id: userInfo.data().uid})
    }
    return traders
}