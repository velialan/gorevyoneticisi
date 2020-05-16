import styled from 'styled-components'
import {View} from 'react-native';
import {compose, color, size, flexbox,space } from 'styled-system'

const Box = styled(View)(
    compose(
        space,
        color,
        size,
        flexbox
    ),
);
 

export default Box