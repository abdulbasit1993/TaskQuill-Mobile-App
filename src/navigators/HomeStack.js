import React from 'react';
import {Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import UserProfile from '../screens/UserProfile';
import Tasks from '../screens/Tasks';
import AddNewTask from '../screens/AddNewTask';
import TaskDetail from '../screens/TaskDetail';
import CustomDrawer from '../components/CustomDrawer';
import {colors} from '../constants/colors';

const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        swipeEdgeWidth: 0,
        drawerStyle: {
          // width: '100%',
        },
      }}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          drawerLabel: () => <Text style={{color: colors.WHITE}}>Home</Text>,
        }}
      />

      <Drawer.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          drawerLabel: () => <Text style={{color: colors.WHITE}}>Profile</Text>,
        }}
      />

      <Drawer.Screen
        name="Tasks"
        component={Tasks}
        options={{
          drawerLabel: () => <Text style={{color: colors.WHITE}}>Tasks</Text>,
        }}
      />

      <Drawer.Screen
        name="AddNewTask"
        component={AddNewTask}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />

      <Drawer.Screen
        name="TaskDetail"
        component={TaskDetail}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeStack;
