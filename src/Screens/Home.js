import React, { useState, useEffect } from 'react';
import { StatusBar, SectionList } from 'react-native';
import { HeeaderContainer, HeaderInfo } from '../Components/header';//header componentimiz
import Box from '../Components/box';//box (View) styled system components import ettik
import { HeeaderReminder } from '../Components/headerreminder'; //hatırlatıcıyı import ediyoruz
import { CardTitle, CardContainer, CardCheck, CardDate, CardAlarm } from '../Components/card';
import Text from '../Components/text';
var service = new Data();
import Data from '../sqlite/data'//sqlite da CRUD işlemlerini kolaylaştıran kütübhane kod kalabalığından kurtarır

function Home() {
  service.init();//veri tabanımız oluşturuldu

  useEffect(() => {

    //görevler tablosu oluşturuldu
    service.createTable("gorevler", [
      {
        name: 'id',
        dataType: 'integer',
        isNotNull: true,
        options: 'PRIMARY KEY AUTOINCREMENT'
      },
      {
        name: 'title',
        dataType: 'text',
        isNotNull: false,//test ortamında sıkıntı çıkarmaması için şimdilik tanımlandı

      },
      {
        name: 'date',
        dataType: 'text',
        isNotNull: false,//test ortamında sıkıntı çıkarmaması için şimdilik tanımlandı

      },
      {
        name: 'time',
        dataType: 'text',
        isNotNull: false,//test ortamında sıkıntı çıkarmaması için şimdilik tanımlandı

      },
      {
        name: 'alarm',//alarm olacak mı olmayacak mı
        dataType: 'Boolean',
        isNotNull: false,//test ortamında sıkıntı çıkarmaması için şimdilik tanımlandı

      },
      {
        name: 'completed',//tamamlanma durumu
        dataType: 'Boolean',
        isNotNull: false,//test ortamında sıkıntı çıkarmaması için şimdilik tanımlandı

      },
      {
        //alarmda her hafta, her gün, ve her ay, kullanımı için gerekli.
        //1=> hergün 2=> her hafta 3=> her ay için değer gelecek default value=> 0
        //0=> sadece anlık 1 defaya mahsus görevler için
        name: 'taststatus',
        dataType: 'integer',
        isNotNull: false,

      },
      //join işlemleri için kategori_id
      // {
      //   name: 'catagory_id',
      //   dataType: 'integer',
      //   isNotNull: false,

      // }
    ])
    //kategori işlemleri tablosu
    // service.createTable("kategori", [
    //   {
    //     name: 'id',
    //     dataType: 'integer',
    //     isNotNull: true,
    //     options: 'PRIMARY KEY AUTOINCREMENT'
    //   },
    //   {
    //     name: 'title',
    //     dataType: 'text',
    //     isNotNull: false,

    //   },     
    // ])
    //kategori işlemleri kayıtları
    // service.insert("kategori", { 
    //   title: "Kişisel",     
    // })
    // service.insert("kategori", {
    //   title: "İş",     
    // })
    // service.insert("kategori", {
    //   title: "Toplantı",     
    // })
    // service.insert("kategori", {
    //   title: "Ders",     
    // })
    // service.insert("kategori", {
    //   title: "Alışveriş",     
    // })
    // service.insert("kategori", {
    //   title: "Diğer",     
    // })

  }, []);
  const [tasklisttoday, settasklisttoday] = useState([]);
  const [tasklisttomorrow, settasklisttomorrow] = useState([]);

  useEffect(() => {
    today()
    tomorrow()
    // alert(gettomorrowDate())
  })

  const getcurrentDate = (deger = null) => {

    var zeromonth = '';// başına sıfır eklemek için (günlerin)
    var date = new Date().getDate() + deger;//10 dan küçükse başında 0 gelmiyor
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
    var result = await service.select("gorevler", "", { date: getcurrentDate(0) })
    settasklisttoday(result)
  }
  //yarın yapılacaklar litesi
  const tomorrow = async () => {
    var result = await service.select("gorevler", "", { date: getcurrentDate(1) })
    settasklisttomorrow(result)
  }


  const completedtask = async (id) => {
    await service.update("gorevler", { completed: true }, { id: id })
    alert('görev tamamlandı')
    today();
    tomorrow();
  }
  const createalarm = async(id) => {
    await service.update("gorevler", { alarm: true }, { id: id })
    alert('Alarm güncellendi')
    today();
    tomorrow();
  }
  return (

    <Box flex={1}>
      <StatusBar backgroundColor='#5F87E7' />
      <HeeaderContainer p={10} >
        <HeaderInfo />
        <HeeaderReminder />
      </HeeaderContainer>
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
            <CardCheck onPress={() => completedtask(item.id)} bg={item.completed ? 'checkcontainercolor' : 'white'}  borderColor={item.completed ? 'white' : 'gray'} />
            <CardDate px={5}>{item.time}</CardDate>
            <CardTitle textdecoration={item.completed}>{item.title}</CardTitle>
            <CardAlarm onPress={() => createalarm(item.id)} finish={item.alarm} />
          </CardContainer>
        }
        keyExtractor={(item, index) => index}
      />
    </Box>
  );
}
export default Home