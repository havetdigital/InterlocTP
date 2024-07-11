import React, { memo, useState, useEffect, Component } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView,TextInput } from 'react-native';
import Background from '../components/Background';
import { Picker as SelectPicker} from 'native-base';
import Logo from '../components/Logo';
import Button from '../components/Button';
//import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Input, Form, Label } from 'native-base';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';

import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';
import axios from 'axios';
//import content from 'react-native-signature-pad/injectedHtml';


const ACCESS_TOKEN = '@access_token';
const USER_EMAIL = '@user_email';



export default class RegisterScreen extends Component {

  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      UserLogin: '',
      globalerrors: '',
      loading: false,

      login:'',
      missionNumber: '',
      selectedCivility: 'M',
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      password: '',
      DataUser: [],
      modalVisible: false,
      Mylog: '',
      error: '',
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


      // const emailError = emailValidator(this.state.email);

      // if (emailError) {

      //   this.setState({ error: emailError });

      //   return;
      // }


      let dataToSend = {
        'mission': this.state.missionNumber,
        'civility': this.state.selectedCivility,
        'nom': this.state.nom.toLowerCase(),
        'prenom': this.state.prenom.toLowerCase(),
        'telephone': this.state.telephone,
        'email': this.state.email.toLowerCase(),
        'password': this.state.password,
        'login': this.state.login,
      }
      //console.log(dataToSend);
      
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
          //this.setState({ DataUser: data.results });


          let user = data.results.map((row) => {

            if (row.ifMissionNotExist == false) {
              alert('la mission que vous avez saisi n\'existe pas, Veuillez contacter l\'administration')

            }

            else if (row.MyEtat != 1) {
              alert('la mission a déja prise en charge, Veuillez contacter l\'administration')
            }
          

            else if (row.ifLogExist == true) {
              alert('Veuillez bien renseigner votre nom, votre prenom et votre mot de passe, ou ce login est deja existe, Veuillez contacter l\'administration')

            }
            else {
              if(this.state.login == true){
                this.setState({Mylog:this.state.login});
                this.props.navigation.navigate('LoginScreen');
              }else{
                //alert('hi')
                this.props.navigation.navigate('GetPassword', { Mylog: row.Mylogin })
              }
               
                }
               
              
            })
  


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

     <ScrollView>

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

          <View style={{alignSelf: 'center',}}>
              <Logo />
          </View>
    <View style={{alignSelf: 'center', justifyContent: "center",
    alignItems: "center",}}><Header>Création d'un Chauffeur</Header>
            <Text style={styles.label}>Pour créer un compte il vous faut
       un numéro de mission (voyez avec votre entreprise si vous n'en avez pas)</Text>
            <Text style={styles.labelGlobalErrors}>{this.state.globalerrors.error}</Text></View>
           


      
      <View style={{alignSelf:'baseline'}}>
                <Text style={{marginVertical: 10}}> - Mission *</Text> 
                <Text style={{marginVertical: 10}}> - Civilité  </Text>
                <Text style={{marginVertical: 10}}> - Votre Nom * </Text>
                <Text style={{marginVertical: 10}}> - Votre Prenom * </Text>
                <Text style={{marginVertical: 10}}> - Téléphone </Text>
                <Text style={{marginVertical: 10}}> - Votre Login * </Text>
                <Text style={{marginVertical: 10}}> - Email </Text>
                <Text style={{marginVertical: 10}}> - Password *</Text>
              </View>
           <View style={{padding:10,margin:10,alignSelf:'flex-end',marginTop:-344}}>
             <TextInput
                 style={{  width:200,
                  backgroundColor:'#dcdcdc',
                  borderRadius: 15,
                  paddingHorizontal:16,
                  fontSize:12,
                  color:'black',
                  marginVertical: 6}}
                  returnKeyType="next"
                  onChangeText={(missionNumber) => this.setState({ missionNumber })}
                  value={this.state.missionNumber}
                
                />
                <SelectPicker
                  selectedValue={this.state.selectedCivility}
                  //style={{ height: 20, width: 150 }}
                  onValueChange={this.OnCivilityChange.bind(this)}
                // style={{ height: '8.5%', width: '90%', backgroundColor: 'rgba(0, 0, 0, 0.03)' }}

                >
                  <SelectPicker.Item label="M" value="M" />
                  <SelectPicker.Item label="Mme" value="Mme" />
                  <SelectPicker.Item label="Mlle" value="Mlle" />
                </SelectPicker>

                <TextInput
                 style={{  width:200,
                  backgroundColor:'#dcdcdc',
                 
                  paddingHorizontal:16,
                  borderRadius: 15,
                  fontSize:12,
                  color:'black',
                  marginVertical: 6}}
                  returnKeyType="next"
                 
                  onChangeText={(nom) => this.setState({ nom })}
                  value={this.state.nom}

                />

                <TextInput
                //  style={{ height: '6%', }}
                  returnKeyType="next"
                  onChangeText={(prenom) => this.setState({ prenom })}
                  value={this.state.prenom}
                  
                  style={{  width:200,
                    backgroundColor:'#dcdcdc',
                   
                    paddingHorizontal:16,
                    borderRadius: 15,
                    fontSize:12,
                    color:'black',
                    marginVertical: 6}}
                />
                <TextInput
                //  style={{ height: '6%', }}
                  returnKeyType="next"
                  onChangeText={(telephone) => this.setState({ telephone })}
                  value={this.state.telephone}
                  style={{  width:200,
                    backgroundColor:'#dcdcdc',
                    borderRadius: 15,
                    fontSize:12,
                    color:'black',
                    paddingHorizontal:16,
                  
                    marginVertical: 6}}
              
                />
<TextInput
                 style={{  width:200,
                  backgroundColor:'#dcdcdc',
                 
                  paddingHorizontal:16,
                  borderRadius: 15,
                  fontSize:12,
                  color:'black',
                  marginVertical: 6}}
                  returnKeyType="next"
                 
                  onChangeText={(login) => this.setState({ login })}
                  value={this.state.login}

                />
                <TextInput
               //   style={{ height: '6%', }}
                  returnKeyType="next"
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                  style={{  width:200,
                    backgroundColor:'#dcdcdc',
                    
                    paddingHorizontal:16,
                    borderRadius: 15,
                    fontSize:12,
                    color:'black',
                    marginVertical: 6}}
                />
                <TextInput
                //  style={{ height: '6%', }}
                  returnKeyType="next"
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                  secureTextEntry
                 keyboardType = "ascii-capable"
                  style={{  width:200,
                    backgroundColor:'#dcdcdc',
                    paddingHorizontal:16,
                    borderRadius: 15,
                    fontSize:12,
                    color:'black',
                    marginVertical: 6}}
                />



              </View>
              <View><Button mode="contained" style={{ backgroundColor: '#b85f32',
       width: '60%',alignSelf: 'center',}}
              onPress={() => { this.onSignUpPressed(); }}
            // onPress={() => {
            //   this.setState({ modalVisible: true });
            // }}
            //onPress={() => this.props.navigation.navigate('GetPassword')}
            >
              Créer le compte
          </Button>
          <Text style={{alignSelf:'center',fontSize: 12}}>* : Champs Obligatoire </Text>
          <Text style={styles.label}>Vous avez déjà un compte? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Text style={{alignSelf:'center',fontSize: 12,fontWeight: 'bold',
    color: theme.colors.transport,}}>S'identifier</Text>
              </TouchableOpacity>
          </View>
         
          </ScrollView>

    )
  }
}

const styles = StyleSheet.create({

  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },

  label0: {
    color: theme.colors.secondary,
    fontSize: 12,
  },

  row: {
    //flexDirection: 'row',
    marginTop: 10,
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

