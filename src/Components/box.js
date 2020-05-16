import styled from 'styled-components'
import {View} from 'react-native';
import {compose, color, size, flexbox,space,borderRadius,zIndex} from 'styled-system'

const Box = styled(View)(
    compose(
        space,
        color,
        size,
        flexbox,
        borderRadius,
        zIndex
    ),
);
 

export default Box