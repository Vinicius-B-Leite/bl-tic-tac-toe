import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Box, { BoxType } from '../Box';


type CellProps = BoxType & {
    index: number,
    children: React.ReactNode,
    onPress: () => void,
    wasWined: boolean
}
const Cell: React.FC<CellProps> = ({ index, children, onPress, wasWined, ...rest }) => {


    return (
        <TouchableOpacity onPress={() => !wasWined && onPress()}>
            <Box
                borderColor='secondText'
                justifyContent='center'
                alignItems='center'
                borderRightWidth={index !== 2 ? 1 : 0}
                {...rest}
            >
                {children}
            </Box>
        </TouchableOpacity>
    )
}

export default Cell;