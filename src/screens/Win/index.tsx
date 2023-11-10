import Box from '@/components/Box';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { RootParamsList } from '@/routes/type.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

type WinProps = NativeStackScreenProps<RootParamsList, 'Win'>



const Win: React.FC<WinProps> = ({ navigation, route }) => {
    const { winner } = route.params

    const textColor = winner === 'O' ? 'secondContrast' : 'primaryContrast'

    return (
        <Box flex={1} bg='bg' padding={28} alignItems='center'>

            <Text color='secondText' fontSize={30} mt={28}>
                o <Text color={textColor}>{winner}</Text> ganhou!!!
            </Text>

            <Box justifyContent='center' flex={1}>
                <Text color={textColor} fontSize={100} >{winner}</Text>
            </Box>


            <Box style={{ marginTop: 'auto' }} alignSelf='flex-end'>
                <Button onPress={() => navigation.navigate('Menu')} >
                    <Text textDecorationLine='underline'>Voltar</Text>
                </Button>
            </Box>
        </Box>
    )
}

export default Win;