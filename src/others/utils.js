import sjcl from 'sjcl';
import constants from './constants'
import * as Location from "expo-location";


function getSHAOf(toHash) {
    const myBitArray = sjcl.hash.sha256.hash(toHash)
    const myHash = sjcl.codec.hex.fromBits(myBitArray)
    return myHash;
}

function getBiometricalMailAndPassword(biometricId){

  const email = biometricId.slice(1,19) + "@gmail.com";
  const password = biometricId.slice(20,37);

  return {email: email, password : password};
}

async function requestLocation(email){

  try {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert("No es posible contiuar con el registro si no habilita una ubicación");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    
    return location;
  } 
  catch (error) {
    alert(error);
  }

}

export {
  getSHAOf,
  getBiometricalMailAndPassword,
  requestLocation
}