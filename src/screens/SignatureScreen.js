import React, { Component } from 'react';
import { View, Text,  TouchableOpacity, StyleSheet } from 'react-native';
import SignaturePad from 'react-native-signature-pad';
import { Button } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../components/BackButton';
import ModeText from '../components/ModeText';
import Axios from 'axios';

export default class Demo extends Component {

  constructor(props) {
    super(props);

    const { navigation ,route} = this.props;
    const IdMission = route?.params?.IdMission;

    this.state = {
      CurrentMission: IdMission,
      MySignature: [],
      GetChef: [],
      signature: '',
      showLoading: false,
      lastRefresh: Date(Date.now()).toString(),
      uniqueValue: 1,
      showPad: true,
    }
    //this.refreshScreen = this.refreshScreen.bind(this)
  }
 

  render = () => {
    return (
       
      <View style={{ flex: 1 }}>
        <ModeText /> 
        <Spinner
          visible={this.state.showLoading}
          textContent={'Envoi de mail en cours ...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View>
         
            <Text  style={{  marginTop: '10%', marginBottom: '2%', textAlign: 'center', fontSize: 18, fontStyle:'italic', color: 'green', fontWeight:'bold',  }}>
              Signature de bon de misison</Text>
              <BackButton goBack={() => this.props.navigation.navigate('DetailsMission')} />
        </View>
        

        {this.state.showPad ?
          <SignaturePad onError={this._signaturePadError}
            onChange={this._signaturePadChange}
            style={{ flex: 1, backgroundColor: 'white', width:600, height:200 }}
            //width:1000,height:800
            viewMode={"portrait"}
          />
          : null}

        {
          this.state.GetChef.map((items, i) => {
            // <Text style={{
            //   textAlign: 'center', textDecorationLine: 'underline', fontWeight: 'bold',
            //   fontSize: 22, marginTop: '4%', color: '#b85f32'
            // }}>N° : {items.NumMission}</Text>
            if (items.ChefChantier) {
              return (
                <View>
                  <ModeText /> 
                  <Text key={i} style={{ textAlign: 'center', fontSize: 18, color: '#b85f32', fontWeight: 'bold' }}>M. {items.ChefChantier}</Text>
                  <Text style={{ textAlign: 'center', padding: 8 }}>Veuillez signer et envoyer un bon signé pour la validation de la mission. Merci.</Text>

                  <Button style={{
                    justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#b85f32',
                    borderRadius: 8, width: '60%',
                  }}
                    onPress={() => {
                      this.signaturePadSave();
                    }}
                  >
                    <Text style={{ color: '#fff' }}>Envoyer</Text>

                  </Button>

                  <Button style={{
                    justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#ffcc00',
                    borderRadius: 8, width: '60%', marginTop: '2%', marginBottom: '2%'
                  }}
                    onPress={() => {
                      this.setState({ showPad: false }); 
                      setTimeout( () => { this.setState({ showPad: true }); }, 0);
                    }}
                    key={this.state.uniqueValue} >
                    <Text style={{ color: '#000' }}>Re-Signer</Text>

                  </Button>

                </View>
              )


            } else {
              return (
                <View >
                   <ModeText />  
                  <Text style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', fontSize: 18 }}>Pas de chef pour cette mission !!</Text>
                  <TouchableOpacity /*onPress={() => this.onPlusPressed()}*/>

                    <Text style={{ textAlign: 'center', color: 'green', padding: 20, fontWeight: 'bold', }}>Ajouter un Chef pour pouvoir enregistrer votre signature</Text>
                  </TouchableOpacity>

                </View>
              )
            }
          })
        }


      </View>
    )
  };


  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    }));
  }


  _signaturePadError = (error) => {
    console.error(error);
  };





  GetChefChantier() {
    (async () => {
      const valueLogin = await AsyncStorage.getItem('@Login')
      let dataToSend = { 'login': valueLogin, 'idmission': this.state.CurrentMission, }
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}GetChefChantier`, {
        //fetch(`http://interloc.local/MyCurrentMission`, {
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
          this.setState({ GetChef: data.results });
          //SaveMissionsLocale(data.results);
          console.log(this.state.GetChef);
          //console.log("Got new signature: " + base64DataUrl);

        })


    })();

  }

  componentDidMount() {
    this.GetChefChantier();
  }



  _signaturePadChange = ({ base64DataUrl }) => {
    this.setState({ signature: base64DataUrl });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.signature !== this.state.signature) {
      this.GetChefChantier();
    }
  }

  signaturePadSave() {
    (async () => {
      const valueLogin = await AsyncStorage.getItem('@Login')
      let dataToSend = { 'login': valueLogin, 'idmission': this.state.CurrentMission, 'signature': this.state.signature}
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key])
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      this.setState({ showLoading: true });
      fetch(`${global.ApiUrl}SaveSignature`, {
        method: "POST",
        body: formBody,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      })
        .then(results => { 
          this.setState({ showLoading: false });
          if (results.ok) {
            return results
          } 
        }).then(data => {
          this.setState({ showLoading: false });
          if (data.results === null) {
            alert("Vous devez signer avant de valider")
          } else {
            alert('Vous avez bien validé et envoyé un bon signé de votre mission, merci.');
            this.props.navigation.navigate('HomeScreen');
          }
        }).catch(error => {
          alert("quelque chose s'est mal passé..")
        });
    })();
  }
  // signaturePadSave() {
  //   (async () => {
  //     const valueLogin = await AsyncStorage.getItem('@Login')
  //     let dataToSend = { 'login': valueLogin, 'idmission': this.state.CurrentMission, 'signature': this.state.signature }
  //     var formBody = [];
  //     for (var key in dataToSend) {
  //       var encodedKey = encodeURIComponent(key);
  //       var encodedValue = encodeURIComponent(dataToSend[key]);
  //       formBody.push(encodedKey + "=" + encodedValue);
  //     }
  //     formBody = formBody.join("&");
  //     this.setState({ showLoading: true });
  //     console.log('formBody', formBody?.length)
  //     console.log('formBody trim', formBody?.trim()?.length)
  //     fetch(`${global.ApiUrl}SaveSignature`, {
  //       method: "POST",
  //       body: formBody,
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  //       },
  //     })
  //       .then(results => {
  //         this.setState({ showLoading: false });
  //         return results.json();
  //       }).then(data => {
  //         console.log("My results---------",data)
  //         this.setState({ showLoading: false });
  //         if(data.results === null){
  //          // console.log("dans resultats")
  //           alert("Vous devez signer avant de valider")
  //         }else{
  //           alert('Vous avez bien validé et envoyé un bon signé de votre mission, merci.');
  //             this.props.navigation.navigate('HomeScreen');
  //         }
  //       })
  //   })();
  // };
}


const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  }
})