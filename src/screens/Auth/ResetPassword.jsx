import React, {useState, useEffect} from 'react';
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
import PasswordInput from '../../components/PasswordInput';
import CustomButton from '../../components/CustomButton';
import OTPInput from '../../components/OTPInput';
import {useDispatch, useSelector} from 'react-redux';
import {forgetPassword} from '../../redux/slices/forgetPasswordSlice';
import {resetPassword} from '../../redux/slices/resetPasswordSlice';

const ResetPassword = ({navigation, route}) => {
  const email = route?.params?.email;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);

  const handleResendCode = () => {
    const dataObj = {
      email: email,
    };

    dispatch(forgetPassword(dataObj))
      .then(res => {
        console.log('response data forgetPassword ===>> ', res);
        const message = res?.payload?.message;

        if (res?.meta?.rejectedWithValue) {
          ToastAndroid.show(res?.payload, ToastAndroid.LONG);
        } else {
          setMinutes(15);
          setSeconds(0);
          ToastAndroid.show(message, ToastAndroid.LONG);
        }
      })
      .catch(err => {
        console.log('Error forgetPassword ==>> ', err);
      });
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const dataObj = {
      email: email,
      otpCode: otpCode,
      newPassword: password,
    };

    if (otpCode === '') {
      ToastAndroid.show('OTP Code is Required', ToastAndroid.SHORT);
      return setIsLoading(false);
    } else if (otpCode.length !== 4) {
      ToastAndroid.show('OTP Code should be 4 digits long', ToastAndroid.SHORT);
      return setIsLoading(false);
    }

    if (password === '') {
      ToastAndroid.show('Password is Required', ToastAndroid.SHORT);
      return setIsLoading(false);
    } else if (password !== confPassword) {
      ToastAndroid.show('Passwords Do Not Match', ToastAndroid.SHORT);
      return setIsLoading(false);
    }

    dispatch(resetPassword(dataObj))
      .then(res => {
        console.log('response data resetPassword ===>> ', res);
        if (res?.meta?.rejectedWithValue) {
          ToastAndroid.show(res?.payload, ToastAndroid.LONG);
          setIsLoading(false);
        } else {
          ToastAndroid.show(res?.payload?.message, ToastAndroid.LONG);
          navigation.navigate('Login');
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log('Error: ', err);
        setIsLoading(false);
      });
  };

  const formatTime = time => (time < 10 ? `0${time}` : time);

  useEffect(() => {
    let interval = null;

    if (minutes === 0 && seconds === 0) {
      // Timer expired
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="TaskQuill" />

      <View style={styles.topView}>
        <Text style={styles.heading}>Reset Password</Text>
      </View>

      <View style={{paddingLeft: 40, paddingRight: 40, paddingBottom: 10}}>
        <Text style={styles.subHeading}>
          A 4-digit OTP Code has been sent to your email {email}. Please enter
          it below.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: 20}}>
          <View style={{marginTop: 15, marginBottom: 15}}>
            <View
              style={{
                marginBottom: 30,
              }}>
              <OTPInput
                otpCodeChanged={code => {
                  setOtpCode(code);
                }}
              />
            </View>

            <PasswordInput
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder={'Enter New Password'}
              placeholderTextColor={'#8c8c8c'}
              secureTextEntry={showPassword}
              onIconPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <PasswordInput
            value={confPassword}
            onChangeText={text => setConfPassword(text)}
            placeholder={'Confirm New Password'}
            placeholderTextColor={'#8c8c8c'}
            secureTextEntry={showConfirmPassword}
            onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <View
            style={{
              marginTop: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomButton
              title={'Submit'}
              disabled={minutes === 0 && seconds === 0 ? true : false}
              onPress={() => handleSubmit()}
              isLoading={isLoading}
            />
          </View>

          {minutes === 0 && seconds === 0 && (
            <View
              style={{
                marginTop: 15,
                marginBottom: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomButton
                title="Send Code Again"
                onPress={() => handleResendCode()}
              />
            </View>
          )}

          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: colors.WHITE, fontSize: 16}}>
              OTP Code will expire in {formatTime(minutes)}:
              {formatTime(seconds)}
            </Text>
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
  subHeading: {
    fontSize: 16,
    color: colors.WHITE,
    textAlign: 'center',
    lineHeight: 24,
  },
  topView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});

export default ResetPassword;
