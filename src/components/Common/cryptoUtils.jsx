import CryptoJS from 'crypto-js';

const secretKey = 'NERRWNFRE8MJD74HDIR5R4N534AK5J84';
const iv = CryptoJS.enc.Hex.parse('JNDWGEW3HSDRNGJB4238342BNBEBJF8M'); 
const mode = CryptoJS.mode.CBC;
const padding = CryptoJS.pad.Pkcs7;

// Encrypt JSON data
export const encryptJSON = (jsonData) => {
  debugger;
  try {
    const jsonString = JSON.stringify(jsonData);
    const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey, {
      iv: iv,
      mode: mode,
      padding: padding
    }).toString();
    return encrypted;
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
      iv: iv,
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
