import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../constants/colors';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CustomButton from './CustomButton';

const ImageChangeModal = ({
  isVisible,
  onCameraPress,
  onGalleryPress,
  onCancelPress,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headingTxt}>Change Profile Picture</Text>
        </View>
        <View style={styles.btnsContainer}>
          <TouchableOpacity onPress={onCameraPress} style={styles.imgButton}>
            <Ionicon name="camera" style={styles.icon} />
            <Text style={styles.imgButtonTxt}>Take from Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onGalleryPress} style={styles.imgButton}>
            <Ionicon name="image" style={styles.icon} />
            <Text style={styles.imgButtonTxt}>Select from Gallery</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <CustomButton
            title="Cancel"
            onPress={onCancelPress}
            containerStyles={{backgroundColor: colors.SECONDARY}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    backgroundColor: colors.PRIMARY,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  headingTxt: {
    color: colors.WHITE,
    fontSize: 22,
  },
  btnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  imgButton: {
    backgroundColor: colors.SECONDARY,
    width: 160,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  imgButtonTxt: {
    color: colors.WHITE,
  },
  icon: {
    color: colors.WHITE,
    fontSize: 50,
    marginBottom: 5,
  },
});

export default ImageChangeModal;
