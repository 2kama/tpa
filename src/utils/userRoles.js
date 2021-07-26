export const adminSettableRoles = [
    ['Normal User', JSON.stringify({
        isAdmin : false,
        isAffiliate : false,
        isSuperAdmin : false,
        isTrader : false,
        isUser : true
    })],
    ['Affiliate', JSON.stringify({
        isAdmin : false,
        isAffiliate : true,
        isSuperAdmin : false,
        isTrader : false,
        isUser : true
    })],
    ['Trader', JSON.stringify({
        isAdmin : false,
        isAffiliate : false,
        isSuperAdmin : false,
        isTrader : true,
        isUser : false
    })]
    
]

export const superAdminSettableRoles = [
    ...adminSettableRoles,
    ['Super Admin', JSON.stringify({
        isAdmin : true,
        isAffiliate : false,
        isSuperAdmin : true,
        isTrader : false,
        isUser : false
    })],
    ['Admin', JSON.stringify({
        isAdmin : true,
        isAffiliate : false,
        isSuperAdmin : false,
        isTrader : false,
        isUser : false
    })]
]