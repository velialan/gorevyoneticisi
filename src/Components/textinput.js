import styled from 'styled-components'
import {TextInput} from 'react-native';
import {compose, color,typography, size, space} from 'styled-system'

const Input = styled(TextInput)(
    compose(
        typography,
        space,
        color,
        size,  
        
    ),
);
 

export default Input