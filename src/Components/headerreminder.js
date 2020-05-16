import React, { useState } from 'react';
import Box from '../Components/box';
import Text from '../Components/text';
import Button from '../Components/button';
import { Image } from 'react-native';
import Close from './icons/X';
import Notification from '../assets/user/notification.png';

export function HeeaderReminder({ children, ...props }) {
    const [visible, setvisible] = useState(true)
    return (
        <Box>
            {
                visible ? (
                    <Box height={90} borderRadius="normal" bg='#d0d0d0'   {...props} >
                        <Box flex={1} alignItems="flex-end" p={2}>
                            <Button onPress={() => setvisible(!visible)} position="absolute" mr={0} mb={0} >
                                <Close width={20} height={20} stroke="white" />
                            </Button>
                        </Box>
                        <Box px={15} py={10} flexDirection="row" alignItems="center" justifyContent="space-between">
                            <Box>
                                <Text fontSize={18} fontWeight="bold" color='white'>Hatırlatıcı</Text>
                                <Text fontSize={12} color='white'>Ders Çalışma Vakti</Text>
                                <Text fontSize={12} color='white'>13:00 AM</Text>

                            </Box>
                            <Box as={Image} resizeMode="cover" style={{ height: 45, width: 45 }} source={Notification} />
                        </Box>
                    </Box>
                ) : (
                        <Box></Box>
                    )
            }

        </Box>

    );
}