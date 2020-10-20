import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import useTheme from '../utils/useTheme';
import Icon from 'react-native-vector-icons/Feather';
import Divider from './divider';
import {version} from '../../package.json';

const options = [
  {
    icon: 'flag',
    label: 'Report a bug',
    url: 'https://pocket.software/report?app=calculator',
  },
  {
    icon: 'star',
    label: 'Rate this app',
    url:
      'https://play.google.com/store/apps/details?id=software.pocket.calculator',
  },
];

// const appIcons = [
//   {name: 'dark', image: require('../assets/images/dark_logo_transparent.png')},
//   {
//     name: 'light',
//     image: require('../assets/images/light_logo_transparent.png'),
//   },
// ];

const SettingsModal = (props, ref) => {
  // const [appIcon, setAppIcon] = useState('dark');
  const theme = useTheme();

  // useEffect(() => {
  //   AsyncStorage.getItem('@app_icon').then((value) => {
  //     if (value) {
  //       setAppIcon(value);
  //     } else {
  //       AsyncStorage.setItem('@app_icon', 'dark');
  //     }
  //   });
  // }, []);
  //
  // const handleChangeIcon = (name) => {};

  return (
    <Modalize
      ref={ref}
      handleStyle={{
        backgroundColor: theme.card,
      }}
      modalStyle={{...styles.container, backgroundColor: theme.background}}
      flatListProps={{
        data: options,
        // ListHeaderComponent: (
        //   <View style={styles.section}>
        //     <Text style={{...styles.sectionHeader, color: theme.text}}>
        //       Change App Icon
        //     </Text>
        //     <FlatList
        //       data={appIcons}
        //       contentContainerStyle={{marginVertical: 15}}
        //       horizontal
        //       ItemSeparatorComponent={() => <View style={{width: 15}} />}
        //       renderItem={({item}) => (
        //         <TouchableOpacity
        //           onPress={() => handleChangeIcon(item.name)}
        //           style={{
        //             borderColor:
        //               appIcon === item.name ? theme.accent : 'transparent',
        //             borderWidth: 2,
        //             borderRadius: 15,
        //             padding: 10,
        //             backgroundColor:
        //               item.name === 'dark' ? global.black : global.white,
        //           }}>
        //           <Image
        //             source={item.image}
        //             style={{
        //               width: 50,
        //               height: 50,
        //               borderRadius: 15,
        //               padding: 10,
        //             }}
        //           />
        //         </TouchableOpacity>
        //       )}
        //     />
        //   </View>
        // ),
        ListFooterComponent: (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://pocket.software')}>
            <Text style={{...styles.copyright, color: theme.text}}>
              {'Made with  ❤  by Pocket Software'}
            </Text>
            <Text style={{...styles.version, color: theme.text}}>
              v{version}
            </Text>
          </TouchableOpacity>
        ),
        ItemSeparatorComponent: Divider,
        keyExtractor: (item) => item.label,
        renderItem: ({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.pageButton}
            onPress={() => Linking.openURL(item.url)}>
            <View style={styles.pageButtonInfo}>
              <Icon name={item.icon} color={theme.text} size={25} />
              <Text style={{...styles.pageButtonText, color: theme.text}}>
                {item.label}
              </Text>
            </View>
            <Icon name={'chevron-right'} color={theme.card} size={30} />
          </TouchableOpacity>
        ),
      }}
      adjustToContentHeight
    />
  );
};

const styles = StyleSheet.create({
  container: {paddingVertical: 20},
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  pageButtonInfo: {flexDirection: 'row', alignItems: 'center'},
  pageButtonText: {
    fontSize: 20,
    marginLeft: 10,
  },
  copyright: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5,
  },
  version: {
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default React.forwardRef(SettingsModal);
