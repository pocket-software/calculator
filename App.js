/**
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ToastAndroid,
  Platform,
  Alert,
  Vibration,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Clipboard from '@react-native-community/clipboard';
import CalculatorIcon from './src/components/calculatorIcon';
import useTheme from './src/utils/useTheme';

const fontSize = 30;

/**
 * The layout of the buttons for the calculator
 *
 * label {string} - The string or React node to render inside of the calculator icon
 * operation {string} - The character to add into the string to calculate
 *
 *   C ± /
 * 7 8 9 x
 * 4 5 6 -
 * 1 2 3 +
 * . 0 < =
 */
const buttons = [
  [
    {label: 'blank'},
    {label: 'C', operation: 'C'},
    {
      label: '±',
      operation: 'invert',
    },
    {
      label: <CalculatorIcon name={'divide'} fontSize={fontSize} />,
      operation: '/',
    },
  ],
  [
    {label: '7', operation: '7'},
    {label: '8', operation: '8'},
    {label: '9', operation: '9'},
    {label: <CalculatorIcon name={'x'} fontSize={fontSize} />, operation: '*'},
  ],
  [
    {label: '4', operation: '4'},
    {label: '5', operation: '5'},
    {label: '6', operation: '6'},
    {
      label: <CalculatorIcon name={'minus'} fontSize={fontSize} />,
      operation: '-',
    },
  ],
  [
    {label: '1', operation: '1'},
    {label: '2', operation: '2'},
    {label: '3', operation: '3'},
    {
      label: <CalculatorIcon name={'plus'} fontSize={fontSize} />,
      operation: '+',
    },
  ],
  [
    {label: '.', operation: '.'},
    {label: '0', operation: '0'},
    {
      label: <CalculatorIcon name={'delete'} fontSize={fontSize} />,
      operation: 'del',
    },
    {label: '=', operation: '='},
  ],
];

const App = () => {
  const theme = useTheme();
  const [operations, setOperations] = useState([]);

  useEffect(() => RNBootSplash.hide({duration: 300}), []);

  /**
   * Solves the current operation array and sets the new operation array to the result
   */
  const handleSolve = () => {
    // Don't run if the operations are empty
    if (operations.join('').trim() !== '') {
      let temp = operations;

      // Remove all non-digit characters at the end of the string (any extraneous operations)
      while (temp.length > 0 && isNaN(parseFloat(temp[temp.length - 1]))) {
        temp.splice(-1, 1);
      }

      // Catch any eval errors
      try {
        // eslint-disable-next-line no-eval
        const answer = eval(temp.join('').replace(/\/\//g, '/'));
        setOperations(
          !isNaN(parseFloat(answer)) ? [answer.toString()] : ['Err'],
        );
      } catch {
        setOperations(['Err']);
      }
    }
  };

  /**
   * Apply an operation on button press
   * @param operation {string} - The operation to add onto the end of the operations array
   */
  const applyOperation = (operation) => {
    Vibration.vibrate(5);
    // Remove any existing error from the string
    setOperations((curr) => curr.filter((op) => op !== 'Err'));
    switch (operation) {
      case 'C': // Clear all operations
        setOperations([]);
        break;
      case '=':
        handleSolve(); // Solve the operations
        break;
      case 'invert': // Reverse the last number in the operations array
        const lastInvert = operations[operations.length - 1];
        if (!isNaN(parseFloat(lastInvert))) {
          setOperations((curr) =>
            curr.map((op, i) =>
              i === curr.length - 1
                ? op.charAt(0) === '-'
                  ? op.substring(1)
                  : `-${op}`
                : op,
            ),
          );
        }
        break;
      case 'del': // Delete the last character of the last operation
        if (operations.length > 0) {
          const lastDel = operations[operations.length - 1];
          if (lastDel.length === 1) {
            let temp = operations;
            temp.splice(-1, 1);
            setOperations([...temp]);
          } else {
            setOperations((curr) =>
              curr.map((op, i) =>
                i === curr.length - 1 ? op.slice(0, -1) : op,
              ),
            );
          }
        }
        break;
      default:
        // Append the operation
        const lastDefault = operations[operations.length - 1];
        if (!isNaN(parseFloat(operation)) && !isNaN(parseFloat(lastDefault))) {
          setOperations((curr) =>
            curr.map((op, i) =>
              i === curr.length - 1 ? `${op}${operation}` : op,
            ),
          );
        } else {
          setOperations((curr) => [...curr, operation]);
        }
        break;
    }
  };

  /**
   * Copies the current operation string to the clipboard and alerts the user
   */
  const handleCopyToClipboard = () => {
    // If the operations array is not empty
    if (operations.join('').trim() !== '') {
      // Copy the string to the clipboard
      Clipboard.setString(operations.join(''));
      // Alert the user
      if (Platform.OS === 'ios') {
        Alert.alert('Copied to clipboard');
      } else {
        ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={`${useColorScheme() === 'dark' ? 'light' : 'dark'}-content`}
      />
      <SafeAreaView style={styles.root}>
        <View style={{...styles.root, backgroundColor: theme.background}}>
          <View style={styles.displayContainer}>
            <Text
              onPress={handleCopyToClipboard}
              onLongPress={handleCopyToClipboard}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.5}
              style={{
                ...styles.displayText,
                color:
                  operations.length > 0 && operations[0] === 'Err'
                    ? theme.error
                    : theme.text,
              }}>
              {operations.join('')}
            </Text>
          </View>
          {buttons.map((row, i) => (
            <View key={i} style={styles.buttonRow}>
              {row.map((button, j) =>
                button.label === 'blank' ? (
                  <View
                    key={`${j}-${button.operation}`}
                    style={styles.blankButton}
                  />
                ) : (
                  <TouchableOpacity
                    key={button.label}
                    activeOpacity={0.7}
                    onPress={() => applyOperation(button.operation)}
                    onLongPress={() =>
                      button.operation === 'del' ? applyOperation('C') : {}
                    }
                    style={{
                      ...styles.blankButton,
                      backgroundColor:
                        button.label === '=' ? theme.accent : theme.card,
                    }}>
                    <Text
                      style={{
                        ...styles.buttonText,
                        color: button.label === '=' ? theme.card : theme.text,
                      }}>
                      {button.label}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, width: '100%'},
  displayContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 15,
  },
  displayText: {
    width: '100%',
    fontSize: 100,
    textAlign: 'right',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  blankButton: {
    width: (Dimensions.get('screen').width - 8 * 15) / 4,
    marginVertical: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  buttonText: {fontSize: fontSize + 5},
});

export default App;
