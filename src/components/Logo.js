import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/logo_new.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
   // width: 320,
   // height: 90,
    marginBottom: 12,
    marginTop: 30,
  },
});

export default memo(Logo);
