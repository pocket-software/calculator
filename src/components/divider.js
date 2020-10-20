import React from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from '../utils/useTheme';

const Divider = ({width}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.root,
        width: width || '100%',
        backgroundColor: theme.card,
      }}
    />
  );
};

const styles = StyleSheet.create({root: {height: 1}});

export default Divider;
