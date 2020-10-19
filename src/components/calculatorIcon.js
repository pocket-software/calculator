import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import useTheme from '../utils/useTheme';
import PropTypes from 'prop-types';

const CalculatorIcon = ({name, fontSize}) => (
  <Icon name={name} size={fontSize} color={useTheme().text} />
);

CalculatorIcon.propTypes = {
  name: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
};

export default CalculatorIcon;
