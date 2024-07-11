import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: theme.colors.transport,
    fontWeight: 'bold',
    //paddingVertical: 5,
    
  },
});

export default memo(Header);
