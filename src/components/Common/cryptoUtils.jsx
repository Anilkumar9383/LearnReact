import CryptoJS from 'crypto-js';

const secretKey = 'abcdefghijklmnopqrstuvwx1234567890';
const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // Fixed IV
const mode = CryptoJS.mode.CBC; // Use CBC mode for better security
const padding = CryptoJS.pad.Pkcs7;

// Encrypt JSON data
export const encryptJSON = (jsonData) => {
  debugger;
  try {
    const jsonString = JSON.stringify(jsonData);
    const encrypted = CryptoJS.AES.encrypt(jsonData, secretKey, {
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
