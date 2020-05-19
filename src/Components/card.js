import React from 'react';
import Box from '../Components/box';
import Text from '../Components/text';
import Button from '../Components/button';
// import Swipeable from 'react-native-swipeable';//RN0.62 sorun çıkardığı için kaldırıldı
import { Trash2, Check, Bell } from '../Components/icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';//dokunma efektlerini yakaladığımız kütüphane



const renderRightActions = () => {

    return (
        <Box width={70} height="100%" justifyContent="center" alignItems="center">
            <Button size={50} borderRadius="full" bg="deletecontainer" justifyContent="center" alignItems="center">
                <Trash2 width={20} height={20} stroke="#FB3636" />
            </Button>
        </Box>
    );
};
export function CardTitle({ children }) {
    return <Text color='textprimary' fontSize={14} fontWeight="bold">{children}</Text>
}
export function CardContainer({ children, ...props }) {
    return (
        <Swipeable renderRightActions={renderRightActions}>

            <Box bg="white" {...props} borderRadius="normal" py={25} px={12} borderLeftWidth={5} pl={5} borderLeftColor="#FFD506">
                {children}
            </Box>
        </Swipeable>
    );

}

export function CardCheck({ finish, ...props }) {
    return (
        <Button size={40} {...props} borderRadius="full" borderWidth={3} borderColor={finish ? 'white' : 'gray'} justifyContent="center" alignItems="center">
            <Check width={20} height={20} stroke="white" />
        </Button>
    );
}

export function CardDate({ children, ...props }) {
    return <Text {...props} fontSize={11} color="datetextcolor" fontWeight="bold">{children}</Text>
}

export function CardAlarm({ finish, ...props }) {
    return (
        <Box  {...props} flex={1} alignItems="flex-end" >
            <Button size={40}>
                <Bell width={30} {...props} height={30} stroke={finish ? '#FFDC00' : 'gray'} />
            </Button>
        </Box>
    )





}