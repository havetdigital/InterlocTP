import React, { memo, useState, useEffect, Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker as SelectPicker } from 'native-base';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Input } from 'native-base';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';

import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';
import axios from 'axios';


const ACCESS_TOKEN = '@access_token';
const USER_EMAIL = '@user_email';



export default class RegisterScreen extends Component {

  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    const { navigation , route } = this.props;
    const Mylogin = route?.params?.Mylog;
    this.state = {
      UserLogin: '',
      globalerrors: '',
      loading: false,


      missionNumber: '',
      selectedCivility: 'M',
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      DataUser: [],
      modalVisible: false,
      Mylog: Mylogin,
    };



  };


  loadInitialStateLogin() {
    (async () => {
      const valueLogin = await AsyncStorage.getItem('@Login')
      if (valueLogin !== null) {
        this.props.navigation.navigate('Dashboard')
      } else {
        this.props.navigation.navigate('LoginScreen')
      }

    })();
  }
  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      this.props.navigation.navigate('LoginScreen');
      return true;
    }
    catch (exception) {
      return false;
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
  onSaveDataStorage = async (name, email) => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, name)
      await AsyncStorage.setItem(USER_EMAIL, email)
      //alert('Data successfully saved!')
    } catch (e) {
      alert('Failed to save data.')
    }
  }


  componentDidMount() {
    //this.loadInitialStateLogin();
  }




  onSignUpPressed() {
    (async () => {

      let dataToSend = {
        'mission': this.state.missionNumber,
        'civility': this.state.selectedCivility,
        'nom': this.state.nom,
        'prenom': this.state.prenom,
        'telephone': this.state.telephone,
        'email': this.state.Email,

      }
      console.log(dataToSend);
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}SaveUser`, {
        //fetch(` http://interloc.local/MyMissions`, {
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
          //console.log(data.results);
          this.setState({ DataUser: data.results });
          //SaveMissionsLocale(data.results);
          //console.log(this.state.MyMissions);
        })


    })();

  }


  // onSignUpPressed = () => {
  //   const nameError = nameValidator(name.value);
  //   const emailError = emailValidator(email.value);
  //   const passwordError = passwordValidator(password.value);

  //   if (emailError || passwordError || nameError) {
  //     setName({ ...name, error: nameError });
  //     setEmail({ ...email, error: emailError });
  //     setPassword({ ...password, error: passwordError });
  //     return;
  //   }
  //   setLoading(true);
  //   axios.post('http://apinewyorkprod.mihabodytec2.ma/api/register',
  //     {
  //       'name': name.value,
  //       'email': email.value,
  //       'password': password.value,
  //       'c_password': password.value,
  //     },
  //     {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       }
  //     }
  //   ).then(function (response) {
  //     console.log(response);
  //     if (response.status >= 200 && response.status < 300) {
  //       let res = response.data.data;


  //       //console.log(email.value);


  //       let accessToken = res.token;
  //       onSaveDataStorage(accessToken, email.value);
  //       retrieveDataStorage();

  //       //alert(accessToken);
  //       setLoading(false);

  //       navigation.navigate('Dashboard');

  //     } else if (response.status == 404) {
  //       let errorTxt = response.message;
  //       setGlobalerrors({ error: errorTxt });
  //       setLoading(false);
  //     } else {
  //       let errorTxt = response.message;
  //       setName({ ...name, error: errorTxt });
  //       setGlobalerrors({ error: errorTxt });
  //       setEmail({ ...email, error: errorTxt });
  //       setPassword({ ...password, error: errorTxt });
  //       setLoading(false);
  //       //throw errorTxt;
  //     }

  //   })
  //     .catch(function (error) {
  //       console.log(error.status);
  //       setGlobalerrors({ error: 'Vous êtes déjà inscrit avec cet adresse email.' });
  //       //setName({ ...name, error: 'Vérifier votre nom' });
  //       //setEmail({ ...email, error: 'Vérifier votre Email' });
  //       //setPassword({ ...password, error: 'Vérifier votre mot de passe' });
  //       setLoading(false);
  //     });

  //   //setLoading(false);


  // }

  OnCivilityChange(value) {

    this.setState({
      selectedCivility: value
    });

  }

  render() {
    return (

      <Container>


        <View style={{ zIndex: 5 }}>
          <Dialog
            visible={this.state.modalVisible}
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
            onTouchOutside={() => {
              this.setState({ modalVisible: false });
            }}

            onHardwareBackPress={() => {
              this.setState({ modalVisible: false });
            }}



            dialogStyle={{ width: '92%', height: '30%', borderRadius: 20, elevation: 20 }}

          >
            <DialogContent >

              <Text style={{
                color: 'black',
                justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: '2%'
              }}>
                Existe

            </Text>



              <Button warning style={{
                justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#b85f32',
                borderRadius: 12, height: '20%', width: '50%', marginTop: '3%'
              }}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Text style={{ color: 'white' }}>Fermer</Text>
              </Button>


            </DialogContent>

          </Dialog>

        </View>


        <Background>
          <BackButton goBack={() => this.props.navigation.navigate('RegisterScreen')} />
          <Spinner
            //visibility of Overlay Loading Spinner
            visible={this.state.loading}
            //Text with the Spinner
            textContent={'Veuillez patienter...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
          <Logo />

          <Header>Création d'un Chauffeur</Header>
          <Text style={styles.labelHeader}>Etape 2/3</Text>
          <Text style={styles.label}>Votre compte vient d'étre créé</Text>
          <Text style={styles.label}> Votre identifiant de connexion est :</Text>
          <Text style={styles.labelLog}>{this.state.Mylog}</Text>
          {/* <Text style={styles.label}>Ne l'oubliez pas</Text> */}

{/* 
          <View style={{ borderWidth: 1, padding: '8%',  textAlign: 'center',alignItems: 'center', alignSelf: 'center', fontSize: 25 }}>
            <Text >Il vous reste à définir</Text>
            <Text >Votre mot de passe</Text>
            <Text >Personnel</Text>
            <Text >En cliquant ci dessous</Text>
          </View> */}




{/* 
          <Button mode="contained" style={styles.button}
          // onPress={() => { this.onSignUpPressed();}}

          >
            Définir mon mot de passe
          </Button> */}



          <View style={styles.row}>
            <Text style={styles.label0}>Vous arriverez directement sur la palteforme</Text>

          </View>

          <View style={styles.row}>
            <Button onPress={() => this.props.navigation.navigate('LoginScreen')} mode="contained" style={styles.fermer}>
              Fermer
            </Button>
          </View>



        </Background>

      </Container>

    )
  }
}

const styles = StyleSheet.create({
  labelHeader: {
    color: '#b85f32',
    fontSize: 15,
    fontWeight: 'bold',
  },


  labelLog: {
    color: '#008B8B',
    fontSize: 30,
    fontWeight: 'bold',
  },
  label0: {
    color: theme.colors.secondary,
    fontSize: 15,
  },

  button: {

    backgroundColor: '#008B8B',
  },

  fermer: {

    backgroundColor: '#b85f32',
    width: '50%',

  },

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.transport,
  },
  labelGlobalErrors: {
    color: theme.colors.error,
  },
  label: {
    color: theme.colors.secondary,
    textAlign: 'center'
  },
});

