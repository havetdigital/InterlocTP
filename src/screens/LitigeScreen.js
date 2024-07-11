import React, { Component } from 'react';
import { View, Text,  TouchableOpacity, TextInput } from 'react-native';
import SignaturePad from 'react-native-signature-pad';
import { Button } from 'react-native-paper';
import BackButton from '../components/BackButton';
import ModeText from '../components/ModeText';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Demo extends Component {

    constructor(props) {
        super(props);

        const { navigation  ,route} = this.props;
        const IdMission = route?.params?.IdMission;

        this.state = {
            CurrentMission: IdMission,
            MySignature: [],
            GetChef: [],
            litige: '',
            signature: '',
            showPad: true,
        }
    }
    render = () => {
        return (
            <View style={{ flex: 1 }}>
                <View>
                <ModeText /> 
                <Text style={{ marginTop: '10%', marginBottom: '2%', textAlign: 'center', fontSize: 18, fontStyle: 'italic', color: '#FF7416', fontWeight: 'bold' }}>
                    Déclaration Litige</Text>
                    <BackButton goBack={() => this.props.navigation.navigate('DetailsMission')} />
                </View>
                
                <Text style={{ textAlign: 'center', padding: 8, fontSize: 14, fontWeight: 'bold' }}>Veuillez détailler votre litige</Text>
                <TextInput
                    multiline
                    numberOfLines={8}
                    onChangeText={(litige) => this.setState({ litige })}
                    value={this.state.litige}
                    style={{ backgroundColor: '#FFE4E1', padding: 20, margin: 10 }}
                ></TextInput>


                <Button style={{
                    justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#ffcc00',
                    borderRadius: 8, width: '70%',
                }}
                    onPress={() => {
                        this.setState({ showPad: false });
                        setTimeout(() => { this.setState({ showPad: true }); }, 0);
                    }}
                >
                    <Text style={{ color: '#000' }}>Re-Signer</Text>

                </Button>

                <Button style={{
                    justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#FFE4E1',
                    borderRadius: 8, width: '70%',marginTop: '2%',
                }}
                    onPress={() => {
                        this.setState({ litige: '' });
                    }}>
                    <Text style={{ color: '#000' }}>Réinitialiser le texte</Text>

                </Button>

                {this.state.showPad ?
                    <SignaturePad onError={this._signaturePadError}
                        onChange={this._LitigeMission}
                        style={{ flex: 1, backgroundColor: 'white', }}
                    />
                    : null}
                {
                    this.state.GetChef.map((items, i) => {
                        if (items.ChefChantier) {
                            return (
                                <Text key={i} style={{ textAlign: 'center', fontSize: 18, color: '#b85f32', fontWeight: 'bold' }}>M. {items.ChefChantier}</Text>
                            )

                        } else {
                            return (
                                <View >
                                    <ModeText /> 
                                    <Text style={{ textAlign: 'center', color: 'red' }}>Pas de chef pour cette mission</Text>
                                    <TouchableOpacity /*onPress={() => this.onPlusPressed()}*/>

                                        <Text style={{ textAlign: 'center', color: 'green' }}>Ajouter un Chef</Text>
                                    </TouchableOpacity>

                                </View>
                            )
                        }
                    })
                }



                <Button style={{
                    justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#b85f32',
                    borderRadius: 8, width: '70%', marginTop: '2%', marginBottom: '2%'
                }}
                    onPress={() => {
                        this.LitigeMissionSave();
                    }}
                >
                    <Text style={{ color: '#fff', paddingTop: '5%' }}>Enregistrer</Text>

                </Button>


            </View>
        )
    };

    _signaturePadError = (error) => {
        console.error(error);
    };

    _LitigeMission = ({ base64DataUrl }) => {
        this.setState({ signature: base64DataUrl });
    }

    LitigeMissionSave() {
        (async () => {
            const valueLogin = await AsyncStorage.getItem('@Login')
            let dataToSend = { 'login': valueLogin, 'idmission': this.state.CurrentMission, 'signature': this.state.signature, 'litige': this.state.litige }
            var formBody = [];
            for (var key in dataToSend) {
                var encodedKey = encodeURIComponent(key);
                var encodedValue = encodeURIComponent(dataToSend[key]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch(`${global.ApiUrl}SignerLitige`, {
                method: "POST",
                body: formBody,
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })
                .then(results => {
                    if (results?.ok) {
                        return results
                      }
                    // return results.json();
                }).then(data => {
                    this.props.navigation.navigate('Dashboard');
                    alert('Vous avez bien déclaré un litige pour le pointage, merci.');
                })

                // .then(results => { 
                //     if (results?.ok) {
                //       return results
                //     } 
                //   }).then(data => {
                //     alert("Mission bien confirmé (chef absent)");
                //   }).catch(error => {
            
                //   });
        })();

    };

    componentDidMount() {
        this.GetChefChantier();
    }
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
                    console.log(data.results);
                    //this.setState({ GetChef: data.results });
                    //SaveMissionsLocale(data.results);
                    //console.log(this.state.GetChef);
                    //console.log("Got new signature: " + base64DataUrl);
                })


        })();

    }
}