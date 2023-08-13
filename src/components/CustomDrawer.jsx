import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {colors} from '../constants/colors';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const USER_PLACEHOLDER = require('../assets/images/user-avatar.png');

const CustomDrawer = props => {
  const navigation = useNavigation();

  const userData = useSelector(state => state?.userProfileReducer?.data?.data);
  const userName = userData?.firstName + ' ' + userData?.lastName;

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 30,
        }}>
        <View style={{marginBottom: 20}}>
          <Image source={USER_PLACEHOLDER} style={styles.profileImg} />
        </View>

        <Text style={{fontSize: 20, color: colors.WHITE}}>{userName}</Text>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* ================= Footer ================= */}
      <View style={styles.footerSection}>
        <View style={styles.divider}></View>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Confirm Log Out',
              'Are you sure you want to log out?',
              [
                {
                  text: 'Yes',
                  onPress: () => {
                    AsyncStorage.clear();
                    navigation.navigate('Auth', {screen: 'Login'});
                  },
                },
                {
                  text: 'No',
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }}
          style={{marginTop: 20}}>
          <Text style={{color: colors.WHITE, fontSize: 16, fontWeight: '700'}}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
  },
  profileImg: {
    width: 120,
    height: 120,
  },
  footerSection: {
    marginTop: 'auto',
    paddingVertical: 60,
    paddingHorizontal: 25,
  },
  divider: {
    height: 0.3,
    backgroundColor: colors.WHITE,
  },
});

export default CustomDrawer;
