import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableHighlight,
  Dimensions,
} from "react-native";

import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default class GalleryImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "World!",
      MyPhotos: [],
      document: "",
      ref: "",
      activeIndex: 0,
      id: "",
      visible: false,
      visibleset: false,
    };
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    this.GetImages();
  }

  get pagination() {
    const { MyPhotos, activeIndex } = this.state;
    return (
      <Pagination
        dotsLength={MyPhotos.length}
        activeDotIndex={activeIndex}
        // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#b85f32",
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  GetImages() {
    (async () => {
      const idmission = await AsyncStorage.getItem("@IdMission");

      let dataToSend = { idmission: idmission };

      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}GetMissionPhoto`, {
        method: "POST",
        body: formBody,
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results.json();
        })
        .then((data) => {
          this.setState({ MyPhotos: data.results });
          console.log("MyPhotos is here", data.results);
        });
    })();
  }

  MAJ = async () => {
    //console.log('iddoc',AsyncStorage.getItem('@iddoc'))
    let dataToSend = {
      id: await AsyncStorage.getItem("@iddoc"),
      ref: this.state.ref,
    };

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch(`${global.ApiUrl}changeRef`, {
      method: "POST",
      body: formBody,
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((results) => results.json())
      .then((data) => {
        console.log("data is here ", data);
        this.props.navigation.navigate("DetailsMission");
        AsyncStorage.removeItem("@iddoc");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /*renderItem(){
     <View>
   {
        this.state.MyPhotos.map((items, i) => {
           let doc = items.document.replace("public/",`${global.ApiUrl}`);
          return (

            <View style={{ paddingTop: 50,marginStart:10 }} key={i} >  
                <Text style={{ color:'black' }} onPress={async() => await AsyncStorage.setItem('@iddoc',items.IDDoc)}  >
                    <TextInput placeholder = "Ref"  style={{ height: 50,width:90 }}
              onChangeText={(ref) => this.setState({ ref })}
              value={this.state.ref}
            /><Text style={{color:'orange'}}>  - Réf : </Text>{items.ref}</Text>
               

              <View style={{  justifyContent: 'center', textAlign: 'center', }}>
              <Image resizeMethod='resize' source={{uri:doc}}
    style={{width:90, height:150}} />
    <View></View></View></View>)})}</View>




 }*/
  deleteP = async () => {
    let dataToSend = {
      id: await AsyncStorage.getItem("@ID"),
    };
    console.log("here data to sending", dataToSend);
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch(`${global.ApiUrl}deletePhoto`, {
      method: "POST",
      body: formBody,
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        //alert('Mission a bien pris en charge');
      })
      .catch((e) => {
        console.log(e);
      });
    this.props.navigation.navigate("DetailsMission");
  };

  _renderItem({ item, index }) {
    let doc = item.document.replace("public/", `${global.ApiUrl}`);
    return (
      <View
        style={{
          borderRadius: 6,
          marginTop: 40,
          height: 400,
          padding: 51,

          marginRight: 26,
          width: 300,
          borderWidth: 3,
        }}
      >
        {/* <Text style={{fontSize:28}}>Réf :  <Text style={{fontSize: 25}}>{item.ref}</Text></Text> */}

        <TouchableOpacity
          onPress={async () =>
            (await AsyncStorage.setItem("@ID", item.IDDoc))
              ? this.deleteP()
              : this.deleteP()
          }
        >
          <AntDesign
            style={{ marginLeft: 170 }}
            name="delete"
            size={18}
            color="#b85f32"
          />
        </TouchableOpacity>

        <Image
          resizeMethod="resize"
          source={{ uri: doc }}
          style={{ width: 160, height: 300 }}
        />

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "black" }}>
            <Text style={{ color: "#b85f32" }}> - Réf : </Text>
            {item.ref}
          </Text>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  placeholder="Réf"
                  style={{
                    height: 50,
                    width: 270,
                    marginStart: 25,
                    borderWidth: 2,
                    borderColor: "#b85f32",
                  }}
                  onChangeText={(ref) => this.setState({ ref })}
                  value={this.state.ref}
                />
                <Button
                  mode="contained"
                  style={{
                    backgroundColor: "#b85f32",
                    width: "50%",
                    alignSelf: "center",
                  }}
                  onPress={() => {
                    this.MAJ();
                  }}
                >
                  Modifier
                </Button>
                <TouchableOpacity
                  style={{ ...styles.openButton }}
                  onPress={() => {
                    this.setState({ visible: !this.state.visible });
                  }}
                >
                  <Text style={styles.textStyle}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* <TouchableOpacity
                     onPress={async() => await AsyncStorage.setItem('@iddoc',item.IDDoc)}
                    
                    ><AntDesign style={{    marginLeft: 120,
                    }} name="edit" size={18} color="#b85f32" /></TouchableOpacity>  */}

          <TouchableOpacity
            style={styles.openButton}
            onPress={async () => {
              this.setState({ visible: true }),
                await AsyncStorage.setItem("@iddoc", item.IDDoc);
            }}
          >
            <AntDesign
              style={{ marginLeft: 90 }}
              name="edit"
              size={18}
              color="#b85f32"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: getStatusBarHeight(),
          width: Dimensions.get("window").width,
        }}
      >
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image
              style={styles.backImgStyle}
              source={require("../assets/arrow_back.png")}
            />
          </TouchableOpacity>
        </View>
        {/* <BackButton goBack={() => this.props.navigation.navigate('DetailsMission')} /> */}
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          {this.state.MyPhotos.length != 0 ? (
            <View>
              <Carousel
                layout={"default"}
                ref={(ref) => (this.carousel = ref)}
                data={this.state.MyPhotos}
                sliderWidth={301}
                itemWidth={301}
                renderItem={this._renderItem}
                onSnapToItem={(index) => this.setState({ activeIndex: index })}
              />

              {this.pagination}
            </View>
          ) : (
            <View style={{marginTop:20}}>
            <Text>
              Pas de photo , Prendre une{" "}
            </Text>
            <Button
                mode="contained"
                style={{
                  backgroundColor: "#b85f32",
                  alignSelf: "center",
                  marginTop:10
                }}
                onPress={() => {
                  this.props.navigation.navigate("CameraScreen");
                }}
              >
                Caméra
              </Button>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  nameText: {
    fontSize: 50,
    padding: 15,
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    // backgroundColor: 'white',
    // borderRadius: 20,
    // padding: 10,
    // elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    height: 28,
    width: 28,
  },
  backImgStyle: {
    height: "100%",
    width: "100%",
  },
});
