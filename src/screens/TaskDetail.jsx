import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import {colors} from '../constants/colors';
import moment from 'moment';
import Octicon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {deleteTask} from '../redux/slices/deleteTaskSlice';

const TaskDetail = ({route, navigation}) => {
  const dispatch = useDispatch();
  const data = route.params.data;

  const token = useSelector(state => state?.loginReducer?.data?.token);
  const isLoading = useSelector(state => state?.deleteTaskReducer?.isLoading);

  //   console.log('route params (task detail) ==> ', route.params.data);

  const handleDeleteTask = () => {
    dispatch(deleteTask({data: data?._id, token: token}))
      .then(res => {
        console.log('response data deleteTask ==>> ', res);
        ToastAndroid.show(res?.payload?.message, ToastAndroid.SHORT);
        navigation.navigate('Tasks');
      })
      .catch(error => {
        console.log('error deleteTask ==>> ', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Task Details"
        menuEnabled
        onMenuPress={() => navigation.toggleDrawer()}
      />

      <View style={styles.subContainer}>
        <View>
          <Text style={styles.titleTxt}>{data?.title}</Text>
        </View>

        <View style={{marginTop: 30}}>
          <Text style={styles.descTxt}>{data?.description}</Text>
        </View>

        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: colors.WHITE,
            borderWidth: 1,
            borderRadius: 60,
            width: 150,
            padding: 10,
          }}>
          <Octicon name="clock" style={{fontSize: 18, color: colors.WHITE}} />
          <Text style={[styles.descTxt, {marginLeft: 15}]}>
            {moment(data?.time).format('hh:mm A')}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              marginTop: 40,
              borderColor: colors.WHITE,
              borderWidth: 1,
              borderRadius: 15,
              padding: 20,
              width: '46%',
            }}>
            <MaterialIcon
              name="task"
              style={{fontSize: 30, color: colors.WHITE}}
            />
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 20,
                fontWeight: '700',
                marginTop: 20,
                marginBottom: 15,
              }}>
              Status
            </Text>

            <Text
              style={{
                color:
                  data?.status == 'Pending'
                    ? '#F28C28'
                    : data?.status == 'Expired'
                    ? '#FF3131'
                    : data?.status == 'Completed'
                    ? '#7CFC00'
                    : colors.WHITE,
                fontSize: 18,
              }}>
              {data?.status}
            </Text>
          </View>

          <View
            style={{
              marginTop: 40,
              borderColor: colors.WHITE,
              borderWidth: 1,
              borderRadius: 15,
              padding: 20,
              width: '46%',
            }}>
            <Octicon
              name="calendar"
              style={{fontSize: 30, color: colors.WHITE}}
            />
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 20,
                fontWeight: '700',
                marginTop: 20,
                marginBottom: 15,
              }}>
              Due Date
            </Text>

            <Text
              style={{
                color: colors.WHITE,
                fontSize: 18,
              }}>
              {moment(data?.date).format('MMMM DD, YYYY')}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 70,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <CustomButton
            title="Edit"
            onPress={() => navigation.navigate('EditTask', {data: data})}
          />

          <CustomButton
            title="Delete"
            onPress={() => {
              Alert.alert(
                'Confirm Delete Task',
                'Are you sure you want to delete this task?',
                [
                  {
                    text: 'Yes',
                    onPress: () => handleDeleteTask(),
                  },
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
            }}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY,
  },
  subContainer: {
    marginHorizontal: 25,
    marginVertical: 40,
  },
  titleTxt: {
    color: colors.WHITE,
    fontSize: 22,
    fontWeight: '700',
  },
  descTxt: {
    color: colors.WHITE,
    fontSize: 19,
  },
});

export default TaskDetail;
