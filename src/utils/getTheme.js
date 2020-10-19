import {Appearance} from 'react-native-appearance';
import dark from '../themes/dark';
import light from '../themes/light';

const getTheme = () => {
  const selectedTheme = Appearance.getColorScheme();

  if (selectedTheme === 'dark') {
    return dark;
  } else {
    return light;
  }
};

export default getTheme;
