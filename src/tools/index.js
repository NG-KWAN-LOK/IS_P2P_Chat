import EthCrypto from "eth-crypto";
import CryptoJS, { AES } from "crypto-js";

export const decryptMessageWithPrivateKey = async (message, privateKey) => {
  console.log(message, privateKey);
  const plainttext = await EthCrypto.decryptWithPrivateKey(
    privateKey, // privateKey
    message // message
  );
  return plainttext;
};

export const encryptMessageWithPublicKey = async (message, publicKey) => {
  const chipertext = await EthCrypto.encryptWithPublicKey(
    publicKey, // publicKey
    message // message
  );
  return chipertext;
};

export const encryptMessageWithAESKey = (message, aesKey) => {
  return AES.encrypt(message, aesKey).toString();
};

export const decryptMessageWithAESKey = (ciphertext, aesKey) => {
  const bytes = AES.decrypt(ciphertext, aesKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const generateAESKeys = () => {
  const length = 32;
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}_+=-";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};
