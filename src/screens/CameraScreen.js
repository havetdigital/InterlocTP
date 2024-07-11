import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import TextInput from "../components/TextInput";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import AsyncStorage from "@react-native-community/async-storage";
import * as FileSystem from "expo-file-system";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
  SlideAnimation,
} from "react-native-popup-dialog";
import { BackHandler } from "react-native";
import { DismissKeyboardView } from "../components/DissmissKeyboardHOC";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);
export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [ref, setRef] = useState({ value: "", error: "" });
  const cameraRef = useRef();
  const idmission = AsyncStorage.getItem("@IdMission");
  const [modalVisible, setmodalVisible] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  useEffect(() => {
    const backAction = () => {
      setmodalVisible(false);
      return;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const idmission = await AsyncStorage.getItem("@IdMission");
      const id_user = await AsyncStorage.getItem("@id_user");
      const refff = await AsyncStorage.getItem("@refff") ?? "";

      const source = data;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        let imageUri = source ? `data:image/png;base64,${source.base64}` : null;
       
        let dataToSend = {
          idmission: idmission,
          document: imageUri,
          ref: refff,
          id_user: id_user,
        };
        let formBody = [];
        for (const key in dataToSend) {
          const encodedKey = encodeURIComponent(key);
          const encodedValue = encodeURIComponent(dataToSend[key]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(`${global.ApiUrl}SavePhoto`, {
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
          .then((data) => {``
            let user = data.results.map((row) => {
              if (row.ifNotSuccess === false) {
                alert("La photo est bien envoyée");
                AsyncStorage.removeItem("@refff");
                navigation.navigate("DetailsMission");
              } else {
                alert("Non envoyé");
              }
            });

            //console.log(user);
          });
      }
    }
  };
  /*
        let dataToSend = {
          
            'idmission': idmission,
            'ref': "ref1",
             'id':31,
             'document':source
        }

        let formBody = [];
        for (const key in dataToSend) {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log('formdata',formBody)
        alert(formBody)
        fetch(`${global.ApiUrl}SavePhoto`, {
            
            method: "POST",
            body: dataToSend,
            headers: {//Header Defination
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(results => {
                return results.json();
            }).then(data => {



            let docs = data.results.map((row) => {

               if (row.ifNotSuccess === true) {
                    alert('Veuillez bien renseigner les infos')

                } else {
                  alert('Bien enregistré')

                }
            });

            console.log("source-photo",source);


        });
    

*/

  /*const SavePicture = async () => {
  const idmission = await AsyncStorage.getItem('@IdMission');
  console.log('IdMission',idmission)
  const imageUri1 = await AsyncStorage.getItem('@imageUri');
  console.log('Here')
var img = {
  document : imageUri1,
  type: 'image/png'
};
console.log('Here1')
var personInfo = {
  idmission : idmission,
  id: 31
};
console.log('Here2')
var fdata = new FormData();
fdata.append('personInfo', {
  "string": JSON.stringify(personInfo), //This is how it works :)
  type: 'application/json'
});
console.log('Here3')
fdata.append('image', {
  document: img.document,
});
console.log('Here4')
fetch(`${global.ApiUrl}SavePhoto`, { 
    method: 'POST',
    body: fdata,
    headers: {
      'Content-Type': 'multipart/form-data; ',
      'Accept': '*', 
    },
  }
)  .then(response => console.log('response is here',response.json()))

console.log('Here5')
}

    
*/
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const test = async () => {
    await AsyncStorage.setItem("@refff", ref.value);
    setmodalVisible(false);
  };
  const renderCancelPreviewButton = () => (
    <View>
      <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
        <View
          style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]}
        />
        <View
          style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
        />
      </TouchableOpacity>
    </View>
    /* <Button style={{
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#b85f32',
        borderRadius: 8, width: '60%',
      }}
      onPress={SavePicture}>
        <Text style={{ color: '#fff' }}>Envoyer</Text>

      </Button> */
  );

  const renderCaptureControl = () => (
    <View style={styles.control}>
      {/* <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Text style={styles.text}>{"Retourner"}</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        // activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={takePicture}
        // style={styles.capture}
      >
        <Image
          style={{ height: 60, width: 60 }}
          source={require("../assets/1232672.png")}
        />
      </TouchableOpacity>
      {/* <TextInput
                    label="Réf"
                    returnKeyType="next"
                    value={ref.value}
                    onChangeText={text => setRef({value: text, error: ''})}
                  
                    style={{marginStart:190,height: 50,width:120,borderWidth:2,borderColor:'black'}}

                /> */}
    </View>
  );
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>Pas d'accés à la caméra</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboardView>
        <View style={{ zIndex: 5 }}>
          <Dialog
            visible={modalVisible}
            dialogAnimation={
              new SlideAnimation({
                slideFrom: "bottom",
              })
            }
            onTouchOutside={() => {
              setmodalVisible(false);
              //this.setState({ modalVisible: false });
            }}
            // onHardwareBackPress={() => {
            //   setmodalVisible(false);
            //   // navigation.goBack();
            //   //this.setState({ modalVisible: false });
            // }}

            dialogStyle={{
              width: "92%",
              height: "30%",
              borderRadius: 20,
              elevation: 20,
            }}
          >
            <DialogContent>
              <Text
                style={{
                  color: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: "2%",
                }}
              >
                Entrer une référence (ex n° BL)
              </Text>
              <TextInput
                label="ref"
                onChangeText={(text) => setRef({ value: text, error: "" })}
                value={ref.value}
              />

              <Button
                warning
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  backgroundColor: "#b85f32",
                  borderRadius: 12,
                  height: "20%",
                  width: "50%",
                }}
                onPress={() => test()}
              >
                <Text style={{ color: "white" }}>Enregistrer</Text>
              </Button>

              <Button
                warning
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  backgroundColor: "#b85f32",
                  borderRadius: 12,
                  height: "20%",
                  width: "50%",
                  marginTop: "3%",
                }}
                onPress={() => {
                  setmodalVisible(false);
                }}
              >
                <Text style={{ color: "white" }}>Pas de référence</Text>
              </Button>
            </DialogContent>
          </Dialog>
        </View>
        {/* <TextInput

label="Réf"

returnKeyType="next"

value={ref.value}

onChangeText={text => setRef({value: text, error: ''})}

style={{height: 50,marginStart:120,width:120,borderWidth:2,borderColor:'black'}}
/> */}

        <Camera
          ref={cameraRef}
          style={{ height: "80%", width: "100%" }}
          type={cameraType}
          flashMode={Camera.Constants.FlashMode.off}
          onCameraReady={onCameraReady}
          onMountError={(error) => {
            console.log("camera error", error);
          }}
        />
        <View style={styles.container}>
          {/*  {isVideoRecording && renderVideoRecordIndicator()}
        {videoSource && renderVideoPlayer()}*/}
          {isPreview && renderCancelPreviewButton()}
          {!isPreview && renderCaptureControl()}
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    // backgroundColor: "#f5f6f5",
    // borderRadius: 5,
    // height: captureSize,
    // width: captureSize,
    // borderRadius: Math.floor(captureSize / 2),
    // marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
});
