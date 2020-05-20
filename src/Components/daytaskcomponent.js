import React, { useState, useEffect } from 'react';
import { CardTitle, CardContainer, CardCheck, CardDate, CardAlarm } from './card';
import { SectionList, Alert } from 'react-native';
import Text from '../Components/text';
import Data from '../sqlite/data'//sqlite işlemlerini kolaylaştıran kütüphane
var service = new Data();


function DayTaskComponent() {
    const [tasklisttoday, settasklisttoday] = useState([]);
    const [tasklisttomorrow, settasklisttomorrow] = useState([]);

    useEffect( () => {
        today()
        tomorrow()
       // alert(gettomorrowDate())
    })
    const getcurrentDate = (gunarttir=0) => {

        var zeromonth = '';// başına sıfır eklemek için (günlerin)
        var date = new Date().getDate()+gunarttir;//10 dan küçükse başında 0 gelmiyor
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        if (month < 10) {
            zeromonth = '0' + month;
        } else {
            zeromonth = month;
        }
        return year + '-' + zeromonth + '-' + date;

    }

   
    //bugün yapılacaklar listesi
    const today = async () => {
        var result = await service.select("gorevler","*",{date:getcurrentDate(0)})
        settasklisttoday(result)
    }
    //yarın yapılacaklar litesi
    const tomorrow = async () => {
        var result = await service.select("gorevler","*",{date:getcurrentDate(1)})
        settasklisttomorrow(result)
    }


    const completedtask = async (id) => {
      await  service.update("gorevler",{completed:true},{id:id})
        alert('görev tamamlandı')
        today();
        tomorrow();
    }
    const createalarm = (id) => {
        //sqlite üzerinde update işlemi alarm ekleme      
    }
    return (
        <SectionList
            sections={[
                { title: 'Bugün', data: tasklisttoday },
                { title: 'Yarın', data: tasklisttomorrow },
            ]}
            renderSectionHeader={({ section }) => (
                <Text px={15} py={10} fontSize={18} fontWeight="bold" color="#8B87B3">{section.title}</Text>
            )}
            renderItem={({ item, index }) =>
                <CardContainer index={index} mx={5} my={5} flexDirection='row' alignItems='center'>
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