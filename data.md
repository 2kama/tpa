The following file will be created in utils to help 
1. user.type.js 
    - This file should export an object containing the different user type that we can have 
        - a. customer 
        - b. admin
        - c. superadmin 
        - d. afilliate

2. user.status.js
    - This file should export the an object containing the different status of an account 
        - a. unapproved
        - b. unverified
        - c. verified 


Database Modelling 
1. User collection
    - id - string
    - firstName - string
    - lastName - string
    - email - email
    - phoneNumber - string
    - password - string(encrypted)
    - `[portfolioId] - string[]` - should contain an array of portfolioId
    - walletBalance - integer
    - pendingWalletBalance - integer
    - createdAt - datetime
    - updatedAt - datetime
    - accountDetails - {
        bankName - string / enum
        account - string # this needs to be verified(We need to verify that the account exist, paystack and flutterwave has an API for that.)
    }
    - accountType - string
    - portfolioGrowth - integer
    - affiliateCode - string/undefined - defaults to undefine for users that aren't affiliate

2. Portfolio collection
    - id - string
    - name - string
    - ROI - integer
    - 

3. Transaction collection
    - id - string
    - type - string - enum: [
        'wallet_top_up', 'wallet_withdraw',
        'portfolio_funding', 'roi_payment',
        'portfolio_decaptalization', 'portfolio_reference'
    ]
    - class - string, enum - ['debit', 'credit']
    - amount - integer
    - status - string, enum - ['pending', 'confirmed']
    - portfolioId - string/undefined
    - createdAt - datetime
    - user - string - references a user, the user that the transaction is linked to
    - referenceId - string

