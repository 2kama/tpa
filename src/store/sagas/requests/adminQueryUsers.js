import firebase from '../../../utils/Firebase'

const db = firebase.firestore()

export const getUnapprovedUsers = async () => {
    let data = await db.collection('users').get()
    let unapprovedUsers = []
    data.docs.forEach(async user => {
        let privateInfo = await db.doc(`users/${user.id}/private/info`).get()
        if (!privateInfo.data().isApproved) {
            let userData = await db.doc(`newUser/${privateInfo.data().email}`).get()
            console.log(userData.data())
            unapprovedUsers.push(userData.data())
        }
    })
    return unapprovedUsers.reverse()
}