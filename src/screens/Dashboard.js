import React, { Fragment, useState, Component } from 'react';
import {
  SafeAreaView, View, FlatList, StyleSheet, CheckBox, Alert, Modal, TouchableHighlight, Easing, Image, TouchableOpacity
  ,ScrollView,
  ActivityIndicator
} from 'react-native';
import { Picker  as SelectPicker} from 'native-base';
import { Button } from 'react-native-paper';
// import ToggleSwitch from 'toggle-switch-react-native';
//import CheckBox from 'react-native-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import { Container, Header,  List, ListItem, Left, Body, Right, Thumbnail, Text, Input } from 'native-base';

import TextInput from '../components/TextInput';
import Drawer from 'react-native-drawer-menu';
import { Ionicons } from '@expo/vector-icons';

import BackButton from '../components/BackButton';
import ModeText from '../components/ModeText';
import CommonHeader from '../components/CommonHeader';
import { getStatusBarHeight } from 'react-native-status-bar-height';
//import { ScrollView } from 'react-native-gesture-handler';

export default class Dashboard extends Component {

  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
      UserLogin: '',
      modalVisible: false,
      isMissionLoading : false,

      MyMissions: [],
      MissionsStorage:[],

      MyAllMissions: [],
      MyMissionsStored:[],
      
      numMission: '',
      SelectedDay: '1',
      day: '',
      month: '',
      year: '',
      // today:'',
      // tomorrow:''
      getMyDay: '',
      noData: false,
     // myArray : ['one','two','three'],
     isRefresh: true,
    };

    (async () => {
      const valueLogin = await AsyncStorage.getItem('@Login')
      this.setState({ UserLogin: valueLogin });
      
    
     
    })();


   
  }

  GetMyMissions() {
    (async () => {
     // await AsyncStorage.setItem('@MyMissions', this.state.MyMissions);
      this.setState({isMissionLoading: true})
      const valueLogin = await AsyncStorage.getItem('@Login')
      let dataToSend = { 'login': valueLogin, 'dayMission': this.state.getMyDay }
      //console.log(dataToSend);

      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)

      //fetch(`${process.env.MYHD_API_URL}tache_dmd_prix`, {
        
          fetch(`${global.ApiUrl}MyMissions`, {
            //fetch(`http://interloc.local/MyMissions`, {
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
              //console.log('--ggg' + data.results);
    
              this.setState({ MissionsStorage: data.results });
              (async () => {
                await AsyncStorage.setItem('@Missions:key', JSON.stringify(this.state.MissionsStorage));
              })();
              //alert('onLine')
    
            }).catch(e=>{
              (async () => {
                const ListeMissions = await AsyncStorage.getItem('@Missions:key');
                if (ListeMissions !== null) {
                  this.setState({ MissionsStorage: JSON.parse(ListeMissions) });
                }
                else{
                  this.setState({ MissionsStorage: this.state.MyMissions });
                }
              })();
              //alert('offline')
            }).finally(() => {
              this.setState({isMissionLoading: false})
            })
        
         
      
     


    })();
   

  }


  PrisEnChargeMission2 = () => {
    (async () => {
      const valueLogin = await AsyncStorage.getItem('@Login')
      const tr1 = await AsyncStorage.getItem('@num')
      let dataToSend = { 'login': valueLogin, 'num': tr1}
      console.log('tr1',tr1)
      //console.log(this.state.CurrentMission);
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}PEC`, {
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
        })
       
    })();
  }
  ChargerMissions() {

    (async () => {
      const valueLogin = await AsyncStorage.getItem('@Login')
    let setnum = this.state.numMission;
      let dataToSend = { 'login': valueLogin, 'Num': setnum}
      //console.log(dataToSend);
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}ChargerMission`, {
        //fetch(`http://interloc.local/ChargerMission`, {
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
          let etat = data.results.map((row) => {
            if (row.success == true) {
            AsyncStorage.setItem('@num',setnum)
              
              console.log('my num',setnum)
              this.GetMyMissions();
            this.PrisEnChargeMission2();
          alert('Mission bien chargée');
            }
            else {
              alert('Le numéro de mission que vous avez saisie est déjà en cours de traitement par un autre chauffeur ou n\'est pas affecté a votre société. Merci de vos rapprocher d\'InterlocTP ou de votre société')
            }
          })


          //this.setState({ MyMissions: data.results });
          //SaveMissionsLocale(data.results);
          //console.log(this.state.MyMissions);
        }).catch(e => {
          alert('Vous étes hors connexion !!')
        })

      this.setState({ modalVisible: false });

    })();
  }

 /* ChargerMissions() {

    (async () => {
      const valueLogin = await AsyncStorage.getItem('@Login')
      let MisisonNum = this.state.numMission;
      let dataToSend = { 'login': valueLogin, 'Num': MisisonNum }
      //console.log(dataToSend);
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}ChargerMission`, {
        //fetch(`http://interloc.local/ChargerMission`, {
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
          let etat = data.results.map((row) => {
            if (row.success == true) {
               //console.log(data.results);
               this.GetMyMissions();
            }
            else{
              alert('Le numéro de mission que vous avez saisie est déjà en cours de traitement par un autre chauffeur ou n\'est pas affecté a votre société. Merci de vos rapprocher d\'InterlocTP ou de votre société')
            }
          })

         
          //this.setState({ MyMissions: data.results });
          //SaveMissionsLocale(data.results);
          //console.log(this.state.MyMissions);
        }).catch(e => {
          alert('Vous étes hors connexion !!')
        })

      this.setState({ modalVisible: false });

    })();



  }
*/
  componentDidMount() {
    this.GetMyMissions()
    this.StoreAllMyMissions();
    this.GetAllMissionEtat();
    this.GetAllPointages();
    this.GetAllPrestations();
    this.GetPointagesType();

    

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.MyMissions !== this.state.MyMissions) {
      this.GetMyMissions();
    }
    //this.GetMyMissions();
  }

  GotoDetails = () => {
    this.props.navigation.navigate('DetailsMission')
  }


  OnPickerDateChange(value) {

    if (value == '1') {

      this.setState({ getMyDay: '' });
    }

    else if (value == '2') {
      var today = new Date().getDate() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getFullYear();
      // alert(today)
      this.setState({ getMyDay: today });


    }
    else if (value == '3') {
      var tomorrow = parseInt(new Date().getDate() + 1) + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getFullYear();
      //alert(tomorrow)
      this.setState({ getMyDay: tomorrow });

    }

    else if (value == '4') {
      var hier = parseInt(new Date().getDate() - 1) + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getFullYear();
      //alert(hier)
      this.setState({ getMyDay: hier });

    }


    this.setState({
      SelectedDay: value
    });

    this.GetMyMissions();

  }

  StoreAllMyMissions= async ()=> {
      const valueLogin = await AsyncStorage.getItem('@Login')
      //console.log(valueLogin);
      let dataToSend = { 'login': valueLogin,}
      //console.log(dataToSend);
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}StoreAllMission`, {
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
         // this.setState({ MyMissions: data.results });
          //console.log(data.results);
          //(async () => {
            AsyncStorage.setItem('@AllMyMissions:key', JSON.stringify(data.results));
            ///})();
        })

  }


  
  GetAllMissionEtat = () => {
    (async () => {
     
      fetch(`${global.ApiUrl}GetAllMissionEtat`, {
        method: "POST",
        headers: {//Header Defination 
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      })
        .then(results => {
          return results.json();
        }).then(data => {
          (async () => {
            await AsyncStorage.setItem('@AllMissionsEtat:key', JSON.stringify(data.results));
          })();
        })


    })();
  }


  
  GetAllPointages() {
    (async () => {

      const valueLogin = await AsyncStorage.getItem('@Login')
      let dataToSend = { 'login': valueLogin}
      // //console.log(this.state.CurrentMission );
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}GetPointageAllMission`, {
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
          (async () => {
            await AsyncStorage.setItem('@AllPointage:key', JSON.stringify(data.results));
          })();

        })


    })();

  }

  GetAllPrestations() {
    (async () => {
      
      fetch(`${global.ApiUrl}GetAllPrestations`, {
        method: "POST",
        headers: {//Header Defination 
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      })
        .then(results => {
          return results.json();
        }).then(data => {
          ////console.log(data.results);
          this.setState({ MyPrestations: data.results });
          (async () => {
            await AsyncStorage.setItem('@AllPrestations:key', JSON.stringify(data.results));
          })();
          this.GetPointagesType();
        })


    })();

  }

  
  GetPointagesType() {
    (async () => {

      const valueLogin = await AsyncStorage.getItem('@Login')
      let dataToSend = { 'login': valueLogin }
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}GetPointagesType`, {
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
          var NewMyPointagesType = [];
          for (let index = 0; index < data.results.length; index++) {
            const element = data.results[index];
            if (element.tabSaisi === 'Autres' && element.Materiel === this.state.saveMateriel) {
              NewMyPointagesType.push(element)
            }
          }
          this.setState({ MyPointagesType: NewMyPointagesType });
          (async () => {
            await AsyncStorage.setItem('@PoinatgesType:key', JSON.stringify(NewMyPointagesType));
          })();
        })

    })();

  }



  render() {
    return (

      <Container>
        <ModeText />
        <CommonHeader title={`Missions`}  customStyle={{marginTop:20}} onPress={() => this.props.navigation.goBack()} />


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
                Charger votre mission

            </Text>
              <TextInput
                label="Numéro" onChangeText={(numMission) => this.setState({ numMission })}
                value={this.state.numMission}
              />

              <Button warning style={{
                justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#b85f32',
                borderRadius: 12, height: '20%', width: '50%'
              }}
                onPress={() => this.ChargerMissions()}
              >
                <Text style={{ color: 'white' }}>Charger</Text>
              </Button>

              <Button warning style={{
                justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#b85f32',
                borderRadius: 12, height: '20%', width: '50%', marginTop: '3%'
              }}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Text style={{ color: 'white' }}>Plus Tard</Text>
              </Button>


            </DialogContent>

          </Dialog>

        </View>


        {/* <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
          <View style={styles.firstRow}>
              <Text style={styles.Mission}>Missions</Text>
          </View>


        </View> */}
        <ScrollView>
        <Text style={{ textAlign: 'center', padding: 12, fontStyle: 'italic', color:'#686868',fontSize:10 }}>
             Liste des missions en cours. Si aucune mission ne s’affiche, c’est que toutes les missions confiées ont été pointées et validées.
              Vous pouvez charger une mission qui n’apparaît avec le bouton en bas (si celle-ci n’a pas déjà été traitée).
            </Text>
            
          <List>

         {this.state.isMissionLoading ? 
         <View style={{alignSelf:"center"}}>
            <ActivityIndicator
              color={'gray'}
              size={'large'}
            />
         </View>  :  
            this.state.MissionsStorage.length > 0 ?
              this.state.MissionsStorage.map((items, i) => {
                if (items.Etat == 1 || items.Etat == 2 || items.Etat == 4) {
                  return (


                    <ListItem key={i} >

                      <Text style={{ width: '20%', color: 'green', fontWeight: 'bold' }}>{items.num}</Text>

                      <Body style={{ width: '70%' }}>
                        <TouchableOpacity style={{ fontWeight: 'bold' }}
                          onPress={() => this.props.navigation.navigate('DetailsMission', { IdMission: items.id })}>
                          {/*<Text >{items.mission}</Text>*/}
                          <Text >{items.missionDesc}</Text>
                        </TouchableOpacity>




                      </Body>

                      <TouchableOpacity
                        style={{ width: '10%' }}
                      >

                        <Image
                          style={styles.jointure}
                          source={require('../assets/joint.png')}

                        />

                      </TouchableOpacity>
                    </ListItem>
                  )
                }


              })
              : <View><Text style={{ textAlign: 'center', fontWeight: 'bold', padding: 20 }}>Aucune mission enregistrée à cette date</Text></View>

}
          </List>
         
          </ScrollView>

        {/* <View style={styles.topmationfd}>


          <SelectPicker
            selectedValue={this.state.SelectedDay}
            style={{ height: 50, width: 120 }}
            onValueChange={this.OnPickerDateChange.bind(this)}
          >
            <SelectPicker.Item label="TOUT" value="1" />
            <SelectPicker.Item label="Aujourd'hui" value="2" />
            <SelectPicker.Item label="Demain" value="3" />
            <SelectPicker.Item label="Hier" value="4" />

          </SelectPicker>

        </View> */}


        <Button mode="contained" style={styles.ButtonBackground} onPress={() => {this.setState({ modalVisible: true });}}>Charger une mission</Button>
        {/* <ToggleSwitch
          isOn={false}
          onColor="white"
          offColor="green"
          label="Aujourd'hui"
          labelStyle={{
            color: "black", fontWeight: "900", alignSelf: 'center', textAlign: 'center', marginHorizontal: '10%',
          }}
          size="medium"
          onToggle={isOn => console.log("changed to : ", isOn)}
        /> */}
        {/* <Text style={styles.Demain} >Demain</Text> */}
      </Container>

    )
  }
}

const styles = StyleSheet.create({


  topmationfd: {
    justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
  },

  containerD: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    height: '70%'
  },
  Demain: {
    textAlign: 'right',
    marginRight: '15%',
    marginTop: '-6%'

  },
  Mission: {
    fontSize: 50,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#b85f32',
    //marginBottom: '2%',
    marginTop: '20%',

  },
  item: {
    backgroundColor: '#00FFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },

  ButtonBackground: {
    //backgroundColor: '#b85f32',
    //width: '65%',
    //alignSelf: 'center',
    //padding: '2%',
    marginBottom: '5%',

    backgroundColor: '#b85f32',
    //width: '40%',
    alignSelf: 'center',
  },

  ToggleMission: {
    alignSelf: 'center',
  },

  ModalMission: {
    height: '20%'
  },

  jointure: {
    width: 25,
    height: 25,
  }
});