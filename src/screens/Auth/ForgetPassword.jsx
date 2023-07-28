import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Header from '../../components/Header';
import {colors} from '../../constants/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {forgetPassword} from '../../redux/slices/forgetPasswordSlice';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ForgetPassword = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    state => state?.forgetPasswordReducer?.isLoading,
  );

  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    const dataObj = {
      email: email,
    };

    if (email === '') {
      ToastAndroid.show('Email is Required', ToastAndroid.LONG);
      return;
    }
    // else if (!emailRegex.test(email)) {
    //   ToastAndroid.show('Invalid Email', ToastAndroid.LONG);
    //   return;
    // }

    dispatch(forgetPassword(dataObj))
      .then(res => {
        console.log('response data forgetPassword ===>> ', res);
        const message = res?.payload?.message;

        if (res?.meta?.rejectedWithValue) {
          ToastAndroid.show(res?.payload, ToastAndroid.LONG);
        } else {
          ToastAndroid.show(message, ToastAndroid.LONG);
        }
      })
      .catch(err => {
        console.log('Error forgetPassword ==>> ', err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="TaskQuill" />

      <View style={styles.topView}>
        <Text style={styles.heading}>Forgot Password</Text>
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: 20}}>
          <View>
            <CustomInput
              placeholder={'Email'}
              placeholderTextColor={'#8c8c8c'}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View
            style={{
              marginTop: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomButton
              title={'Submit'}
              onPress={() => handleSubmit()}
              isLoading={isLoading}
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
  heading: {
    color: colors.WHITE,
    fontSize: 26,
  },
  topView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});

export default ForgetPassword;
