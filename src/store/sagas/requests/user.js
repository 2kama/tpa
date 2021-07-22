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


export const requestGetUserPrivateData = () => {
    return db.doc(`users/${auth.currentUser.uid}/private/info`).get()
}


export const requestGetUser = () => {
    return db.doc(`users/${auth.currentUser.uid}`).get()
}

export const loginUser = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}