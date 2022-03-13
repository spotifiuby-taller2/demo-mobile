import * as Crypto from 'expo-crypto';

async function getSHAOf(toHash) {
    return await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        toHash
    );
}

export {
  getSHAOf
}