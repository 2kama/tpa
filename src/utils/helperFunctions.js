

export const BANKS = [
    ["Choose A Bank", ""],
    ["Abbey Mortgage Bank", "abbey-mortgage-bank"],
    ["Access Bank", "access-bank"],
    ["Access Bank (Diamond)", "access-bank-diamond"],
    ["ALAT by WEMA", "alat-by-wema"],
    ["ASO Savings and Loans", "asosavings"],
    ["Bowen Microfinance Bank", "bowen-microfinance-bank"],
    ["CEMCS Microfinance Bank", "cemcs-microfinance-bank"],
    ["Citibank Nigeria", "citibank-nigeria"],
    ["Coronation Merchant Bank", "coronation-merchant-bank"],
    ["Ecobank Nigeria", "ecobank-nigeria"],
    ["Ekondo Microfinance Bank", "ekondo-microfinance-bank"],
    ["Eyowo", "eyowo"],
    ["Fidelity Bank", "fidelity-bank"],
    ["First Bank of Nigeria", "first-bank-of-nigeria"],
    ["First City Monument Bank", "first-city-monument-bank"],
    ["FSDH Merchant Bank Limited", "fsdh-merchant-bank-limited"],
    ["Globus Bank", "globus-bank"],
    ["Guaranty Trust Bank", "guaranty-trust-bank"],
    ["Hackman Microfinance Bank", "hackman-microfinance-bank"],
    ["Hasal Microfinance Bank", "hasal-microfinance-bank"],
    ["Heritage Bank", "heritage-bank"],
    ["Ibile Microfinance Bank", "ibile-mfb"],
    ["Infinit MFB", "infinity-mfb"],
    ["Jaiz Bank", "jaiz-bank"],
    ["Keystone Bank", "keystone-bank"],
    ["Kuda Bank", "kuda-bank"],
    ["Lagos Building Investment Company Plc.", "lbic-plc"],
    ["One Finance", "one-finance"],
    ["PalmPay", "palmpay"],
    ["Parallex Bank", "parallex-bank"],
    ["Parkway - ReadyCash", "parkway-ready-cash"],
    ["Paycom", "paycom"],
    ["Petra Microfinance Bank Plc", "petra-microfinance-bank-plc"],
    ["Polaris Bank", "polaris-bank"],
    ["Providus Bank", "providus-bank"],
    ["Rubies MFB", "rubies-mfb"],
    ["Sparkle Microfinance Bank", "sparkle-microfinance-bank"],
    ["Stanbic IBTC Bank", "stanbic-ibtc-bank"],
    ["Standard Chartered Bank", "standard-chartered-bank"],
    ["Sterling Bank", "sterling-bank"],
    ["Suntrust Bank", "suntrust-bank"],
    ["TAJ Bank", "taj-bank"],
    ["TCF MFB", "tcf-mfb"],
    ["Titan Bank", "titan-bank"],
    ["Union Bank of Nigeria", "union-bank-of-nigeria"],
    ["United Bank For Africa", "united-bank-for-africa"],
    ["Unity Bank", "unity-bank"],
    ["VFD Microfinance Bank Limited", "vfd"],
    ["Wema Bank", "wema-bank"],
    ["Zenith Bank", "zenith-bank"]
]



export const getIndexOfK = (arr, k) => {
    for (let i = 0; i < arr.length; i++) {
      let index = arr[i].indexOf(k);
      if (index > -1) {
        return [i, index];
      }
    }
  }
