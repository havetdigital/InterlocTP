import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View ,ScrollView } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { Item, Label } from 'native-base';

//import {Content} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DismissKeyboardView } from '../components/DissmissKeyboardHOC';

const ACCESS_TOKEN = '@access_token';
const USER_EMAIL = '@user_email';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [useraccesstoken, setUseraccesstoken] = useState({ value: '', error: '' });
  const [globalerrors, setGlobalerrors] = useState({ error: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({ value: 'false'});



  // useEffect(() => {
  //   _loadInitialStateLogin().done();
  // }, []);

  const _loadInitialStateLogin = async () => {
    let user_login = await AsyncStorage.getItem('@Login');

    if (user_login !== null ) {
      navigation.navigate('Dashboard');
    }
  }

  
  const SaveDataLocale = async (login) => {
    try {
      await AsyncStorage.setItem('@Login', login);
    } catch (e) {
      alert('Failed to save data.')
    }
  }

  /*if (password.value.toLowerCase() === "12345" ) {
    //console.log("Tu as tapper dev10",password.value)
    navigation.navigate('UpdatePasswordScreen',{Login: email.value})
   }else{

*/
  const _onLoginPressed = () => {
   
       //console.log("Tu as tapper autre mot de passe que dev10",password.value)
//fetch(`${process.env.MYHD_API_URL}api_my_jobs_encours`)
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    let dataToSend = { 'login': email.value, 'password': password.value, }
    //console.log('*****dataToSend : ');
    //console.log(dataToSend);
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //alert(formBody)
    //console.log('*****formBody : ');
    //console.log(formBody);

    //fetch(`http://interloc.local/apilogin`, {
    fetch(`${global.ApiUrl}apilogin`, {
      method: "POST",
      body: formBody,
      headers: {//Header Defination 
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((results) => results?.json())

    .then(data => {
      console.log('data', data)
        setLoading(false);
        //console.log('*****response : ');
        //console.log(data);
        //alert(data.results);
        let success = data?.results?.map((row) => {
          //console.log(row.success);
          //alert(row.success);
          if (row?.success == true) {
            if(password.value.toLowerCase() === 'interloc') {
              SaveDataLocale(row?.mail);
              //console.log("Tu as tapper dev10",password.value)
              navigation.navigate('UpdatePasswordScreen',{Login: email.value})
            }else if(password.value.toLowerCase() !== 'interloc' ){
              SaveDataLocale(row?.mail);
              //console.log("Tu as tapper dev10",password.value)
              navigation.navigate('Dashboard')
             AsyncStorage.setItem('@id_user', row?.id_user);
             console.log('@id_user', row?.id_user);
            }
          } else {
            setGlobalerrors({ error: 'Identifiant et/ou mot de passe non valide.' });
            setEmail({ ...email, error: 'Vérifier votre Identifiant' });
            setPassword({ ...password, error: 'Vérifier votre mot de passe' });
          }
        })
      }).catch(e => {
        console.log("E login",e);
        setLoading(false);
        //console.log(e);
      })
     }
  


  



return (
  <ScrollView contentContainerStyle={{flex:1}} keyboardShouldPersistTaps="handled" >
  <Background>
    
     <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'Veuillez patienter...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        /> 

    <BackButton goBack={() => navigation.navigate('HomeScreen')} />
   

    <View style={{alignSelf: 'center',
    alignItems: 'center',
     height: '100%', width: '100%', marginTop: '20%'}}>

<Logo />
    {/* <Header>InterLOC</Header> */}

    <Text style={styles.labelGlobalErrors}>{globalerrors.error}</Text>
    
    <TextInput
      label="Identifiant"
      returnKeyType="next"
      value={email.value}
      onChangeText={text => setEmail({ value: text, error: '' })}
      error={!!email.error}
      errorText={email.error}
      autoCapitalize="none"
      autoCompleteType="email"
      textContentType="emailAddress"
      keyboardType="email-address"
      

    />



    <TextInput
      label="Mot de passe"
      returnKeyType="done"
      value={password.value}
      onChangeText={text => setPassword({ value: text, error: '' })}
      error={!!password.error}
      errorText={password.error}
      secureTextEntry
      keyboardType = "ascii-capable"
    />


    <Button mode="contained" onPress={_onLoginPressed} style={styles.ButtonBackground}>
      Connexion
      </Button>
    
      <View style={styles.row}>
        <Text style={styles.label}>Vous n'avez pas de compte? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>S'inscrire</Text>
        </TouchableOpacity>
      
      {/* <Text> </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
      <Text>    </Text><Text>Modifier mot de passe. </Text>
        </TouchableOpacity> */} 
      </View>
      
     </View>
  </Background>
  </ScrollView>
);

} 
const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.transport,
  },
  labelGlobalErrors: {
    color: theme.colors.error,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  ButtonBackground: {
    backgroundColor: '#b85f32',
    marginTop: 30
  },
});

export default memo(LoginScreen);
