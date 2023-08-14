import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Header from '../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Octicon from 'react-native-vector-icons/Octicons';
import {colors} from '../constants/colors';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {addTask} from '../redux/slices/addTaskSlice';

const AddNewTask = ({navigation}) => {
  const dispatch = useDispatch();

  const token = useSelector(state => state?.loginReducer?.data?.token);
  const isLoading = useSelector(state => state?.addTaskReducer?.isLoading);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState(false);
  const [modeTime, setModeTime] = useState('time');
  const [showTime, setShowTime] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setIsDateSelected(true);
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowTime(false);
    setIsTimeSelected(true);
    setTime(currentDate);
  };

  const showMode = currentMode => {
    setShowDate(true);
    setMode(currentMode);
  };

  const showModeTime = currentMode => {
    setShowTime(true);
    setModeTime(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showModeTime('time');
  };

  const handleSubmit = () => {
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);

    time.setUTCSeconds(0);
    time.setUTCMilliseconds(0);

    const dataObj = {
      title: title,
      description: description,
      date: date,
      time: time,
    };

    console.log('dataObj ==>> ', dataObj);

    if (title == '') {
      return ToastAndroid.show('Title is required', ToastAndroid.SHORT);
    }

    if (!isDateSelected) {
      return ToastAndroid.show('Date is required', ToastAndroid.SHORT);
    }

    if (!isTimeSelected) {
      return ToastAndroid.show('Time is required', ToastAndroid.SHORT);
    }

    dispatch(addTask({data: dataObj, token: token}))
      .then(res => {
        console.log('response data addTask ==>> ', res);
        ToastAndroid.show(res?.payload?.message, ToastAndroid.SHORT);
        navigation.navigate('Tasks');

        setTitle('');
        setDescription('');
        setDate(new Date());
        setTime(new Date());
        setIsDateSelected(false);
        setIsTimeSelected(false);
      })
      .catch(error => {
        console.log('error addTask ==>> ', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Add New Task"
        menuEnabled
        onMenuPress={() => navigation.toggleDrawer()}
      />

      <View style={styles.subContainer}>
        <View style={{marginVertical: 40}}>
          <View style={{marginBottom: 30}}>
            <CustomInput
              value={title}
              onChangeText={text => setTitle(text)}
              placeholder={'Title'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{marginBottom: 30}}>
            <CustomInput
              value={description}
              onChangeText={text => setDescription(text)}
              placeholder={'Description'}
              placeholderTextColor={'#8c8c8c'}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={showDatepicker} style={styles.dateInput}>
              <View style={{marginRight: 15}}>
                <Octicon
                  name="calendar"
                  style={{fontSize: 18, color: colors.WHITE}}
                />
              </View>
              <Text style={styles.dateTxt}>
                {isDateSelected
                  ? moment(date).format('YYYY-MM-DD')
                  : 'Select Date'}
              </Text>
            </TouchableOpacity>
            {showDate && (
              <DateTimePicker
                value={date}
                mode={mode}
                onChange={onChangeDate}
              />
            )}

            <TouchableOpacity onPress={showTimepicker} style={styles.dateInput}>
              <View style={{marginRight: 15}}>
                <Octicon
                  name="clock"
                  style={{fontSize: 18, color: colors.WHITE}}
                />
              </View>
              <Text style={styles.dateTxt}>
                {isTimeSelected
                  ? moment(time).format('hh:mm A')
                  : 'Select Time'}
              </Text>
            </TouchableOpacity>
            {showTime && (
              <DateTimePicker
                value={time}
                mode={modeTime}
                onChange={onChangeTime}
              />
            )}
          </View>

          <View
            style={{
              marginTop: 60,
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
  },
  dateInput: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    width: '45%',
  },
  dateTxt: {
    color: '#FFFFFF',
  },
});

export default AddNewTask;
