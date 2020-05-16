import React from 'react';
import { Text, ListView, TouchableOpacity, View } from 'react-native';
import Box from '../Components/box';
import Swipeable from 'react-native-swipeable';
import { Trash2 } from '../Components/icons';


const rightButtons = [
  <TouchableOpacity style={{ height: 80, width: 70, justifyContent: 'center', alignItems: 'flex-end' }}>
    <View style={{ height: 50, width: 50, backgroundColor: '#FFCFCF', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
      <Trash2 width={20} height={20} stroke="#FB3636" />
    </View>
  </TouchableOpacity>,
];

function AddTask() {

  return (
    <Box ml={2} flex={1} justifyContent="center">
      <Swipeable rightButtonWidth={70} rightButtons={rightButtons}>
        <View style={{ elevation:2, height: 80, backgroundColor: '#fff', borderColor: '#707070', borderRadius: 5,justifyContent:'center' }}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Send project file</Text>
        </View>
      </Swipeable>
    </Box>
  );
}
export default AddTask