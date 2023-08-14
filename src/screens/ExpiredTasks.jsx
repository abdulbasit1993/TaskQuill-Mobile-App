import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTasks} from '../redux/slices/getTaskSlice';
import TaskItem from '../components/TaskItem';
import {colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';

const ExpiredTasks = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector(state => state?.loginReducer?.data?.token);
  const taskData = useSelector(state => state?.getTaskReducer?.data?.data);
  const isLoading = useSelector(state => state?.getTaskReducer?.isLoading);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const expiredTasks = taskData?.filter(item => item?.status == 'Expired');

  const latestTasks = expiredTasks?.slice()?.reverse();

  console.log('latestTasks ==>> ', latestTasks);

  const handleRefresh = () => {
    setIsRefreshing(true);

    dispatch(getTasks(token));

    setIsRefreshing(false);
  };

  useEffect(() => {
    dispatch(getTasks(token));
  }, []);

  return (
    <View>
      {isLoading ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={'#FFF'} />
          <Text style={{color: colors.WHITE, fontSize: 17, marginTop: 10}}>
            Loading...
          </Text>
        </View>
      ) : (
        <FlatList
          data={latestTasks}
          renderItem={({item}) => (
            <TaskItem
              onPress={() => navigation.navigate('TaskDetail', {data: item})}
              data={item}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  height: 500,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: colors.WHITE, fontSize: 22}}>
                  No Tasks!
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default ExpiredTasks;
