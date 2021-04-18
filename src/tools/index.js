import EthCrypto from "eth-crypto";

export const decryptMessageWithPrivateKey = async (message, privateKey) => {
  console.log(message, privateKey);
  const plainttext = await EthCrypto.decryptWithPrivateKey(
    privateKey, // privateKey
    message // message
  );
  return plainttext;
};

export const decryptMessageWithPublicKey = async (message, publicKey) => {
  console.log(message, publicKey);
  const plainttext = await EthCrypto.decryptWithPublicKey(
    publicKey, // privateKey
    message // message
  );
  return plainttext;
};

export const encryptMessage = async (message, publicKey) => {
  const chipertext = await EthCrypto.encryptWithPublicKey(
    publicKey, // publicKey
    message // message
  );
  return chipertext;
};
