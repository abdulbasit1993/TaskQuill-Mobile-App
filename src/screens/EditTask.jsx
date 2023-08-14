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
import {editTask} from '../redux/slices/editTaskSlice';
import DropDownPicker from 'react-native-dropdown-picker';

const EditTask = ({navigation, route}) => {
  const dispatch = useDispatch();

  const data = route.params.data;

  console.log('data (Edit Task) ==> ', data);

  const token = useSelector(state => state?.loginReducer?.data?.token);
  const isLoading = useSelector(state => state?.editTaskReducer?.isLoading);

  const [title, setTitle] = useState(data?.title ? data?.title : '');
  const [description, setDescription] = useState(
    data?.description ? data?.description : '',
  );
  const [date, setDate] = useState(
    data?.date ? new Date(data?.date) : new Date(),
  );
  const [time, setTime] = useState(
    data?.time ? new Date(data?.time) : new Date(),
  );
  const [isDateSelected, setIsDateSelected] = useState(
    data?.date ? true : false,
  );
  const [isTimeSelected, setIsTimeSelected] = useState(
    data?.time ? true : false,
  );
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState(false);
  const [modeTime, setModeTime] = useState('time');
  const [showTime, setShowTime] = useState(false);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [statusValue, setStatusValue] = useState(
    data?.status ? data?.status : null,
  );
  const [statusItems, setStatusItems] = useState([
    {label: 'Pending', value: 'Pending'},
    {label: 'Completed', value: 'Completed'},
  ]);

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
    const dataObj = {
      title: title,
      description: description,
      date: date,
      time: time,
      status: statusValue,
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

    dispatch(editTask({id: data?._id, data: dataObj, token: token}))
      .then(res => {
        console.log('response data editTask ==> ', res);
        ToastAndroid.show(res?.payload?.message, ToastAndroid.SHORT);
        navigation.navigate('Tasks');
      })
      .catch(error => {
        console.log('error editTask ==> ', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Edit Task"
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

          <View style={{marginTop: 30}}>
            <DropDownPicker
              open={openStatusDropdown}
              value={statusValue}
              items={statusItems}
              setOpen={setOpenStatusDropdown}
              setValue={setStatusValue}
              setItems={setStatusItems}
              style={{backgroundColor: colors.PRIMARY}}
              labelStyle={{
                fontWeight: 'bold',
                color: colors.WHITE,
              }}
              arrowIconStyle={{tintColor: colors.WHITE}}
              listMode="MODAL"
            />
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

export default EditTask;
