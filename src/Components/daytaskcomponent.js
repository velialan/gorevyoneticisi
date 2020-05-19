import React, { useState, useEffect } from 'react';
import { CardTitle, CardContainer, CardCheck, CardDate, CardAlarm } from './card';
import { SectionList } from 'react-native';
import Text from '../Components/text';
import Data from '../sqlite/data'//sqlite işlemlerini kolaylaştıran kütüphane
var service = new Data();


function DayTaskComponent() {
    const [tasklist, settasklist] = useState([]);
    
    useEffect(() => {
        refresh()
    })

    const refresh = async () => {
        var result = await service.select("gorevler")
        settasklist(result)
    }
    const completedtask = (id) => {
        //sqlite üzerinde update işlemi tamamlanan görevler       
    }
    const createalarm = (id) => {
        //sqlite üzerinde update işlemi alarm ekleme      
    }
    return (
        <SectionList
            sections={[
                { title: 'Bugün', data: tasklist },
                { title: 'Yarın', data: tasklist },
            ]}
            renderSectionHeader={({ section }) => (
                <Text px={8} py={10} fontSize={18} fontWeight="bold" color="#8B87B3">{section.title}</Text>
            )}
            renderItem={({ item, index }) =>
                <CardContainer  index={index} mx={5} my={5} flexDirection='row' alignItems='center'>
                    <CardCheck onPress={() => completedtask(item.id)} bg={item.completed ? 'checkcontainercolor' : 'white'} finish={item.completed} />
                    <CardDate px={5}>{item.time}</CardDate>
                    <CardTitle>{item.title}</CardTitle>
                    <CardAlarm onPress={() => createalarm(item.id)} finish={item.alarm} />
                </CardContainer>
            }
            keyExtractor={(item, index) => index}
        />

    );
}
export default DayTaskComponent