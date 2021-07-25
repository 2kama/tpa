import firebase from '../../../utils/Firebase'
import axios from "axios"


const auth = firebase.auth()
const db = firebase.firestore()




export const requestVerifyBank = (bankData) => {
    return axios.request({
        method: "get",
        url: `https://maylancer.org/api/nuban/api.php?account_number=${bankData.accountNumber}&bank_code=${bankData.bankName}`
    })
}


export const requestUpdateBank = (bankData) => {
    return db.doc(`users/${auth.currentUser.uid}`).update(bankData)
}