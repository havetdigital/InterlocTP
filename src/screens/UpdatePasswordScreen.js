
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    ListView,
    Keyboard,
    TextInput
} from 'react-native';
import Background from '../components/Background';

import BackButton from '../components/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class UpdatePasswordScreen extends Component {
    /**
     * Default props
     */
    static defaultProps = {   
       // backgroundColor :"white",
        submitText:"Enregistrer",
        placeHolderCurrentPassword:"Mot de passe courant",
        placeHolderNewPassword:"Nouveau mot de passe",
        placeHolderConfirmPassword:"Confirmer le mot de passe"
    };

    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            currentPassword: "",
            confirmPassword: "",
           
        };
    }

    /**
     * Button Save pressed 
     */
    onbtnSavePress() {
        if (this.state.currentPassword.trim().length == 0) {
            alert("Entrer le mot de passe courant");
        } else if (this.state.newPassword.trim().length == 0) {
           alert("Entrer le nouveau mot de passe");
        } else if (this.state.newPassword != this.state.confirmPassword) {
            alert("Les mots de passe entrés ne sont pas identiques");
        } else {
            Keyboard.dismiss();
            this.changePassword();
        }
    }

    /**
     * Call your webservice for update password
     */
    changePassword() {
        
        //let dataToSend = { 'login': valueLogin }
        let dataToSend = {
          
            'login': this.props.navigation.state.params.Login,
            'password' :this.state.newPassword
    
          }
          console.log('here data to send',dataToSend);
        var formBody = [];
        for (var key in dataToSend) {
          var encodedKey = encodeURIComponent(key);
          var encodedValue = encodeURIComponent(dataToSend[key]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(`${global.ApiUrl}changePassword`, {
      method: "POST",
      body: formBody,
      headers: {//Header Defination 
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    
    .then((results) => results.json())
    .then((data)=> {
       console.log('data is here ', data);
if (data.password !=='interloc'){
    this.props.navigation.navigate('LoginScreen')
}
      //alert('data.results' , data.results)
        //console.log('*****response : ');
        //console.log(data);
        //alert(data.results);
      
      }).catch(e => {
       
        console.log(e);
      })
     }



        // put api 
        // you neeed to add .then()
        // example ->
        // .then((data)=>{
            // console data to see what paramter you are recieving
        //     if(data.someparameter)
        //     //goto other screen after updating password
        // })
        
    
componentDidMount(){
    //console.log("Je suis dans la page UpdatePasswordScreen avec cette props :",this.props)
}
    render() {
        return (
            <Background>
                <BackButton goBack={() => this.props.navigation.navigate('LoginScreen')} />
            <View style={styles.container}>
             
                <Text style={{fontStyle:'normal',fontWeight:'bold',color:'#b85f32',textAlign:'center',fontSize:30}}>Modifier votre mot de passe </Text>
                <Text style={{marginTop:20,marginStart:10}}>C'est l'utilisateur ayant l'identifiant : <Text style={{color:'#b85f32',fontSize:15}}>{this.props.navigation.state.params.Login}</Text></Text>
                <View style={[styles.bottomView,{backgroundColor:this.props.backgroundColor}]}>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder={this.props.placeHolderCurrentPassword}
                        multiline={false} placeholderTextColor={"#3c3c3c"} autoCorrect={false} underlineColorAndroid={'transparent'}  secureTextEntry={true} onChangeText={(currentPassword) => this.setState({currentPassword})} value={this.state.currentPassword}></TextInput>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder={this.props.placeHolderNewPassword}
                        multiline={false} placeholderTextColor={"#3c3c3c"} autoCorrect={false} underlineColorAndroid={'transparent'}  secureTextEntry={true} onChangeText={(newPassword) => this.setState({newPassword})} value={this.state.newPassword}></TextInput>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder={this.props.placeHolderConfirmPassword}
                        multiline={false} placeholderTextColor={"#3c3c3c"} autoCorrect={false} underlineColorAndroid={'transparent'}  secureTextEntry={true} onChangeText={(confirmPassword) => this.setState({confirmPassword})} value={this.state.confirmPassword}></TextInput>
                </View>
                <TouchableOpacity style={styles.btnSave} activeOpacity={0.6} onPress={() => this.onbtnSavePress()}>
                    <Text style={styles.textSave} numberOfLines={1}>
                        {this.props.submitText}</Text>

     
                </TouchableOpacity>
             
                </View>
            </View>
            </Background>
        );
    }
}

const styles  = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop:40
    },
    bottomView: {
        backgroundColor: 'white'
    },
    inputText: {
        paddingVertical: 5,
        color: '#3c3c3c',
        marginLeft: 10,
        fontSize: 14,
        textAlign: 'left'
    },
    inputView:{
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'flex-start',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: '#3c3c3c',
        overflow: 'hidden',
    },
    btnSave: {
        backgroundColor: '#b85f32',
        paddingHorizontal: 30,
        height: 30,
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 15
    },

    textSave: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 5
    }
});