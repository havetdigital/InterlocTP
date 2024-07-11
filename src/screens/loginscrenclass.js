import React, { memo, useState, useEffect, Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View} from 'react-native';
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

import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = '@access_token';
const USER_EMAIL = '@user_email';
const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [useraccesstoken, setUseraccesstoken] = useState({ value: '', error: '' });
  const [globalerrors, setGlobalerrors] = useState({ error: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({ value: 'false'});

export default class LoginScreen extends Component {


  constructor(props) {
    super(props);
    };
  


    componentDidMount() {
      this.loadInitialStateLogin();
    }

  loadInitialStateLogin = async () => {
    let user_login = await AsyncStorage.getItem('@Login');

    if (user_login !== null ) {
      this.props.navigation.navigate('Dashboard');
    }
  }

   retrieveDataStorage = async () => {
    try {
      const name = await AsyncStorage.getItem(ACCESS_TOKEN)
      const emailStorage = await AsyncStorage.getItem(USER_EMAIL)
      if (name !== null) {
        //alert(name)
        setUseraccesstoken({ value: name, error: '' });
      }
      if (emailStorage !== null) {
        //alert(emailStorage)
      }
    } catch (e) {
      alert('Failed to load name.')
    }
  }
   SaveDataLocale = async (login) => {
    try {
      await AsyncStorage.setItem('@Login', login);
    } catch (e) {
      alert('Failed to save data.')
    }
  }

   removeEverything = async () => {
    try {
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }


   _onLoginPressed = () => {
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
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //alert(formBody)
    fetch(`http://dev.havetdigital.fr/apilogin`, {
      method: "POST",
      body: formBody,
      headers: {//Header Defination 
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
      .then(results => {
        return results.json();
      }).then(data => {
        console.log(data.results);
        let success = data.results.map((row) => {
          console.log(row.success);
          if (row.success == true) {
            SaveDataLocale(row.mail);
            this.props.navigation.navigate('Dashboard');
          } else {
            setGlobalerrors({ error: 'Email et/ou mot de passe non valide 2.' });
            setEmail({ ...email, error: 'Vérifier votre Email 2' });
            setPassword({ ...password, error: 'Vérifier votre mot de passe' });
          }
        })

    

      })
  }




// const _onLoginPressed = () => {
//   //navigation.navigate('Dashboard');
//   const emailError = emailValidator(email.value);
//   const passwordError = passwordValidator(password.value);

//   if (emailError || passwordError) {
//     setEmail({ ...email, error: emailError });
//     setPassword({ ...password, error: passwordError });
//     return;
//   }

//   setLoading(true);


//   fetch(
//     'http://dev.havetdigital.fr/apilogin', 
//     {
//       'login': email.value,
//       'password': password.value,
//     },
//     {
//        headers: {
//         'method': 'POST',
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//        }
//     }
//   ).then(function (response) {
//     console.log(response.status);
//     setLoading(false);

//     if (response.status == 200 && response.status < 300) {
//       let res=response.data;
//       let accessToken = res.access_token;
//       onSaveDataStorage(accessToken,email.value);
//       retrieveDataStorage();

//       navigation.navigate('Dashboard');

//     } else {
//         let error = response;
//         setGlobalerrors({ error: 'Email et/ou mot de passe non valide 1 .' });
//         setEmail({ ...email, error: 'Vérifier votre Email 1' });
//         setPassword({ ...password, error: 'Vérifier votre mot de passe' });
//         throw error;
//     }  

//   })
//   .catch(function (error) {
//     console.log(error);
//     setGlobalerrors({ error: 'Email et/ou mot de passe non valide 2.' });
//     setEmail({ ...email, error: 'Vérifier votre Email 2' });
//     setPassword({ ...password, error: 'Vérifier votre mot de passe' });
//   });

// };

render() {
return (
  <Background>
    {/* <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'Veuillez patienter...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        /> */}

    <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} />
    <Header>InterLOC</Header>

    <Text style={styles.labelGlobalErrors}>{globalerrors.error}</Text>

    <TextInput
      label="Email"
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
    />

    {/* 
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View> */}


    <Button mode="contained" onPress={_onLoginPressed} style={styles.ButtonBackground}>
      Connexion
      </Button>

  </Background>
);
    }
};

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
    color: theme.colors.primary,
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


