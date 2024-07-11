import React, { memo, useState, useEffect, Fragment, Component } from 'react';
//import { CheckBox } from 'native-base';
import {  StyleSheet, View, Text, Switch, Alert, TextInput, TouchableWithoutFeedback } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodeInput from 'react-native-confirmation-code-input';

const ACCESS_TOKEN = '@access_token';
const USER_EMAIL = '@user_email';

export default class homeScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      UserLogin: '',
      prodApiUrl: 'https://interloc-demat.fr/',
      // devApiUrl: 'https://preprod03.interloc.havetdigital.app/',
      devApiUrl: 'https://dev.interloc-demat.fr/',
      checked: false,
      isEnabledDevMode: false,
      showConfirmationCodePin: false,
      count: 0,
    };
    global.ApiUrl = this.state.prodApiUrl;
    global.mode = '';
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
  async loggedOut(key) {
    try {
      await AsyncStorage.removeItem(key);
      this.props.navigation.navigate('HomeScreen');
      return true;
    }
    catch (exception) {
      return false;
    }
  }

  _onFinishCheckingCode2(isValid, code) {
    //console.log(isValid);
    if (!isValid) {
      global.ApiUrl = this.state.prodApiUrl;
      global.mode = '';
      Alert.alert(
        'Mode dévelopement',
        'Echec! Veuillez saisir un mot de passe valide!',
        [{text: 'OK'}],
        { cancelable: false }
      );
      this.setState({ showConfirmationCodePin: false });
      this.setState({ switchValue: false });
    } else {
      global.ApiUrl = this.state.devApiUrl;
      global.mode = 'Mode dévelopement';
      Alert.alert(
        'Mode dévelopement',
        'Le mode dévelopement a été activé avec succès',
        [{text: 'OK'}],
        { cancelable: false }
      );
      this.setState({ showConfirmationCodePin: false });
    }
  }

  state = { switchValue: false };

  toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    this.setState({ switchValue: value });
    //state changes according to switch
    //which will result in re-render the text
    if(value){
      this.setState({ showConfirmationCodePin: true })
    }else{
      this.setState({ showConfirmationCodePin: false })
      global.ApiUrl = this.state.prodApiUrl;
      global.mode = '';
    }
    //Deconnexion
    this.loggedOut('@Login');
  };

  onPressLogo = () => {
    this.setState({ count: this.state.count + 1 })
    //console.log(this.state.count)

    //3 click déclanche mode fev
    if (this.state.count == 3) {
      //console.log("Clicked twice")
      const res=(this.state.switchValue)?false:true;
      this.toggleSwitch(res);
      this.setState({ count: 0 })
    } 

  };

  render() {
   //console.log(global.ApiUrl)
    return (
      <Background>
        
        {/*Text to show the text according to switch condition*/}
        {/*<Text>{this.state.switchValue ? 'Dev mode is ON' : 'Dev mode is OFF'}</Text>
        <Text>{this.state.switchValue ? 'Mode dev activé' : ''}</Text>*/}

        {/*Switch with value set in constructor*/}
        {/*onValueChange will be triggered after switch condition changes
        <Switch style={{opacity:0}}
          onValueChange={this.toggleSwitch}
          value={this.state.switchValue}
        />*/}

         {(this.state.showConfirmationCodePin)? 
          <View style={{paddingVertical: 50,height:200, paddingHorizontal: 20,backgroundColor: '#2F0B3A'}}>
              <Text style={{color: '#fff',fontSize: 14,fontWeight: '800',textAlign: 'center'}}>CIRCLE CONFIRMATION CODE</Text>
              <CodeInput
                ref="codeInputRef2"
                keyboardType="numeric"
                codeLength={5}
                className={'border-circle'}
                compareWithCode='12020'
                autoFocus={false}
                codeInputStyle={{ fontWeight: '800' }}
                onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)}
                onCodeChange={(code) => { this.state.code = code }}
              />
          </View>
        :null}

  
        <View style={{alignSelf: 'center',alignItems: 'center',justifyContent: 'center', height: '95%', width: '100%'}}>
          <TouchableWithoutFeedback onPress={() => this.onPressLogo()}>
            <View>
              <Logo />
            </View>
          </TouchableWithoutFeedback>

          <Paragraph>
            Espace pour la gestion de la <Header>dématérialisation des bons </Header>d’attachements.
          </Paragraph>
          <Button mode="contained" onPress={() => this.loadInitialStateLogin()} style={styles.ButtonBackground}>Commencer</Button>

          <Button onPress={() => this.removeItemValue('@Login')} >Déconnecter</Button>

        </View>
        <View>
      <Text style={{ color: '#606060' }}>2022 © InterLoc TP. Version 1.8.0 </Text>
        </View>
      </Background>
    )
  };
}

const styles = StyleSheet.create({
  ButtonBackground: {
    backgroundColor: '#b85f32',
  },



});

