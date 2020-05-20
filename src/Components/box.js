import styled from 'styled-components'
import { View } from 'react-native';
import { compose, color, size, flexbox, space, borderRadius, zIndex } from 'styled-system'
//color renk seçimleri için
//size gelen değer view'e width height olarak işleniyor
//flexbox flex değerleri için,
//space margin padding bottom top vs değerleri almak için
//z index  çok kullanmadım ama kullanırım diye en çok kullandıklarımı ekliyorum.
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
//default proplar ekleyebiliyoruz örneğin tüm boxlarda borderRadius değeri 5 yapmak gibi
// Box.defaultProps = {
//     p: 2,
//     bg: 'white',
//   }

export default Box