import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../constants/colors';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import {BASE_URL} from '../constants/apiURL';
import {useDispatch, useSelector} from 'react-redux';
import {editProfile} from '../redux/slices/editProfileSlice';
import ImageChangeModal from '../components/ImageChangeModal';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

const USER_PLACEHOLDER = require('../assets/images/user-avatar.png');

const EditProfile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const data = route?.params?.data;

  console.log('data from route params (EditProfile)', data);

  const token = useSelector(state => state?.loginReducer?.data?.token);

  const [isImageUploading, setIsImageUploading] = useState(false);

  const [imageData, setImageData] = useState({});
  const [imageUri, setImageUri] = useState(data?.profileImage);

  console.log('imageData ===>> ', imageData);
  console.log('imageUri ===>> ', imageUri);

  const [firstName, setFirstName] = useState(
    data?.firstName ? data?.firstName : '',
  );

  const [lastName, setLastName] = useState(
    data?.lastName ? data?.lastName : '',
  );

  const [userName, setUserName] = useState(
    data?.username ? data?.username : '',
  );

  const [phoneNumber, setPhoneNumber] = useState(
    data?.phone ? data?.phone : '',
  );

  const [address, setAddress] = useState(data?.address ? data?.address : '');

  const [occupation, setOccupation] = useState(
    data?.occupation ? data?.occupation : '',
  );

  const [aboutMe, setAboutMe] = useState(data?.aboutMe ? data?.aboutMe : '');

  const [showImageChangeModal, setShowImageChangeModal] = useState(false);

  const handleCameraSelect = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        // console.log(image);

        setImageData(image);

        setImageUri(image?.path);

        setShowImageChangeModal(!showImageChangeModal);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGallerySelect = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        // console.log(image);

        setImageData(image);

        setImageUri(image?.path);

        setShowImageChangeModal(!showImageChangeModal);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleImageUpload = async () => {
    setIsImageUploading(true);

    const formData = new FormData();

    const imageType = imageData?.mime;
    const imageName = imageUri.split('/').pop();

    const imageObj = {
      uri: imageUri,
      type: imageType,
      name: imageName,
    };

    console.log('image payload ===>> ', imageObj);

    formData.append('profileImage', imageObj);

    await fetch(`${BASE_URL}/users/upload-image`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('response data upload-image ==>> ', data);
        setIsImageUploading(false);
        ToastAndroid.show(data?.message, ToastAndroid.SHORT);
        setImageData({});
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    const dataObj = {
      username: userName,
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber,
      address: address,
      occupation: occupation,
      aboutMe: aboutMe,
    };

    console.log('data payload ===>> ', dataObj);

    dispatch(editProfile({data: dataObj, token: token}))
      .then(response => {
        console.log('response data editProfile ==> ', response);
        ToastAndroid.show(response?.payload?.message, ToastAndroid.SHORT);
        navigation.navigate('UserProfile');
      })
      .catch(error => {
        console.log('error editProfile ==> ', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Edit Profile"
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
            <View style={{marginBottom: 10}}>
              <View>
                <Image
                  source={imageUri ? {uri: imageUri} : USER_PLACEHOLDER}
                  style={styles.profileImg}
                />
                <TouchableOpacity
                  onPress={() => setShowImageChangeModal(true)}
                  style={{
                    backgroundColor: colors.PRIMARY,
                    width: 40,
                    height: 40,
                    borderRadius: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 0,
                    right: 5,
                  }}>
                  <AntDesignIcon
                    name="plus"
                    style={{color: colors.WHITE, fontSize: 24}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {Object.keys(imageData).length === 0 ? null : (
            <View
              style={{
                marginBottom: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomButton
                title="Upload Image"
                onPress={() => handleImageUpload()}
                isLoading={isImageUploading}
              />
            </View>
          )}

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>First Name:</Text>
            <TextInput
              value={firstName}
              onChangeText={text => setFirstName(text)}
              style={styles.inputBox}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>Last Name:</Text>
            <TextInput
              value={lastName}
              onChangeText={text => setLastName(text)}
              style={styles.inputBox}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>Username:</Text>
            <TextInput
              value={userName}
              onChangeText={text => setUserName(text)}
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
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              style={styles.inputBox}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>Address:</Text>
            <TextInput
              value={address}
              onChangeText={text => setAddress(text)}
              style={styles.inputBox}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>Occupation:</Text>
            <TextInput
              value={occupation}
              onChangeText={text => setOccupation(text)}
              style={styles.inputBox}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
            }}>
            <Text style={[styles.label, {marginBottom: 15}]}>About Me:</Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              value={aboutMe}
              onChangeText={text => setAboutMe(text)}
              style={[styles.inputBox, {}]}
            />
          </View>

          <View
            style={{
              marginBottom: 45,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomButton title="Submit" onPress={() => handleSubmit()} />
          </View>
        </View>
      </ScrollView>

      <ImageChangeModal
        isVisible={showImageChangeModal}
        onCameraPress={() => handleCameraSelect()}
        onGalleryPress={() => handleGallerySelect()}
        onCancelPress={() => setShowImageChangeModal(!showImageChangeModal)}
      />
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
    width: 160,
    height: 160,
    borderRadius: 160,
  },
  label: {
    color: colors.WHITE,
    fontSize: 19,
    fontWeight: '700',
  },
  inputBox: {
    color: colors.WHITE,
    borderColor: colors.WHITE,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 19,
    padding: 15,
    margin: 0,
    lineHeight: 30,
  },
});

export default EditProfile;
