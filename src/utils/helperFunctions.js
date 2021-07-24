

export const BANKS = [
    ["Choose A Bank", ""],
    ["Abbey Mortgage Bank", "801"],
    ["Access Bank", "044"],
    ["Access Bank (Diamond)", "063"],
    ["ALAT by WEMA", "035A"],
    ["Amju Unique MFB", "50926"],
    ["ASO Savings and Loans", "401"],
    ["Bainescredit MFB", "51229"],
    ["Bowen Microfinance Bank", "50931"],
    ["CEMCS Microfinance Bank", "50823"],
    ["Citibank Nigeria", "023"],
    ["Coronation Merchant Bank", "559"],
    ["Ecobank Nigeria", "050"],
    ["Ekondo Microfinance Bank", "562"],
    ["Eyowo", "50126"],
    ["Fidelity Bank", "070"],
    ["Firmus MFB", "51314"],
    ["First Bank of Nigeria", "011"],
    ["First City Monument Bank", "214"],
    ["FSDH Merchant Bank Limited", "501"],
    ["Globus Bank", "00103"],
    ["Guaranty Trust Bank", "058"],
    ["Hackman Microfinance Bank", "51251"],
    ["Hasal Microfinance Bank", "50383"],
    ["Heritage Bank", "030"],
    ["Ibile Microfinance Bank", "51244"],
    ["Infinit MFB", "50457"],
    ["Jaiz Bank", "301"],
    ["Keystone Bank", "082"],
    ["Kuda Bank", "50211"],
    ["Lagos Building Investment Company Plc.", "90052"],
    ["Links MFB", "50549"],
    ["Mayfair MFB", "50563"],
    ["Mint MFB", "50304"],
    ["One Finance", "565"],
    ["PalmPay", "999991"],
    ["Parallex Bank", "526"],
    ["Parkway - ReadyCash", "311"],
    ["Paycom", "999992"],
    ["Petra Microfinance Bank Plc", "50746"],
    ["Polaris Bank", "076"],
    ["Providus Bank", "101"],
    ["Rand Merchant Bank", "502"],
    ["Rubies MFB", "125"],
    ["Sparkle Microfinance Bank", "51310"],
    ["Stanbic IBTC Bank", "221"],
    ["Standard Chartered Bank", "068"],
    ["Sterling Bank", "232"],
    ["Suntrust Bank", "100"],
    ["TAJ Bank", "302"],
    ["TCF MFB", "51211"],
    ["Titan Bank", "102"],
    ["Union Bank of Nigeria", "032"],
    ["United Bank For Africa", "033"],
    ["Unity Bank", "215"],
    ["VFD Microfinance Bank Limited", "566"],
    ["Wema Bank", "035"],
    ["Zenith Bank", "057"]
]



export const getIndexOfK = (arr, k) => {
    for (let i = 0; i < arr.length; i++) {
      let index = arr[i].indexOf(k);
      if (index > -1) {
        return [i, index];
      }
    }
  }
