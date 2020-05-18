import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { HeeaderContainer, HeaderInfo } from '../Components/header';//header componentimiz
import Box from '../Components/box';//box (View) styled system components import ettik
import { HeeaderReminder } from '../Components/headerreminder'; //hatırlatıcıyı import ediyoruz
import Data from '../sqlite/data'//sqlite da CRUD işlemlerini kolaylaştıran kütübhane kod kalabalığından kurtarır
import DayTaskComponent from '../Components/daytaskcomponent';//componentlerimizi impor ediyoruz
var service = new Data();


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
        isNotNull: false,

      },
      {
        name: 'date',
        dataType: 'text',
        isNotNull: false,

      },
      {
        name: 'time',
        dataType: 'text',
        isNotNull: false,

      },
      {
        name: 'alarm',//alarm olacak mı olmayacak mı
        dataType: 'Boolean',
        isNotNull: false,

      },
      {
        name: 'completed',//tamamlanma durumu
        dataType: 'Boolean',
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

  return (

    <Box flex={1}>
      <StatusBar backgroundColor='#5F87E7' />
      <HeeaderContainer p={10} >
        <HeaderInfo />
        <HeeaderReminder />
      </HeeaderContainer>
      <DayTaskComponent />

    </Box>
  );
}
export default Home