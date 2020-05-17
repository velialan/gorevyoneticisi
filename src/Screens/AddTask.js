import React, { useState, useEffect } from 'react';
import Box from '../Components/box';
import {  FlatList, ScrollView } from 'react-native';
import Text from '../Components/text';
import Button from '../Components/button';
import moment from 'moment';//gelen tarihi parse etmek için
import TextInput from '../Components/textinput';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import 'moment/locale/tr';//locale olarak tr seçtik ekrana türkçe basması için
import { Calendar, LocaleConfig, CalendarList, Agenda } from 'react-native-calendars';

LocaleConfig.locales['tr'] = {
  monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
  monthNamesShort: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'May.', 'Haz.', 'Tem.', 'Ağsts.', 'Eylül.', 'Ekim', 'Kasım', 'Aralık'],
  dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  dayNamesShort: ['Pazar.', 'P.tesi', 'Sal.', 'Çar.', 'Per.', 'Cum.', 'C.tesi.'],
  today: 'Aujourd\'hui'
};
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
    title: 'Alışveris',
  },
  {
    id: '6',
    title: 'Diğer',
  },
];
function Item({ id, title, selected, onSelect }) {
  var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

  return (
    <Box height={50} p={10}>
      <Button bg={selected ? '#1ED102' : 'white'} height={40} borderRadius="normal" onPress={() => onSelect(id)} flex={1} p={10} flexDirection="row" alignItems="center" justifyContent="space-between">
        {!selected ? <Box p={5} size={15} borderRadius="full" bg={ColorCode}></Box> : <Box></Box>
        }
        <Text p={5} fontSize={16} color={!selected ? '#8E8E8E' : 'white'}>{title}</Text>
      </Button>
    </Box>

  );
}

function AddTask() {
  const [value, setvalue] = useState("");
  const [selected, setSelected] = React.useState(new Map());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [tarih,settarih]=useState([]);
const [saat,setsaat]=useState("");

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



  return (
    <Box flex={1} justifyContent="flex-end" >

      <Box borderTopLeftRadius={50} borderTopRightRadius={50} height="85%" bg="white"  >
        <Box flex={1} mt={50}>
          <Text fontSize={20} fontWeight="bold" textAlign="center">Görev Ekle</Text>
          <Box as={ScrollView}>
            <TextInput placeholder="Görev Adı" onChange={e => setvalue(e.text)} value={value} height={52} fontSize={20} px={15} bg="white" color="black" />
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
            <Box height={2} mx={15} my={10} bg="#CFCFCF" />
            <CalendarList
              // Enable horizontal scrolling, default = false
              horizontal={true}
              // Enable paging on horizontal, default = false
              pagingEnabled={true}
              // Set custom calendarWidth.
              calendarWidth={360}
              onDayPress={(day)=> showDatePicker(day)}

            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
                        <Box height={2} mx={15} my={10} bg="#CFCFCF" />

            <Text fontSize={16} fontWeight="bold" textAlign="center">{tarih.dateString} {saat}</Text>
            <Button p={10} m={10}  borderRadius="normal" bg="#7EB6FF" justifyContent="center" alignItems="center">
              <Text fontSize={18} color="white">Görev Ekle</Text>
            </Button>

          </Box>{/* scrolview */}

        </Box>
      </Box>

    </Box>
  );
}

export default AddTask