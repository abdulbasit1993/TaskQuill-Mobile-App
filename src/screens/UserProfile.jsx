import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {colors} from '../constants/colors';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfile} from '../redux/slices/userProfileSlice';

const USER_PLACEHOLDER = require('../assets/images/user-avatar.png');

const UserProfile = ({navigation}) => {
  const dispatch = useDispatch();

  const token = useSelector(state => state?.loginReducer?.data?.token);
  const userData = useSelector(state => state?.userProfileReducer?.data?.data);
  const userName = userData?.firstName + ' ' + userData?.lastName;

  useEffect(() => {
    dispatch(getUserProfile(token));
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profile"
        menuEnabled
        onMenuPress={() => navigation.toggleDrawer()}
      />

      <ScrollView>
        <View style={styles.subContainer}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 30,
            }}>
            <View style={{marginBottom: 20}}>
              <Image source={USER_PLACEHOLDER} style={styles.profileImg} />
            </View>
            <Text style={{fontSize: 28, color: colors.WHITE}}>{userName}</Text>
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>Username:</Text>
            <TextInput
              editable={false}
              value={userData?.username}
              style={styles.inputBox}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>Email:</Text>
            <TextInput
              editable={false}
              value={userData?.email}
              style={styles.inputBox}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>
              Phone Number:
            </Text>
            <TextInput
              editable={false}
              value={userData?.phone}
              style={styles.inputBox}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>Address:</Text>
            <TextInput
              editable={false}
              value={userData?.address}
              style={styles.inputBox}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>Occupation:</Text>
            <TextInput
              editable={false}
              value={userData?.occupation}
              style={styles.inputBox}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>About Me:</Text>
            <TextInput
              editable={false}
              multiline={true}
              value={userData?.aboutMe}
              style={styles.inputBox}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY,
  },
  subContainer: {
    flex: 2,
    marginHorizontal: 25,
  },
  greetingText: {
    fontSize: 17,
    color: colors.WHITE,
  },
  subHeading: {
    fontSize: 20,
    color: colors.WHITE,
    fontWeight: '600',
  },
  heading: {
    color: colors.WHITE,
    fontSize: 25,
  },
  profileImg: {
    width: 140,
    height: 140,
  },
  label: {
    color: colors.WHITE,
    fontSize: 19,
    fontWeight: '700',
  },
  inputBox: {
    color: colors.WHITE,
    fontSize: 19,
    padding: 0,
    margin: 0,
    lineHeight: 30,
  },
});

export default UserProfile;
