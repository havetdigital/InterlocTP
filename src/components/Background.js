import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView, 
} from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Input, Form } from 'native-base';
import ModeText from './ModeText';


const Background = ({ children }) => (
  <ImageBackground
    source={require('../assets/bg2.png')}
    resizeMode="cover"
    style={styles.background}
  >
    <ModeText />
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>

  </ImageBackground>
 
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    //flex: 1,
    padding: 20,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
   // justifyContent: 'center',
   // position: 'absolute'

  },
});

export default memo(Background);
