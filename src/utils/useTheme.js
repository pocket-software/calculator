import {useColorScheme} from 'react-native-appearance';
import dark from '../themes/dark';
import light from '../themes/light';

const useTheme = () => {
  const selectedTheme = useColorScheme();

  if (selectedTheme === 'dark') {
    return dark;
  } else {
    return light;
  }
};

export default useTheme;
