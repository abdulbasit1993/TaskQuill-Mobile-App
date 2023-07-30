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
import PasswordInput from '../../components/PasswordInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {signupUser} from '../../redux/slices/signupSlice';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Signup = ({navigation}) => {
  const dispatch = useDispatch();

  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    occupation: '',
    aboutMe: '',
  });
  const [confPassword, setConfPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const isLoading = useSelector(state => state?.signupReducer?.isLoading);

  console.log('isLoading ==> ', isLoading);

  const handleSubmit = () => {
    console.log('dataObj ==> ', signupData);

    if (signupData?.email === '') {
      ToastAndroid.show('Email is Required', ToastAndroid.LONG);
      return;
    } else if (!emailRegex.test(signupData?.email)) {
      ToastAndroid.show('Invalid Email', ToastAndroid.LONG);
      return;
    }

    if (signupData?.password === '') {
      ToastAndroid.show('Password is Required', ToastAndroid.LONG);
      return;
    } else if (signupData?.password !== confPassword) {
      ToastAndroid.show('Passwords Do Not Match', ToastAndroid.LONG);
      return;
    }

    if (signupData?.username === '') {
      ToastAndroid.show('Username is Required', ToastAndroid.LONG);
      return;
    }

    dispatch(signupUser(signupData))
      .then(res => {
        console.log('response data signupUser ===>> ', res);
        if (res?.meta?.rejectedWithValue) {
          ToastAndroid.show(res?.payload, ToastAndroid.LONG);
          return;
        } else {
          ToastAndroid.show(res?.payload?.message, ToastAndroid.LONG);
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="TaskQuill" />

      <View style={styles.topView}>
        <Text style={styles.heading}>Signup</Text>
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: 20}}>
          <View>
            <CustomInput
              value={signupData?.email}
              onChangeText={text =>
                setSignupData(prevState => ({...prevState, email: text}))
              }
              placeholder={'Email'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15, marginBottom: 15}}>
            <PasswordInput
              value={signupData?.password}
              onChangeText={text =>
                setSignupData(prevState => ({...prevState, password: text}))
              }
              placeholder={'Password'}
              placeholderTextColor={'#8c8c8c'}
              secureTextEntry={showPassword}
              onIconPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <PasswordInput
            value={confPassword}
            onChangeText={text => setConfPassword(text)}
            placeholder={'Confirm Password'}
            placeholderTextColor={'#8c8c8c'}
            secureTextEntry={showConfirmPassword}
            onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <View style={{marginTop: 15}}>
            <CustomInput
              value={signupData?.username}
              onChangeText={text =>
                setSignupData(prevState => ({...prevState, username: text}))
              }
              placeholder={'Username'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              value={signupData?.firstName}
              onChangeText={text =>
                setSignupData(prevState => ({...prevState, firstName: text}))
              }
              placeholder={'First Name'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              value={signupData?.lastName}
              onChangeText={text =>
                setSignupData(prevState => ({...prevState, lastName: text}))
              }
              placeholder={'Last Name'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              value={signupData?.phone}
              onChangeText={text =>
                setSignupData(prevState => ({...prevState, phone: text}))
              }
              placeholder={'Phone Number'}
              placeholderTextColor={'#8c8c8c'}
              keyboardType={'numeric'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              value={signupData?.address}
              onChangeText={text =>
                setSignupData(prevState => ({...prevState, address: text}))
              }
              placeholder={'Address'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              value={signupData?.occupation}
              onChangeText={text =>
                setSignupData(prevState => ({...prevState, occupation: text}))
              }
              placeholder={'Occupation'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              value={signupData?.aboutMe}
              onChangeText={text =>
                setSignupData(prevState => ({...prevState, aboutMe: text}))
              }
              placeholder={'About Me'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View
            style={{
              marginTop: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomButton
              title={'Signup'}
              onPress={() => handleSubmit()}
              isLoading={isLoading}
            />
          </View>

          <View
            style={{
              marginTop: 25,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: colors.WHITE, fontSize: 17}}>
              Already have an account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{marginLeft: 8}}>
              <Text
                style={{color: colors.WHITE, fontSize: 17, fontWeight: '700'}}>
                Login
              </Text>
            </TouchableOpacity>
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

export default Signup;
