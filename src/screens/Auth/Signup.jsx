import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import {colors} from '../../constants/colors';
import CustomInput from '../../components/CustomInput';
import PasswordInput from '../../components/PasswordInput';
import CustomButton from '../../components/CustomButton';

const Signup = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const handleSubmit = () => {};

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
              placeholder={'Email'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15, marginBottom: 15}}>
            <PasswordInput
              placeholder={'Password'}
              placeholderTextColor={'#8c8c8c'}
              secureTextEntry={showPassword}
              onIconPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <PasswordInput
            placeholder={'Confirm Password'}
            placeholderTextColor={'#8c8c8c'}
            secureTextEntry={showConfirmPassword}
            onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <View style={{marginTop: 15}}>
            <CustomInput
              placeholder={'Username'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              placeholder={'First Name'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              placeholder={'Last Name'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              placeholder={'Phone Number'}
              placeholderTextColor={'#8c8c8c'}
              keyboardType={'numeric'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              placeholder={'Address'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
              placeholder={'Occupation'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomInput
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
            <CustomButton title={'Signup'} onPress={() => handleSubmit()} />
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
