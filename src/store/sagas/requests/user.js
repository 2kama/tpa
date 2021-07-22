import firebase from '../../../utils/Firebase'


const auth = firebase.auth()
const db = firebase.firestore()


export const requestRegisterUser = (userData) => {

    const { email, password, firstName, lastName, phone, affiliate } = userData

    db.doc(`newUser/${email}`).set({
        email,
        firstName,
        lastName,
        phone,
        affiliate
    }).then(() => {
        return auth.createUserWithEmailAndPassword(email, password)
    })

}


export const requestVerifyUser = () => {
    const user = auth.currentUser
    return user.sendEmailVerification()
}


export const requestLoginUser = (userData) => {
    const { email, password } = userData

    return auth.signInWithEmailAndPassword(email, password)
}


export const requestGetUserPrivateData = () => {
    return db.doc(`users/${auth.currentUser.uid}/private/info`).get()
}


export const requestGetUser = () => {
    return db.doc(`users/${auth.currentUser.uid}`).get()
}

export const getUnapprovedUsers = () => {
    return db.collection('newUser').get().then((users) => {
        return users.docs.map((user) => user.data())
    })
}