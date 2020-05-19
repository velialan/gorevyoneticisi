import React, { useState } from 'react';
import Box from '../Components/box';
import { FlatList, ScrollView, Alert, useWindowDimensions } from 'react-native';//takvim için cihaz genişliğini aldık {useWindowDimensions}
import Text from '../Components/text';
import Button from '../Components/button';
import moment from 'moment';//gelen tarihi parse etmek için
import TextInput from '../Components/textinput';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import 'moment/locale/tr';//locale olarak tr seçtik ekrana türkçe basması için
import { LocaleConfig, CalendarList } from 'react-native-calendars';
import Data from '../sqlite/data'//sqlite  CRUD işlemlerini kolaylaştırıcı kütüphane
var service = new Data();

//takvimim türkçeleştirilmesi birden fazla tanımlanabilir
LocaleConfig.locales['tr'] = {
  monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
  monthNamesShort: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'May.', 'Haz.', 'Tem.', 'Ağsts.', 'Eylül.', 'Ekim', 'Kasım', 'Aralık'],
  dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  dayNamesShort: ['Pazar.', 'P.tesi', 'Sal.', 'Çar.', 'Per.', 'Cum.', 'C.tesi.'],
  today: 'Aujourd\'hui'
};
//birden fazla tanımlanan uzantıyı buraya vermemiz gerekiyor
LocaleConfig.defaultLocale = 'tr';
const Catagory = [
  {
    id: '1',
    title: 'Kişisel',
  },
  {
    id: '2',
    title: 'İş',
  },
  {
    id: '3',
    title: 'Toplantı',
  },
  {
    id: '4',
    title: 'Ders',
  },
  {
    id: '5',
    title: 'Alışveriş',
  },
  {
    id: '6',
    title: 'Diğer',
  },
];

var Catagory_ID = 0;//özel kategori eklendiğinde sqlite tarafında inner join işlemleri için kategori_id sini alıyoruz
function selectedItems(onSelect, id) {
  onSelect(id)//seçileni belli etmek için
  Catagory_ID = id;
}
function Item({ id, title, selected, onSelect }) {
  var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

  return (
    <Box height={50} p={10}>
      <Button bg={selected ? '#1ED102' : 'white'} height={40} borderRadius="normal" onPress={() => selectedItems(onSelect, id)} flex={1} p={10} flexDirection="row" alignItems="center" justifyContent="space-between">
        {!selected ? <Box p={5} size={15} borderRadius="full" bg={ColorCode}></Box> : <Box></Box>
        }
        <Text p={5} fontSize={16} color={!selected ? '#8E8E8E' : 'white'}>{title}</Text>
      </Button>
    </Box>

  );
}

//react navigationdan ile bize Router'dan {navigation} geldi bu sayede ekran geçişlerini yapabiliyoruz
function AddTask({ navigation }) {
  const [text, settext] = useState("");
  const [selected, setSelected] = useState(new Map());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tarih, settarih] = useState([]);
  const [saat, setsaat] = useState("");
  const [alarm, setalarm] = useState(false);

  const [herGun, setherGun] = useState(false);
  const [herHafta, setherHafta] = useState(false);
  const [herAy, setherAy] = useState(false);

  const [taskStatus, settaskStatus] = useState(0);//alarmda her hafta, her gün, ve her ay, kullanımı için gerekli.
  //1=> hergün 2=> her hafta 3=> her ay için değer gelecek default value=> 0
  //0=> sadece anlık 1 defaya mahsus görevler için

  //FlatList seçilen item
  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
    },
    [selected],
  );


  //datetimepicker modal

  const showDatePicker = (date) => {
    settarih(date)
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setsaat(moment(date).format('LT'))

  };


  const windowWidth = useWindowDimensions().width;


  //Görev Ekleme
  const addtaskbutton = async () => {


    await service.insert("gorevler", {
      title: text,
      date: tarih.dateString,
      time: saat,
      alarm: alarm,//ana ekranda alarm simgesine dokunarak tanımlayabilecek extra screen gerekli
      completed: false,//tamamlanma durumu ana ekrandan değiştirilecek dafaul olarak false
     // taststatus:taskStatus//alarmda her hafta, her gün, ve her ay, kullanımı için gerekli.
      //1=> hergün 2=> her hafta 3=> her ay için değer gelecek default value=> 0
      //0=> sadece anlık 1 defaya mahsus görevler için
    })
    Alert.alert(
      "Görev Ekleme",
      "Görev başarıyla eklendi.",
      [

        { text: "Tamam", onPress: () => navigation.goBack() }//eklendiğinde ana ekrana dönmek
      ],
      { cancelable: false }
    );
  }
  return (
    <Box flex={1} justifyContent="flex-end" >
      <Box borderTopLeftRadius={50} borderTopRightRadius={50} height="85%" bg="white"  >
        <Box flex={1} mt={50}>
          <Text fontSize={20} fontWeight="bold" textAlign="center">Görev Ekle</Text>
          <Box as={ScrollView}>
            <TextInput maxLength={25} placeholder="Görev Adı" onChangeText={text => settext(text)} value={text} height={52} fontSize={20} px={15} bg="white" color="black" />
            {/* //separator */}
            <Box height={2} mx={15} bg="#CFCFCF" my={10} />
            <Box height={50}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={Catagory}
                renderItem={({ item }) => (
                  <Item
                    id={item.id}
                    title={item.title}
                    selected={!!selected.get(item.id)}
                    onSelect={onSelect}
                  />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
              />
            </Box>
            {/* //separator */}

            <Box height={2} mx={15} my={10} bg="#CFCFCF" />

            {/* //Takvim */}

            <CalendarList
              horizontal={true}
              pagingEnabled={true}
              calendarWidth={windowWidth}
              onDayPress={(day) => showDatePicker(day)}

            />
            {/* //saat seçimi */}

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            {/* //separator */}

            <Box height={2} mx={15} my={10} bg="#CFCFCF" />
            <Button onPress={() => setalarm(!alarm)} mx={15} bg={!alarm ? 'gray' : '#1ED102'} p={10} height={20} borderRadius="normal" >
              <Text fontSize={14} fontWeight="bold" color={!alarm ? 'black' : 'white'} textAlign="center">Alarm</Text>
            </Button>

            <Text fontWeight="bold" fontSize={16} color="black" mx={15} my={5}>Görev Zamanı</Text>
            <Box mx={15} my={0} flex={1} flexDirection="row">
              {/* // settaskStatus(herGun?0:1) içindeki herGun (boolean) stateti ile tekrardan dokunduğunda "hiç seçim yapmadığını bilmek için"  0 değerini set ettik.    */}
              <Button mx={5} onPress={() => settaskStatus(herGun?0:1) & setherGun(!herGun) & setherHafta(false) & setherAy(false)} bg={!herGun ? 'gray' : '#1ED102'} p={10} height={20} borderRadius="normal" >
                <Text fontSize={14} fontWeight="bold" color={!herGun ? 'black' : 'white'} textAlign="center">Her Gün</Text>
              </Button>
              <Button mx={5} onPress={() => settaskStatus(herHafta?0:2) & setherHafta(!herHafta) & setherGun(false) & setherAy(false)} bg={!herHafta ? 'gray' : '#1ED102'} p={10} height={20} borderRadius="normal" >
                <Text fontSize={14} fontWeight="bold" color={!herHafta ? 'black' : 'white'} textAlign="center">Her Hafta</Text>
              </Button>
              <Button mx={5} onPress={() => settaskStatus(herAy?0:3) & setherAy(!herAy) & setherGun(false) & setherHafta(false)} bg={!herAy ? 'gray' : '#1ED102'} p={10} height={20} borderRadius="normal" >
                <Text fontSize={14} fontWeight="bold" color={!herAy ? 'black' : 'white'} textAlign="center">Her Ay</Text>
              </Button>
            </Box>

            <Text fontSize={16} fontWeight="bold" textAlign="center">{tarih.dateString} {saat}</Text>
            <Button onPress={addtaskbutton} p={10} m={10} borderRadius="normal" bg="#7EB6FF" justifyContent="center" alignItems="center">
              <Text fontSize={18} color="white">Görev Ekle</Text>
            </Button>


          </Box>{/* scrolview */}

        </Box>
      </Box>

    </Box>
  );
}

export default AddTask