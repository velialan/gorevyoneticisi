import styled from 'styled-components'
import {Text as T} from 'react-native';
import {compose, color, size, space,typography } from 'styled-system'

const Text = styled(T)(
    compose(
        typography,
        space,
        color,
        size,        
    ),
);
 

export default Text