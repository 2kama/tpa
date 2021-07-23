import firebase from '../../../utils/Firebase'

const db = firebase.firestore()

export const getUnapprovedUsers = async () => {
    let data = await db.collection('users').get()
    let unapprovedUsers = []
    for (let user of data.docs) {
        let privateInfo = await db.doc(`users/${user.id}/private/info`).get()
        if (!privateInfo.data().isApproved) {
            let userData = await db.doc(`newUser/${privateInfo.data().email}`).get()
             unapprovedUsers.push(userData.data())
        }
    }
    return unapprovedUsers.reverse()
}

export const getAllTraders = async () => {
    let data = await db.collection('users').get()
    let traders = []
    for (let user of data.docs) {
        let privateInfo = await db.doc(`users/${user.id}/private/info`).get()
        if (privateInfo.data().role.isTrader) {
             traders.push({...user.data(), ...privateInfo.data()})
        }
    }
    return traders.reverse()
}