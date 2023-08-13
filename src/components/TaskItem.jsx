import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../constants/colors';
import moment from 'moment';

const TaskItem = ({data, onPress}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{width: '75%'}}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.title}>{data?.title}</Text>
        </View>
        <View style={{}}>
          <Text style={styles.description}>
            {moment(data?.date).format('MMM DD, YYYY')} — {data?.description}
          </Text>
        </View>
      </View>
      <View
        style={{width: '31%', alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={[
            styles.statusTxt,
            {
              color:
                data?.status == 'Completed'
                  ? '#7CFC00'
                  : data?.status == 'Pending'
                  ? '#F28C28'
                  : data?.status == 'Expired'
                  ? '#FF3131'
                  : colors.WHITE,
            },
          ]}>
          {data?.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.WHITE,
    borderRadius: 10,
    padding: 15,
    margin: 12,
  },
  title: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: colors.WHITE,
    fontSize: 14,
  },
  statusTxt: {
    color: colors.WHITE,
  },
});

export default TaskItem;
