import React from 'react';
import Box from '../Components/box';
import { HeeaderContainer, HeaderInfo } from '../Components/header';
import {HeeaderReminder} from '../Components/headerreminder';
function Tasks() {
  return (
    <Box>
        <HeeaderContainer p={10} >
        <HeaderInfo />
        <HeeaderReminder />
      </HeeaderContainer>
    </Box>
  );
}
export default Tasks