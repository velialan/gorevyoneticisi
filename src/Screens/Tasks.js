import React from 'react';
import Box from '../Components/box';
import { HeeaderContainer, HeaderInfo } from '../Components/header';
import {HeeaderReminder} from '../Components/headerreminder';
import TaskCard from '../Components/taskcard';
function Tasks() {
  return (
    <Box flex={1}>
        <HeeaderContainer p={10} >
        <HeaderInfo />
        <HeeaderReminder />
      </HeeaderContainer>
      <TaskCard/>

    </Box>
  );
}
export default Tasks