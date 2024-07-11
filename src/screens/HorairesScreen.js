import React, { memo, useState, useEffect, Fragment, Component } from 'react';
import {  StyleSheet } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class homeScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      UserLogin: '',
    };
    };


 

  render() {
  return (
    <Background>
      <Paragraph>
      Horraire
    </Paragraph>
     
   
    </Background>
  )
};
}

const styles = StyleSheet.create({
  ButtonBackground: {
    backgroundColor: '#b85f32',
  },



});

