import Box from '@/components/Box';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const Menu: React.FC = () => {

    const { top, bottom } = useSafeAreaInsets()
    const navigation = useAppNavigation()




    return (
        <Box flex={1} bg='bg' style={{ paddingTop: top, paddingBottom: bottom }}>

            <Box flex={1} paddingHorizontal={28} justifyContent='center'>

                <Text variant='title' fontSize={40} textAlign='center'  >BL Games</Text>

                <Box flex={0.3} justifyContent='space-evenly'>
                    <Button
                        onPress={() => navigation.navigate('TicTacToe1')}
                        borderColor='primaryContrast'
                        borderWidth={1}
                        borderRadius={5}
                        p={20}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Text color='primaryContrast' fontSize={25}>Jogo da velha 1</Text>
                    </Button>

                    <Button
                        onPress={() => navigation.navigate('TicTacToe2')}
                        borderColor='secondContrast'
                        borderWidth={1}
                        p={20}
                        borderRadius={5}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Text color='secondContrast' fontSize={25}>Jogo da velha 2</Text>
                    </Button>
                </Box>

            </Box>
        </Box>
    )
}

export default Menu;