import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  BackHandler,
} from 'react-native';
import {colors} from '../constants/colors';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfile} from '../redux/slices/userProfileSlice';
import {getTasks} from '../redux/slices/getTaskSlice';
import TaskItem from '../components/TaskItem';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const token = useSelector(state => state?.loginReducer?.data?.token);
  const userData = useSelector(state => state?.userProfileReducer?.data?.data);
  const userName = userData?.firstName + ' ' + userData?.lastName;
  const taskData = useSelector(state => state?.getTaskReducer?.data?.data);

  const pendingTasks = taskData?.filter(task => task?.status == 'Pending');
  const latestTasks = pendingTasks?.slice()?.reverse();

  const [greeting, setGreeting] = useState('Good Morning');

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const morningStart = 0;
  const afternoonStart = 12;
  const eveningStart = 18;

  useEffect(() => {
    if (currentHour >= morningStart && currentHour < afternoonStart) {
      setGreeting('Good Morning');
    } else if (currentHour >= afternoonStart && currentHour < eveningStart) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    dispatch(getUserProfile(token));
  }, [token]);

  useEffect(() => {
    dispatch(getTasks(token));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="TaskQuill"
        menuEnabled
        onMenuPress={() => navigation.toggleDrawer()}
      />

      <View style={styles.subContainer}>
        <View style={{paddingVertical: 30}}>
          <Text style={styles.greetingText}>
            {greeting}, {userName ? userName : 'User'}!
          </Text>
        </View>

        <View style={{}}>
          <Text style={styles.subHeading}>
            What would you like to do today?
          </Text>
        </View>

        <View style={{marginTop: 20}}>
          <SearchBar
            onChangeText={text => console.log('search text ==> ', text)}
          />
        </View>

        <View
          style={{
            marginTop: 35,
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          {latestTasks?.length > 0 && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: colors.WHITE,
                  fontSize: 21,
                  textAlign: 'center',
                  lineHeight: 32,
                }}>
                Your Pending Tasks
              </Text>
            </View>
          )}

          <FlatList
            data={latestTasks}
            renderItem={({item}) => (
              <TaskItem
                data={item}
                onPress={() => navigation.navigate('TaskDetail', {data: item})}
              />
            )}
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text
                    style={{
                      color: colors.WHITE,
                      fontSize: 21,
                      textAlign: 'center',
                      lineHeight: 32,
                    }}>
                    You have no pending tasks.
                  </Text>

                  <Text
                    style={{
                      color: colors.WHITE,
                      fontSize: 21,
                      textAlign: 'center',
                      lineHeight: 32,
                    }}>
                    Add some tasks by going to side menu -> Tasks -> + icon on
                    the bottom right
                  </Text>
                </View>
              );
            }}
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
    flex: 1,
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
});

export default HomeScreen;
