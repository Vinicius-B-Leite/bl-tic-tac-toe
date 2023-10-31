import Box from '@/components/Box';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { ThemeType } from '@/theme/theme';
import { useTheme } from '@shopify/restyle';
import React, { Children } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTicTacToe2 from './useTicTacToe2';

// import { Container } from './styles';

const TicTacToe2: React.FC = () => {
    const { top, bottom } = useSafeAreaInsets()
    const theme = useTheme<ThemeType>()
    const navigation = useAppNavigation()

    const { game } = useTicTacToe2()

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

            <Box mt={80} justifyContent='center' alignItems='center'>
                {
                    game.map((line, lineIndex) => (
                        <Box
                            borderColor='secondText'
                            flexDirection='row'
                            borderBottomWidth={[0, 1].includes(lineIndex) ? 2 : 0}

                        >
                            {
                                line.map((l2, l2Index) => (
                                    <Row index={l2Index}>
                                        {
                                            l2.map((v, i) => (
                                                <BigCeulalar index={i} miniCelularList={v} />
                                            ))
                                        }
                                    </Row>
                                ))

                            }
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}


const Row = ({ children, index }: { index: number, children: React.ReactNode }) => {
    return (
        <Box
            borderColor='secondText'
            borderRightWidth={[0, 1, 3, 4, 7, 8, 9].includes(index) ? 2 : 0}
            p={20}
            justifyContent='center'
            alignItems='center'
        >
            {children}
        </Box>
    )
}
const BigCeulalar = ({ index, miniCelularList }: { index: number, miniCelularList: string[] }) => {
    return (
        <Box
            borderColor='secondText'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            borderBottomWidth={[0, 1].includes(index) ? 1 : 0}

        >
            {
                miniCelularList.map((v2, i2) => (
                    <MiniCelular index={i2} value={v2} />
                ))
            }
        </Box>
    )
}
const MiniCelular = ({ index, value }: { value: string, index: number }) => {
    return (
        <Box
            borderColor='secondText'
            borderRightWidth={[0, 1].includes(index) ? 1 : 0}
            width={28}
            height={28}
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
        >
            <Text>{value}</Text>
        </Box>
    )
}
export default TicTacToe2;