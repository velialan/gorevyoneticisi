import React, { useState } from 'react';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import { CardTitle, CardContainer, CardCheck, CardDate, CardAlarm } from '../Components/card';
import { HeeaderContainer, HeaderInfo } from '../Components/header';
import Box from '../Components/box';
import Text from '../Components/text';
import {HeeaderReminder} from '../Components/headerreminder';

const DATA = [
  {
    id: '1',
    title: 'Proje gönderilecek',
    time: '07:00 AM',
    checked: true,
    alarm: true

  },
  {
    id: '2',
    title: 'Ders çalışma vakti',
    time: '10:53 PM',
    checked: false,
    alarm: false
  },
  {
    id: '3',
    title: 'Yazılım öğren',
    time: '11:00 AM',
    checked: true,
    alarm: false
  },
  {
    id: '3',
    title: 'Yazılım öğren',
    time: '11:00 AM',
    checked: true,
    alarm: false
  },
  {
    id: '4',
    title: 'Yazılım öğren 4',
    time: '11:00 AM',
    checked: true,
    alarm: false
  },
  {
    id: '5',
    title: 'Yazılım öğren 5',
    time: '11:00 AM',
    checked: true,
    alarm: false
  },
  {
    id: '6',
    title: 'Yazılım öğren 6 ',
    time: '11:00 AM',
    checked: true,
    alarm: false
  },

];

function Home() {
  const [finish, setfinish] = React.useState(true)
  const [alarm, setalarm] = React.useState(true)
  const renderHeader = () => {
    return <Text px={8} py={10} fontSize={18} fontWeight="bold" color="#8B87B3">Bugün</Text>;
  };
  return (

    <Box flex={1}>
<StatusBar backgroundColor='#5F87E7'/>
      <HeeaderContainer p={10} >
        <HeaderInfo />
        <HeeaderReminder />
      </HeeaderContainer>
      <FlatList
        style={{ flex: 1 }}
        data={DATA}
        ListHeaderComponent={renderHeader}
        renderItem={({ item, index }) => (
          <Box index={index} px={8} py={5}>
            <CardContainer flexDirection='row' alignItems='center'>
              <CardCheck onPress={() => setfinish(!finish)} bg={finish ? 'white' : 'checkcontainercolor'} finish={finish} />
              <CardDate px={5}>{item.time}</CardDate>
              <CardTitle>{item.title}</CardTitle>
              <CardAlarm onPress={() => setalarm(!alarm)} finish={alarm} />
            </CardContainer>
          </Box>)}
        keyExtractor={item => item.id}
      />
    </Box>
  );
}
export default Home