import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors} from '../constants/colors';
import Header from '../components/Header';
import FloatingActionButton from '../components/FloatingActionButton';
import AllTasks from './AllTasks';
import PendingTasks from './PendingTasks';
import ExpiredTasks from './ExpiredTasks';
import CompletedTasks from './CompletedTasks';

const Tasks = ({navigation}) => {
  const [allTasksSelected, setAllTasksSelected] = useState(true);
  const [pendingTasksSelected, setPendingTasksSelected] = useState(false);
  const [completedTasksSelected, setCompletedTasksSelected] = useState(false);
  const [expiredTasksSelected, setExpiredTasksSelected] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Tasks"
        menuEnabled
        onMenuPress={() => navigation.toggleDrawer()}
      />

      <View style={styles.subContainer}>
        {/* ================= Tabs ================= */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setAllTasksSelected(true);
              setPendingTasksSelected(false);
              setCompletedTasksSelected(false);
              setExpiredTasksSelected(false);
            }}
            style={{
              borderBottomColor: colors.WHITE,
              borderBottomWidth: allTasksSelected ? 2 : 0,
              width: 100,
              alignItems: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 16,
              }}>
              All Tasks
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setPendingTasksSelected(true);
              setAllTasksSelected(false);
              setCompletedTasksSelected(false);
              setExpiredTasksSelected(false);
            }}
            style={{
              borderBottomColor: colors.WHITE,
              borderBottomWidth: pendingTasksSelected ? 2 : 0,
              width: 90,
              alignItems: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 16,
              }}>
              Pending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setCompletedTasksSelected(true);
              setPendingTasksSelected(false);
              setAllTasksSelected(false);
              setExpiredTasksSelected(false);
            }}
            style={{
              borderBottomColor: colors.WHITE,
              borderBottomWidth: completedTasksSelected ? 2 : 0,
              width: 100,
              alignItems: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 16,
              }}>
              Completed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setExpiredTasksSelected(true);
              setCompletedTasksSelected(false);
              setPendingTasksSelected(false);
              setAllTasksSelected(false);
            }}
            style={{
              borderBottomColor: colors.WHITE,
              borderBottomWidth: expiredTasksSelected ? 2 : 0,
              width: 100,
              alignItems: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 16,
              }}>
              Expired
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= Task Content ================= */}
        <View style={{height: '77%'}}>
          {allTasksSelected ? (
            <AllTasks />
          ) : pendingTasksSelected ? (
            <PendingTasks />
          ) : expiredTasksSelected ? (
            <ExpiredTasks />
          ) : completedTasksSelected ? (
            <CompletedTasks />
          ) : null}
        </View>
      </View>

      <FloatingActionButton onPress={() => navigation.navigate('AddNewTask')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY,
  },
  subContainer: {
    marginHorizontal: 10,
  },
});

export default Tasks;
