import Box from '@/components/Box';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { ThemeType } from '@/theme/theme';
import useTicTacToe from './useTicTacToe';





const TicTacToe1: React.FC = () => {


    const { top, bottom } = useSafeAreaInsets()
    const theme = useTheme<ThemeType>()
    const navigation = useAppNavigation()

    const { currentPlayer, game, handleMark } = useTicTacToe()


    return (
        <Box
            flex={1}
            backgroundColor='bg'
            p={20}
            style={{ paddingTop: top, paddingBottom: bottom }}>

            <Button
                onPress={() => navigation.goBack()}
                flexDirection='row'
                alignItems='center'
                gap={10}
                marginTop={18}
                style={{ width: '30%' }}
            >
                <AntDesign name="arrowleft" size={theme.spacing[28]} color={theme.colors.primaryText} />
                <Text color='secondText' fontSize={20}>
                    Voltar
                </Text>
            </Button>

            <Text fontSize={25} color='secondText' textAlign='center' marginTop={80}>
                É a vez de <Text
                    color={currentPlayer === 'X' ? 'primaryContrast' : 'secondContrast'}
                    fontWeight='bold'
                    fontSize={30}
                >
                    {currentPlayer}
                </Text>
            </Text>
            <Box justifyContent='center' alignItems='center' mt={80}>
                {
                    game.map((line, lineIndex) => (
                        <Box
                            borderBottomColor='secondText'
                            borderBottomWidth={lineIndex !== 2 ? 1 : 0}
                            flexDirection='row'>
                            {
                                line.map((v, columnIndex) => (
                                    <Button
                                        onPress={() => handleMark(lineIndex, columnIndex, currentPlayer)}
                                        width={120}
                                        height={120}
                                        justifyContent='center'
                                        alignItems='center'
                                        borderRightWidth={columnIndex !== 2 ? 1 : 0}
                                        borderRightColor='secondText'

                                    >
                                        <Text
                                            fontSize={30}
                                            color={v == 'X' ? 'primaryContrast' : 'secondContrast'}>{v}</Text>
                                    </Button>
                                ))
                            }
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default TicTacToe1;