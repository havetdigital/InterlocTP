import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';

const TextInput = ({ errorText,defaultValue, ...props }) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor='rgba(0, 0, 0, 0.5)'
      underlineColor="transparent"
      defaultValue={defaultValue}
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.transport
    
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
