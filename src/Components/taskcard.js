import React from 'react';
import Box from '../Components/box';
import Text from '../Components/text';
import Button from '../Components/button';
import { Image, FlatList } from 'react-native';
import TaskImage from '../assets/user/user.png';
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
const renderContactsItem = ({ item, index }) => {
    var ColorCode = 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + 1 + ')';
    return (
        <Box height={200} width="50%">
            <Button m={5} borderRadius="normal" flex={1} bg="white" justifyContent="center" alignItems="center">
                <Box size={80} borderRadius="full" bg={ColorCode} justifyContent="center" alignItems="center">
                    <Box as={Image} resizeMode="cover" style={{ height: 30, width: 30, borderRadius: 15 }} source={TaskImage} />
                </Box>
                <Text fontSize={18}>{item.title}</Text>
                <Text fontSize={12} color="gray">{index + 5} Göreviniz Var</Text>
            </Button>
        </Box>

    )


}
function TaskCard() {


    return (
        <FlatList
            numColumns="2"
            data={Catagory}
            renderItem={renderContactsItem}
            keyExtractor={item => item.id}
        />

    );
}

export default TaskCard