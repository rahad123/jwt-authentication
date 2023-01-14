const CryptoJS = require('crypto-js');

var ciphertext = CryptoJS.AES.encrypt(64).toString();

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');

var originalText = ciphertext.toString(CryptoJS.enc.Utf8);


console.log(ciphertext)