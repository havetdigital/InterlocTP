import React, { Fragment, useState, Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, CheckBox, Alert, Modal, TouchableHighlight, Easing, Image, TouchableOpacity
  } from 'react-native';
import { Button } from 'react-native-paper';
// import ToggleSwitch from 'toggle-switch-react-native';
//import CheckBox from 'react-native-checkbox';

import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Input } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInput from '../components/TextInput';
import Drawer from 'react-native-drawer-menu';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import ModeText from '../components/ModeText';

export default class ValidateMission extends Component {

  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
      UserLogin:'',
      modalVisible:false,
      MyMissions:[],
    };

    (async () => {
      const valueLogin = await AsyncStorage.getItem('@Login')
      this.setState({ UserLogin: valueLogin });
    })();

  }



 SaveMissionsLocale = async (missions) => {
    try {
      await AsyncStorage.setItem('@Missions', missions);
    } catch (e) {
      alert('Failed to save missions data.')
    }
  }


  GetMyMissions(){
    (async () => {
      const valueLogin = await AsyncStorage.getItem('@Login')
      let dataToSend = { 'login': valueLogin }
      console.log(dataToSend);
      var formBody = [];
      for (var key in dataToSend) {
          var encodedKey = encodeURIComponent(key);
          var encodedValue = encodeURIComponent(dataToSend[key]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}MyMissions`, {
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
        this.setState({ MyMissions: data.results });
        SaveMissionsLocale(data.results);
        //console.log(this.state.MyMissions);
    })


    })();
      
  }

  componentDidMount() {
    this.GetMyMissions();
  }

  GotoDetails = () => {
    this.props.navigation.navigate('DetailsMission')
  }
  render() {
    return (

      <Container>
        <ModeText />
       

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
              label="Numéro"
            />

            <Button warning style={{
              justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#b85f32',
              borderRadius: 12, height: '20%', width: '50%'
            }}
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
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
     
      <BackButton goBack={() => this.props.navigation.navigate('DetailsMission')} />
    <Text style={styles.Mission}>Missions Validées</Text>
        <Content>

          <List>

            {
              this.state.MyMissions.map((items, i) => {
                return (
                  <ListItem key={i} avatar>
                    <Left>
                      <CheckBox></CheckBox>
                    </Left>
                    <Body>
                      <Text>{items.mission}</Text>
                    </Body>
                    <Right>


                      <TouchableOpacity  onPress={() =>  this.props.navigation.navigate('DetailsMission', { IdMission: items.id })}
                       
                      >

                        <Image
                          style={styles.jointure}
                          source={require('../assets/joint.png')}

                        />

                      </TouchableOpacity>


                    </Right>

                  </ListItem>
                )
              })}

          </List>
        </Content>
        <Button mode="contained" style={styles.ButtonBackground}
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          Charger une mission
      </Button>
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
    fontSize: 30,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#b85f32',
    marginBottom: '4%',
    marginTop:'7%'

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
    backgroundColor: '#b85f32',
    width: '65%',
    alignSelf: 'center',
    padding: '2%',
    marginBottom: '5%',

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