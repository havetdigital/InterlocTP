import React, { Fragment, useState, PureComponent, Component } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { Picker as SelectPicker } from "native-base";
import { Button } from "react-native-paper";
// import ToggleSwitch from 'toggle-switch-react-native';
//import CheckBox from 'react-native-checkbox';
import { Entypo } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
  SlideAnimation,
} from "react-native-popup-dialog";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Input,
  Segment,
  Item,
  CheckBox,
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInput from "../components/TextInput";

import BackButton from "../components/BackButton";
import ModeText from "../components/ModeText";

//import Ionicons from '@expo/vector-icons/Ionicons';

import HTML from "react-native-render-html";
import {
  IGNORED_TAGS,
  alterNode,
  makeTableRenderer,
} from "react-native-render-html-table-bridge";
import WebView from "react-native-webview"; // <-- Instructions might defer depending on your setup
import SegmentedControlTab from "react-native-segmented-control-tab";
// import TimeField from 'react-simple-timefield';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-datepicker'

// import TimePicker from 'react-native-simple-time-picker';
// import ScrollPicker from 'react-native-wheel-scroll-picker';
import ScrollPicker from "react-native-picker-scrollview";

import Spinner from "react-native-loading-spinner-overlay";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { DismissKeyboardView } from "../components/DissmissKeyboardHOC";
import Loader from "../components/Loader";

// import SignatureScreen from 'react-native-signature-canvas';

//import { WebView } from 'react-native-webview';

const html = `
<table>
  <tr>
    <th>Entry Header 1</th>
    <th>Entry Header 2</th>
  </tr>
  <tr>
    <td>Entry First Line 1</td>
    <td>Entry First Line 2</td>
  </tr>
</table>
`;

const config = {
  WebViewComponent: WebView,
};

const renderers = {
  table: makeTableRenderer(config),
};

const htmlConfig = {
  alterNode,
  renderers,
  ignoredTags: IGNORED_TAGS,
};

let windowWidth = Dimensions.get("window").width

export default class DetailsMission extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    const { navigation, route } = this.props;
    const IdMission = route?.params?.IdMission;
    
    (async () => {
      await AsyncStorage.setItem("@IdMission", IdMission);
    })();

    const DatasHours = [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ];
    const DatasMinutes =
      // DatasMinutes[0] = '00',
      // DatasMinutes[2] = '15'
      // DatasMinutes[3] = '30'
      // DatasMinutes[4] = '45'
      ["00", "15", "30", "45"];

    this.state = {
      ButtonStateHolder: false,
      immatriculation: "",
      selectedHours: 0,
      selectedMinutes: 0,
      signer: false,

      DataHours: DatasHours,
      DataMinutes: DatasMinutes,
      isDialogVisible: false,
      UserLogin: "",
      modalVisible: false,
      horlogeParam: false,
      MyMissions: [],
      isMissionLoading: false,
      MyPrestations: [],
      MyPointages: [],

      MonEtat: [],
      CurrentMission: IdMission,
      selectedIndex: 0,
      customStyleIndex: 0,
      selected2: undefined,

      temps: new Date(0, 0),
      time: "12:34",
      setTime: new Date(0, 0),

      MatinDebut: null,
      MatinFin: null,
      ApresMidiDebut: null,
      ApresMidiFin: null,

      Deplacement: "",

      DebutAttente: null,
      FinAttente: null,

      AttenteType: null,

      selectedPrestation: "1",

      selectedtype: "1",
      nombreTonnes: null,
      nombreAttentes: null,
      FinAutre: null,
      DebutAutre: null,

      selectedtype1: "5",
      nombreTonnes1: null,
      nombreAttentes1: null,
      FinAutre1: null,
      DebutAutre1: null,

      selectedtype2: "9",
      nombreTonnes2: null,
      nombreAttentes2: null,
      FinAutre2: null,
      DebutAutre2: null,

      //les nv pointage type
      peage: null,
      BRH: null,
      pinceTri: null,
      crocBeton: null,
      Pince: null,
      remplissageCuve: null,
      forfait: "",
      HS: null,
      ///
      peage1: null,
      BRH1: null,
      pinceTri1: null,
      crocBeton1: null,
      Pince1: null,
      remplissageCuve1: null,
      forfait1: null,
      HS1: null,
      ///
      peage2: null,
      BRH2: null,
      pinceTri2: null,
      crocBeton2: null,
      Pince2: null,
      remplissageCuve2: null,
      forfait2: null,
      HS2: null,
      ///

      checked: false,
      checkedforfait: false,
      checkedCharge: false,
      showInputDeplacement: false,
      showInputFinDebut: false,
      showInputNombreTonnes: false,
      showInputNombreAttentes: false,
      showforfaitsaisi: false,

      ///////////
      showInputHS: false,
      showInputPeage: false,
      showInputbrh: false,
      showInputpinceTri: false,
      showInputCrocBeton: false,
      showInputPince: false,
      showInputRemplissageCuve: false,
      showInputForfait: false,

      showInputHS1: false,
      showInputPeage1: false,
      showInputbrh1: false,
      showInputpinceTri1: false,
      showInputCrocBeton1: false,
      showInputPince1: false,
      showInputRemplissageCuve1: false,
      showInputForfait1: false,

      showInputHS2: false,
      showInputPeage2: false,
      showInputbrh2: false,
      showInputpinceTri2: false,
      showInputCrocBeton2: false,
      showInputPince2: false,
      showInputRemplissageCuve2: false,
      showInputForfait2: false,

      ////////////////
      showInputFinDebut1: false,
      showInputNombreTonnes1: false,
      showInputNombreAttentes1: false,

      showInputFinDebut2: false,
      showInputNombreTonnes2: false,
      showInputNombreAttentes2: false,

      showButtonPrisEnCharge: false,
      showTextPrisEnCharge: false,
      date: new Date(),
      mode: "time",
      show: false,
      currentTextTime: 0,

      DejaPointed: 0,

      idMatin: "",
      idAM: "",
      IdDep: "",

      idAutre: "",
      idAttente: "",
      idTonne: "",

      idHS: "",
      idPeage: "",
      idBRH: "",
      idpinceTri: "",
      idcrocBeton: "",
      idPince: "",
      idremplissageCuve: "",
      idForfait: "",

      ShowAutre2: false,
      ShowAutre3: false,
      ShowPlus: true,
      ShowPlus2: true,
      ShowPlus3: false,

      modalHorloge: false,
      dataH: "01",
      dataM: "00",
      selectedItemH: 1,
      selectedItemM: 0,

      showLoading: false,

      ShowViewMatin: false,
      ShowViewAM: false,
      ShowViewDeplacement: false,
      showViewNombreAttentesOnPrincipal: false,
      showViewNombreAttentesOnAutre: false,
      showViewTonnesOnPrincipal: false,
      showViewTypeOnAutre: true,

      showViewAutresOnPrincipal: false,
      showViewAutresOnAutre: false,

      showViewForfaitOnAutre: false,
      showViewForfaitOnPrincipal: false,

      MyPointagesType: [],
      MyPointagesTypeTest: ["Tonnes", "Autre", "Attente"],

      saveMateriel: "",
      GetTabSaisi: "",
      GetTabSaisiForfait: "",
      signature: null,
      style: `.m-signature-pad--footer
      .button {
        background-color: red;
        color: #FFF;
      }`,

      ref: "",
      ThisMission: "",
      //EtatMissionEnAttente: false,
    };

    (async () => {
      const valueLogin = await AsyncStorage.getItem("@Login");
      this.setState({ UserLogin: valueLogin });
    })();

    this.onTimeChange = this.onTimeChange.bind(this);
    this.changedatePicker = this.changedatePicker.bind(this);
    this.OnPickerCancel = this.OnPickerCancel.bind(this);
  }
  
  handleSignature = (signature) => {
    onOK(signature);
  };

  handleEnd = () => {
    this.state?.ref?.current?.readSignature();
  };

  handleSignature = (signature) => {
    this.setState({ signature: signature });
  };

  onTimeChange(time) {}

  OnPickerCancel(e) {
    let tims = "";
    let time = null;
    switch (this.state.currentTextTime) {
      case 1:
        this.setState({ date: tims, MatinDebut: time, show: !this.state.show });
        break;
      case 2:
        this.setState({ date: tims, MatinFin: time, show: !this.state.show });
        break;
      case 3:
        this.setState({
          date: tims,
          ApresMidiDebut: time,
          show: !this.state.show,
        });
        break;
      case 4:
        this.setState({
          date: tims,
          ApresMidiFin: time,
          show: !this.state.show,
        });
        break;
      case 5:
        this.setState({ date: tims, DebutAutre: time, show: !this.state.show });
        break;
      case 6:
        this.setState({ date: tims, FinAutre: time, show: !this.state.show });
        break;
      case 7:
        this.setState({
          date: tims,
          Deplacement: time,
          show: !this.state.show,
        });
        break;
      case 8:
        this.setState({
          date: tims,
          nombreAttentes: time,
          show: !this.state.show,
        });
        break;

      case 9:
        this.setState({
          date: tims,
          nombreAttentes1: time,
          show: !this.state.show,
        });
        break;

      case 10:
        this.setState({
          date: tims,
          nombreAttentes2: time,
          show: !this.state.show,
        });
        break;

      case 20:
        this.setState({
          date: tims,
          DebutAutre1: time,
          show: !this.state.show,
        });
        break;

      case 21:
        this.setState({ date: tims, FinAutre1: time, show: !this.state.show });
        break;

      case 22:
        this.setState({
          date: tims,
          DebutAutre2: time,
          show: !this.state.show,
        });
        break;

      case 23:
        this.setState({ date: tims, FinAutre2: time, show: !this.state.show });
        break;

      case 200:
        this.setState({ date: tims, BRH: time, show: !this.state.show });
        break;

      case 300:
        this.setState({ date: tims, pinceTri: time, show: !this.state.show });
        break;

      case 400:
        this.setState({ date: tims, crocBeton: time, show: !this.state.show });
        break;

      case 500:
        this.setState({ date: tims, Pince: time, show: !this.state.show });
        break;

      case 600:
        this.setState({
          date: tims,
          remplissageCuve: time,
          show: !this.state.show,
        });
        break;
      case 700:
        this.setState({ date: tims, HS: time, show: !this.state.show });
        break;

      /////1///

      case 201:
        this.setState({ date: tims, BRH1: time, show: !this.state.show });
        break;

      case 301:
        this.setState({ date: tims, pinceTri1: time, show: !this.state.show });
        break;

      case 401:
        this.setState({ date: tims, crocBeton1: time, show: !this.state.show });
        break;

      case 501:
        this.setState({ date: tims, Pince1: time, show: !this.state.show });
        break;

      case 601:
        this.setState({
          date: tims,
          remplissageCuve1: time,
          show: !this.state.show,
        });
        break;
      case 701:
        this.setState({ date: tims, HS1: time, show: !this.state.show });
        break;

      ////2//////

      case 202:
        this.setState({ date: tims, BRH2: time, show: !this.state.show });
        break;

      case 302:
        this.setState({ date: tims, pinceTri2: time, show: !this.state.show });
        break;

      case 402:
        this.setState({ date: tims, crocBeton2: time, show: !this.state.show });
        break;

      case 502:
        this.setState({ date: tims, Pince2: time, show: !this.state.show });
        break;

      case 602:
        this.setState({
          date: tims,
          remplissageCuve2: time,
          show: !this.state.show,
        });
        break;
      case 702:
        this.setState({ date: tims, HS2: time, show: !this.state.show });
        break;
      ///////

      default:
      // code block
    }
  }

  changedatePicker(e) {
    // let tims = new Date()

    // let time = ''
    // if (e.nativeEvent.timestamp) {
    //   tims = e.nativeEvent.timestamp
    //   var h = new Date(tims).getHours();
    //   var m = new Date(tims).getMinutes();
    //   if (m < 10) {
    //     m = '0' + m;
    //   }

    //   time = h + ':' + m

    // }
    let tims = this.state.dataH + ":" + this.state.dataM;
    let time = this.state.dataH + ":" + this.state.dataM;

    // alert(this.state.selectedItemM)
    //     if(this.state.selectedItemM == 1){
    //       this.setState({ dataM: '15' });
    //       this.setState({ selectedItemM: 1 });
    //     }
    //     if(this.state.selectedItemH == 1){
    //       this.setState({ dataH: '01' });
    //       this.setState({ selectedItemM: 1 });
    //     }
    //alert(tims)

    switch (this.state.currentTextTime) {
      case 1:
        this.setState({ date: tims, MatinDebut: time, show: !this.state.show });

        break;
      case 2:
        this.setState({ date: tims, MatinFin: time, show: !this.state.show });
        break;
      case 3:
        this.setState({
          date: tims,
          ApresMidiDebut: time,
          show: !this.state.show,
        });
        break;
      case 4:
        this.setState({
          date: tims,
          ApresMidiFin: time,
          show: !this.state.show,
        });
        break;
      case 5:
        this.setState({ date: tims, DebutAutre: time, show: !this.state.show });
        break;
      case 6:
        this.setState({ date: tims, FinAutre: time, show: !this.state.show });
        break;
      case 7:
        this.setState({
          date: tims,
          Deplacement: time,
          show: !this.state.show,
        });
        break;
      case 8:
        this.setState({
          date: tims,
          nombreAttentes: time,
          show: !this.state.show,
        });
        break;

      case 9:
        this.setState({
          date: tims,
          nombreAttentes1: time,
          show: !this.state.show,
        });
        break;

      case 10:
        this.setState({
          date: tims,
          nombreAttentes2: time,
          show: !this.state.show,
        });
        break;

      case 20:
        this.setState({
          date: tims,
          DebutAutre1: time,
          show: !this.state.show,
        });
        break;

      case 21:
        this.setState({ date: tims, FinAutre1: time, show: !this.state.show });
        break;

      case 22:
        this.setState({
          date: tims,
          DebutAutre2: time,
          show: !this.state.show,
        });
        break;

      case 23:
        this.setState({ date: tims, FinAutre2: time, show: !this.state.show });
        break;

      case 10:
        this.setState({
          date: tims,
          nombreAttentes2: time,
          show: !this.state.show,
        });
        break;

      case 200:
        this.setState({ date: tims, BRH: time, show: !this.state.show });
        break;

      case 300:
        this.setState({ date: tims, pinceTri: time, show: !this.state.show });
        break;

      case 400:
        this.setState({ date: tims, crocBeton: time, show: !this.state.show });
        break;

      case 500:
        this.setState({ date: tims, Pince: time, show: !this.state.show });
        break;

      case 600:
        this.setState({
          date: tims,
          remplissageCuve: time,
          show: !this.state.show,
        });
        break;
      case 700:
        this.setState({ date: tims, HS: time, show: !this.state.show });
        break;

      /////1///

      case 201:
        this.setState({ date: tims, BRH1: time, show: !this.state.show });
        break;

      case 301:
        this.setState({ date: tims, pinceTri1: time, show: !this.state.show });
        break;

      case 401:
        this.setState({ date: tims, crocBeton1: time, show: !this.state.show });
        break;

      case 501:
        this.setState({ date: tims, Pince1: time, show: !this.state.show });
        break;

      case 601:
        this.setState({
          date: tims,
          remplissageCuve1: time,
          show: !this.state.show,
        });
        break;

      case 701:
        this.setState({ date: tims, HS1: time, show: !this.state.show });
        break;

      ////2//////

      case 202:
        this.setState({ date: tims, BRH2: time, show: !this.state.show });
        break;

      case 302:
        this.setState({ date: tims, pinceTri2: time, show: !this.state.show });
        break;

      case 402:
        this.setState({ date: tims, crocBeton2: time, show: !this.state.show });
        break;

      case 502:
        this.setState({ date: tims, Pince2: time, show: !this.state.show });
        break;

      case 602:
        this.setState({
          date: tims,
          remplissageCuve2: time,
          show: !this.state.show,
        });
        break;
      case 702:
        this.setState({ date: tims, HS2: time, show: !this.state.show });
        break;
      ///////

      default:
      // code block
    }
  }

  selectTimer(e) {
    this.setState({ show: !this.state.show, currentTextTime: e });
    //alert(this.state.selectedItemM)

    switch (e) {
      case 1:
        if (this.state.MatinDebut) {
          //alert(this.state.selectedItemM)
          //**Minutes */
          if (this.state.MatinDebut?.substring(3, 5) == "30") {
            this.setState({ selectedItemM: 2 });
            this.setState({ dataM: "30" });
          }
          if (this.state.MatinDebut?.substring(3, 5) == "45") {
            this.setState({ selectedItemM: 3 });
            this.setState({ dataM: "45" });
          }
          if (this.state.MatinDebut?.substring(3, 5) == "15") {
            this.setState({ selectedItemM: 1 });
            this.setState({ dataM: "15" });
          }
          if (this.state.MatinDebut?.substring(3, 5) == "00") {
            this.setState({ selectedItemM: 0 });
            this.setState({ dataM: "00" });
          }

          //**Heures */
          if (this.state.MatinDebut?.substring(0, 2) == "00") {
            this.setState({ selectedItemH: 0 });
            this.setState({ dataH: "00" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "01") {
            this.setState({ selectedItemH: 1 });
            this.setState({ dataH: "01" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "02") {
            this.setState({ selectedItemH: 2 });
            this.setState({ dataH: "02" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "03") {
            this.setState({ selectedItemH: 3 });
            this.setState({ dataH: "03" });
          }

          if (this.state.MatinDebut?.substring(0, 2) == "04") {
            this.setState({ selectedItemH: 4 });
            this.setState({ dataH: "04" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "05") {
            this.setState({ selectedItemH: 5 });
            this.setState({ dataH: "05" });
          }

          if (this.state.MatinDebut?.substring(0, 2) == "06") {
            this.setState({ selectedItemH: 6 });
            this.setState({ dataH: "06" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "07") {
            this.setState({ selectedItemH: 7 });
            this.setState({ dataH: "07" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "08") {
            this.setState({ selectedItemH: 8 });
            this.setState({ dataH: "08" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "09") {
            this.setState({ selectedItemH: 9 });
            this.setState({ dataH: "09" });
          }

          if (this.state.MatinDebut?.substring(0, 2) == "10") {
            this.setState({ selectedItemH: 10 });
            this.setState({ dataH: "10" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "11") {
            this.setState({ selectedItemH: 11 });
            this.setState({ dataH: "11" });
          }

          if (this.state.MatinDebut?.substring(0, 2) == "12") {
            this.setState({ selectedItemH: 12 });
            this.setState({ dataH: "12" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "13") {
            this.setState({ selectedItemH: 13 });
            this.setState({ dataH: "13" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "14") {
            this.setState({ selectedItemH: 14 });
            this.setState({ dataH: "14" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "15") {
            this.setState({ selectedItemH: 15 });
            this.setState({ dataH: "15" });
          }

          if (this.state.MatinDebut?.substring(0, 2) == "16") {
            this.setState({ selectedItemH: 16 });
            this.setState({ dataH: "16" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "17") {
            this.setState({ selectedItemH: 17 });
            this.setState({ dataH: "17" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "18") {
            this.setState({ selectedItemH: 18 });
            this.setState({ dataH: "18" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "19") {
            this.setState({ selectedItemH: 19 });
            this.setState({ dataH: "19" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "20") {
            this.setState({ selectedItemH: 20 });
            this.setState({ dataH: "20" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "21") {
            this.setState({ selectedItemH: 21 });
            this.setState({ dataH: "21" });
          }

          if (this.state.MatinDebut?.substring(0, 2) == "22") {
            this.setState({ selectedItemH: 22 });
            this.setState({ dataH: "22" });
          }
          if (this.state.MatinDebut?.substring(0, 2) == "23") {
            this.setState({ selectedItemH: 23 });
            this.setState({ dataH: "23" });
          }

          this.setState({ dataH: this.state.MatinDebut?.substring(0, 2) });
          this.setState({ dataM: this.state.MatinDebut?.substring(3, 5) });
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }

        break;
      case 2:
        if (this.state.MatinFin) {
          //**Minutes */
          if (this.state.MatinFin?.substring(3, 5) == "30") {
            this.setState({ selectedItemM: 2 });
            this.setState({ dataM: "30" });
          }
          if (this.state.MatinFin?.substring(3, 5) == "45") {
            this.setState({ selectedItemM: 3 });
            this.setState({ dataM: "45" });
          }
          if (this.state.MatinFin?.substring(3, 5) == "15") {
            this.setState({ selectedItemM: 1 });
            this.setState({ dataM: "15" });
          }
          if (this.state.MatinFin?.substring(3, 5) == "00") {
            this.setState({ selectedItemM: 0 });
            this.setState({ dataM: "00" });
          }

          //**Heures */
          if (this.state.MatinFin?.substring(0, 2) == "00") {
            this.setState({ selectedItemH: 0 });
            this.setState({ dataH: "00" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "01") {
            this.setState({ selectedItemH: 1 });
            this.setState({ dataH: "01" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "02") {
            this.setState({ selectedItemH: 2 });
            this.setState({ dataH: "02" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "03") {
            this.setState({ selectedItemH: 3 });
            this.setState({ dataH: "03" });
          }

          if (this.state.MatinFin?.substring(0, 2) == "04") {
            this.setState({ selectedItemH: 4 });
            this.setState({ dataH: "04" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "05") {
            this.setState({ selectedItemH: 5 });
            this.setState({ dataH: "05" });
          }

          if (this.state.MatinFin?.substring(0, 2) == "06") {
            this.setState({ selectedItemH: 6 });
            this.setState({ dataH: "06" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "07") {
            this.setState({ selectedItemH: 7 });
            this.setState({ dataH: "07" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "08") {
            this.setState({ selectedItemH: 8 });
            this.setState({ dataH: "08" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "09") {
            this.setState({ selectedItemH: 9 });
            this.setState({ dataH: "09" });
          }

          if (this.state.MatinFin?.substring(0, 2) == "10") {
            this.setState({ selectedItemH: 10 });
            this.setState({ dataH: "10" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "11") {
            this.setState({ selectedItemH: 11 });
            this.setState({ dataH: "11" });
          }

          if (this.state.MatinFin?.substring(0, 2) == "12") {
            this.setState({ selectedItemH: 12 });
            this.setState({ dataH: "12" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "13") {
            this.setState({ selectedItemH: 13 });
            this.setState({ dataH: "13" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "14") {
            this.setState({ selectedItemH: 14 });
            this.setState({ dataH: "14" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "15") {
            this.setState({ selectedItemH: 15 });
            this.setState({ dataH: "15" });
          }

          if (this.state.MatinFin?.substring(0, 2) == "16") {
            this.setState({ selectedItemH: 16 });
            this.setState({ dataH: "16" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "17") {
            this.setState({ selectedItemH: 17 });
            this.setState({ dataH: "17" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "18") {
            this.setState({ selectedItemH: 18 });
            this.setState({ dataH: "18" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "19") {
            this.setState({ selectedItemH: 19 });
            this.setState({ dataH: "19" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "20") {
            this.setState({ selectedItemH: 20 });
            this.setState({ dataH: "20" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "21") {
            this.setState({ selectedItemH: 21 });
            this.setState({ dataH: "21" });
          }

          if (this.state.MatinFin?.substring(0, 2) == "22") {
            this.setState({ selectedItemH: 22 });
            this.setState({ dataH: "22" });
          }
          if (this.state.MatinFin?.substring(0, 2) == "23") {
            this.setState({ selectedItemH: 23 });
            this.setState({ dataH: "23" });
          }

          this.setState({ dataH: this.state.MatinFin?.substring(0, 2) });
          this.setState({ dataM: this.state.MatinFin?.substring(3, 5) });
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 3:
        if (this.state.ApresMidiDebut) {
          //**Minutes */
          if (this.state.ApresMidiDebut?.substring(3, 5) == "30") {
            this.setState({ selectedItemM: 2 });
            this.setState({ dataM: "30" });
          }
          if (this.state.ApresMidiDebut?.substring(3, 5) == "45") {
            this.setState({ selectedItemM: 3 });
            this.setState({ dataM: "45" });
          }
          if (this.state.ApresMidiDebut?.substring(3, 5) == "15") {
            this.setState({ selectedItemM: 1 });
            this.setState({ dataM: "15" });
          }
          if (this.state.ApresMidiDebut?.substring(3, 5) == "00") {
            this.setState({ selectedItemM: 0 });
            this.setState({ dataM: "00" });
          }

          //**Heures */
          if (this.state.ApresMidiDebut?.substring(0, 2) == "00") {
            this.setState({ selectedItemH: 0 });
            this.setState({ dataH: "00" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "01") {
            this.setState({ selectedItemH: 1 });
            this.setState({ dataH: "01" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "02") {
            this.setState({ selectedItemH: 2 });
            this.setState({ dataH: "02" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "03") {
            this.setState({ selectedItemH: 3 });
            this.setState({ dataH: "03" });
          }

          if (this.state.ApresMidiDebut?.substring(0, 2) == "04") {
            this.setState({ selectedItemH: 4 });
            this.setState({ dataH: "04" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "05") {
            this.setState({ selectedItemH: 5 });
            this.setState({ dataH: "05" });
          }

          if (this.state.ApresMidiDebut?.substring(0, 2) == "06") {
            this.setState({ selectedItemH: 6 });
            this.setState({ dataH: "06" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "07") {
            this.setState({ selectedItemH: 7 });
            this.setState({ dataH: "07" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "08") {
            this.setState({ selectedItemH: 8 });
            this.setState({ dataH: "08" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "09") {
            this.setState({ selectedItemH: 9 });
            this.setState({ dataH: "09" });
          }

          if (this.state.ApresMidiDebut?.substring(0, 2) == "10") {
            this.setState({ selectedItemH: 10 });
            this.setState({ dataH: "10" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "11") {
            this.setState({ selectedItemH: 11 });
            this.setState({ dataH: "11" });
          }

          if (this.state.ApresMidiDebut?.substring(0, 2) == "12") {
            this.setState({ selectedItemH: 12 });
            this.setState({ dataH: "12" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "13") {
            this.setState({ selectedItemH: 13 });
            this.setState({ dataH: "13" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "14") {
            this.setState({ selectedItemH: 14 });
            this.setState({ dataH: "14" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "15") {
            this.setState({ selectedItemH: 15 });
            this.setState({ dataH: "15" });
          }

          if (this.state.ApresMidiDebut?.substring(0, 2) == "16") {
            this.setState({ selectedItemH: 16 });
            this.setState({ dataH: "16" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "17") {
            this.setState({ selectedItemH: 17 });
            this.setState({ dataH: "17" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "18") {
            this.setState({ selectedItemH: 18 });
            this.setState({ dataH: "18" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "19") {
            this.setState({ selectedItemH: 19 });
            this.setState({ dataH: "19" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "20") {
            this.setState({ selectedItemH: 20 });
            this.setState({ dataH: "20" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "21") {
            this.setState({ selectedItemH: 21 });
            this.setState({ dataH: "21" });
          }

          if (this.state.ApresMidiDebut?.substring(0, 2) == "22") {
            this.setState({ selectedItemH: 22 });
            this.setState({ dataH: "22" });
          }
          if (this.state.ApresMidiDebut?.substring(0, 2) == "23") {
            this.setState({ selectedItemH: 23 });
            this.setState({ dataH: "23" });
          }

          this.setState({ dataH: this.state.ApresMidiDebut?.substring(0, 2) });
          this.setState({ dataM: this.state.ApresMidiDebut?.substring(3, 5) });
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 4:
        if (this.state.ApresMidiFin) {
          //**Minutes */
          if (this.state.ApresMidiFin?.substring(3, 5) == "30") {
            this.setState({ selectedItemM: 2 });
            this.setState({ dataM: "30" });
          }
          if (this.state.ApresMidiFin?.substring(3, 5) == "45") {
            this.setState({ selectedItemM: 3 });
            this.setState({ dataM: "45" });
          }
          if (this.state.ApresMidiFin?.substring(3, 5) == "15") {
            this.setState({ selectedItemM: 1 });
            this.setState({ dataM: "15" });
          }
          if (this.state.ApresMidiFin?.substring(3, 5) == "00") {
            this.setState({ selectedItemM: 0 });
            this.setState({ dataM: "00" });
          }

          //**Heures */
          if (this.state.ApresMidiFin?.substring(0, 2) == "00") {
            this.setState({ selectedItemH: 0 });
            this.setState({ dataH: "00" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "01") {
            this.setState({ selectedItemH: 1 });
            this.setState({ dataH: "01" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "02") {
            this.setState({ selectedItemH: 2 });
            this.setState({ dataH: "02" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "03") {
            this.setState({ selectedItemH: 3 });
            this.setState({ dataH: "03" });
          }

          if (this.state.ApresMidiFin?.substring(0, 2) == "04") {
            this.setState({ selectedItemH: 4 });
            this.setState({ dataH: "04" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "05") {
            this.setState({ selectedItemH: 5 });
            this.setState({ dataH: "05" });
          }

          if (this.state.ApresMidiFin?.substring(0, 2) == "06") {
            this.setState({ selectedItemH: 6 });
            this.setState({ dataH: "06" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "07") {
            this.setState({ selectedItemH: 7 });
            this.setState({ dataH: "07" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "08") {
            this.setState({ selectedItemH: 8 });
            this.setState({ dataH: "08" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "09") {
            this.setState({ selectedItemH: 9 });
            this.setState({ dataH: "09" });
          }

          if (this.state.ApresMidiFin?.substring(0, 2) == "10") {
            this.setState({ selectedItemH: 10 });
            this.setState({ dataH: "10" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "11") {
            this.setState({ selectedItemH: 11 });
            this.setState({ dataH: "11" });
          }

          if (this.state.ApresMidiFin?.substring(0, 2) == "12") {
            this.setState({ selectedItemH: 12 });
            this.setState({ dataH: "12" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "13") {
            this.setState({ selectedItemH: 13 });
            this.setState({ dataH: "13" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "14") {
            this.setState({ selectedItemH: 14 });
            this.setState({ dataH: "14" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "15") {
            this.setState({ selectedItemH: 15 });
            this.setState({ dataH: "15" });
          }

          if (this.state.ApresMidiFin?.substring(0, 2) == "16") {
            this.setState({ selectedItemH: 16 });
            this.setState({ dataH: "16" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "17") {
            this.setState({ selectedItemH: 17 });
            this.setState({ dataH: "17" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "18") {
            this.setState({ selectedItemH: 18 });
            this.setState({ dataH: "18" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "19") {
            this.setState({ selectedItemH: 19 });
            this.setState({ dataH: "19" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "20") {
            this.setState({ selectedItemH: 20 });
            this.setState({ dataH: "20" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "21") {
            this.setState({ selectedItemH: 21 });
            this.setState({ dataH: "21" });
          }

          if (this.state.ApresMidiFin?.substring(0, 2) == "22") {
            this.setState({ selectedItemH: 22 });
            this.setState({ dataH: "22" });
          }
          if (this.state.ApresMidiFin?.substring(0, 2) == "23") {
            this.setState({ selectedItemH: 23 });
            this.setState({ dataH: "23" });
          }

          this.setState({ dataH: this.state.ApresMidiFin?.substring(0, 2) });
          this.setState({ dataM: this.state.ApresMidiFin?.substring(3, 5) });
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 5:
        if (this.state.DebutAutre) {
          //**Minutes */
          if (this.state.FinAutre?.substring(3, 5) == "30") {
            this.setState({ selectedItemM: 2 });
            this.setState({ dataM: "30" });
          }
          if (this.state.FinAutre?.substring(3, 5) == "45") {
            this.setState({ selectedItemM: 3 });
            this.setState({ dataM: "45" });
          }
          if (this.state.FinAutre?.substring(3, 5) == "15") {
            this.setState({ selectedItemM: 1 });
            this.setState({ dataM: "15" });
          }
          if (this.state.FinAutre?.substring(3, 5) == "00") {
            this.setState({ selectedItemM: 0 });
            this.setState({ dataM: "00" });
          }

          //**Heures */
          if (this.state.FinAutre?.substring(0, 2) == "00") {
            this.setState({ selectedItemH: 0 });
            this.setState({ dataH: "00" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "01") {
            this.setState({ selectedItemH: 1 });
            this.setState({ dataH: "01" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "02") {
            this.setState({ selectedItemH: 2 });
            this.setState({ dataH: "02" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "03") {
            this.setState({ selectedItemH: 3 });
            this.setState({ dataH: "03" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "04") {
            this.setState({ selectedItemH: 4 });
            this.setState({ dataH: "04" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "05") {
            this.setState({ selectedItemH: 5 });
            this.setState({ dataH: "05" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "06") {
            this.setState({ selectedItemH: 6 });
            this.setState({ dataH: "06" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "07") {
            this.setState({ selectedItemH: 7 });
            this.setState({ dataH: "07" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "08") {
            this.setState({ selectedItemH: 8 });
            this.setState({ dataH: "08" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "09") {
            this.setState({ selectedItemH: 9 });
            this.setState({ dataH: "09" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "10") {
            this.setState({ selectedItemH: 10 });
            this.setState({ dataH: "10" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "11") {
            this.setState({ selectedItemH: 11 });
            this.setState({ dataH: "11" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "12") {
            this.setState({ selectedItemH: 12 });
            this.setState({ dataH: "12" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "13") {
            this.setState({ selectedItemH: 13 });
            this.setState({ dataH: "13" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "14") {
            this.setState({ selectedItemH: 14 });
            this.setState({ dataH: "14" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "15") {
            this.setState({ selectedItemH: 15 });
            this.setState({ dataH: "15" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "16") {
            this.setState({ selectedItemH: 16 });
            this.setState({ dataH: "16" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "17") {
            this.setState({ selectedItemH: 17 });
            this.setState({ dataH: "17" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "18") {
            this.setState({ selectedItemH: 18 });
            this.setState({ dataH: "18" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "19") {
            this.setState({ selectedItemH: 19 });
            this.setState({ dataH: "19" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "20") {
            this.setState({ selectedItemH: 20 });
            this.setState({ dataH: "20" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "21") {
            this.setState({ selectedItemH: 21 });
            this.setState({ dataH: "21" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "22") {
            this.setState({ selectedItemH: 22 });
            this.setState({ dataH: "22" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "23") {
            this.setState({ selectedItemH: 23 });
            this.setState({ dataH: "23" });
          }

          this.setState({ dataH: this.state.FinAutre?.substring(0, 2) });
          this.setState({ dataM: this.state.FinAutre?.substring(3, 5) });
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 6:
        if (this.state.FinAutre) {
          //**Minutes */
          if (this.state.FinAutre?.substring(3, 5) == "30") {
            this.setState({ selectedItemM: 2 });
            this.setState({ dataM: "30" });
          }
          if (this.state.FinAutre?.substring(3, 5) == "45") {
            this.setState({ selectedItemM: 3 });
            this.setState({ dataM: "45" });
          }
          if (this.state.FinAutre?.substring(3, 5) == "15") {
            this.setState({ selectedItemM: 1 });
            this.setState({ dataM: "15" });
          }
          if (this.state.FinAutre?.substring(3, 5) == "00") {
            this.setState({ selectedItemM: 0 });
            this.setState({ dataM: "00" });
          }

          //**Heures */
          if (this.state.FinAutre?.substring(0, 2) == "00") {
            this.setState({ selectedItemH: 0 });
            this.setState({ dataH: "00" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "01") {
            this.setState({ selectedItemH: 1 });
            this.setState({ dataH: "01" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "02") {
            this.setState({ selectedItemH: 2 });
            this.setState({ dataH: "02" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "03") {
            this.setState({ selectedItemH: 3 });
            this.setState({ dataH: "03" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "04") {
            this.setState({ selectedItemH: 4 });
            this.setState({ dataH: "04" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "05") {
            this.setState({ selectedItemH: 5 });
            this.setState({ dataH: "05" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "06") {
            this.setState({ selectedItemH: 6 });
            this.setState({ dataH: "06" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "07") {
            this.setState({ selectedItemH: 7 });
            this.setState({ dataH: "07" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "08") {
            this.setState({ selectedItemH: 8 });
            this.setState({ dataH: "08" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "09") {
            this.setState({ selectedItemH: 9 });
            this.setState({ dataH: "09" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "10") {
            this.setState({ selectedItemH: 10 });
            this.setState({ dataH: "10" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "11") {
            this.setState({ selectedItemH: 11 });
            this.setState({ dataH: "11" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "12") {
            this.setState({ selectedItemH: 12 });
            this.setState({ dataH: "12" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "13") {
            this.setState({ selectedItemH: 13 });
            this.setState({ dataH: "13" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "14") {
            this.setState({ selectedItemH: 14 });
            this.setState({ dataH: "14" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "15") {
            this.setState({ selectedItemH: 15 });
            this.setState({ dataH: "15" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "16") {
            this.setState({ selectedItemH: 16 });
            this.setState({ dataH: "16" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "17") {
            this.setState({ selectedItemH: 17 });
            this.setState({ dataH: "17" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "18") {
            this.setState({ selectedItemH: 18 });
            this.setState({ dataH: "18" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "19") {
            this.setState({ selectedItemH: 19 });
            this.setState({ dataH: "19" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "20") {
            this.setState({ selectedItemH: 20 });
            this.setState({ dataH: "20" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "21") {
            this.setState({ selectedItemH: 21 });
            this.setState({ dataH: "21" });
          }

          if (this.state.FinAutre?.substring(0, 2) == "22") {
            this.setState({ selectedItemH: 22 });
            this.setState({ dataH: "22" });
          }
          if (this.state.FinAutre?.substring(0, 2) == "23") {
            this.setState({ selectedItemH: 23 });
            this.setState({ dataH: "23" });
          }

          this.setState({ dataH: this.state.FinAutre?.substring(0, 2) });
          this.setState({ dataM: this.state.FinAutre?.substring(3, 5) });
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 7:
        if (this.state.Deplacement) {
          if (this.state.Deplacement?.length == 5) {
            //**Minutes */
            if (this.state.Deplacement?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.Deplacement?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.Deplacement?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.Deplacement?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.Deplacement?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.Deplacement?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.Deplacement?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.Deplacement?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.Deplacement?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.Deplacement?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.Deplacement?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.Deplacement?.substring(0, 2) });
            this.setState({ dataM: this.state.Deplacement?.substring(3, 5) });
          } else {
            if (this.state.Deplacement?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.Deplacement?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.Deplacement?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.Deplacement?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.Deplacement?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.Deplacement?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.Deplacement?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.Deplacement?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.Deplacement?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.Deplacement?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.Deplacement?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.Deplacement?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.Deplacement?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.Deplacement?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.Deplacement?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.Deplacement?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.Deplacement?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.Deplacement?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.Deplacement?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.Deplacement?.substring(0, 1) });
            this.setState({ dataM: this.state.Deplacement?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 8:
        if (this.state.nombreAttentes) {
          if (this.state.nombreAttentes?.length == 5) {
            //**Minutes */

            if (this.state.nombreAttentes?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.nombreAttentes?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.nombreAttentes?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.nombreAttentes?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.nombreAttentes?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.nombreAttentes?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.nombreAttentes?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.nombreAttentes?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.nombreAttentes?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.nombreAttentes?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.nombreAttentes?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({
              dataH: this.state.nombreAttentes?.substring(0, 2),
            });
            this.setState({
              dataM: this.state.nombreAttentes?.substring(3, 5),
            });
          } else {
            if (this.state.nombreAttentes?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.nombreAttentes?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.nombreAttentes?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.nombreAttentes?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.nombreAttentes?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.nombreAttentes?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.nombreAttentes?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.nombreAttentes?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.nombreAttentes?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.nombreAttentes?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.nombreAttentes?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.nombreAttentes?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.nombreAttentes?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.nombreAttentes?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.nombreAttentes?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.nombreAttentes?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.nombreAttentes?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.nombreAttentes?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.nombreAttentes?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({
              dataH: this.state.nombreAttentes?.substring(0, 1),
            });
            this.setState({
              dataM: this.state.nombreAttentes?.substring(2, 4),
            });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 9:
        if (this.state.nombreAttentes1) {
          if (this.state.nombreAttentes1?.length == 5) {
            //**Minutes */
            if (this.state.nombreAttentes1?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.nombreAttentes1?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.nombreAttentes1?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.nombreAttentes1?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.nombreAttentes1?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.nombreAttentes1?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.nombreAttentes1?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.nombreAttentes1?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.nombreAttentes1?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.nombreAttentes1?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.nombreAttentes1?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({
              dataH: this.state.nombreAttentes1?.substring(0, 2),
            });
            this.setState({
              dataM: this.state.nombreAttentes1?.substring(3, 5),
            });
          } else {
            if (this.state.nombreAttentes1?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.nombreAttentes1?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.nombreAttentes1?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.nombreAttentes1?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.nombreAttentes1?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.nombreAttentes1?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.nombreAttentes1?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.nombreAttentes1?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.nombreAttentes1?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.nombreAttentes1?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.nombreAttentes1?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.nombreAttentes1?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.nombreAttentes1?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.nombreAttentes1?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.nombreAttentes1?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.nombreAttentes1?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.nombreAttentes1?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.nombreAttentes1?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.nombreAttentes1?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({
              dataH: this.state.nombreAttentes1?.substring(0, 1),
            });
            this.setState({
              dataM: this.state.nombreAttentes1?.substring(2, 4),
            });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 10:
        if (this.state.nombreAttentes2) {
          if (this.state.nombreAttentes2?.length == 5) {
            //**Minutes */
            if (this.state.nombreAttentes2?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.nombreAttentes2?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.nombreAttentes2?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.nombreAttentes2?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.nombreAttentes2?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.nombreAttentes2?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.nombreAttentes2?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.nombreAttentes2?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.nombreAttentes2?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.nombreAttentes2?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.nombreAttentes2?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({
              dataH: this.state.nombreAttentes2?.substring(0, 2),
            });
            this.setState({
              dataM: this.state.nombreAttentes2?.substring(3, 5),
            });
          } else {
            if (this.state.nombreAttentes2?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.nombreAttentes2?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.nombreAttentes2?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.nombreAttentes2?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.nombreAttentes2?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.nombreAttentes2?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.nombreAttentes2?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.nombreAttentes2?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.nombreAttentes2?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.nombreAttentes2?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.nombreAttentes2?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.nombreAttentes2?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.nombreAttentes2?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.nombreAttentes2?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.nombreAttentes2?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.nombreAttentes2?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.nombreAttentes2?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.nombreAttentes2?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.nombreAttentes2?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({
              dataH: this.state.nombreAttentes2?.substring(0, 1),
            });
            this.setState({
              dataM: this.state.nombreAttentes2?.substring(2, 4),
            });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 22:
        if (this.state.DebutAutre1) {
          //**Minutes */
          if (this.state.DebutAutre1?.substring(3, 5) == "30") {
            this.setState({ selectedItemM: 2 });
            this.setState({ dataM: "30" });
          }
          if (this.state.DebutAutre1?.substring(3, 5) == "45") {
            this.setState({ selectedItemM: 3 });
            this.setState({ dataM: "45" });
          }
          if (this.state.DebutAutre1?.substring(3, 5) == "15") {
            this.setState({ selectedItemM: 1 });
            this.setState({ dataM: "15" });
          }
          if (this.state.DebutAutre1?.substring(3, 5) == "00") {
            this.setState({ selectedItemM: 0 });
            this.setState({ dataM: "00" });
          }

          //**Heures */
          if (this.state.DebutAutre1?.substring(0, 2) == "00") {
            this.setState({ selectedItemH: 0 });
            this.setState({ dataH: "00" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "01") {
            this.setState({ selectedItemH: 1 });
            this.setState({ dataH: "01" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "02") {
            this.setState({ selectedItemH: 2 });
            this.setState({ dataH: "02" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "03") {
            this.setState({ selectedItemH: 3 });
            this.setState({ dataH: "03" });
          }

          if (this.state.DebutAutre1?.substring(0, 2) == "04") {
            this.setState({ selectedItemH: 4 });
            this.setState({ dataH: "04" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "05") {
            this.setState({ selectedItemH: 5 });
            this.setState({ dataH: "05" });
          }

          if (this.state.DebutAutre1?.substring(0, 2) == "06") {
            this.setState({ selectedItemH: 6 });
            this.setState({ dataH: "06" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "07") {
            this.setState({ selectedItemH: 7 });
            this.setState({ dataH: "07" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "08") {
            this.setState({ selectedItemH: 8 });
            this.setState({ dataH: "08" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "09") {
            this.setState({ selectedItemH: 9 });
            this.setState({ dataH: "09" });
          }

          if (this.state.DebutAutre1?.substring(0, 2) == "10") {
            this.setState({ selectedItemH: 10 });
            this.setState({ dataH: "10" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "11") {
            this.setState({ selectedItemH: 11 });
            this.setState({ dataH: "11" });
          }

          if (this.state.DebutAutre1?.substring(0, 2) == "12") {
            this.setState({ selectedItemH: 12 });
            this.setState({ dataH: "12" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "13") {
            this.setState({ selectedItemH: 13 });
            this.setState({ dataH: "13" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "14") {
            this.setState({ selectedItemH: 14 });
            this.setState({ dataH: "14" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "15") {
            this.setState({ selectedItemH: 15 });
            this.setState({ dataH: "15" });
          }

          if (this.state.DebutAutre1?.substring(0, 2) == "16") {
            this.setState({ selectedItemH: 16 });
            this.setState({ dataH: "16" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "17") {
            this.setState({ selectedItemH: 17 });
            this.setState({ dataH: "17" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "18") {
            this.setState({ selectedItemH: 18 });
            this.setState({ dataH: "18" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "19") {
            this.setState({ selectedItemH: 19 });
            this.setState({ dataH: "19" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "20") {
            this.setState({ selectedItemH: 20 });
            this.setState({ dataH: "20" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "21") {
            this.setState({ selectedItemH: 21 });
            this.setState({ dataH: "21" });
          }

          if (this.state.DebutAutre1?.substring(0, 2) == "22") {
            this.setState({ selectedItemH: 22 });
            this.setState({ dataH: "22" });
          }
          if (this.state.DebutAutre1?.substring(0, 2) == "23") {
            this.setState({ selectedItemH: 23 });
            this.setState({ dataH: "23" });
          }

          this.setState({ dataH: this.state.DebutAutre1?.substring(0, 2) });
          this.setState({ dataM: this.state.DebutAutre1?.substring(3, 5) });
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 21:
        if (this.state.FinAutre1) {
          //**Minutes */
          if (this.state.FinAutre1?.substring(3, 5) == "30") {
            this.setState({ selectedItemM: 2 });
            this.setState({ dataM: "30" });
          }
          if (this.state.FinAutre1?.substring(3, 5) == "45") {
            this.setState({ selectedItemM: 3 });
            this.setState({ dataM: "45" });
          }
          if (this.state.FinAutre1?.substring(3, 5) == "15") {
            this.setState({ selectedItemM: 1 });
            this.setState({ dataM: "15" });
          }
          if (this.state.FinAutre1?.substring(3, 5) == "00") {
            this.setState({ selectedItemM: 0 });
            this.setState({ dataM: "00" });
          }

          //**Heures */
          if (this.state.FinAutre1?.substring(0, 2) == "00") {
            this.setState({ selectedItemH: 0 });
            this.setState({ dataH: "00" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "01") {
            this.setState({ selectedItemH: 1 });
            this.setState({ dataH: "01" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "02") {
            this.setState({ selectedItemH: 2 });
            this.setState({ dataH: "02" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "03") {
            this.setState({ selectedItemH: 3 });
            this.setState({ dataH: "03" });
          }

          if (this.state.FinAutre1?.substring(0, 2) == "04") {
            this.setState({ selectedItemH: 4 });
            this.setState({ dataH: "04" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "05") {
            this.setState({ selectedItemH: 5 });
            this.setState({ dataH: "05" });
          }

          if (this.state.FinAutre1?.substring(0, 2) == "06") {
            this.setState({ selectedItemH: 6 });
            this.setState({ dataH: "06" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "07") {
            this.setState({ selectedItemH: 7 });
            this.setState({ dataH: "07" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "08") {
            this.setState({ selectedItemH: 8 });
            this.setState({ dataH: "08" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "09") {
            this.setState({ selectedItemH: 9 });
            this.setState({ dataH: "09" });
          }

          if (this.state.FinAutre1?.substring(0, 2) == "10") {
            this.setState({ selectedItemH: 10 });
            this.setState({ dataH: "10" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "11") {
            this.setState({ selectedItemH: 11 });
            this.setState({ dataH: "11" });
          }

          if (this.state.FinAutre1?.substring(0, 2) == "12") {
            this.setState({ selectedItemH: 12 });
            this.setState({ dataH: "12" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "13") {
            this.setState({ selectedItemH: 13 });
            this.setState({ dataH: "13" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "14") {
            this.setState({ selectedItemH: 14 });
            this.setState({ dataH: "14" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "15") {
            this.setState({ selectedItemH: 15 });
            this.setState({ dataH: "15" });
          }

          if (this.state.FinAutre1?.substring(0, 2) == "16") {
            this.setState({ selectedItemH: 16 });
            this.setState({ dataH: "16" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "17") {
            this.setState({ selectedItemH: 17 });
            this.setState({ dataH: "17" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "18") {
            this.setState({ selectedItemH: 18 });
            this.setState({ dataH: "18" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "19") {
            this.setState({ selectedItemH: 19 });
            this.setState({ dataH: "19" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "20") {
            this.setState({ selectedItemH: 20 });
            this.setState({ dataH: "20" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "21") {
            this.setState({ selectedItemH: 21 });
            this.setState({ dataH: "21" });
          }

          if (this.state.FinAutre1?.substring(0, 2) == "22") {
            this.setState({ selectedItemH: 22 });
            this.setState({ dataH: "22" });
          }
          if (this.state.FinAutre1?.substring(0, 2) == "23") {
            this.setState({ selectedItemH: 23 });
            this.setState({ dataH: "23" });
          }

          this.setState({ dataH: this.state.FinAutre1?.substring(0, 2) });
          this.setState({ dataM: this.state.FinAutre1?.substring(3, 5) });
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 22:
        if (this.state.DebutAutre2) {
          //**Minutes */
          if (this.state.DebutAutre2?.substring(3, 5) == "30") {
            this.setState({ selectedItemM: 2 });
            this.setState({ dataM: "30" });
          }
          if (this.state.DebutAutre2?.substring(3, 5) == "45") {
            this.setState({ selectedItemM: 3 });
            this.setState({ dataM: "45" });
          }
          if (this.state.DebutAutre2?.substring(3, 5) == "15") {
            this.setState({ selectedItemM: 1 });
            this.setState({ dataM: "15" });
          }
          if (this.state.DebutAutre2?.substring(3, 5) == "00") {
            this.setState({ selectedItemM: 0 });
            this.setState({ dataM: "00" });
          }

          //**Heures */
          if (this.state.DebutAutre2?.substring(0, 2) == "00") {
            this.setState({ selectedItemH: 0 });
            this.setState({ dataH: "00" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "01") {
            this.setState({ selectedItemH: 1 });
            this.setState({ dataH: "01" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "02") {
            this.setState({ selectedItemH: 2 });
            this.setState({ dataH: "02" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "03") {
            this.setState({ selectedItemH: 3 });
            this.setState({ dataH: "03" });
          }

          if (this.state.DebutAutre2?.substring(0, 2) == "04") {
            this.setState({ selectedItemH: 4 });
            this.setState({ dataH: "04" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "05") {
            this.setState({ selectedItemH: 5 });
            this.setState({ dataH: "05" });
          }

          if (this.state.DebutAutre2?.substring(0, 2) == "06") {
            this.setState({ selectedItemH: 6 });
            this.setState({ dataH: "06" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "07") {
            this.setState({ selectedItemH: 7 });
            this.setState({ dataH: "07" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "08") {
            this.setState({ selectedItemH: 8 });
            this.setState({ dataH: "08" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "09") {
            this.setState({ selectedItemH: 9 });
            this.setState({ dataH: "09" });
          }

          if (this.state.DebutAutre2?.substring(0, 2) == "10") {
            this.setState({ selectedItemH: 10 });
            this.setState({ dataH: "10" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "11") {
            this.setState({ selectedItemH: 11 });
            this.setState({ dataH: "11" });
          }

          if (this.state.DebutAutre2?.substring(0, 2) == "12") {
            this.setState({ selectedItemH: 12 });
            this.setState({ dataH: "12" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "13") {
            this.setState({ selectedItemH: 13 });
            this.setState({ dataH: "13" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "14") {
            this.setState({ selectedItemH: 14 });
            this.setState({ dataH: "14" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "15") {
            this.setState({ selectedItemH: 15 });
            this.setState({ dataH: "15" });
          }

          if (this.state.DebutAutre2?.substring(0, 2) == "16") {
            this.setState({ selectedItemH: 16 });
            this.setState({ dataH: "16" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "17") {
            this.setState({ selectedItemH: 17 });
            this.setState({ dataH: "17" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "18") {
            this.setState({ selectedItemH: 18 });
            this.setState({ dataH: "18" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "19") {
            this.setState({ selectedItemH: 19 });
            this.setState({ dataH: "19" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "20") {
            this.setState({ selectedItemH: 20 });
            this.setState({ dataH: "20" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "21") {
            this.setState({ selectedItemH: 21 });
            this.setState({ dataH: "21" });
          }

          if (this.state.DebutAutre2?.substring(0, 2) == "22") {
            this.setState({ selectedItemH: 22 });
            this.setState({ dataH: "22" });
          }
          if (this.state.DebutAutre2?.substring(0, 2) == "23") {
            this.setState({ selectedItemH: 23 });
            this.setState({ dataH: "23" });
          }

          this.setState({ dataH: this.state.DebutAutre2?.substring(0, 2) });
          this.setState({ dataM: this.state.DebutAutre2?.substring(3, 5) });
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 23:
        if (this.state.FinAutre2) {
          //**Minutes */
          if (this.state.FinAutre2?.substring(3, 5) == "30") {
            this.setState({ selectedItemM: 2 });
            this.setState({ dataM: "30" });
          }
          if (this.state.FinAutre2?.substring(3, 5) == "45") {
            this.setState({ selectedItemM: 3 });
            this.setState({ dataM: "45" });
          }
          if (this.state.FinAutre2?.substring(3, 5) == "15") {
            this.setState({ selectedItemM: 1 });
            this.setState({ dataM: "15" });
          }
          if (this.state.FinAutre2?.substring(3, 5) == "00") {
            this.setState({ selectedItemM: 0 });
            this.setState({ dataM: "00" });
          }

          //**Heures */
          if (this.state.FinAutre2?.substring(0, 2) == "00") {
            this.setState({ selectedItemH: 0 });
            this.setState({ dataH: "00" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "01") {
            this.setState({ selectedItemH: 1 });
            this.setState({ dataH: "01" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "02") {
            this.setState({ selectedItemH: 2 });
            this.setState({ dataH: "02" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "03") {
            this.setState({ selectedItemH: 3 });
            this.setState({ dataH: "03" });
          }

          if (this.state.FinAutre2?.substring(0, 2) == "04") {
            this.setState({ selectedItemH: 4 });
            this.setState({ dataH: "04" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "05") {
            this.setState({ selectedItemH: 5 });
            this.setState({ dataH: "05" });
          }

          if (this.state.FinAutre2?.substring(0, 2) == "06") {
            this.setState({ selectedItemH: 6 });
            this.setState({ dataH: "06" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "07") {
            this.setState({ selectedItemH: 7 });
            this.setState({ dataH: "07" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "08") {
            this.setState({ selectedItemH: 8 });
            this.setState({ dataH: "08" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "09") {
            this.setState({ selectedItemH: 9 });
            this.setState({ dataH: "09" });
          }

          if (this.state.FinAutre2?.substring(0, 2) == "10") {
            this.setState({ selectedItemH: 10 });
            this.setState({ dataH: "10" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "11") {
            this.setState({ selectedItemH: 11 });
            this.setState({ dataH: "11" });
          }

          if (this.state.FinAutre2?.substring(0, 2) == "12") {
            this.setState({ selectedItemH: 12 });
            this.setState({ dataH: "12" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "13") {
            this.setState({ selectedItemH: 13 });
            this.setState({ dataH: "13" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "14") {
            this.setState({ selectedItemH: 14 });
            this.setState({ dataH: "14" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "15") {
            this.setState({ selectedItemH: 15 });
            this.setState({ dataH: "15" });
          }

          if (this.state.FinAutre2?.substring(0, 2) == "16") {
            this.setState({ selectedItemH: 16 });
            this.setState({ dataH: "16" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "17") {
            this.setState({ selectedItemH: 17 });
            this.setState({ dataH: "17" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "18") {
            this.setState({ selectedItemH: 18 });
            this.setState({ dataH: "18" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "19") {
            this.setState({ selectedItemH: 19 });
            this.setState({ dataH: "19" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "20") {
            this.setState({ selectedItemH: 20 });
            this.setState({ dataH: "20" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "21") {
            this.setState({ selectedItemH: 21 });
            this.setState({ dataH: "21" });
          }

          if (this.state.FinAutre2?.substring(0, 2) == "22") {
            this.setState({ selectedItemH: 22 });
            this.setState({ dataH: "22" });
          }
          if (this.state.FinAutre2?.substring(0, 2) == "23") {
            this.setState({ selectedItemH: 23 });
            this.setState({ dataH: "23" });
          }

          this.setState({ dataH: this.state.FinAutre2?.substring(0, 2) });
          this.setState({ dataM: this.state.FinAutre2?.substring(3, 5) });
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 200:
        if (this.state.BRH) {
          if (this.state.BRH?.length == 5) {
            //**Minutes */
            if (this.state.BRH?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.BRH?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.BRH?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.BRH?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.BRH?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.BRH?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.BRH?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.BRH?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.BRH?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.BRH?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.BRH?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.BRH?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.BRH?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.BRH?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.BRH?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.BRH?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.BRH?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.BRH?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.BRH?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.BRH?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.BRH?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.BRH?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.BRH?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.BRH?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.BRH?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.BRH?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.BRH?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.BRH?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.BRH?.substring(0, 2) });
            this.setState({ dataM: this.state.BRH?.substring(3, 5) });
          } else {
            if (this.state.BRH?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.BRH?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.BRH?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.BRH?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.BRH?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.BRH?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.BRH?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.BRH?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.BRH?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.BRH?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.BRH?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.BRH?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.BRH?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.BRH?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.BRH?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.BRH?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.BRH?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.BRH?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.BRH?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.BRH?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.BRH?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.BRH?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.BRH?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.BRH?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.BRH?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.BRH?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.BRH?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.BRH?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.BRH?.substring(0, 1) });
            this.setState({ dataM: this.state.BRH?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 300:
        // this.state.setTime = new Date(0, 0),
        // this.state.setTime.setMinutes(+this.state.pinceTri * 60),
        // this.state.setTime.toTimeString().slice(0, 5)
        if (this.state.pinceTri) {
          if (this.state.pinceTri?.length == 5) {
            //**Minutes */
            if (this.state.pinceTri?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.pinceTri?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.pinceTri?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.pinceTri?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.pinceTri?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.pinceTri?.substring(0, 2) });
            this.setState({ dataM: this.state.pinceTri?.substring(3, 5) });
          } else {
            if (this.state.pinceTri?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.pinceTri?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.pinceTri?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.pinceTri?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.pinceTri?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.pinceTri?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.pinceTri?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.pinceTri?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.pinceTri?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.pinceTri?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.pinceTri?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.pinceTri?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.pinceTri?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.pinceTri?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.pinceTri?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.pinceTri?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.pinceTri?.substring(0, 1) });
            this.setState({ dataM: this.state.pinceTri?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 400:
        if (this.state.crocBeton) {
          if (this.state.crocBeton?.length == 5) {
            //**Minutes */
            if (this.state.crocBeton?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.crocBeton?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.crocBeton?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.crocBeton?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.crocBeton?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.crocBeton?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.crocBeton?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.crocBeton?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.crocBeton?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.crocBeton?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.crocBeton?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.crocBeton?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.crocBeton?.substring(0, 2) });
            this.setState({ dataM: this.state.crocBeton?.substring(3, 5) });
          } else {
            if (this.state.crocBeton?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.crocBeton?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.crocBeton?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.crocBeton?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.crocBeton?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.crocBeton?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.crocBeton?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.crocBeton?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.crocBeton?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.crocBeton?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.crocBeton?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.crocBeton?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.crocBeton?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.crocBeton?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.crocBeton?.substring(0, 1) });
            this.setState({ dataM: this.state.crocBeton?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 500:
        if (this.state.Pince) {
          //**Minutes */
          if (this.state.Pince?.length == 5) {
            if (this.state.Pince?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.Pince?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.Pince?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.Pince?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.Pince?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.Pince?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.Pince?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.Pince?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.Pince?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.Pince?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.Pince?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.Pince?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.Pince?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.Pince?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.Pince?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.Pince?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.Pince?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.Pince?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.Pince?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.Pince?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.Pince?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.Pince?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.Pince?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.Pince?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.Pince?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.Pince?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.Pince?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.Pince?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.Pince?.substring(0, 2) });
            this.setState({ dataM: this.state.Pince?.substring(3, 5) });
          } else {
            if (this.state.Pince?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.Pince?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.Pince?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.Pince?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.Pince?.substring(0, 1) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.Pince?.substring(0, 1) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.Pince?.substring(0, 1) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.Pince?.substring(0, 1) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.Pince?.substring(0, 1) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.Pince?.substring(0, 1) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.Pince?.substring(0, 1) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.Pince?.substring(0, 1) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.Pince?.substring(0, 1) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.Pince?.substring(0, 1) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            this.setState({ dataH: this.state.Pince?.substring(0, 1) });
            this.setState({ dataM: this.state.Pince?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 600:
        if (this.state.remplissageCuve) {
          if (this.state.remplissageCuve?.length == 5) {
            //**Minutes */
            if (this.state.remplissageCuve?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.remplissageCuve?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.remplissageCuve?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.remplissageCuve?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.remplissageCuve?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.remplissageCuve?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.remplissageCuve?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.remplissageCuve?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.remplissageCuve?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.remplissageCuve?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.remplissageCuve?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.remplissageCuve?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({
              dataH: this.state.remplissageCuve?.substring(0, 2),
            });
            this.setState({
              dataM: this.state.remplissageCuve?.substring(3, 5),
            });
          } else {
            if (this.state.remplissageCuve?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.remplissageCuve?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.remplissageCuve?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.remplissageCuve?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.remplissageCuve?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.remplissageCuve?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.remplissageCuve?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.remplissageCuve?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.remplissageCuve?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.remplissageCuve?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.remplissageCuve?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.remplissageCuve?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.remplissageCuve?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.remplissageCuve?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({
              dataH: this.state.remplissageCuve?.substring(0, 1),
            });
            this.setState({
              dataM: this.state.remplissageCuve?.substring(2, 4),
            });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 700:
        if (this.state.HS) {
          if (this.state.HS?.length == 5) {
            //**Minutes */
            if (this.state.HS?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.HS?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.HS?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.HS?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.HS?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.HS?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.HS?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.HS?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.HS?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.HS?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.HS?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.HS?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.HS?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.HS?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.HS?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.HS?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.HS?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.HS?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.HS?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.HS?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.HS?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.HS?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.HS?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.HS?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.HS?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.HS?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.HS?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.HS?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.HS?.substring(0, 2) });
            this.setState({ dataM: this.state.HS?.substring(3, 5) });
          } else {
            if (this.state.HS?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.HS?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.HS?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.HS?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.HS?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.HS?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.HS?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.HS?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.HS?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.HS?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.HS?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.HS?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.HS?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.HS?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.HS?.substring(0, 1) });
            this.setState({ dataM: this.state.HS?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 201:
        if (this.state.BRH1) {
          if (this.state.BRH1?.length == 5) {
            //**Minutes */
            if (this.state.BRH1?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.BRH1?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.BRH1?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.BRH1?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.BRH1?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.BRH1?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.BRH1?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.BRH1?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.BRH1?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.BRH1?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.BRH1?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.BRH1?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.BRH1?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.BRH1?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.BRH1?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.BRH1?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.BRH1?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.BRH1?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.BRH1?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.BRH1?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.BRH1?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.BRH1?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.BRH1?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.BRH1?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.BRH1?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.BRH1?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.BRH1?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.BRH1?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.BRH1?.substring(0, 2) });
            this.setState({ dataM: this.state.BRH1?.substring(3, 5) });
          } else {
            if (this.state.BRH1?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.BRH1?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.BRH1?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.BRH1?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.BRH1?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.BRH1?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.BRH1?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.BRH1?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.BRH1?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.BRH1?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.BRH1?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.BRH1?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.BRH1?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.BRH1?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.BRH1?.substring(0, 1) });
            this.setState({ dataM: this.state.BRH1?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 301:
        if (this.state.pinceTri1) {
          if (this.state.pinceTri1?.length == 5) {
            //**Minutes */
            if (this.state.pinceTri1?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.pinceTri1?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.pinceTri1?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.pinceTri1?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.pinceTri1?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.pinceTri1?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.pinceTri1?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.pinceTri1?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.pinceTri1?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.pinceTri1?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.pinceTri1?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.pinceTri1?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.pinceTri1?.substring(0, 2) });
            this.setState({ dataM: this.state.pinceTri1?.substring(3, 5) });
          } else {
            if (this.state.pinceTri1?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.pinceTri1?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.pinceTri1?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.pinceTri1?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.pinceTri1?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.pinceTri1?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.pinceTri1?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.pinceTri1?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.pinceTri1?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.pinceTri1?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.pinceTri1?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.pinceTri1?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.pinceTri1?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.pinceTri1?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.pinceTri1?.substring(0, 1) });
            this.setState({ dataM: this.state.pinceTri1?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 401:
        if (this.state.crocBeton1) {
          if (this.state.crocBeton1?.length == 5) {
            //**Minutes */
            if (this.state.crocBeton1?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.crocBeton1?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.crocBeton1?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.crocBeton1?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.crocBeton1?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.crocBeton1?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.crocBeton1?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.crocBeton1?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.crocBeton1?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.FinAutre2?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.crocBeton1?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.crocBeton1?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.crocBeton1?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.crocBeton1?.substring(0, 2) });
            this.setState({ dataM: this.state.crocBeton1?.substring(3, 5) });
          } else {
            if (this.state.crocBeton1?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.crocBeton1?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.crocBeton1?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.crocBeton1?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.crocBeton1?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.crocBeton1?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.crocBeton1?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.crocBeton1?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.crocBeton1?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.crocBeton1?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.crocBeton1?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.crocBeton1?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.crocBeton1?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.crocBeton1?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.crocBeton1?.substring(0, 1) });
            this.setState({ dataM: this.state.crocBeton1?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 501:
        if (this.state.Pince1) {
          if (this.state.Pince1?.length == 5) {
            //**Minutes */
            if (this.state.Pince1?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.Pince1?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.Pince1?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.Pince1?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.Pince1?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.Pince1?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.Pince1?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.Pince1?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.Pince1?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.Pince1?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.Pince1?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.Pince1?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.Pince1?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.Pince1?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.Pince1?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.Pince1?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.Pince1?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.Pince1?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.Pince1?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.Pince1?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.Pince1?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.Pince1?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.Pince1?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.Pince1?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.Pince1?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.Pince1?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.Pince1?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.Pince1?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.Pince1?.substring(0, 2) });
            this.setState({ dataM: this.state.Pince1?.substring(3, 5) });
          } else {
            if (this.state.Pince1?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.Pince1?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.Pince1?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.Pince1?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.Pince1?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.Pince1?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.Pince1?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.Pince1?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.Pince1?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.Pince1?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.Pince1?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.Pince1?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.Pince1?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.Pince1?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.Pince1?.substring(0, 1) });
            this.setState({ dataM: this.state.Pince1?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 601:
        if (this.state.remplissageCuve1) {
          if (this.state.remplissageCuve1?.length == 5) {
            //**Minutes */
            if (this.state.remplissageCuve1?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.remplissageCuve1?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.remplissageCuve1?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.remplissageCuve1?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.remplissageCuve1?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.remplissageCuve1?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.FinAutre2?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.remplissageCuve1?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.remplissageCuve1?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.remplissageCuve1?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.remplissageCuve1?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.remplissageCuve1?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.remplissageCuve1?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({
              dataH: this.state.remplissageCuve1?.substring(0, 2),
            });
            this.setState({
              dataM: this.state.remplissageCuve1?.substring(3, 5),
            });
          } else {
            if (this.state.remplissageCuve1?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.remplissageCuve1?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.remplissageCuve1?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.remplissageCuve1?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.remplissageCuve1?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.remplissageCuve1?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.remplissageCuve1?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.remplissageCuve1?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.remplissageCuve1?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.remplissageCuve1?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.remplissageCuve1?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.remplissageCuve1?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.remplissageCuve1?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.remplissageCuve1?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({
              dataH: this.state.remplissageCuve1?.substring(0, 1),
            });
            this.setState({
              dataM: this.state.remplissageCuve1?.substring(2, 4),
            });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 701:
        if (this.state.HS1) {
          if (this.state.HS1?.length == 5) {
            //**Minutes */
            if (this.state.HS1?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.HS1?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.HS1?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.HS1?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.HS1?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.HS1?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.HS1?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.HS1?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.HS1?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.HS1?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.HS1?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.HS1?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.HS1?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.HS1?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.HS1?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.HS1?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.HS1?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.HS1?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.HS1?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.HS1?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.HS1?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.HS1?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.HS1?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.HS1?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.HS1?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.HS1?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.HS1?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.HS1?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.HS1?.substring(0, 2) });
            this.setState({ dataM: this.state.HS1?.substring(3, 5) });
          } else {
            if (this.state.HS1?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.HS1?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.HS1?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.HS1?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.HS1?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.HS1?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.HS1?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.HS1?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.HS1?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.HS1?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.HS1?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.HS1?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.HS1?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.HS1?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.HS1?.substring(0, 1) });
            this.setState({ dataM: this.state.HS1?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;

      case 202:
        if (this.state.BRH2) {
          if (this.state.BRH2?.length == 5) {
            //**Minutes */
            if (this.state.BRH2?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.BRH2?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.BRH2?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.BRH2?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.BRH2?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.BRH2?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.BRH2?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.BRH2?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.BRH2?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.BRH2?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.BRH2?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.BRH2?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.BRH2?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.BRH2?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.BRH2?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.BRH2?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.BRH2?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.BRH2?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.BRH2?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.BRH2?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.BRH2?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.BRH2?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.BRH2?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.BRH2?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.BRH2?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.BRH2?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.BRH2?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.BRH2?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.BRH2?.substring(0, 2) });
            this.setState({ dataM: this.state.BRH2?.substring(3, 5) });
          } else {
            if (this.state.BRH2?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.BRH2?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.BRH2?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.BRH2?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.BRH2?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.BRH2?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.BRH2?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.BRH2?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.BRH2?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.BRH2?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.BRH2?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.BRH2?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.BRH2?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.BRH2?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.BRH2?.substring(0, 1) });
            this.setState({ dataM: this.state.BRH2?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 302:
        if (this.state.pinceTri2) {
          if (this.state.pinceTri2?.length == 5) {
            //**Minutes */
            if (this.state.pinceTri2?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.pinceTri2?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.pinceTri2?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.pinceTri2?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.pinceTri2?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.pinceTri2?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.pinceTri2?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.pinceTri2?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.pinceTri2?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.pinceTri2?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.pinceTri2?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.pinceTri2?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.pinceTri2?.substring(0, 2) });
            this.setState({ dataM: this.state.pinceTri2?.substring(3, 5) });
          } else {
            if (this.state.pinceTri2?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.pinceTri2?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.pinceTri2?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.pinceTri2?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.pinceTri2?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.pinceTri2?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.pinceTri2?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.pinceTri2?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.pinceTri2?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.pinceTri2?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.pinceTri2?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.pinceTri2?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.pinceTri2?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.pinceTri2?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.pinceTri2?.substring(0, 1) });
            this.setState({ dataM: this.state.pinceTri2?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 402:
        if (this.state.crocBeton2) {
          if (this.state.crocBeton2?.length == 5) {
            //**Minutes */
            if (this.state.crocBeton2?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.crocBeton2?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.crocBeton2?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.crocBeton2?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.crocBeton2?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.crocBeton2?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.crocBeton2?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.crocBeton2?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.crocBeton2?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.crocBeton2?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.crocBeton2?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.crocBeton2?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.crocBeton2?.substring(0, 2) });
            this.setState({ dataM: this.state.crocBeton2?.substring(3, 5) });
          } else {
            if (this.state.crocBeton2?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.crocBeton2?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.crocBeton2?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.crocBeton2?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.crocBeton2?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.crocBeton2?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.crocBeton2?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.crocBeton2?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.crocBeton2?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.crocBeton2?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.crocBeton2?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.crocBeton2?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.crocBeton2?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.crocBeton2?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.crocBeton2?.substring(0, 1) });
            this.setState({ dataM: this.state.crocBeton2?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 502:
        if (this.state.Pince2) {
          if (this.state.Pince2?.length == 5) {
            //**Minutes */
            if (this.state.Pince2?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.Pince2?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.Pince2?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.Pince2?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.Pince2?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.Pince2?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.Pince2?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.Pince2?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.Pince2?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.Pince2?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.HSPince21?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.Pince2?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.Pince2?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.Pince2?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.Pince2?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.Pince2?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.Pince2?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.Pince2?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.Pince2?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.Pince2?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.Pince2?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.Pince2?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.Pince2?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.Pince2?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.Pince2?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.Pince2?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.Pince2?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.Pince2?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.Pince2?.substring(0, 2) });
            this.setState({ dataM: this.state.Pince2?.substring(3, 5) });
          } else {
            if (this.state.Pince2?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.Pince2?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.Pince2?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.Pince1?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.Pince2?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.Pince2?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.Pince2?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.Pince2?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.Pince2?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.Pince2?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.Pince2?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.Pince2?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.Pince2?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.Pince2?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.Pince2?.substring(0, 1) });
            this.setState({ dataM: this.state.Pince2?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 601:
        if (this.state.remplissageCuve2) {
          if (this.state.remplissageCuve2?.length == 5) {
            //**Minutes */
            if (this.state.remplissageCuve2?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.remplissageCuve2?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.remplissageCuve2?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.remplissageCuve2?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.remplissageCuve2?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.remplissageCuve2?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.remplissageCuve2?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.remplissageCuve2?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.remplissageCuve2?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.remplissageCuve2?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.remplissageCuve2?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.remplissageCuve2?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({
              dataH: this.state.remplissageCuve2?.substring(0, 2),
            });
            this.setState({
              dataM: this.state.remplissageCuve2?.substring(3, 5),
            });
          } else {
            if (this.state.remplissageCuve2?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.remplissageCuve2?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.remplissageCuve2?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.remplissageCuve2?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.remplissageCuve2?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.remplissageCuve2?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.remplissageCuve2?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.remplissageCuve2?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.remplissageCuve2?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.remplissageCuve2?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.remplissageCuve2?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.remplissageCuve2?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.remplissageCuve2?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.remplissageCuve2?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({
              dataH: this.state.remplissageCuve2?.substring(0, 1),
            });
            this.setState({
              dataM: this.state.remplissageCuve2?.substring(2, 4),
            });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      case 702:
        if (this.state.HS2) {
          if (this.state.HS2?.length == 5) {
            //**Minutes */
            if (this.state.HS2?.substring(3, 5) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.HS2?.substring(3, 5) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.HS2?.substring(3, 5) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.HS2?.substring(3, 5) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.HS2?.substring(0, 2) == "00") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.HS2?.substring(0, 2) == "01") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }
            if (this.state.HS2?.substring(0, 2) == "02") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.HS2?.substring(0, 2) == "03") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.HS2?.substring(0, 2) == "04") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.HS2?.substring(0, 2) == "05") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.HS2?.substring(0, 2) == "06") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.HS2?.substring(0, 2) == "07") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.HS2?.substring(0, 2) == "08") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.HS2?.substring(0, 2) == "09") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }

            if (this.state.HS2?.substring(0, 2) == "10") {
              this.setState({ selectedItemH: 10 });
              this.setState({ dataH: "10" });
            }
            if (this.state.HS2?.substring(0, 2) == "11") {
              this.setState({ selectedItemH: 11 });
              this.setState({ dataH: "11" });
            }

            if (this.state.HS2?.substring(0, 2) == "12") {
              this.setState({ selectedItemH: 12 });
              this.setState({ dataH: "12" });
            }
            if (this.state.HS2?.substring(0, 2) == "13") {
              this.setState({ selectedItemH: 13 });
              this.setState({ dataH: "13" });
            }
            if (this.state.HS2?.substring(0, 2) == "14") {
              this.setState({ selectedItemH: 14 });
              this.setState({ dataH: "14" });
            }
            if (this.state.HS2?.substring(0, 2) == "15") {
              this.setState({ selectedItemH: 15 });
              this.setState({ dataH: "15" });
            }

            if (this.state.HS2?.substring(0, 2) == "16") {
              this.setState({ selectedItemH: 16 });
              this.setState({ dataH: "16" });
            }
            if (this.state.HS2?.substring(0, 2) == "17") {
              this.setState({ selectedItemH: 17 });
              this.setState({ dataH: "17" });
            }
            if (this.state.HS2?.substring(0, 2) == "18") {
              this.setState({ selectedItemH: 18 });
              this.setState({ dataH: "18" });
            }
            if (this.state.HS2?.substring(0, 2) == "19") {
              this.setState({ selectedItemH: 19 });
              this.setState({ dataH: "19" });
            }
            if (this.state.HS2?.substring(0, 2) == "20") {
              this.setState({ selectedItemH: 20 });
              this.setState({ dataH: "20" });
            }
            if (this.state.HS2?.substring(0, 2) == "21") {
              this.setState({ selectedItemH: 21 });
              this.setState({ dataH: "21" });
            }

            if (this.state.HS2?.substring(0, 2) == "22") {
              this.setState({ selectedItemH: 22 });
              this.setState({ dataH: "22" });
            }
            if (this.state.HS2?.substring(0, 2) == "23") {
              this.setState({ selectedItemH: 23 });
              this.setState({ dataH: "23" });
            }

            this.setState({ dataH: this.state.HS2?.substring(0, 2) });
            this.setState({ dataM: this.state.HS2?.substring(3, 5) });
          } else {
            if (this.state.HS2?.substring(2, 4) == "30") {
              this.setState({ selectedItemM: 2 });
              this.setState({ dataM: "30" });
            }
            if (this.state.HS2?.substring(2, 4) == "45") {
              this.setState({ selectedItemM: 3 });
              this.setState({ dataM: "45" });
            }
            if (this.state.HS2?.substring(2, 4) == "15") {
              this.setState({ selectedItemM: 1 });
              this.setState({ dataM: "15" });
            }
            if (this.state.HS2?.substring(2, 4) == "00") {
              this.setState({ selectedItemM: 0 });
              this.setState({ dataM: "00" });
            }

            //**Heures */
            if (this.state.HS2?.substring(0, 1) == "0") {
              this.setState({ selectedItemH: 0 });
              this.setState({ dataH: "00" });
            }
            if (this.state.HS2?.substring(0, 1) == "1") {
              this.setState({ selectedItemH: 1 });
              this.setState({ dataH: "01" });
            }

            if (this.state.HS2?.substring(0, 1) == "2") {
              this.setState({ selectedItemH: 2 });
              this.setState({ dataH: "02" });
            }
            if (this.state.HS2?.substring(0, 1) == "3") {
              this.setState({ selectedItemH: 3 });
              this.setState({ dataH: "03" });
            }

            if (this.state.HS2?.substring(0, 1) == "4") {
              this.setState({ selectedItemH: 4 });
              this.setState({ dataH: "04" });
            }
            if (this.state.HS2?.substring(0, 1) == "5") {
              this.setState({ selectedItemH: 5 });
              this.setState({ dataH: "05" });
            }

            if (this.state.HS2?.substring(0, 1) == "6") {
              this.setState({ selectedItemH: 6 });
              this.setState({ dataH: "06" });
            }
            if (this.state.HS2?.substring(0, 1) == "7") {
              this.setState({ selectedItemH: 7 });
              this.setState({ dataH: "07" });
            }
            if (this.state.HS2?.substring(0, 1) == "8") {
              this.setState({ selectedItemH: 8 });
              this.setState({ dataH: "08" });
            }
            if (this.state.HS2?.substring(0, 1) == "9") {
              this.setState({ selectedItemH: 9 });
              this.setState({ dataH: "09" });
            }
            this.setState({ dataH: this.state.HS2?.substring(0, 1) });
            this.setState({ dataM: this.state.HS2?.substring(2, 4) });
          }
        } else {
          this.setState({ selectedItemM: 0 });
          this.setState({ dataM: "00" });

          this.setState({ selectedItemH: 1 });
          this.setState({ dataH: "01" });
        }
        break;
      default:
      // code block
    }
    //alert('.....'+this.state.selectedItemM)
  }

  onPlusPressed = () => {
    this.setState({ ShowAutre2: true });
    this.setState({ ShowPlus: false });
    this.setState({ ShowPlus1: true });
  };

  onPlusPressed1 = () => {
    this.setState({ ShowAutre3: true });
    this.setState({ ShowPlus1: false });
  };

  onCheckedPress = () => {
    this.setState({ checked: !this.state.checked });
    if (this.state.checked == true) {
      this.setState({ showInputDeplacement: false });
      this.setState({ Deplacement: "" });
    } else {
      this.setState({ showInputDeplacement: true });
      this.setState({ Deplacement: "1.00" });
    }
  };

  onCheckedPressForfait = () => {
    this.setState({ checkedforfait: !this.state.checkedforfait });
    if (this.state.checkedforfait == true) {
      this.setState({ forfait: "" });
      //alert(this.state.forfait)
    } else {
      this.setState({ forfait: 1 });
      // alert(this.state.forfait)
    }
    //alert(this.state.checkedforfait)
  };

  onCheckedPressForfait1 = () => {
    this.setState({ checkedforfait1: !this.state.checkedforfait1 });
    if (this.state.checkedforfait1 == true) {
      //this.setState({ showforfaitsaisi: false })
      this.setState({ forfait1: null });
    } else {
      //this.setState({ showforfaitsaisi: true })
      this.setState({ forfait1: 1 });
    }
  };

  // so hear this functiona is not in use
  onCheckedPressForfait2 = () => {
    this.setState({ checkedforfait2: !this.state.checkedforfait2 });
    if (this.state.checkedforfait2 == true) {
      //this.setState({ showforfaitsaisi: false })
      this.setState({ forfait2: null });
    } else {
      //this.setState({ showforfaitsaisi: true })
      this.setState({ forfait2: 1 });
    }
  };

  onCheckedPrisEnCharge = () => {
    this.setState({ checkedCharge: !this.state.checkedCharge });
    if (this.state.checkedCharge == true) {
      this.PrisEnChargeMission();
    } else {
      this.setState({ showInputDeplacement: true });
    }
  };

  async Immatriculation() {
    const valueLogin = await AsyncStorage.getItem("@Login");

    let dataToSend = {
      login: valueLogin,
      idmission: this.state.CurrentMission,
      immatriculation:
        this.state.immatriculation !== "" || this.state.immatriculation != ""
          ? this.state.immatriculation
          : NULL,
    };

    await AsyncStorage.setItem(
      dataToSend.idmission.toString(),
      JSON.stringify(dataToSend.immatriculation)
    );
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody?.join("&");
    fetch(`${global?.ApiUrl}GetLettrevoiture`, {
      method: "POST",
      body: formBody,
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((results) => results?.json())
      .then((data) => {
        let etat = this.state.MyMissions?.map((row) => {
          if (
            row?.Imma !== null ||
            row?.Imma != null ||
            row?.Imma != "" ||
            row?.Imma != NULL
          ) {
            //   this.setState({ immatriculation: items.Imma });
            Linking.openURL(
              `${global?.ApiUrl}list_action/generateLettre/0/${this.state.CurrentMission}`
            );
          } else {
            Alert.alert(
              "Entrer le numéro d'immatriculation"[
                {
                  text: "Ok",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                }
              ],
              { cancelable: false }
            );
          }
        });

        //alert('data.results' , data.results)
        //console.log('*****response : ');
        //alert(data.results);
      })
      .catch((e) => {});
  }

  PrisEnChargeMission = () => {
    (async () => {
      const valueLogin = await AsyncStorage.getItem("@Login");
      let dataToSend = {
        login: valueLogin,
        idmission: this.state.CurrentMission,
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      fetch(`${global?.ApiUrl}MissionPrisEnCharge`, {
        method: "POST",
        body: formBody,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results?.json();
        })
        .then((data) => {})
        .catch((e) => {
          (async () => {
            await AsyncStorage.setItem("@EtatMissionEnAttente", true);
            /* this.setState({ showButtonPrisEnCharge: false })
            this.setState({ showTextPrisEnCharge: true })*/
          })();
        });
      this.setState({ showButtonPrisEnCharge: false });
      this.setState({ showTextPrisEnCharge: true });
    })();
  };

  BON_NS_Mission = () => {
    (async () => {
      const valueLogin = await AsyncStorage.getItem("@Login");
      let dataToSend = {
        login: valueLogin,
        idmission: this.state.CurrentMission,
      };
      console.log("dataToSend-------",dataToSend);
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody?.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      const response = fetch(`${global?.ApiUrl}ValiderMissionNS`, {
        //fetch(`http://interloc.local/MyCurrentMission`, {
        method: "POST",
        body: formBody,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }).then(results => { 
        if (results?.ok) {
          return results
        } 
      }).then(data => {
        alert("Mission bien confirmé (chef absent)");
      }).catch(error => {

      });
        // .then((results) => {
        //   console.log('results------------', `results`)
        //   return results?.json();
        // })
        // .then((data) => {
        //   alert("Mission bien confirmé (chef absent)");
        // }).catch((Err) => console.log('Err', Err))
    })();
    this.setState({ modalVisible: false });
    this.props.navigation?.navigate("HomeScreen");
  };

  OnPrestationChange(value) {
    if (value == "1") {
      // this.setState({ showInputFinDebut: false })
      // this.setState({ showInputNombreTonnes: false, })
      // this.setState({ showInputNombreAttentes: false, })
    } else if (value == "2") {
    } else if (value == "3") {
    } else if (value == "4") {
    }

    this.setState({
      selectedPrestation: value,
    });
  }

  ////Mission pointage type
  onValueChangeType(value) {
    //alert(value)

    if (value == "1") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: false });
    } else if (value == "6") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: true });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: false });
    } else if (value == "4") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: true });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: false });
    }
    //Autres
    else if (value == "3") {
      this.setState({ showInputFinDebut: true });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: false });
    } else if (value == "7") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: true });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: false });
    } else if (value == "8") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: true });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: false });
    } else if (value == "9") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: true });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: false });
    } else if (value == "10") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: true });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: false });
    } else if (value == "11") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: true });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: false });
    } else if (value == "12") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: true });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: false });
    } else if (value == "13") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: true });
      this.setState({ showInputHS: false });
    } else if (value == "14") {
      this.setState({ showInputFinDebut: false });
      this.setState({ showInputNombreTonnes: false });
      this.setState({ showInputNombreAttentes: false });

      this.setState({ showInputPeage: false });
      this.setState({ showInputbrh: false });
      this.setState({ showInputpinceTri: false });
      this.setState({ showInputCrocBeton: false });
      this.setState({ showInputPince: false });
      this.setState({ showInputRemplissageCuve: false });
      this.setState({ showInputForfait: false });
      this.setState({ showInputHS: true });
    }

    this.setState({
      selectedtype: value,
    });
    // alert(value)
  }

  onValueChangeType1(value) {
    // alert(value)
    if (value == "1") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: false });
    } else if (value == "61") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: true });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: false });
    } else if (value == "41") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: true });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: false });
    } else if (value == "31") {
      this.setState({ showInputFinDebut1: true });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: false });
    } else if (value == "71") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: true });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: false });
    } else if (value == "81") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: true });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: false });
    } else if (value == "91") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: true });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: false });
    } else if (value == "101") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: true });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: false });
    } else if (value == "111") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: true });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: false });
    } else if (value == "121") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: true });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: false });
    } else if (value == "131") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: true });
      this.setState({ showInputHS1: false });
    } else if (value == "141") {
      this.setState({ showInputFinDebut1: false });
      this.setState({ showInputNombreTonnes1: false });
      this.setState({ showInputNombreAttentes1: false });

      this.setState({ showInputPeage1: false });
      this.setState({ showInputbrh1: false });
      this.setState({ showInputpinceTri1: false });
      this.setState({ showInputCrocBeton1: false });
      this.setState({ showInputPince1: false });
      this.setState({ showInputRemplissageCuve1: false });
      this.setState({ showInputForfait1: false });
      this.setState({ showInputHS1: true });
    }

    this.setState({
      selectedtype1: value,
    });
  }

  onValueChangeType2(value) {
    //alert(value)

    if (value == "1") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: false });
    } else if (value == "62") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: true });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: false });
    } else if (value == "42") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: true });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: false });
    } else if (value == "32") {
      this.setState({ showInputFinDebut2: true });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: false });
    } else if (value == "72") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: true });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: false });
    } else if (value == "82") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: true });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: false });
    } else if (value == "92") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: true });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: false });
    } else if (value == "102") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: true });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: false });
    } else if (value == "112") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: true });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: false });
    } else if (value == "122") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: true });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: false });
    } else if (value == "132") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: true });
      this.setState({ showInputHS2: false });
    } else if (value == "142") {
      this.setState({ showInputFinDebut2: false });
      this.setState({ showInputNombreTonnes2: false });
      this.setState({ showInputNombreAttentes2: false });

      this.setState({ showInputPeage2: false });
      this.setState({ showInputbrh2: false });
      this.setState({ showInputpinceTri2: false });
      this.setState({ showInputCrocBeton2: false });
      this.setState({ showInputPince2: false });
      this.setState({ showInputRemplissageCuve2: false });
      this.setState({ showInputForfait2: false });
      this.setState({ showInputHS2: true });
    }

    this.setState({
      selectedtype2: value,
    });
  }

  onValueChange2(value) {
    this.setState({
      selected2: value,
    });
  }

  OnPrisEnCharge = () => {
    (async () => {
      let dataToSend = { idmission: this.state.CurrentMission };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      //alert(formBody)
      fetch(`${global?.ApiUrl}GetCurrentMissionEtat`, {
        //fetch(`http://interloc.local/MyCurrentMission`, {
        method: "POST",
        body: formBody,
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results?.json();
        })
        .then((data) => {
          let etat = data?.results?.map((row) => {
            if (row.EtatMission == 1) {
              this.setState({ showButtonPrisEnCharge: true });
            } else {
              this.setState({ showButtonPrisEnCharge: false });
            }
          });
        })
        .catch((e) => {
          (async () => {
            const ListEtateMissions = await AsyncStorage.getItem(
              "@AllMissionsEtat:key"
            );
            if (ListEtateMissions !== null) {
              let etat = JSON.parse(ListEtateMissions)?.map((row) => {
                if (row?.id == this.state.CurrentMission) {
                  //alert(row.EtatMission);
                  if (row.EtatMission == 1) {
                    this.setState({ showButtonPrisEnCharge: true });
                  } else {
                    this.setState({ showButtonPrisEnCharge: false });
                  }
                }
              });
            }
          })();
          //alert('offline')
        });
    })();
  };

  createSeverWeather = () => {
    Alert.alert(
      "Confirmation intempéries",
      "Voulez vous vraiment terminer la mission avec motif intempéries? Si vous avez effectué des heures, n’utilisez pas la fonction intempéries",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => this.onConfirmCreateSeverWeatherPressed(),
        },
      ],
      { cancelable: false }
    );
  };
  onConfirmCreateSeverWeatherPressed = () => {
    (async () => {
      this.setState({ showLoading: true });
      let dataToSend = { idmission: this.state.CurrentMission, intemperie: 1 };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody?.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      //alert(formBody)
      fetch(`${global?.ApiUrl}ValiderMissionNS`, {
        method: "POST",
        body: formBody,
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results?.json();
        })
        .then((data) => {
          this.setState({ showLoading: false });
          alert("Mission terminée - motif : intempérie");
          this.props.navigation?.navigate("HomeScreen");
        })
        .catch((e) => {
          this.setState({ showLoading: false });
        });
    })();
  };

  onHorlogePressed = () => {
    (async () => {
      let dataToSend = { idmission: this.state.CurrentMission };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody?.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      //alert(formBody)
      fetch(`${global?.ApiUrl}GetCurrentMissionEtat`, {
        //fetch(`http://interloc.local/MyCurrentMission`, {
        method: "POST",
        body: formBody,
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results?.json();
        })
        .then((data) => {
          let etat = data?.results?.map((row) => {
            if (row?.EtatMission == 1 || row?.EtatMission == 2) {
              this.setState({ horlogeParam: true });

              if (this.state.MyPointages?.length > 0) {
                this.state.MyPointages?.map((items) => {
                  if (items?.mtype == "Matin") {
                    this.setState({
                      MatinDebut: items?.debut?.date?.substring(11, 16),
                    });
                    this.setState({
                      MatinFin: items?.fin?.date?.substring(11, 16),
                    });
                    this.setState({ idMatin: items?.IdPoinatge });
                  }
                  if (items?.mtype == "Après-midi") {
                    this.setState({
                      ApresMidiDebut: items?.debut?.date?.substring(11, 16),
                    });
                    this.setState({
                      ApresMidiFin: items?.fin?.date?.substring(11, 16),
                    });
                    this.setState({ idAM: items?.IdPoinatge });
                  }
                  if (items?.mtype == "Déplacement") {
                    this.setState({ Deplacement: items?.nbExe });
                    this.setState({ checked: true });
                    this.setState({ showInputDeplacement: true });
                    this.setState({ IdDep: items?.IdPoinatge });
                  }

                  if (items?.mtype == "Autres") {
                    this.setState({
                      DebutAutre: items?.debut?.date?.substring(11, 16),
                    });
                    this.setState({
                      FinAutre: items?.fin?.date?.substring(11, 16),
                    });
                    this.setState({ idAutre: items?.IdPoinatge });
                  }
                  if (items?.mtype == "Attente") {
                    this.setState({ nombreAttentes: items?.nbExe });
                    this.setState({ idAttente: items?.IdPoinatge });
                  }
                  if (items?.mtype == "Tonne") {
                    this.setState({ nombreTonnes: items?.nbExe });
                    this.setState({ idTonne: items?.IdPoinatge });
                  }

                  if (items?.mtype == "Péage") {
                    this.setState({ peage: items?.nbExe });
                    this.setState({ idPeage: items?.IdPoinatge });
                  }

                  if (items?.mtype == "BRH") {
                    this.setState({ BRH: items?.nbExe });
                    this.setState({ idBRH: items?.IdPoinatge });
                  }

                  if (items?.mtype == "Pince de tri") {
                    this.setState({ pinceTri: items?.nbExe });
                    this.setState({ idpinceTri: items?.IdPoinatge });
                  }

                  if (items.mtype == "Croc Béton") {
                    this.setState({ crocBeton: items?.nbExe });
                    this.setState({ idcrocBeton: items?.IdPoinatge });
                  }

                  if (items?.mtype == "Pince") {
                    this.setState({ Pince: items?.nbExe });
                    this.setState({ idPince: items?.IdPoinatge });
                  }

                  if (items?.mtype == "Remplissage de cuve") {
                    this.setState({ remplissageCuve: items?.nbExe });
                    this.setState({ idremplissageCuve: items?.IdPoinatge });
                  }

                  if (items?.mtype == "Forfait réalisé") {
                    this.setState({ forfait: items?.nbExe });
                    this.setState({ checkedforfait: true });
                    this.setState({ idForfait: items?.IdPoinatge });
                  }

                  if (items?.mtype == "Heures supplémentaires") {
                    this.setState({ HS: items?.nbExe });
                    this.setState({ idHS: items?.IdPoinatge });
                  }
                });
                this.setState({ DejaPointed: 1 });
              }
            } else {
              alert(
                "Vous pouvez pointer que vos missions En Attente et Pris En Charge."
              );
            }
          });
        })

        .catch((e) => {
          (async () => {
            //alert('offline')
            const GetEtat = await AsyncStorage.getItem("@AllMissionsEtat:key");
            const ListPointages = await AsyncStorage.getItem(
              "@AllPointage:key"
            );
            var result = [];
            if (ListPointages !== null) {
              let pointage = JSON.parse(ListPointages)?.map((row) => {
                if (row?.idmission == this.state.CurrentMission) {
                  result?.push(row);
                  this.setState({ MyPointages: result });
                  if (row?.MissionEtat == 1 || row?.MissionEtat == 2) {
                    this.setState({ horlogeParam: true });
                    //console.log(this.state.MyPointage)
                    if (this.state.MyPointages?.length > 0) {
                      this.state.MyPointages?.map((items) => {
                        if (items?.mtype == "Matin") {
                          this.setState({
                            MatinDebut: items?.debut?.date?.substring(11, 16),
                          });
                          this.setState({
                            MatinFin: items?.fin?.date?.substring(11, 16),
                          });
                          this.setState({ idMatin: items?.IdPoinatge });
                        }
                        if (items?.mtype == "Après-midi") {
                          this.setState({
                            ApresMidiDebut: items?.debut?.date?.substring(
                              11,
                              16
                            ),
                          });
                          this.setState({
                            ApresMidiFin: items?.fin?.date?.substring(11, 16),
                          });
                          this.setState({ idAM: items?.IdPoinatge });
                        }
                        if (items?.mtype == "Déplacement") {
                          this.setState({ Deplacement: items?.nbExe });
                          this.setState({ checked: true });
                          this.setState({ showInputDeplacement: true });
                          this.setState({ IdDep: items?.IdPoinatge });
                        }

                        if (items?.mtype == "Autres") {
                          this.setState({
                            DebutAutre: items?.debut?.date?.substring(11, 16),
                          });
                          this.setState({
                            FinAutre: items?.fin?.date?.substring(11, 16),
                          });
                          this.setState({ idAutre: items?.IdPoinatge });
                        }
                        if (items?.mtype == "Attente") {
                          this.setState({ nombreAttentes: items?.nbExe });
                          this.setState({ idAttente: items?.IdPoinatge });
                        }
                        if (items?.mtype == "Tonne") {
                          this.setState({ nombreTonnes: items?.nbExe });
                          this.setState({ idTonne: items?.IdPoinatge });
                        }

                        if (items?.mtype == "Péage") {
                          this.setState({ peage: items?.nbExe });
                          this.setState({ idPeage: items?.IdPoinatge });
                        }

                        if (items?.mtype == "BRH") {
                          this.setState({ BRH: items?.nbExe });
                          this.setState({ idBRH: items?.IdPoinatge });
                        }

                        if (items?.mtype == "Pince de tri") {
                          this.setState({ pinceTri: items?.nbExe });
                          this.setState({ idpinceTri: items?.IdPoinatge });
                        }

                        if (items?.mtype == "Croc Béton") {
                          this.setState({ crocBeton: items?.nbExe });
                          this.setState({ idcrocBeton: items?.IdPoinatge });
                        }

                        if (items?.mtype == "Pince") {
                          this.setState({ Pince: items?.nbExe });
                          this.setState({ idPince: items?.IdPoinatge });
                        }

                        if (items?.mtype == "Remplissage de cuve") {
                          this.setState({ remplissageCuve: items?.nbExe });
                          this.setState({
                            idremplissageCuve: items?.IdPoinatge,
                          });
                        }

                        if (items?.mtype == "Forfait réalisé") {
                          this.setState({ forfait: items?.nbExe });
                          this.setState({ checkedforfait: true });
                          this.setState({ idForfait: items?.IdPoinatge });
                        }

                        if (items?.mtype == "Heures supplémentaires") {
                          this.setState({ HS: items?.nbExe });
                          this.setState({ idHS: items?.IdPoinatge });
                        }
                      });
                      this.setState({ DejaPointed: 1 });
                    }
                  }
                }
              });
            }
          })();
          //alert('offline')
        });
    })();
  };

  SaveSignature = () => {
    if (this.state.MyPointages.length > 0) {
      this.setState({ modalVisible: true });
    } else {
      //this.setState({ horlogeParam: true });
      alert("Veuillez effectuer votre poinatges avant la validation, merci.");
    }
  };

  GoToValidateMission = () => {
    this.props.navigation?.navigate("ValidateMission");
  };

  GetMyMissions() {
    (async () => {
      this.setState({ isMissionLoading: true });
      const valueLogin = await AsyncStorage.getItem("@Login");
      //console.log(valueLogin);
      let dataToSend = {
        login: valueLogin,
        idmission: this.state.CurrentMission,
      };
      //console.log(dataToSend);
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody?.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      //alert(formBody)
      fetch(`${global?.ApiUrl}MyCurrentMission`, {
        //fetch(`http://interloc.local/MyCurrentMission`, {
        method: "POST",
        body: formBody,
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results?.json();
        })
        .then(async (data) => {
          if (
            !data?.results[0]?.ChefChantier &&
            !data?.results[0]?.ChefChantierFN
          ) {
            //Dispacher
            //DispacherPhone
            var msg =
              "la mission n'a pas de chef - contactez votre dispatcheur";
            if (data?.results[0]?.Dispacher) {
              msg =
                "la mission n'a pas de chef - contactez votre dispatcheur " +
                data?.results[0]?.Dispacher;
              if (data?.results[0]?.DispacherPhone) {
                msg =
                  "la mission n'a pas de chef - contactez votre dispatcheur " +
                  data?.results[0]?.Dispacher +
                  " au " +
                  data?.results[0]?.DispacherPhone;
              }
            }
            alert(msg);
          }
          if (data?.results[0]?.id) {
            const getImmat = await AsyncStorage.getItem(data?.results[0]?.id);
          }
          this.setState({ MyMissions: data?.results });
          if (data?.results[0]?.Imma != null) {
            this.setState({ immatriculation: JSON.parse(getImmat) });
          }
          // else{
          //   this.setState({ immatriculation: NULL });
          // }
        })
        .catch((e) => {
          (async () => {
            //alert('offline')
            const ListAllMissions = await AsyncStorage.getItem(
              "@AllMyMissions:key"
            );
            var result = [];
            if (ListAllMissions !== null) {
              let Numero = JSON.parse(ListAllMissions)?.map((row) => {
                if (row?.id == this.state.CurrentMission) {
                  result?.push(row);
                  this.setState({ MyMissions: result });
                  /* console.log(JSON.parse(ListAllMissions))
                   console.log(row.id)
                   console.log(this.state.CurrentMission)*/
                }
              });
              if (result?.[0]?.id) {
                const getImmat = await AsyncStorage.getItem(result?.[0]?.id);
                this.setState({ immatriculation: JSON.parse(getImmat) ?? "" });
              }
            }
          })();
          //alert('offline')
        })
        .finally(() => {
          this.setState({ isMissionLoading: false });
        });
    })();
  }

  GetMyPointages() {
    (async () => {
      const valueLogin = await AsyncStorage.getItem("@Login");
      let dataToSend = { idmission: this.state.CurrentMission };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      //alert(formBody)
      fetch(`${global?.ApiUrl}GetPointageCurrentMission`, {
        method: "POST",
        body: formBody,
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results?.json();
        })
        .then((data) => {
          ////console.log(data.results);
          this.setState({ MyPointages: data?.results });
        })
        .catch((e) => {
          (async () => {
            //alert('offline')
            const ListPointages = await AsyncStorage.getItem(
              "@AllPointage:key"
            );
            var result = [];
            if (ListPointages !== null) {
              let pointage = JSON.parse(ListPointages)?.map((row) => {
                if (row?.idmission == this.state.CurrentMission) {
                  result?.push(row);
                  this.setState({ MyPointages: result });
                  /* console.log(JSON.parse(ListAllMissions))
                   console.log(row.id)
                   console.log(this.state.CurrentMission)*/
                }
              });
            }
          })();
          //alert('offline')
        });
    })();
  }

  SavePointages() {
    (async () => {
      const valueLogin = await AsyncStorage.getItem("@Login");

      this.setState({
        ButtonStateHolder: true,
      });
      let dataToSend = {
        login: valueLogin,
        idmission: this.state.CurrentMission,

        MatinDebut: this.state.MatinDebut,
        MatinFin: this.state.MatinFin,
        ApresMidiDebut: this.state.ApresMidiDebut,
        ApresMidiFin: this.state.ApresMidiFin,
        Deplacement: this.state.Deplacement,

        AutreType: this.state.selectedtype,
        nombreAttentes: this.state.nombreAttentes,
        nombreTonnes: this.state.nombreTonnes,
        DebutAutre: this.state.DebutAutre,
        FinAutre: this.state.FinAutre,

        AutreType1: this.state.selectedtype1,
        nombreAttentes1: this.state.nombreAttentes1,
        nombreTonnes1: this.state.nombreTonnes1,
        DebutAutre1: this.state.DebutAutre1,
        FinAutre1: this.state.FinAutre1,

        AutreType2: this.state.selectedtype2,
        nombreAttentes2: this.state.nombreAttentes2,
        nombreTonnes2: this.state.nombreTonnes2,
        DebutAutre2: this.state.DebutAutre2,
        FinAutre2: this.state.FinAutre2,

        DejaPointed: this.state.DejaPointed,

        idMatin: this.state.idMatin,
        idAM: this.state.idAM,
        iddep: this.state.IdDep,

        idAutre: this.state.idAutre,
        idAttente: this.state.idAttente,
        idTonne: this.state.idTonne,

        idPeage: this.state.idPeage,
        idBRH: this.state.idBRH,
        idpinceTri: this.state.idpinceTri,
        idcrocBeton: this.state.idcrocBeton,
        idPince: this.state.idPince,
        idremplissageCuve: this.state.idremplissageCuve,
        idForfait: this.state.idForfait,
        idHS: this.state.idHS,

        peage: this.state.peage,
        BRH: this.state.BRH,
        pinceTri: this.state.pinceTri,
        crocBeton: this.state.crocBeton,
        Pince: this.state.Pince,
        remplissageCuve: this.state.remplissageCuve,
        forfait: this.state.forfait,
        HS: this.state.HS,

        peage1: this.state.peage1,
        BRH1: this.state.BRH1,
        pinceTri1: this.state.pinceTri1,
        crocBeton1: this.state.crocBeton1,
        Pince1: this.state.Pince1,
        remplissageCuve1: this.state.remplissageCuve1,
        forfait1: this.state.forfait1,
        HS1: this.state.HS1,

        peage2: this.state.peage2,
        BRH2: this.state.BRH2,
        pinceTri2: this.state.pinceTri2,
        crocBeton2: this.state.crocBeton2,
        Pince2: this.state.Pince2,
        remplissageCuve2: this.state.remplissageCuve2,
        forfait2: this.state.forfait2,
        HS2: this.state.HS2,
        GetTabSaisi: this.state.GetTabSaisi,
        GetTabSaisiForfait: this.state.GetTabSaisiForfait,
      };

      //console.log(dataToSend);
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody?.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      //alert(formBody)
      this.setState({ showLoading: true });
      fetch(`${global?.ApiUrl}AddPointages`, {
        //fetch(`http://interloc.local/AddPointages`, {
        method: "POST",
        body: formBody,
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results?.json();
        })
        .then((data) => {
          this.setState({ showLoading: false });
          alert("Votre pointage a bien été enregistré");
          this.GetMyPointages();
          ////console.log('Votre pointage a été est bien paramétré');
          this.setState({
            ButtonStateHolder: false,
          });
        });
      this.setState({ horlogeParam: false });

      // this.setState({ FinAutre: this.state.FinAutre, DebutAutre:  this.state.DebutAutre, MatinDebut: this.state.MatinDebut,
      // MatinFin: this.state.MatinFin, ApresMidiDebut:  this.state.ApresMidiDebut, ApresMidiFin:  this.state.ApresMidiFin,
      // Deplacement:  this.state.Deplacement, nombre:  this.state.nombre, })
      //this.GetPointageToState();
    })();

    //this.GetMyPointages();
  }

  GetMyPrestations() {
    (async () => {
      const valueLogin = await AsyncStorage.getItem("@Login");
      let dataToSend = { idmission: this.state.CurrentMission };
      // //console.log(this.state.CurrentMission );
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody?.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}GetPrestations`, {
        //fetch(`http://interloc.local/MyCurrentMission`, {
        method: "POST",
        body: formBody,
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results?.json();
        })
        .then((data) => {
          ////console.log(data.results);
          this.setState({ MyPrestations: data?.results });

          //console.log(this.state.MyPrestations);

          let prestations = data?.results?.map((row) => {
            //console.log(row.pointage);
            if (row?.pointage == 1) {
              this.setState({ ShowViewMatin: true });
              this.setState({ showViewTypeOnAutre: true });
              this.setState({ showViewNombreAttentesOnAutre: false });
              this.setState({ saveMateriel: row?.materiel });
            }
            if (row?.pointage == 3 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsAutre" });
            }
            if (row?.pointage == 4 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsAttente" });
            }
            if (row?.pointage == 6 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsTonne" });
            }
            if (row?.pointage == 1 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsMatin" });
            }
            if (row?.pointage == 2 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsAM" });
            }
            if (row?.pointage == 5 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsDep" });
            }
            if (row?.pointage == 7 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsPeage" });
            }
            if (row?.pointage == 8 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsBRH" });
            }
            if (row?.pointage == 9 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsPinceTri" });
            }
            if (row?.pointage == 10 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsCroc" });
            }
            if (row?.pointage == 11 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsPince" });
            }
            if (row?.pointage == 12 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsRC" });
            }
            if (row?.pointage == 13 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsForfait" });
            }
            if (row?.pointage == 14 && row?.tabSaisi == "Principal") {
              this.setState({ GetTabSaisi: "IsHS" });
            }
            if (row?.pointage == 13 && row?.tabSaisi == "Autres") {
              this.setState({ GetTabSaisiForfait: "IsForfaitAutre" });
              //this.setState({ forfait: 1 });
            }

            if (row?.tabSaisi == "Autres" && row?.materiel == 1) {
              this.setState({ ShowViewMatin: true });
              this.setState({ showViewTypeOnAutre: true });
              this.setState({ showViewNombreAttentesOnAutre: false });
              this.setState({ saveMateriel: row?.materiel });
              // this.setState({ GetTabSaisi: 'Autres' });
            }

            if (
              (row?.tabSaisi == "Autres" && row?.materiel == 11) ||
              row?.materiel == 9 ||
              row?.materiel == 10 ||
              row?.materiel == 12 ||
              row?.materiel == 13 ||
              row?.materiel == 14 ||
              row?.materiel == 15 ||
              row?.materiel == 16
            ) {
              this.setState({ showViewTypeOnAutre: true });
              this.setState({ saveMateriel: row?.materiel });
              // this.setState({ GetTabSaisi: 'Autres' });
            }

            if (row?.pointage == 2) {
              this.setState({ ShowViewAM: true });
              this.setState({ showViewTypeOnAutre: true });
              this.setState({ showViewNombreAttentesOnAutre: false });
              this.setState({ saveMateriel: row?.materiel });
              //this.setState({ GetTabSaisi: 'Principal' });
            }

            if (row?.pointage == 5) {
              this.setState({ ShowViewDeplacement: true });
              this.setState({ showViewTypeOnAutre: true });
              this.setState({ showViewNombreAttentesOnAutre: false });
              this.setState({ saveMateriel: row?.materiel });
              // this.setState({ GetTabSaisi: 'Principal' });
            }

            if (
              row?.pointage == 4 &&
              row?.tabSaisi == "Autres" &&
              row?.materiel == 4
            ) {
              this.setState({ showViewNombreAttentesOnAutre: true });
              this.setState({ showViewTypeOnAutre: false });
              // this.setState({ GetTabSaisi: 'Autres' });
            }

            if (
              row?.pointage == 4 &&
              row?.tabSaisi == "Autres" &&
              row?.materiel == 1
            ) {
              this.setState({ showViewNombreAttentesOnAutre: false });
              this.setState({ showViewTypeOnAutre: true });
              //this.setState({ GetTabSaisi: 'Autres' });
            }

            if (row?.pointage == 4 && row?.tabSaisi == "Principal") {
              this.setState({ showViewNombreAttentesOnPrincipal: true });
              this.setState({ showViewTypeOnAutre: false });
              this.setState({ nombreTonnes: null });
              //this.setState({ GetTabSaisi: 'Principal' });
            }

            if (row?.pointage == 6 && row?.tabSaisi == "Principal") {
              this.setState({ showViewTonnesOnPrincipal: true });
              //this.setState({ GetTabSaisi: 'Principal' });
            }

            if (
              row?.pointage == 3 &&
              row?.tabSaisi == "Autres" &&
              row?.materiel == 7
            ) {
              this.setState({ showViewAutresOnPrincipal: false });
              // this.setState({ GetTabSaisi: 'Autres' });
              //this.setState({ showViewAutresOnAutre: true });
            }

            if (row?.pointage == 3 && row?.tabSaisi == "Principal") {
              this.setState({ showViewAutresOnAutre: true });
              //this.setState({ GetTabSaisi: 'Principal' });
            }

            if (row?.pointage == 13 && row?.tabSaisi == "Principal") {
              this.setState({ showViewForfaitOnAutre: true });
              this.setState({ showViewForfaitOnPrincipal: false });
              //this.setState({ GetTabSaisi: 'Principal' });
            }

            if (row?.pointage == 13 && row?.tabSaisi == "Autres") {
              this.setState({ showViewForfaitOnAutre: false });
              this.setState({ showViewForfaitOnPrincipal: true });
            }
            if (
              row?.pointage == 4 &&
              row?.tabSaisi == "Autres" &&
              row?.materiel != 8
            ) {
              this.setState({ showViewNombreAttentesOnAutre: false });
            }
          });

          this.GetPointagesType();
        })
        .catch((e) => {
          // alert('offline')
          (async () => {
            const ListPrestations = await AsyncStorage.getItem(
              "@AllPrestations:key"
            );
            if (ListPrestations !== null) {
              var result = [];
              let prestations = JSON?.parse(ListPrestations)?.map((row) => {
                if (row?.idmission == this.state.CurrentMission) {
                  result?.push(row);
                  this.setState({ MyPrestations: result });
                  if (row?.pointage == 1) {
                    this.setState({ ShowViewMatin: true });
                    this.setState({ showViewTypeOnAutre: true });
                    this.setState({ showViewNombreAttentesOnAutre: false });
                    this.setState({ saveMateriel: row?.materiel });
                  }
                  if (row?.pointage == 3 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsAutre" });
                  }
                  if (row?.pointage == 4 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsAttente" });
                  }
                  if (row?.pointage == 6 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsTonne" });
                  }
                  if (row?.pointage == 1 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsMatin" });
                  }
                  if (row?.pointage == 2 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsAM" });
                  }
                  if (row?.pointage == 5 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsDep" });
                  }
                  if (row?.pointage == 7 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsPeage" });
                  }
                  if (row?.pointage == 8 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsBRH" });
                  }
                  if (row?.pointage == 9 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsPinceTri" });
                  }
                  if (row?.pointage == 10 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsCroc" });
                  }
                  if (row?.pointage == 11 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsPince" });
                  }
                  if (row?.pointage == 12 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsRC" });
                  }
                  if (row?.pointage == 13 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsForfait" });
                  }
                  if (row?.pointage == 14 && row?.tabSaisi == "Principal") {
                    this.setState({ GetTabSaisi: "IsHS" });
                  }
                  if (row?.pointage == 13 && row?.tabSaisi == "Autres") {
                    this.setState({ GetTabSaisiForfait: "IsForfaitAutre" });
                    //this.setState({ forfait: 1 });
                  }

                  if (row?.tabSaisi == "Autres" && row?.materiel == 1) {
                    this.setState({ ShowViewMatin: true });
                    this.setState({ showViewTypeOnAutre: true });
                    this.setState({ showViewNombreAttentesOnAutre: false });
                    this.setState({ saveMateriel: row.materiel });
                    // this.setState({ GetTabSaisi: 'Autres' });
                  }

                  if (
                    (row?.tabSaisi == "Autres" && row?.materiel == 11) ||
                    row?.materiel == 9 ||
                    row?.materiel == 10 ||
                    row?.materiel == 12 ||
                    row?.materiel == 13 ||
                    row?.materiel == 14 ||
                    row?.materiel == 15 ||
                    row?.materiel == 16
                  ) {
                    this.setState({ showViewTypeOnAutre: true });
                    this.setState({ saveMateriel: row.materiel });
                    // this.setState({ GetTabSaisi: 'Autres' });
                  }

                  if (row?.pointage == 2) {
                    this.setState({ ShowViewAM: true });
                    this.setState({ showViewTypeOnAutre: true });
                    this.setState({ showViewNombreAttentesOnAutre: false });
                    this.setState({ saveMateriel: row.materiel });
                    //this.setState({ GetTabSaisi: 'Principal' });
                  }

                  if (row?.pointage == 5) {
                    this.setState({ ShowViewDeplacement: true });
                    this.setState({ showViewTypeOnAutre: true });
                    this.setState({ showViewNombreAttentesOnAutre: false });
                    this.setState({ saveMateriel: row.materiel });
                    // this.setState({ GetTabSaisi: 'Principal' });
                  }

                  if (
                    row?.pointage == 4 &&
                    row?.tabSaisi == "Autres" &&
                    row?.materiel == 4
                  ) {
                    this.setState({ showViewNombreAttentesOnAutre: true });
                    this.setState({ showViewTypeOnAutre: false });
                    // this.setState({ GetTabSaisi: 'Autres' });
                  }

                  if (
                    row?.pointage == 4 &&
                    row?.tabSaisi == "Autres" &&
                    row?.materiel == 1
                  ) {
                    this.setState({ showViewNombreAttentesOnAutre: false });
                    this.setState({ showViewTypeOnAutre: true });
                    //this.setState({ GetTabSaisi: 'Autres' });
                  }

                  if (row?.pointage == 4 && row?.tabSaisi == "Principal") {
                    this.setState({ showViewNombreAttentesOnPrincipal: true });
                    this.setState({ showViewTypeOnAutre: false });
                    this.setState({ nombreTonnes: null });
                    //this.setState({ GetTabSaisi: 'Principal' });
                  }

                  if (row?.pointage == 6 && row?.tabSaisi == "Principal") {
                    this.setState({ showViewTonnesOnPrincipal: true });
                    //this.setState({ GetTabSaisi: 'Principal' });
                  }

                  if (
                    row?.pointage == 3 &&
                    row?.tabSaisi == "Autres" &&
                    row?.materiel == 7
                  ) {
                    this.setState({ showViewAutresOnPrincipal: false });
                    // this.setState({ GetTabSaisi: 'Autres' });
                    //this.setState({ showViewAutresOnAutre: true });
                  }

                  if (row?.pointage == 3 && row?.tabSaisi == "Principal") {
                    this.setState({ showViewAutresOnAutre: true });
                    //this.setState({ GetTabSaisi: 'Principal' });
                  }

                  if (row?.pointage == 13 && row?.tabSaisi == "Principal") {
                    this.setState({ showViewForfaitOnAutre: true });
                    this.setState({ showViewForfaitOnPrincipal: false });
                    //this.setState({ GetTabSaisi: 'Principal' });
                  }

                  if (row?.pointage == 13 && row?.tabSaisi == "Autres") {
                    this.setState({ showViewForfaitOnAutre: false });
                    this.setState({ showViewForfaitOnPrincipal: true });
                  }

                  if (
                    row?.pointage == 4 &&
                    row?.tabSaisi == "Autres" &&
                    row?.materiel != 8
                  ) {
                    this.setState({ showViewNombreAttentesOnAutre: false });
                    // this.setState({ GetTabSaisi: row.tabSaisi });
                  }
                }
              });
            }
          })();
          //alert('offline')
        });
    })();
  }

  GetPointagesType() {
    (async () => {
      const valueLogin = await AsyncStorage.getItem("@Login");
      let dataToSend = { login: valueLogin };
      // //console.log(this.state.CurrentMission );
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody?.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}GetPointagesType`, {
        method: "POST",
        body: formBody,
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results?.json();
        })
        .then((data) => {
          var NewMyPointagesType = [];
          for (let index = 0; index < data?.results?.length; index++) {
            const element = data?.results[index];
            if (
              element?.tabSaisi === "Autres" &&
              element?.Materiel === this.state.saveMateriel
            ) {
              NewMyPointagesType?.push(element);
            }
          }
          //console.log(NewMyPointagesType);
          this.setState({ MyPointagesType: NewMyPointagesType });
        })
        .catch((e) => {
          // alert('offline')
          (async () => {
            const ListPointagesType = await AsyncStorage.getItem(
              "@PoinatgesType:key"
            );
            if (ListPointagesType !== null) {
              this.setState({ MyPointagesType: JSON.parse(ListPointagesType) });
            }
          })();
          //alert('offline')
        });
    })();
  }

  GetPointagesType() {
    (async () => {
      const valueLogin = await AsyncStorage.getItem("@Login");
      let dataToSend = { login: valueLogin };
      // //console.log(this.state.CurrentMission );
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody?.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody?.join("&");
      //alert(formBody)
      fetch(`${global.ApiUrl}GetPointagesType`, {
        method: "POST",
        body: formBody,
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((results) => {
          return results?.json();
        })
        .then((data) => {
          var NewMyPointagesType = [];
          for (let index = 0; index < data?.results?.length; index++) {
            const element = data?.results[index];
            if (
              element?.tabSaisi === "Autres" &&
              element?.Materiel === this.state.saveMateriel
            ) {
              NewMyPointagesType?.push(element);
            }
          }
          this.setState({ MyPointagesType: NewMyPointagesType });
        })
        .catch((e) => {
          (async () => {
            const ListPointagesType = await AsyncStorage.getItem(
              "@PoinatgesType:key"
            );
            if (ListPointagesType !== null) {
              // this.setState({ MyPointagesType: result });
              let data = JSON.parse(ListPointagesType);
              var NewMyPointagesType = [];
              for (let index = 0; index < data?.results?.length; index++) {
                const element = data?.results[index];
                if (
                  element?.tabSaisi === "Autres" &&
                  element?.Materiel === this.state.saveMateriel
                ) {
                  NewMyPointagesType?.push(element);
                }
              }
              this.setState({ MyPointagesType: NewMyPointagesType });
            }
          })();
          //alert('offline')
        });
    })();
  }

  componentDidMount() {
    this.GetMyMissions();
    this.GetMyPointages();
    this.OnPrisEnCharge();
    this.GetMyPrestations();
    this.PrisEnChargeMission();
    (async () => {
      const EtatMissionEnAttente = await AsyncStorage.getItem(
        "@EtatMissionEnAttente"
      );
      //console.log(EtatMissionEnAttente);
      if (EtatMissionEnAttente == true) {
        this.PrisEnChargeMission();
        await AsyncStorage.setItem("@EtatMissionEnAttente", false);
      }
    })();
  }

  handleCustomIndexSelect = (index) => {
    //handle tab selection for custom Tab Selection SegmentedControlTab
    this.setState((prevState) => ({ ...prevState, customStyleIndex: index }));
  };

  render() {
    const { selectedIndex, selectedIndices, customStyleIndex } = this.state;
    const { time } = this.state;
    const { selectedHours, selectedMinutes } = this.state;

    const DismissKeyboard = ({ children }) => (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    );

    return (
      <Container>
        <Loader loading={this.state.isMissionLoading} />
        {/* <DismissKeyboardView> */}
          {/* <ScrollView nestedScrollEnabled contentContainerStyle={{ paddingBottom: 50  }}> */}
            <ModeText />

            <Dialog
              visible={this.state.signer}
              footer={
                <DialogFooter>
                  <DialogButton
                    text="Annulé"
                    onPress={() => {
                      this.setState({ signer: false });
                    }}
                  />
                  <DialogButton
                    text="Ok"
                    //onPress={this.changedatePicker}
                  />
                </DialogFooter>
              }
              dialogAnimation={
                new SlideAnimation({
                  slideFrom: "bottom",
                })
              }
              onTouchOutside={() => {
                this.setState({ signer: false });
              }}
              onHardwareBackPress={() => {
                this.setState({ signer: false });
              }}
              dialogStyle={styles.dialogContainer}
            >
              <DialogContent>
                <View style={styles.centeredRow}></View>
              </DialogContent>
            </Dialog>

            <Spinner
              visible={this.state.showLoading}
              textContent={"Veuillez patienter..."}
              textStyle={styles.spinnerTextStyle}
            />

            <Dialog
              visible={this.state.show}
              footer={
                <DialogFooter>
                  <DialogButton text="Annuler" onPress={this.OnPickerCancel} />
                  <DialogButton text="Ok" onPress={this.changedatePicker} />
                </DialogFooter>
              }
              dialogAnimation={
                new SlideAnimation({
                  slideFrom: "bottom",
                })
              }
              onTouchOutside={() => {
                this.setState({ show: false });
              }}
              onHardwareBackPress={() => {
                this.setState({ show: false });
              }}
            >
              <DialogContent>
                <View style={styles.centeredRow}>
                  <ScrollPicker
                    ref={(sp) => {
                      this.sp = sp;
                    }}
                    dataSource={this.state.DataHours}
                    selectedIndex={this.state.selectedItemH}
                    wrapperHeight={180}
                    // wrapperWidth={'100%'}
                    // wrapperBackground={'#fff'}
                    itemHeight={50}
                    highlightColor={"#003489"}
                    highlightBorderWidth={16}
                    activeItemTextStyle={{ color: "#B5B9F0" }}
                    renderItem={(data, index, isSelected) => {
                      return (
                        <View>
                          <Text
                            style={
                              isSelected
                                ? [styles.itemText, styles.itemTextSelected]
                                : styles.itemText
                            }
                          >
                            {data}
                          </Text>
                        </View>
                      );
                    }}
                    onValueChange={(data, selectedIndex) => {
                      //
                      this.setState({
                        dataH: data,
                        selectedItemH: selectedIndex,
                      });
                    }}
                  />
                  <Text>:</Text>
                  <ScrollPicker
                    // style={{ backgroundColor: 'red' }}
                    ref={(sp) => {
                      this.sp = sp;
                    }}
                    dataSource={this.state.DataMinutes}
                    selectedIndex={this.state.selectedItemM}
                    wrapperHeight={180}
                    //wrapperWidth={'100%'}
                    // wrapperBackground={'#fff'}
                    itemHeight={50}
                    highlightColor={"#003489"}
                    highlightBorderWidth={16}
                    itemTextStyle={{ color: "#ff1a0a" }}
                    renderItem={(data, index, isSelected) => {
                      return (
                        <View>
                          <Text
                            style={
                              isSelected
                                ? [styles.itemText, styles.itemTextSelected]
                                : styles.itemText
                            }
                          >
                            {data}
                          </Text>
                        </View>
                      );
                    }}
                    onValueChange={(data, selectedIndex) => {
                      //
                      this.setState({
                        dataM: data,
                        selectedItemM: selectedIndex,
                      });
                    }}
                  />
                </View>
              </DialogContent>
            </Dialog>

            <Dialog
              visible={this.state.horlogeParam}
              dialogAnimation={
                new SlideAnimation({
                  slideFrom: "bottom",
                })
              }
              onTouchOutside={() => {
                this.setState({ horlogeParam: false });
              }}
              onHardwareBackPress={() => {
                this.setState({ horlogeParam: false });
              }}
              dialogStyle={{
                width: "90%",
                borderRadius: 20,
                elevation: 20,
                position: "absolute",
              }}
            >
              <DialogContent>
                <SafeAreaView>
                  <ScrollView nestedScrollEnabled>
                    <View style={styles.centeredRow2}>
                      <Text style={styles.centeredRow2Lable}>Pointages</Text>
                    </View>
                    <View>
                      <SegmentedControlTab
                        values={["Principal", "Autres"]}
                        selectedIndex={customStyleIndex}
                        onTabPress={this.handleCustomIndexSelect}
                        borderRadius={0}
                        tabsContainerStyle={{
                          height: 40,
                          backgroundColor: "#F2F2F2",
                        }}
                        tabStyle={{
                          backgroundColor: "#F2F2F2",
                          borderWidth: 0,
                          borderColor: "transparent",
                        }}
                        activeTabStyle={{
                          backgroundColor: "white",
                          marginTop: 1,
                        }}
                        tabTextStyle={{ color: "#444444", fontWeight: "bold" }}
                        activeTabTextStyle={{ color: "#888888" }}
                      />
                      {customStyleIndex === 0 && (
                        <View style={styles.tabContent}>
                          <ScrollView>
                            <View>
                              {this.state.MyMissions.map((items, i) => {
                                return (
                                  <View style={styles.centeredRow3} key={i}>
                                    <Text style={styles.text}>
                                      MISSION : {items?.NumMission}
                                    </Text>

                                    <Text style={{ textAlign: "center" }}>
                                      {items?.nomChantier} {items?.NumChantier}
                                    </Text>

                                    <View>
                                      <Text>
                                        DATE :{" "}
                                        {items?.datePlanification != null
                                          ? items?.datePlanification?.date?.substring(
                                              0,
                                              10
                                            )
                                          : "--"}
                                      </Text>
                                    </View>
                                  </View>
                                );
                              })}

                              {this.state.ShowViewMatin ? (
                                <View>
                                  <View style={styles.showView1}>
                                    <View style={{ flex: 1 }}>
                                      <Text>Matin</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                      <Text>Début</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                      {/* <Button mode="contained" style={styles.ButtonBackground} onPress={() => { this.setState({ show: !this.state.show }); }}>
                            {ths.state.MatinDebut}
                          </Button> */}

                                      <Text
                                        style={{
                                          backgroundColor: "#eee",
                                          padding: 10,
                                        }}
                                        onPress={() => this.selectTimer(1)}
                                      >
                                        {this.state.MatinDebut}
                                      </Text>
                                      <Text style={{ fontSize: 10 }}>
                                        Horaire début
                                      </Text>

                                      {/* 
                          <TextInput style={{ height: '6%', }}
                            onChangeText={(MatinDebut) => this.setState({ MatinDebut })}
                            value={this.state.MatinDebut}
                          /> */}
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: "row",
                                      marginBottom: 5,
                                    }}
                                  >
                                    <View style={{ flex: 1 }}></View>

                                    <View style={{ flex: 1 }}>
                                      <Text>Fin</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                      <Text
                                        style={{
                                          backgroundColor: "#eee",
                                          padding: 10,
                                        }}
                                        onPress={() => this.selectTimer(2)}
                                      >
                                        {this.state.MatinFin}
                                      </Text>
                                      <Text style={{ fontSize: 10 }}>
                                        Horaire fin
                                      </Text>

                                      {/* 
                          <TextInput style={{ height: '6%', }}
                            onChangeText={(MatinDebut) => this.setState({ MatinDebut })}
                            value={this.state.MatinDebut}
                          /> */}
                                    </View>
                                  </View>
                                </View>
                              ) : null}

                              {this.state.ShowViewAM ? (
                                <View>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: "row",
                                      marginBottom: 5,
                                    }}
                                  >
                                    <View style={{ flex: 1 }}>
                                      <Text>Aprés-midi</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                      <Text>Début</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                      <Text
                                        style={{
                                          backgroundColor: "#eee",
                                          padding: 10,
                                        }}
                                        onPress={() => this.selectTimer(3)}
                                      >
                                        {this.state.ApresMidiDebut}
                                      </Text>
                                      <Text style={{ fontSize: 10 }}>
                                        Horaire début
                                      </Text>

                                      {/* 
                          <TextInput style={{ height: '6%', }}
                            onChangeText={(MatinDebut) => this.setState({ MatinDebut })}
                            value={this.state.MatinDebut}
                          /> */}
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: "row",
                                      marginBottom: 5,
                                    }}
                                  >
                                    <View style={{ flex: 1 }}></View>

                                    <View style={{ flex: 1 }}>
                                      <Text>Fin</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                      <Text
                                        style={{
                                          backgroundColor: "#eee",
                                          padding: 10,
                                        }}
                                        onPress={() => this.selectTimer(4)}
                                      >
                                        {this.state.ApresMidiFin}
                                      </Text>
                                      <Text style={{ fontSize: 10 }}>
                                        Horaire fin
                                      </Text>

                                      {/* 
                          <TextInput style={{ height: '6%', }}
                            onChangeText={(MatinDebut) => this.setState({ MatinDebut })}
                            value={this.state.MatinDebut}
                          /> */}
                                    </View>
                                  </View>
                                </View>
                              ) : null}

                              {this.state.ShowViewDeplacement ? (
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    marginBottom: 5,
                                  }}
                                >
                                  <View style={{ flex: 3 }}>
                                    <Text>Deplacement</Text>
                                  </View>

                                  <View style={{ flex: 1 }}>
                                    <CheckBox
                                      checked={this.state.checked}
                                      onPress={() => this.onCheckedPress()}
                                    />
                                  </View>

                                  <View style={{ flex: 2 }}>
                                    {this.state.showInputDeplacement ? (
                                      <View>
                                        <Text
                                          style={{ backgroundColor: "#eee" }}
                                          onPress={() => this.selectTimer(7)}
                                        >
                                          {this.state.Deplacement}
                                        </Text>
                                        <Text style={{ fontSize: 10 }}>
                                          Nombre d'heure
                                        </Text>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showViewNombreAttentesOnPrincipal ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginBottom: "2%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>
                                      Attentes
                                    </Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <Text
                                      style={{
                                        backgroundColor: "#eee",
                                        marginTop: "20%",
                                      }}
                                      onPress={() => this.selectTimer(8)}
                                    >
                                      {this.state.nombreAttentes}
                                    </Text>
                                    <Text style={{ fontSize: 10 }}>
                                      Nombre d'heure
                                    </Text>
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showViewTonnesOnPrincipal ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginTop: "10%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>
                                      Tonnes
                                    </Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <TextInput
                                      style={{ height: "6%" }}
                                      onChangeText={(nombreTonnes) =>
                                        this.setState({ nombreTonnes })
                                      }
                                      value={this.state.nombreTonnes}
                                      keyboardType={"numeric"}
                                    />
                                    <Text style={{ fontSize: 10 }}>
                                      Nombre tonne
                                    </Text>
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showViewAutresOnAutre ? (
                                <View>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View style={styles.topmation}>
                                      <Text style={styles.textHorloge}>
                                        Début
                                      </Text>
                                    </View>
                                    <View style={styles.topmationInputAttente}>
                                      <Text
                                        style={{
                                          backgroundColor: "#eee",
                                          padding: 10,
                                        }}
                                        onPress={() => this.selectTimer(5)}
                                      >
                                        {this.state.DebutAutre}
                                      </Text>
                                      <Text style={{ fontSize: 10 }}>
                                        Horaire début
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View style={styles.topmation}>
                                      <Text style={styles.textHorloge}>
                                        Fin
                                      </Text>
                                    </View>
                                    <View style={styles.topmationInputAttente}>
                                      <Text
                                        style={{
                                          backgroundColor: "#eee",
                                          padding: 10,
                                        }}
                                        onPress={() => this.selectTimer(6)}
                                      >
                                        {this.state.FinAutre}
                                      </Text>
                                      <Text style={{ fontSize: 10 }}>
                                        Horaire fin
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showViewForfaitOnAutre ? (
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    marginBottom: 5,
                                    marginTop: 15,
                                  }}
                                >
                                  <View style={{ flex: 3 }}>
                                    <Text>Forfait Réalisé</Text>
                                    <Text style={{ fontSize: 10 }}>
                                      Cocher si c'est un forfait
                                    </Text>
                                  </View>

                                  <View style={{ flex: 1 }}>
                                    <CheckBox
                                      checked={this.state.checkedforfait}
                                      onPress={() =>
                                        this.onCheckedPressForfait()
                                      }
                                    />
                                  </View>
                                </View>
                              ) : null}

                              <Button
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignSelf: "center",
                                  backgroundColor: "#6C8784",
                                  borderRadius: 8,
                                  width: "100%",
                                }}
                                disabled={this.state.ButtonStateHolder}
                                onPress={() => {
                                  if (
                                    this.state.MatinDebut !== null &&
                                    this.state.MatinFin == null
                                  ) {
                                    alert("rempli Matin fin");
                                  } else if (
                                    this.state.MatinDebut == null &&
                                    this.state.MatinFin !== null
                                  ) {
                                    alert("rempli Matin debut");
                                  } else if (
                                    this.state.ApresMidiDebut == null &&
                                    this.state.ApresMidiFin !== null
                                  ) {
                                    alert("rempli le champs aprés midi debut");
                                  } else if (
                                    this.state.ApresMidiDebut !== null &&
                                    this.state.ApresMidiFin == null
                                  ) {
                                    alert("rempli le champs aprés midi fin");
                                  } else if (
                                    this.state.DebutAutre == null &&
                                    this.state.FinAutre !== null
                                  ) {
                                    alert("rempli le champs debut autre");
                                  } else if (
                                    this.state.DebutAutre !== null &&
                                    this.state.FinAutre == null
                                  ) {
                                    alert("rempli le champs fin autre");
                                  } else {
                                    this.SavePointages();
                                  }
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#ffffff",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Enregistrer
                                </Text>
                              </Button>
                            </View>
                          </ScrollView>
                        </View>
                      )}
                      {customStyleIndex === 1 && (
                        <View style={styles.tabContent}>
                          {this.state.showViewTypeOnAutre ? (
                            <View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: "5%",
                                  marginLeft: "50%",
                                }}
                              >
                                <View tyle={styles.topmationfd}>
                                  <SelectPicker
                                    selectedValue={this.state.selectedtype}
                                    style={{ height: 50, width: 150 }}
                                    onValueChange={this.onValueChangeType.bind(
                                      this
                                    )}
                                  >
                                    <SelectPicker.Item
                                      label="➕"
                                      value="1"
                                      enabled={true}
                                    />
                                    {this.state.MyPointagesType.map(
                                      (items, i) => {
                                        if (items.type != "Forfait réalisé") {
                                          return (
                                            <SelectPicker.Item
                                              label={items.type}
                                              value={items.Pointage}
                                              key={i}
                                            />
                                          );
                                        }
                                      }
                                    )}
                                  </SelectPicker>
                                </View>
                              </View>

                              {this.state.showInputFinDebut ? (
                                <View>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View style={styles.topmation}>
                                      <Text style={styles.textHorloge}>
                                        Début
                                      </Text>
                                    </View>
                                    <View style={styles.topmationInputAttente}>
                                      <Text
                                        style={{
                                          backgroundColor: "#eee",
                                          padding: 10,
                                        }}
                                        onPress={() => this.selectTimer(5)}
                                      >
                                        {this.state.DebutAutre}
                                      </Text>
                                      <Text style={{ fontSize: 10 }}>
                                        Horaire début
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View style={styles.topmation}>
                                      <Text style={styles.textHorloge}>
                                        Fin
                                      </Text>
                                    </View>
                                    <View style={styles.topmationInputAttente}>
                                      <Text
                                        style={{
                                          backgroundColor: "#eee",
                                          padding: 10,
                                        }}
                                        onPress={() => this.selectTimer(6)}
                                      >
                                        {this.state.FinAutre}
                                      </Text>
                                      <Text style={{ fontSize: 10 }}>
                                        Horaire fin
                                      </Text>
                                      {this.state.ShowPlus ? (
                                        <View
                                          style={{
                                            flexDirection: "row",
                                            marginTop: "10%",
                                          }}
                                        >
                                          <View tyle={styles.topmationfd}>
                                            <SelectPicker
                                              selectedValue={
                                                this.state.selectedtype1
                                              }
                                              style={{ height: 50, width: 150 }}
                                              onValueChange={this.onValueChangeType1.bind(
                                                this
                                              )}
                                            >
                                              <SelectPicker.Item
                                                label="➕ "
                                                value="1"
                                                enabled={true}
                                              />
                                              {this.state.MyPointagesType.map(
                                                (items, i) => {
                                                  if (
                                                    items.type !=
                                                    "Forfait réalisé"
                                                  ) {
                                                    return (
                                                      <SelectPicker.Item
                                                        label={items.type}
                                                        value={
                                                          items.Pointage + "1"
                                                        }
                                                        key={i}
                                                      />
                                                    );
                                                  }
                                                }
                                              )}
                                            </SelectPicker>
                                          </View>
                                        </View>
                                      ) : null}
                                    </View>
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showInputNombreTonnes ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginTop: "10%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>
                                      Tonnes
                                    </Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <TextInput
                                      style={{ height: "6%" }}
                                      onChangeText={(nombreTonnes) =>
                                        this.setState({ nombreTonnes })
                                      }
                                      value={this.state.nombreTonnes}
                                      keyboardType={"numeric"}
                                    />
                                    <Text style={{ fontSize: 10 }}>
                                      Nombre tonnes
                                    </Text>

                                    {this.state.ShowPlus ? (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          marginTop: "10%",
                                        }}
                                      >
                                        <View tyle={styles.topmationfd}>
                                          <SelectPicker
                                            selectedValue={
                                              this.state.selectedtype1
                                            }
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={this.onValueChangeType1.bind(
                                              this
                                            )}
                                          >
                                            <SelectPicker.Item
                                              label="➕ "
                                              value="1"
                                              enabled={true}
                                            />
                                            {this.state.MyPointagesType.map(
                                              (items, i) => {
                                                if (
                                                  items.type !=
                                                  "Forfait réalisé"
                                                ) {
                                                  return (
                                                    <SelectPicker.Item
                                                      label={items.type}
                                                      value={
                                                        items.Pointage + "1"
                                                      }
                                                      key={i}
                                                    />
                                                  );
                                                }
                                              }
                                            )}
                                          </SelectPicker>
                                        </View>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showInputNombreAttentes ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginTop: "10%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>
                                      Heures d'attente
                                    </Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <Text
                                      style={{
                                        backgroundColor: "#eee",
                                        marginTop: "20%",
                                      }}
                                      onPress={() => this.selectTimer(8)}
                                    >
                                      {this.state.nombreAttentes}
                                    </Text>
                                    <Text style={{ fontSize: 10 }}>
                                      Nombre d'heure
                                    </Text>
                                    {this.state.ShowPlus ? (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          marginTop: "10%",
                                        }}
                                      >
                                        <View tyle={styles.topmationfd}>
                                          <SelectPicker
                                            selectedValue={
                                              this.state.selectedtype1
                                            }
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={this.onValueChangeType1.bind(
                                              this
                                            )}
                                          >
                                            <SelectPicker.Item
                                              label="➕ "
                                              value="1"
                                              enabled={true}
                                            />
                                            {this.state.MyPointagesType.map(
                                              (items, i) => {
                                                if (
                                                  items.type !=
                                                  "Forfait réalisé"
                                                ) {
                                                  return (
                                                    <SelectPicker.Item
                                                      label={items.type}
                                                      value={
                                                        items.Pointage + "1"
                                                      }
                                                      key={i}
                                                    />
                                                  );
                                                }
                                              }
                                            )}
                                          </SelectPicker>
                                        </View>
                                      </View>
                                    ) : null}
                                    {/* {this.state.ShowPlus ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                          <TouchableOpacity onPress={() => this.onPlusPressed()}>

                            <Image
                              style={styles.plus}
                              source={require('../assets/plus.png')}
                            />

                          </TouchableOpacity>

                        </View>
                      ) : null} */}
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showInputPeage ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginTop: "10%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>
                                      Péage
                                    </Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <TextInput
                                      style={{ height: "6%" }}
                                      onChangeText={(peage) =>
                                        this.setState({ peage })
                                      }
                                      value={this.state.peage}
                                      keyboardType={"numeric"}
                                    />
                                    <Text style={{ fontSize: 10 }}>
                                      Montant
                                    </Text>
                                    <Text style={{ fontSize: 7 }}>
                                      Si vous connaissez pas la montant , merci
                                      de saisir 0.00
                                    </Text>
                                    {this.state.ShowPlus ? (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          marginTop: "10%",
                                        }}
                                      >
                                        <View tyle={styles.topmationfd}>
                                          <SelectPicker
                                            selectedValue={
                                              this.state.selectedtype1
                                            }
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={this.onValueChangeType1.bind(
                                              this
                                            )}
                                          >
                                            <SelectPicker.Item
                                              label="➕ "
                                              value="1"
                                              enabled={true}
                                            />
                                            {this.state.MyPointagesType.map(
                                              (items, i) => {
                                                if (
                                                  items.type !=
                                                  "Forfait réalisé"
                                                ) {
                                                  return (
                                                    <SelectPicker.Item
                                                      label={items.type}
                                                      value={
                                                        items.Pointage + "1"
                                                      }
                                                      key={i}
                                                    />
                                                  );
                                                }
                                              }
                                            )}
                                          </SelectPicker>
                                        </View>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showInputForfait ? (
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    marginBottom: 5,
                                    marginTop: 15,
                                  }}
                                >
                                  <View style={{ flex: 3 }}>
                                    <Text>Forfait Réalisé</Text>
                                    <Text style={{ fontSize: 10 }}>
                                      Cocher si c'est un forfait
                                    </Text>
                                  </View>

                                  <View style={{ flex: 1 }}>
                                    <CheckBox
                                      checked={this.state.checkedforfait}
                                      onPress={() =>
                                        this.onCheckedPressForfait()
                                      }
                                    />
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showInputbrh ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginTop: "10%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>BRH</Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <Text
                                      style={{
                                        backgroundColor: "#eee",
                                        marginTop: "20%",
                                      }}
                                      onPress={() => this.selectTimer(200)}
                                    >
                                      {this.state.BRH}
                                    </Text>
                                    <Text style={{ fontSize: 10 }}>
                                      Nombre d'heure
                                    </Text>
                                    {this.state.ShowPlus ? (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          marginTop: "10%",
                                        }}
                                      >
                                        <View tyle={styles.topmationfd}>
                                          <SelectPicker
                                            selectedValue={
                                              this.state.selectedtype1
                                            }
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={this.onValueChangeType1.bind(
                                              this
                                            )}
                                          >
                                            <SelectPicker.Item
                                              label="➕ "
                                              value="1"
                                              enabled={true}
                                            />
                                            {this.state.MyPointagesType.map(
                                              (items, i) => {
                                                if (
                                                  items.type !=
                                                  "Forfait réalisé"
                                                ) {
                                                  return (
                                                    <SelectPicker.Item
                                                      label={items.type}
                                                      value={
                                                        items.Pointage + "1"
                                                      }
                                                      key={i}
                                                    />
                                                  );
                                                }
                                              }
                                            )}
                                          </SelectPicker>
                                        </View>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showInputpinceTri ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginTop: "10%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>
                                      Pince de tri
                                    </Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <Text
                                      style={{
                                        backgroundColor: "#eee",
                                        marginTop: "20%",
                                      }}
                                      onPress={() => this.selectTimer(300)}
                                    >
                                      {this.state.pinceTri}
                                    </Text>
                                    <Text style={{ fontSize: 10 }}>
                                      Nombre d'heure
                                    </Text>
                                    {this.state.ShowPlus ? (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          marginTop: "10%",
                                        }}
                                      >
                                        <View tyle={styles.topmationfd}>
                                          <SelectPicker
                                            selectedValue={
                                              this.state.selectedtype1
                                            }
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={this.onValueChangeType1.bind(
                                              this
                                            )}
                                          >
                                            <SelectPicker.Item
                                              label="➕ "
                                              value="1"
                                              enabled={true}
                                            />
                                            {this.state.MyPointagesType.map(
                                              (items, i) => {
                                                if (
                                                  items.type !=
                                                  "Forfait réalisé"
                                                ) {
                                                  return (
                                                    <SelectPicker.Item
                                                      label={items.type}
                                                      value={
                                                        items.Pointage + "1"
                                                      }
                                                      key={i}
                                                    />
                                                  );
                                                }
                                              }
                                            )}
                                          </SelectPicker>
                                        </View>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showInputHS ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginTop: "10%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>
                                      Heures Supplémentaires
                                    </Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <Text
                                      style={{
                                        backgroundColor: "#eee",
                                        marginTop: "20%",
                                      }}
                                      onPress={() => this.selectTimer(700)}
                                    >
                                      {this.state.HS}
                                    </Text>
                                    <Text style={{ fontSize: 10 }}>
                                      Nombre d'heure
                                    </Text>
                                    {this.state.ShowPlus ? (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          marginTop: "10%",
                                        }}
                                      >
                                        <View tyle={styles.topmationfd}>
                                          <SelectPicker
                                            selectedValue={
                                              this.state.selectedtype1
                                            }
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={this.onValueChangeType1.bind(
                                              this
                                            )}
                                          >
                                            <SelectPicker.Item
                                              label="➕ "
                                              value="1"
                                              enabled={true}
                                            />
                                            {this.state.MyPointagesType.map(
                                              (items, i) => {
                                                if (
                                                  items.type !=
                                                  "Forfait réalisé"
                                                ) {
                                                  return (
                                                    <SelectPicker.Item
                                                      label={items.type}
                                                      value={
                                                        items.Pointage + "1"
                                                      }
                                                      key={i}
                                                    />
                                                  );
                                                }
                                              }
                                            )}
                                          </SelectPicker>
                                        </View>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showInputCrocBeton ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginTop: "10%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>
                                      Croc Béton
                                    </Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <Text
                                      style={{
                                        backgroundColor: "#eee",
                                        marginTop: "20%",
                                      }}
                                      onPress={() => this.selectTimer(400)}
                                    >
                                      {this.state.crocBeton}
                                    </Text>
                                    <Text style={{ fontSize: 10 }}>
                                      Nombre d'heure
                                    </Text>
                                    {this.state.ShowPlus ? (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          marginTop: "10%",
                                        }}
                                      >
                                        <View tyle={styles.topmationfd}>
                                          <SelectPicker
                                            selectedValue={
                                              this.state.selectedtype1
                                            }
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={this.onValueChangeType1.bind(
                                              this
                                            )}
                                          >
                                            <SelectPicker.Item
                                              label="➕ "
                                              value="1"
                                              enabled={true}
                                            />
                                            {this.state.MyPointagesType.map(
                                              (items, i) => {
                                                if (
                                                  items.type !=
                                                  "Forfait réalisé"
                                                ) {
                                                  return (
                                                    <SelectPicker.Item
                                                      label={items.type}
                                                      value={
                                                        items.Pointage + "1"
                                                      }
                                                      key={i}
                                                    />
                                                  );
                                                }
                                              }
                                            )}
                                          </SelectPicker>
                                        </View>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showInputPince ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginTop: "10%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>
                                      Pince
                                    </Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <Text
                                      style={{
                                        backgroundColor: "#eee",
                                        marginTop: "20%",
                                      }}
                                      onPress={() => this.selectTimer(500)}
                                    >
                                      {this.state.Pince}
                                    </Text>
                                    <Text style={{ fontSize: 10 }}>
                                      Nombre d'heure
                                    </Text>
                                    {this.state.ShowPlus ? (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          marginTop: "10%",
                                        }}
                                      >
                                        <View tyle={styles.topmationfd}>
                                          <SelectPicker
                                            selectedValue={
                                              this.state.selectedtype1
                                            }
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={this.onValueChangeType1.bind(
                                              this
                                            )}
                                          >
                                            <SelectPicker.Item
                                              label="➕ "
                                              value="1"
                                              enabled={true}
                                            />
                                            {this.state.MyPointagesType.map(
                                              (items, i) => {
                                                if (
                                                  items.type !=
                                                  "Forfait réalisé"
                                                ) {
                                                  return (
                                                    <SelectPicker.Item
                                                      label={items.type}
                                                      value={
                                                        items.Pointage + "1"
                                                      }
                                                      key={i}
                                                    />
                                                  );
                                                }
                                              }
                                            )}
                                          </SelectPicker>
                                        </View>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              ) : null}

                              {this.state.showInputRemplissageCuve ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginTop: "10%",
                                  }}
                                >
                                  <View style={styles.topmation}>
                                    <Text style={styles.textHorloge}>
                                      Remplissage de cuve
                                    </Text>
                                  </View>
                                  <View style={styles.topmationInputAttente}>
                                    <Text
                                      style={{
                                        backgroundColor: "#eee",
                                        marginTop: "20%",
                                      }}
                                      onPress={() => this.selectTimer(600)}
                                    >
                                      {this.state.remplissageCuve}
                                    </Text>
                                    <Text style={{ fontSize: 10 }}>
                                      Nombre d'heure
                                    </Text>
                                    {this.state.ShowPlus ? (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          marginTop: "10%",
                                        }}
                                      >
                                        <View tyle={styles.topmationfd}>
                                          <SelectPicker
                                            selectedValue={
                                              this.state.selectedtype1
                                            }
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={this.onValueChangeType1.bind(
                                              this
                                            )}
                                          >
                                            <SelectPicker.Item
                                              label="➕ "
                                              value="1"
                                              enabled={true}
                                            />
                                            {this.state.MyPointagesType.map(
                                              (items, i) => {
                                                if (
                                                  items.type !=
                                                  "Forfait réalisé"
                                                ) {
                                                  return (
                                                    <SelectPicker.Item
                                                      label={items.type}
                                                      value={
                                                        items.Pointage + "1"
                                                      }
                                                      key={i}
                                                    />
                                                  );
                                                }
                                              }
                                            )}
                                          </SelectPicker>
                                        </View>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              ) : null}

                              {/* {this.state.ShowPlus ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                          <TouchableOpacity onPress={() => this.onPlusPressed()}>

                            <Image
                              style={styles.plus}
                              source={require('../assets/plus.png')}
                            />

                          </TouchableOpacity>

                        </View>
                      ) : null} */}
                            </View>
                          ) : null}

                          {this.state.showInputFinDebut1 ? (
                            <View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: "10%",
                                }}
                              >
                                <View style={styles.topmation}>
                                  <Text style={styles.textHorloge}>Début</Text>
                                </View>
                                <View style={styles.topmationInputAttente}>
                                  <Text
                                    style={{
                                      backgroundColor: "#eee",
                                      padding: 10,
                                    }}
                                    onPress={() => this.selectTimer(20)}
                                  >
                                    {this.state.DebutAutre1}
                                  </Text>
                                  <Text style={{ fontSize: 10 }}>
                                    Horaire début
                                  </Text>
                                </View>
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: "10%",
                                }}
                              >
                                <View style={styles.topmation}>
                                  <Text style={styles.textHorloge}>Fin</Text>
                                </View>
                                <View style={styles.topmationInputAttente}>
                                  <Text
                                    style={{
                                      backgroundColor: "#eee",
                                      padding: 10,
                                    }}
                                    onPress={() => this.selectTimer(21)}
                                  >
                                    {this.state.FinAutre1}
                                  </Text>
                                  <Text style={{ fontSize: 10 }}>
                                    Horaire fin
                                  </Text>
                                  {this.state.ShowPlus2 ? (
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        marginTop: "10%",
                                      }}
                                    >
                                      {/* <View style={styles.topmation}>
  <Text  style={styles.textHorloge}>
        <Text style={{backgroundColor:'#ffcb6b'}}>
        Type :
    </Text></Text>
  </View> */}
                                      <View tyle={styles.topmationfd}>
                                        <SelectPicker
                                          selectedValue={
                                            this.state.selectedtype2
                                          }
                                          style={{ height: 50, width: 150 }}
                                          onValueChange={this.onValueChangeType2.bind(
                                            this
                                          )}
                                        >
                                          <SelectPicker.Item
                                            label="➕ "
                                            value="1"
                                            enabled={true}
                                          />
                                          {this.state.MyPointagesType.map(
                                            (items, i) => {
                                              // if (items.tabSaisi == 'Autres' && items.Materiel == this.state.saveMateriel) {
                                              if (
                                                items.type != "Forfait réalisé"
                                              ) {
                                                return (
                                                  <SelectPicker.Item
                                                    label={items.type}
                                                    value={items.Pointage + "2"}
                                                    key={i}
                                                  />
                                                );
                                              }
                                              // }
                                            }
                                          )}
                                        </SelectPicker>
                                      </View>
                                    </View>
                                  ) : null}
                                </View>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputNombreTonnes1 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>Tonnes</Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <TextInput
                                  style={{ height: "6%" }}
                                  onChangeText={(nombreTonnes1) =>
                                    this.setState({ nombreTonnes1 })
                                  }
                                  value={this.state.nombreTonnes1}
                                  keyboardType={"numeric"}
                                />
                                <Text style={{ fontSize: 10 }}>
                                  Nombre tonne
                                </Text>
                                {this.state.ShowPlus2 ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    {/* <View style={styles.topmation}>
  <Text  style={styles.textHorloge}>
        <Text style={{backgroundColor:'#ffcb6b'}}>
        Type :
    </Text></Text>
  </View> */}
                                    <View tyle={styles.topmationfd}>
                                      <SelectPicker
                                        selectedValue={this.state.selectedtype2}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={this.onValueChangeType2.bind(
                                          this
                                        )}
                                      >
                                        <SelectPicker.Item
                                          label="➕ "
                                          value="1"
                                          enabled={true}
                                        />
                                        {this.state.MyPointagesType.map(
                                          (items, i) => {
                                            // if (items.tabSaisi == 'Autres' && items.Materiel == this.state.saveMateriel) {
                                            if (
                                              items.type != "Forfait réalisé"
                                            ) {
                                              return (
                                                <SelectPicker.Item
                                                  label={items.type}
                                                  value={items.Pointage + "2"}
                                                  key={i}
                                                />
                                              );
                                            }
                                            // }
                                          }
                                        )}
                                      </SelectPicker>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputNombreAttentes1 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Heures d'attente
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(9)}
                                >
                                  {this.state.nombreAttentes1}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                                {this.state.ShowPlus2 ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View tyle={styles.topmationfd}>
                                      <SelectPicker
                                        selectedValue={this.state.selectedtype2}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={this.onValueChangeType2.bind(
                                          this
                                        )}
                                      >
                                        <SelectPicker.Item
                                          label="➕ "
                                          value="1"
                                          enabled={true}
                                        />
                                        {this.state.MyPointagesType.map(
                                          (items, i) => {
                                            // if (items.tabSaisi == 'Autres' && items.Materiel == this.state.saveMateriel) {
                                            if (
                                              items.type != "Forfait réalisé"
                                            ) {
                                              return (
                                                <SelectPicker.Item
                                                  label={items.type}
                                                  value={items.Pointage + "2"}
                                                  key={i}
                                                />
                                              );
                                            }
                                            // }
                                          }
                                        )}
                                      </SelectPicker>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputPeage1 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>Péage</Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <TextInput
                                  style={{ height: "6%" }}
                                  onChangeText={(peage1) =>
                                    this.setState({ peage1 })
                                  }
                                  value={this.state.peage1}
                                  keyboardType={"numeric"}
                                />
                                <Text style={{ fontSize: 10 }}>Montant</Text>
                                <Text style={{ fontSize: 7 }}>
                                  Si vous connaissez pas la montant , merci de
                                  saisir 0.00
                                </Text>
                                {this.state.ShowPlus2 ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View tyle={styles.topmationfd}>
                                      <SelectPicker
                                        selectedValue={this.state.selectedtype2}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={this.onValueChangeType2.bind(
                                          this
                                        )}
                                      >
                                        <SelectPicker.Item
                                          label="➕ "
                                          value="1"
                                          enabled={true}
                                        />
                                        {this.state.MyPointagesType.map(
                                          (items, i) => {
                                            // if (items.tabSaisi == 'Autres' && items.Materiel == this.state.saveMateriel) {
                                            if (
                                              items.type != "Forfait réalisé"
                                            ) {
                                              return (
                                                <SelectPicker.Item
                                                  label={items.type}
                                                  value={items.Pointage + "2"}
                                                  key={i}
                                                />
                                              );
                                            }
                                            // }
                                          }
                                        )}
                                      </SelectPicker>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputForfait1 ? (
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                marginBottom: 5,
                                marginTop: 15,
                              }}
                            >
                              <View style={{ flex: 3 }}>
                                <Text>Forfait Réalisé</Text>
                                <Text style={{ fontSize: 10 }}>
                                  Cocher si c'est un forfait
                                </Text>
                              </View>

                              <View style={{ flex: 1 }}>
                                <CheckBox
                                  checked={this.state.checkedforfait1}
                                  onPress={() => this.onCheckedPressForfait1()}
                                />
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputbrh1 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>BRH</Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(201)}
                                >
                                  {this.state.BRH1}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                                {this.state.ShowPlus2 ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View tyle={styles.topmationfd}>
                                      <SelectPicker
                                        selectedValue={this.state.selectedtype2}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={this.onValueChangeType2.bind(
                                          this
                                        )}
                                      >
                                        <SelectPicker.Item
                                          label="➕ "
                                          value="1"
                                          enabled={true}
                                        />
                                        {this.state.MyPointagesType.map(
                                          (items, i) => {
                                            // if (items.tabSaisi == 'Autres' && items.Materiel == this.state.saveMateriel) {
                                            if (
                                              items.type != "Forfait réalisé"
                                            ) {
                                              return (
                                                <SelectPicker.Item
                                                  label={items.type}
                                                  value={items.Pointage + "2"}
                                                  key={i}
                                                />
                                              );
                                            }
                                            // }
                                          }
                                        )}
                                      </SelectPicker>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputpinceTri1 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Pince de tri
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(301)}
                                >
                                  {this.state.pinceTri1}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                                {this.state.ShowPlus2 ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View tyle={styles.topmationfd}>
                                      <SelectPicker
                                        selectedValue={this.state.selectedtype2}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={this.onValueChangeType2.bind(
                                          this
                                        )}
                                      >
                                        <SelectPicker.Item
                                          label="➕ "
                                          value="1"
                                          enabled={true}
                                        />
                                        {this.state.MyPointagesType.map(
                                          (items, i) => {
                                            // if (items.tabSaisi == 'Autres' && items.Materiel == this.state.saveMateriel) {
                                            if (
                                              items.type != "Forfait réalisé"
                                            ) {
                                              return (
                                                <SelectPicker.Item
                                                  label={items.type}
                                                  value={items.Pointage + "2"}
                                                  key={i}
                                                />
                                              );
                                            }
                                            // }
                                          }
                                        )}
                                      </SelectPicker>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputCrocBeton1 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Croc Béton
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(401)}
                                >
                                  {this.state.crocBeton1}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                                {this.state.ShowPlus2 ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View tyle={styles.topmationfd}>
                                      <SelectPicker
                                        selectedValue={this.state.selectedtype2}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={this.onValueChangeType2.bind(
                                          this
                                        )}
                                      >
                                        <SelectPicker.Item
                                          label="➕ "
                                          value="1"
                                          enabled={true}
                                        />
                                        {this.state.MyPointagesType.map(
                                          (items, i) => {
                                            // if (items.tabSaisi == 'Autres' && items.Materiel == this.state.saveMateriel) {
                                            if (
                                              items.type != "Forfait réalisé"
                                            ) {
                                              return (
                                                <SelectPicker.Item
                                                  label={items.type}
                                                  value={items.Pointage + "2"}
                                                  key={i}
                                                />
                                              );
                                            }
                                            // }
                                          }
                                        )}
                                      </SelectPicker>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputPince1 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>Pince</Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(501)}
                                >
                                  {this.state.Pince1}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                                {this.state.ShowPlus2 ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View tyle={styles.topmationfd}>
                                      <SelectPicker
                                        selectedValue={this.state.selectedtype2}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={this.onValueChangeType2.bind(
                                          this
                                        )}
                                      >
                                        <SelectPicker.Item
                                          label="➕ "
                                          value="1"
                                          enabled={true}
                                        />
                                        {this.state.MyPointagesType.map(
                                          (items, i) => {
                                            // if (items.tabSaisi == 'Autres' && items.Materiel == this.state.saveMateriel) {
                                            if (
                                              items.type != "Forfait réalisé"
                                            ) {
                                              return (
                                                <SelectPicker.Item
                                                  label={items.type}
                                                  value={items.Pointage + "2"}
                                                  key={i}
                                                />
                                              );
                                            }
                                            // }
                                          }
                                        )}
                                      </SelectPicker>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputHS1 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Heures Supplémentaires
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(701)}
                                >
                                  {this.state.HS1}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                                {this.state.ShowPlus2 ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View tyle={styles.topmationfd}>
                                      <SelectPicker
                                        selectedValue={this.state.selectedtype2}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={this.onValueChangeType2.bind(
                                          this
                                        )}
                                      >
                                        <SelectPicker.Item
                                          label="➕ "
                                          value="1"
                                          enabled={true}
                                        />
                                        {this.state.MyPointagesType.map(
                                          (items, i) => {
                                            // if (items.tabSaisi == 'Autres' && items.Materiel == this.state.saveMateriel) {
                                            if (
                                              items.type != "Forfait réalisé"
                                            ) {
                                              return (
                                                <SelectPicker.Item
                                                  label={items.type}
                                                  value={items.Pointage + "2"}
                                                  key={i}
                                                />
                                              );
                                            }
                                            // }
                                          }
                                        )}
                                      </SelectPicker>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputRemplissageCuve1 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Remplissage de cuve
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(601)}
                                >
                                  {this.state.remplissageCuve1}
                                </Text>

                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                                {this.state.ShowPlus2 ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: "10%",
                                    }}
                                  >
                                    <View tyle={styles.topmationfd}>
                                      <SelectPicker
                                        selectedValue={this.state.selectedtype2}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={this.onValueChangeType2.bind(
                                          this
                                        )}
                                      >
                                        <SelectPicker.Item
                                          label="➕ "
                                          value="1"
                                          enabled={true}
                                        />
                                        {this.state.MyPointagesType.map(
                                          (items, i) => {
                                            // if (items.tabSaisi == 'Autres' && items.Materiel == this.state.saveMateriel) {
                                            if (
                                              items.type != "Forfait réalisé"
                                            ) {
                                              return (
                                                <SelectPicker.Item
                                                  label={items.type}
                                                  value={items.Pointage + "2"}
                                                  key={i}
                                                />
                                              );
                                            }
                                            // }
                                          }
                                        )}
                                      </SelectPicker>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputFinDebut2 ? (
                            <View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: "10%",
                                }}
                              >
                                <View style={styles.topmation}>
                                  <Text style={styles.textHorloge}>Début</Text>
                                </View>
                                <View style={styles.topmationInputAttente}>
                                  <Text
                                    style={{
                                      backgroundColor: "#eee",
                                      padding: 10,
                                    }}
                                    onPress={() => this.selectTimer(22)}
                                  >
                                    {this.state.DebutAutre2}
                                  </Text>
                                  <Text style={{ fontSize: 10 }}>
                                    Horaire début
                                  </Text>
                                </View>
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: "10%",
                                }}
                              >
                                <View style={styles.topmation}>
                                  <Text style={styles.textHorloge}>Fin</Text>
                                </View>
                                <View style={styles.topmationInputAttente}>
                                  <Text
                                    style={{
                                      backgroundColor: "#eee",
                                      padding: 10,
                                    }}
                                    onPress={() => this.selectTimer(23)}
                                  >
                                    {this.state.FinAutre2}
                                  </Text>
                                  <Text style={{ fontSize: 10 }}>
                                    Horaire fin
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputNombreTonnes2 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>Tonnes</Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <TextInput
                                  style={{ height: "6%" }}
                                  onChangeText={(nombreTonnes2) =>
                                    this.setState({ nombreTonnes2 })
                                  }
                                  value={this.state.nombreTonnes2}
                                  keyboardType={"numeric"}
                                />
                                <Text style={{ fontSize: 10 }}>
                                  Nombre tonne
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputNombreAttentes2 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Heures d'attente
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(10)}
                                >
                                  {this.state.nombreAttentes2}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputPeage2 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>Péage</Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <TextInput
                                  style={{ height: "6%" }}
                                  onChangeText={(peage2) =>
                                    this.setState({ peage2 })
                                  }
                                  value={this.state.peage2}
                                  keyboardType={"numeric"}
                                />
                                <Text style={{ fontSize: 10 }}>Montant</Text>
                                <Text style={{ fontSize: 7 }}>
                                  Si vous connaissez pas la montant , merci de
                                  saisir 0.00
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputForfait2 ? (
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                marginBottom: 5,
                                marginTop: 15,
                              }}
                            >
                              <View style={{ flex: 3 }}>
                                <Text>Forfait Réalisé</Text>
                                <Text style={{ fontSize: 10 }}>
                                  Cocher si c'est un forfait
                                </Text>
                              </View>

                              <View style={{ flex: 1 }}>
                                <CheckBox
                                  checked={this.state.checkedforfait2}
                                  onPress={() => this.onCheckedPressForfait2()}
                                />
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputbrh2 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>BRH</Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(202)}
                                >
                                  {this.state.BRH2}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputpinceTri2 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Pince de tri
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(302)}
                                >
                                  {this.state.pinceTri2}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputCrocBeton2 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Croc Béton
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(402)}
                                >
                                  {this.state.crocBeton2}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputPince2 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>Pince</Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(502)}
                                >
                                  {this.state.Pince2}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputHS2 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Heures Supplémentaires
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(702)}
                                >
                                  {this.state.HS2}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showInputRemplissageCuve2 ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Remplissage de cuve
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(602)}
                                >
                                  {this.state.remplissageCuve2}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showViewNombreAttentesOnAutre ? (
                            <View
                              style={{ flexDirection: "row", marginTop: "10%" }}
                            >
                              <View style={styles.topmation}>
                                <Text style={styles.textHorloge}>
                                  Heures d'attente
                                </Text>
                              </View>
                              <View style={styles.topmationInputAttente}>
                                <Text
                                  style={{
                                    backgroundColor: "#eee",
                                    marginTop: "20%",
                                  }}
                                  onPress={() => this.selectTimer(8)}
                                >
                                  {this.state.nombreAttentes}
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                  Nombre d'heure
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showViewAutresOnPrincipal ? (
                            <View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: "10%",
                                }}
                              >
                                <View style={styles.topmation}>
                                  <Text style={styles.textHorloge}>Début</Text>
                                </View>
                                <View style={styles.topmationInputAttente}>
                                  <Text
                                    style={{
                                      backgroundColor: "#eee",
                                      padding: 10,
                                    }}
                                    onPress={() => this.selectTimer(5)}
                                  >
                                    {this.state.DebutAutre}
                                  </Text>
                                  <Text style={{ fontSize: 10 }}>
                                    Horaire début
                                  </Text>
                                </View>
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: "10%",
                                }}
                              >
                                <View style={styles.topmation}>
                                  <Text style={styles.textHorloge}>Fin</Text>
                                </View>
                                <View style={styles.topmationInputAttente}>
                                  <Text
                                    style={{
                                      backgroundColor: "#eee",
                                      padding: 10,
                                    }}
                                    onPress={() => this.selectTimer(6)}
                                  >
                                    {this.state.FinAutre}
                                  </Text>
                                  <Text style={{ fontSize: 10 }}>
                                    Horaire fin
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}

                          {this.state.showViewForfaitOnPrincipal ? (
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                marginBottom: 5,
                                marginTop: 20,
                              }}
                            >
                              <View style={{ flex: 3 }}>
                                <Text>Forfait Réalisé</Text>
                                <Text style={{ fontSize: 10 }}>
                                  Cocher si c'est un forfait
                                </Text>
                              </View>

                              <View style={{ flex: 1 }}>
                                <CheckBox
                                  checked={this.state.checkedforfait}
                                  onPress={() => this.onCheckedPressForfait()}
                                />
                              </View>
                            </View>
                          ) : null}
                        </View>
                      )}
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </DialogContent>
            </Dialog>

            <View style={{ zIndex: 5, backgroundColor: "red" }}>
              <Dialog
                visible={this.state.modalVisible}
                dialogAnimation={
                  new SlideAnimation({
                    slideFrom: "bottom",
                  })
                }
                onTouchOutside={() => {
                  this.setState({ modalVisible: false });
                }}
                onHardwareBackPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <DialogContent>
                  <SafeAreaView>
                    <ScrollView nestedScrollEnabled scrollEnabled>
                      <View>
                        {this.state.MyMissions.map((item, i) => {
                       
                          return (
                            <View style={{ marginTop: 50 }} key={i}>
                              <View
                                style={{
                                  width: "90%",
                                  justifyContent: "center",
                                }}
                              >
                                <View>
                                  <Text
                                    style={{
                                      textAlign: "center",
                                      textDecorationLine: "underline",
                                      fontWeight: "bold",
                                      fontSize: 22,
                                      color: "#b85f32",
                                    }}
                                  >
                                    N° : {item?.NumMission}
                                  </Text>
                                </View>
                                <Text>CHANTIER : {item?.nomChantier}</Text>
                                <Text>
                                  DATE :
                                  {item?.datePlanification != null
                                    ? item?.datePlanification?.date?.substring(
                                        0,
                                        10
                                      )
                                    : "--"}
                                </Text>
                                <Text>MATERIEL : {item?.NomMateriel}</Text>

                                <Text>TYPE DETAILS:</Text>
                                <View style={{ flexDirection: "row" }}>
                                  <View style={styles.TabView}>
                                    <Text>Type</Text>
                                  </View>
                                  <View style={styles.TabView}>
                                    <Text>Début</Text>
                                  </View>
                                  <View style={styles.TabView}>
                                    <Text>Fin</Text>
                                  </View>
                                  <View style={styles.TabViewLast}>
                                    <Text>Nombre</Text>
                                  </View>
                                </View>

                                {this.state.MyPointages?.length > 0 ? (
                                  this.state.MyPointages?.map((items, i) => {
                                    return (
                                      <View
                                        style={{ flexDirection: "row" }}
                                        key={i}
                                      >
                                        <View style={styles.TabContents}>
                                          <Text> {items?.mtype}</Text>
                                        </View>
                                        <View style={styles.TabContents}>
                                          <Text>
                                            {" "}
                                            {items?.debut != null
                                              ? items?.debut?.date?.substring(
                                                  11,
                                                  16
                                                )
                                              : "--"}{" "}
                                          </Text>
                                        </View>
                                        <View style={styles.TabContents}>
                                          <Text>
                                            {" "}
                                            {items?.fin != null
                                              ? items?.fin?.date?.substring(
                                                  11,
                                                  16
                                                )
                                              : "--"}{" "}
                                          </Text>
                                        </View>
                                        <View style={styles.TabContentsLast}>
                                          <Text> {items?.nbExe} </Text>
                                        </View>
                                      </View>
                                    );
                                  })
                                ) : (
                                  <View>
                                    <Text>Aucun pointage enregistrer</Text>
                                  </View>
                                )}
                              </View>
                            </View>
                          )
                         })} 

                        <Text
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          Validation avec signature du chef
                        </Text>
                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: "#71BA51",
                            width: "50%",
                            alignSelf: "center",
                          }}
                          onPress={() => {
                            this.setState({ modalVisible: false });
                            // this.setState({ signer: true });
                            this.props.navigation.navigate("SignatureScreen", {
                              IdMission: this.state.CurrentMission,
                            });
                          }}
                        >
                          Signer
                        </Button>

                        <Text
                          style={{
                            alignSelf: "center",
                            marginTop: "3%",
                          }}
                        >
                          Litige par le chef
                        </Text>
                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: "#FF7416",
                            width: "50%",
                            alignSelf: "center",
                          }}
                          onPress={() => {
                            this.setState({ modalVisible: false });
                            // this.setState({ signer: true });
                            this.props.navigation.navigate("LitigeScreen", {
                              IdMission: this.state.CurrentMission,
                            });
                          }}
                        >
                          Litige
                        </Button>

                        <Text
                          style={{
                            alignSelf: "center",
                            marginTop: "3%",
                          }}
                        >
                          Confirmation avec l'absence du chef
                        </Text>

                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: "#83D6DE",
                            width: "50%",
                            alignSelf: "center",
                          }}
                          onPress={() => {
                            this.BON_NS_Mission();
                          }}
                        >
                          Confirmer
                        </Button>
                      </View>
                    </ScrollView>
                  </SafeAreaView>
                </DialogContent>
              </Dialog>
            </View>
            <View
              style={[
                styles.headerContainer,
                global.mode !== "Mode dévelopement" && styles.headerTop,
              ]}
            >
              <View style={{ height: 35, width: 50 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation?.navigate("Dashboard")}
                  style={{ height: 25, width: 25 }}
                >
                  <Image
                    style={{ height: 28, width: 28 }}
                    source={require("../assets/arrow_back.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.Mission}>Mission</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation?.navigate("CameraScreen")
                  }
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFF",
                  }}
                >
                  <AntDesign name="camerao" size={26} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation?.navigate("GalleryImages")
                  }
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFF",
                  }}
                >
                  <Entypo name="images" size={26} color="black" />
                </TouchableOpacity>
              </View>
            </View>

         
              <View style={{ flexDirection: "row", alignItems: "center"  , width: windowWidth /1.7 ,marginHorizontal:10 }}>
                <Text style={{ fontSize: 12 }}>N°Immatriculation :</Text>
                <TextInput
                  style={{
                    height: 20,
                    margin: 1,
                    borderWidth: 1,
                    width: windowWidth /2.5,
                  }}
                  onChangeText={(immatriculation) =>
                    this.setState({ immatriculation })
                  }
                  value={`${this.state.immatriculation}`}
                />    
                <TouchableOpacity  style={{ width: 35, height: 35 }} onPress={() => this.Immatriculation()}>
                  <Image
                    style={{ width: 30, height: 30  }}
                    source={require("../assets/file-3.png")}
                    />
                </TouchableOpacity>
              </View>
            

<SafeAreaView style={styles.containerScroll}>
          {
            this.state.MyMissions.map((items, i) => {
              return (
                <ScrollView style={styles.scrollView} key={i}>
                  <View ><Text style={{
                    textAlign: 'center', textDecorationLine: 'underline', fontWeight: 'bold',
                    fontSize: 22, marginTop: '4%', color: '#b85f32'
                  }}>N° : {items.NumMission}</Text></View>

                  <View ><Text style={{
                    textAlign: 'center', textDecorationLine: 'underline', fontWeight: 'bold',
                    fontSize: 16, color: 'green'
                  }}>Etat : Prise en charge</Text></View>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', fontWeight: 'bold', fontSize: 20, marginTop: '4%' }}>
                    <View style={styles.viewTop}>
                      <Text style={styles.textChantier}>
                        CHANTIER :
              </Text>
                      <Text >
                        {items.NumChantier}</Text>
                      <Text> {items.Adresse1Chantier}</Text>
                      <Text> {items.Adresse2Chantier}</Text>
                      <Text> {items.Adresse3Chantier}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewDate}>
                      <Text style={styles.text}>
                        DATE :
                        {
                          items.datePlanification != null ?
                            items.datePlanification.date.substring(0, 10)
                            : '--'
                        }
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewTopRow4}>
                      <Text style={styles.text}>
                        Chef de Chantier :
              </Text>
                    </View>
                    <View style={styles.viewMeduimRow4}>
                      <Text style={{ color: '#9b59b6', fontWeight: 'bold' }}>
                        {items.ChefChantier} {items.ChefChantierFN}
                      </Text>
                      <Text style={{ color: '#9b59b6', fontWeight: 'bold' }} >
                        {items.ChefChantierPhone}
                      </Text>
                    </View>

                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewDateRow6}>
                      <Text style={styles.text}>
                        Matériel : {items.NomMateriel}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewDateRow7}>
                      <Text style={styles.text}>
                        Instructions :
                          </Text>
                      <Text style={{ fontWeight: 'bold' }}>{`${items.Adresse1Chantier} ${items.description}`}</Text>
                    </View>
                  </View>
                </ScrollView>
              )
            })}
        </SafeAreaView>

        <ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.ViewTable} >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.TabView}><Text>Types</Text></View>
                <View style={styles.TabView}><Text>Début</Text></View>
                <View style={styles.TabView}><Text>Fin</Text></View>
                <View style={styles.TabViewLast}><Text>Nombre</Text></View>
              </View>
              {this.state.MyPointages.length > 0 ?
                this.state.MyPointages.map((items, i) => {
                  return (

                    <View style={{ flexDirection: 'row' }} key={i}>
                      <View style={styles.TabContents}><Text>  {items.mtype}  </Text></View>
                      <View style={styles.TabContents}><Text>  {
                        items.debut != null ?
                          items.debut.date.substring(11, 16)
                          : '--'
                      } </Text></View>
                      <View style={styles.TabContents}><Text>  {
                        items.fin != null ?
                          items.fin.date.substring(11, 16)
                          : '--'
                      } </Text></View>
                      <View style={styles.TabContentsLast}>
                        {items.debut != null ?
                          <Text>
                            {
                              this.state.temps = new Date(0, 0),
                              this.state.temps.setMinutes(+items.nbExe * 60),
                              this.state.temps.toTimeString().slice(0, 5)

                            }
                          </Text>:<Text>
                            {items.nbExe}
                          </Text>}
                      </View>

                    </View>
                  )
                }) :
                <View><Text>Aucun pointage enregistrer</Text></View>
              }

            </View>
            
            <View style={styles.viewAlarm}>

              <TouchableOpacity onPress={() => this.onHorlogePressed()}>
                <Image
                  style={styles.jointure}
                  source={require('../assets/alarm.png')}

                />
              </TouchableOpacity>
              
            </View>

          </View>
        </ScrollView>

            {!this.state.MyPointages.length > 0 ? (
              <Button
                mode="contained"
                style={{
                  marginTop:20,
                  backgroundColor: "#b85f32",
                  width: "40%",
                  alignSelf: "center",
                  marginBottom: 5,
                }}
                onPress={() => this.createSeverWeather()}
              >
                intempéries
              </Button>
            ) : (
              <Button
                mode="contained"
                style={styles.ButtonBackground}
                onPress={() => this.SaveSignature()}
              >
                Validation
              </Button>
            )}
          {/* </ScrollView> */}
        {/* </DismissKeyboardView> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  dialogContainer: {
    width: "92%",
    height: "30%",
    borderRadius: 20,
    elevation: 20,
  },
  centeredRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: '80%'
  },
  centeredRow2: {
    flexDirection: "row",
    margin: "2%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  centeredRow2Lable: {
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "2%",
    fontWeight: "bold",
    fontSize: 25,
  },

  showView1: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5,
  },

  centeredRow3: {
    justifyContent: "center",
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
  },
  itemText: {
    color: "#999",
    fontSize: 14,
  },
  itemTextSelected: {
    color: "#0000b3",
    fontSize: 16,
    //backgroundColor:'blue'
  },
  containerPicker: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    width: 30,
    height: 30,
  },

  headerText: {
    padding: 8,
    fontSize: 14,
    color: "#444444",
    textAlign: "center",
  },
  tabContent: {
    color: "#444444",
    fontSize: 18,
    margin: 24,
  },
  Seperator: {
    marginHorizontal: -10,
    alignSelf: "stretch",
    borderTopWidth: 1,
    borderTopColor: "#888888",
    marginTop: 24,
  },
  tabStyle: {
    borderColor: "#D52C43",
  },
  activeTabStyle: {
    backgroundColor: "#D52C43",
  },

  ButtonChef: { marginBottom: 20 },
  boxView: {
    width: "95%",
    height: "52%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "40%",
  },

  InputInfos: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  Confirmer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "-12%",
  },
  TabView: {
    width: "25%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: "5%",
    backgroundColor: "#dfe6e9",
    borderLeftWidth: 1,
  },
  TabViewLast: {
    width: "25%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: "5%",
    backgroundColor: "#dfe6e9",
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  TabContentsLast: {
    width: "25%",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  TabContents: { width: "25%", borderBottomWidth: 1, borderLeftWidth: 1 },
  ViewTable: { width: "70%", marginHorizontal: 20 },
  ViewInfosChef: { width: "100%", paddingTop: "6%" },
  viewAlarm: { width: "30%", paddingTop: "8%" },
  viewTop: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  viewTopHorloge: {
    width: "40%",
    marginLeft: "2%",
  },

  topmation: {
    width: "40%",
    marginLeft: "2%",
  },

  topmationfd: {
    width: "30%",
    marginLeft: "2%",
    backgroundColor:"red"
  },

  topmationInput: {
    width: "30%",
    marginLeft: "8%",
    marginTop: "-8%",
  },

  topmationInputAttente: {
    width: "50%",
    marginLeft: "8%",
    marginTop: "-8%",
  },

  topmationInputFin: {
    width: "30%",
    marginLeft: "15%",
    marginTop: "-8%",
  },

  viewRight: {
    paddingTop: 5,
    marginLeft: "6%",
  },
  viewMeduim: { width: "40%" },
  viewDate: {
    marginTop: "5%",
    marginLeft: "2%",
  },

  viewAdresses: {
    marginTop: "2%",
    marginLeft: "2%",
  },

  viewDateRow6: {
    marginTop: "2%",
    marginLeft: "2%",
    width: "90%",
  },

  viewDateRow7: {
    marginLeft: "2%",
    width: "90%",
  },

  viewTopRow4: {
    width: "40%",
    marginLeft: "2%",
  },
  viewTopRow5: {
    marginRight: "20%",
    marginLeft: "2%",
  },
  viewMeduimRow4: { width: "40%" },

  text: {
    fontSize: 15,
  },

  textChantier: {
    fontSize: 15,
    textDecorationLine: "underline",
  },

  textHorloge: {
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#b85f32",
  },
  container: {
    height: "70%",
  },
  Demain: {
    textAlign: "right",
    marginRight: "15%",
    marginTop: "-6%",
  },

  MissionValid: { fontSize: 13, color: "green", marginRight: "5%" },
  Mission: {
    fontSize: 27,
    fontWeight: "500",
    justifyContent: "center",
    textAlign: "center",
    color: "#b85f32",
  },
  item: {
    backgroundColor: "#00FFFF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },

  ButtonBackground: {
    backgroundColor: "#b85f32",
    width: "40%",
    alignSelf: "center",
    marginTop:20,
  },

  ToggleMission: {
    alignSelf: "center",
  },

  ModalMission: {
    height: "20%",
  },

  jointure: {
    width: 60,
    height: 60,
  },

  GoToValide: {
    width: 30,
    height: 30,
    marginRight: "5%",
    marginTop: "5%",
  },

  fleches: {
    width: 20,
    height: 20,
  },

  containerScroll: {
    marginTop: -30,
    height: "55%",
  },
  scrollView: {
    backgroundColor: "#dfe6e9",
    marginHorizontal: 20,
    marginTop: "8%",
  },

  spinnerTextStyle: {
    color: "#FFF",
  },

  preview: {
    width: "70%",
    height: "40%",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 8,
  },

  headerTop: {
    paddingTop: getStatusBarHeight(),
  },
});
