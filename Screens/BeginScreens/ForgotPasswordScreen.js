import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableHighlight,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
  } from 'react-native';
  
  import React, {useState} from 'react'
  import imagenCromiun from '../../assets/cromiun.png'
  import { InputOutline } from 'react-native-input-outline';
  
  
  
  export default ForgotPasswordScreen = ({navigation}) =>{
  
      const [mail,setMail] = useState('');
      const [mailError,setMailError] = useState(null);

      let validate = () =>{
      
        if ( mail === '' ) setMailError('Campo "Mail" debe ser completado')
        
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
          setMailError('No tiene formato de mail')
        
        if (mailError === null){
            return true;
        }
        
        return false;
      }
  
      let sendPostRequest = async () =>{
  
        await fetch("endpoint/login",
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                mail: {mail},
            })
  
        }).then((response)=>{console.log(response)})
        .catch((err)=>{console.log(err)})
      }
  
      return(
        <View style={styles.container}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                  <TouchableOpacity onPress={()=>{navigation.navigate('NavigatorlogInScreen')}}>
                    <View>
                      <Text>ATRAS</Text>
                    </View>
                  </TouchableOpacity>
                  <Image source={imagenCromiun} style={styles.image}></Image>
                  <Text style={styles.title}>¿Ha olvidado su contraseña?</Text>
                  
                  <InputOutline
                      placeholder='Mail'
                      value={mail}
                      style={styles.input}
                      onChangeText={setMail}
                      error={mailError}
                   />
  
                  <TouchableHighlight style={styles.button} onPress={sendPostRequest}>
                      <Text style={styles.buttonText}>Enviar</Text>
                  </TouchableHighlight>
  
              </View>
              </ScrollView>
          </SafeAreaView>
        </View>
      )
    }
  
    const styles = StyleSheet.create(
       { input: {
           borderWidth: 2, 
           marginBottom: 15,
           marginTop: 15,
           backgroundColor: '#f5fcff',
           height: 60
          },
         container: {
           flex:1,
           backgroundColor: '#f5fcff',
           paddingLeft: 15,
           paddingRight: 15,
           marginTop: 30
          },
          title: {textAlign: 'center',fontSize: 25, marginBottom: 35},
          button: {
            backgroundColor: 'skyblue', 
            paddingTop: 15, 
            paddingBottom:15, 
            width: 100, 
            alignSelf: 'center', 
            marginTop: 30, 
            marginBottom:30,
            borderRadius: 10},
          buttonText: {textAlign: 'center', fontSize: 13},
          forgotPasswordButton: {textAlign: 'center', fontSize: 13, color: 'skyblue'},
          image:{
            height: 70,
            width: 70,
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 80
          }}
    )