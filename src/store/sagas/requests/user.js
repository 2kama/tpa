import firebase from '../../../utils/Firebase'


const auth = firebase.auth()
const db = firebase.firestore()


export const requestRegisterUser = userData => {

    const { email, password, firstName, lastName, phone, referralCode } = userData

    db.doc(`newUser/${email}`).set({
        email,
        firstName,
        lastName,
        phone,
        referralCode
    }).then(() => auth.createUserWithEmailAndPassword(email, password))

}

export const requestForgotPassword = userEmail => auth.sendPasswordResetEmail(userEmail)


export const requestVerifyUser = () => {
    const user = auth.currentUser
    return user.sendEmailVerification()
}


export const requestLoginUser = userData => {
    const { email, password } = userData

    return auth.signInWithEmailAndPassword(email, password)
}


export const requestGetUserPrivateData = () => db.doc(`users/${auth.currentUser.uid}/private/info`).get()


export const requestGetUser = () => db.doc(`users/${auth.currentUser.uid}`).get()

export const requestUserNoty = () => db.doc(`users/${auth.currentUser.uid}/private/noty`).get()

export const requestUpdateUser = userData => db.doc(`users/${auth.currentUser.uid}`).update(userData)

export const requestUpdateKin = userData => db.doc(`users/${auth.currentUser.uid}`).update(userData)

export const requestAddNoty = notyData => db.doc(`users/${notyData.uid}/private/noty`).update(
    {
        noty : firebase.firestore.FieldValue.arrayUnion(notyData)
    }
)


export const requestUpdateUserBank = userData => db.doc(`users/${auth.currentUser.uid}`).update(userData)

export const reAuthUser = password => {
    const user = auth.currentUser
    let credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
    return user.reauthenticateWithCredential(credentials)
}

export const requestUpdatePassword = newPassword => auth.currentUser.updatePassword(newPassword)


export const requestGetLog = uid => db.doc(`users/${uid}/private/log`).get()

export const requestAddLog = logData => db.doc(`users/${logData.uid}/private/log`).update(
    {
        log : firebase.firestore.FieldValue.arrayUnion(logData)
    }
)
