import React from 'react';
import Box from '../Components/box';
import Text from '../Components/text';
import { Image } from 'react-native';
import userphoto from '../assets/user/velialan.jpg';

export function HeaderInfo({ children }) {
    return (
        <Box px={15} py={10} flexDirection="row" alignItems="center" justifyContent="space-between">
            <Box>
                <Text fontSize={18} fontWeight="bold" color='white'>Merhaba Veli</Text>
                <Text fontSize={12} color='white'>Bugün hiç görevin yok</Text>
            </Box>
            <Box as={Image} resizeMode="cover" style={{ height: 50, width: 50, borderRadius: 25 }} source={userphoto} />
        </Box>
    );
}


export function HeeaderContainer({ children, ...props }) {
    return <Box bg='#81C7F5'  {...props} >
        {children}
    </Box>
}

