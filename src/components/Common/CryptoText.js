var CryptoJS = require("crypto-js");

const ecbkey = CryptoJS.enc.Utf8.parse('abcdefghijklmnopqrstuvwx1234567890');
const ecbiv = CryptoJS.enc.Utf8.parse('AKH7JG6FDT8YBUGF');

export function encryptJson1(data){
    let cipher = CryptoJS.AES.encrypt(data, ecbkey, {
        iv: CryptoJS.enc.Utf8.parse(ecbiv),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString();
}

export function decryptJson1(data){
    let cipher = CryptoJS.AES.decrypt(data, ecbkey, {
        iv: CryptoJS.enc.Utf8.parse(ecbiv),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}