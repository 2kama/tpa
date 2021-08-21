export const nav = [
    {
        title : "Dashboard",
        link : "/dashboard",
        onPage : "01",
        icon : "layer-group",
        authorized : "isUser"
    },
    {
        title : "Dashboard",
        link : "/admin/dashboard",
        onPage : "01",
        icon : "layer-group",
        authorized : "isAdmin"
    },
    {
        title : "Profile",
        link : "/account",
        onPage : "02",
        icon : ["far", "user"],
        authorized : "isGeneral"
    },
    {
        title : "Wallet",
        link : "/wallet",
        onPage : "04",
        icon : "wallet",
        authorized : "isUser"
    },
    {
        title : "New Accounts",
        link : "/admin/view/unapproved",
        onPage : "12",
        icon : "user-plus",
        authorized : "isAdmin"
    },
    {
        title : "Users",
        link : "/admin/view/approved",
        onPage : "13",
        icon : "users",
        authorized : "isAdmin"
    },
    {
        title : "Transactions",
        link : "/admin/view/transactions",
        onPage : "11",
        icon : "exchange-alt",
        authorized : "isAdmin"
    },
    {
        title : "Log",
        link : "/log",
        onPage : "03",
        icon : "clipboard",
        authorized : "isGeneral"
    }
]