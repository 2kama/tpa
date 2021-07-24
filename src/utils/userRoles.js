export const adminSettableRoles = [
    ['User', 'user'],
    ['Affiliate', 'affiliate'],
    ['Trader', 'trader'],
    ['Admin', 'admin']
]

export const superAdminSettableRoles = [
    ...adminSettableRoles,
    ['Super Admin', 'superadmin']
]