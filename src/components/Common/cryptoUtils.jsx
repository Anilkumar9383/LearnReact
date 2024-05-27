import CryptoJS from 'crypto-js';

const secretKey = CryptoJS.enc.Utf8.parse('C7PfyuGF26bxjtjmai4pR7BpDH7FPZiQ');
const IV = '';
const mode = CryptoJS.mode.CBC;
const padding = CryptoJS.pad.Pkcs7;

// Encrypt JSON data
export const encryptJSON = (jsonData) => {
  debugger;
  try {
    let data = jsonData.replace(/[\r\n]/gm,'');
    let jsonObj = data.replace(/(^"|"$)/g,'');
    let encrypted = CryptoJS.AES.encrypt(jsonObj, secretKey, {
      iv: CryptoJS.enc.Utf8.parse(IV),
      mode: mode,
      padding: padding
    });
    return encrypted.toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

// Decrypt JSON data
export const decryptJSON = (cipherText) => {
  debugger;
  try {
    const bytes = CryptoJS.AES.decrypt(JSON.parse(cipherText), secretKey, {
      iv: CryptoJS.enc.Utf8.parse(IV),
      mode: mode,
      padding: padding
    });
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    if (typeof (decryptedString) === "object") {
      return JSON.stringify(JSON.parse(decryptedString));
    }
    else {
      return decryptedString;
    }
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};
