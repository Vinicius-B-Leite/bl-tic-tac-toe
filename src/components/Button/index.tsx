import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Box, { BoxType } from '@/components/Box';


type ButtonProps = BoxType & {
    onPress: () => void,
    children: React.ReactNode
}
const Button: React.FC<ButtonProps> = ({ onPress, children, ...boxProps }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Box {...boxProps}>
                {children}
            </Box>
        </TouchableOpacity>
    )
}

export default Button;