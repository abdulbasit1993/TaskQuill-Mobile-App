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
import {loginUser} from '../../redux/slices/loginSlice';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const isLoading = useSelector(state => state.loginReducer.isLoading);
  const error = useSelector(state => state.loginReducer.error);
  console.log('isLoading ==> ', isLoading);
  console.log('error ==> ', error);

  const handleSubmit = () => {
    const dataObj = {
      email: email,
      password: password,
    };

    console.log('dataObj ===>> ', dataObj);

    if (email === '') {
      ToastAndroid.show('Email is Required', ToastAndroid.LONG);
      return;
    } else if (!emailRegex.test(email)) {
      ToastAndroid.show('Invalid Email', ToastAndroid.LONG);
      return;
    }

    if (password === '') {
      ToastAndroid.show('Password is Required', ToastAndroid.LONG);
      return;
    }

    dispatch(loginUser(dataObj))
      .then(res => {
        console.log('response data loginUser ==> ', res);
        if (res?.meta?.rejectedWithValue) {
          ToastAndroid.show(res?.payload, ToastAndroid.LONG);
        } else {
          ToastAndroid.show(res?.payload?.message, ToastAndroid.LONG);
        }
      })
      .catch(error => {
        console.log('error => ', error);
      });

    if (error != null) {
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="TaskQuill" />

      <View style={styles.topView}>
        <Text style={styles.heading}>Login</Text>
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

          <View style={{marginTop: 15, marginBottom: 15}}>
            <PasswordInput
              placeholder={'Password'}
              placeholderTextColor={'#8c8c8c'}
              secureTextEntry={showPassword}
              onIconPress={() => setShowPassword(!showPassword)}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>

          <View
            style={{
              marginTop: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomButton
              title={'Login'}
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
              Don't have an account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={{marginLeft: 8}}>
              <Text
                style={{color: colors.WHITE, fontSize: 17, fontWeight: '700'}}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text
                style={{color: colors.WHITE, fontSize: 17, fontWeight: '700'}}>
                Forgot Password?
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

export default Login;
