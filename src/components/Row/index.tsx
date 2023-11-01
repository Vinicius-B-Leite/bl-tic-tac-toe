import React from 'react';
import { View } from 'react-native';
import Box, { BoxType } from '../Box';

type RowProps = BoxType & {
    index: number,
    children: React.ReactNode
}
const Row: React.FC<RowProps> = ({ children, index, ...rest }) => {
    return (
        <Box
            borderBottomColor='secondText'
            borderBottomWidth={index !== 2 ? 1 : 0}
            flexDirection='row'
            {...rest}
        >

            {children}
        </Box>
    )
}

export default Row;