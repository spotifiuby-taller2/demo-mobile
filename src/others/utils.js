import sjcl from 'sjcl';

function getSHAOf(toHash) {
    const myBitArray = sjcl.hash.sha256.hash(toHash)
    const myHash = sjcl.codec.hex.fromBits(myBitArray)
    return myHash;
}

function getBiometricalMailAndPassword(biometricId){

  const email = biometricId.slice(1,19) + "@gmail.com";
  const password = biometricId.slice(20,37);

  return [email, password];
}

export {
  getSHAOf,
  getBiometricalMailAndPassword
}