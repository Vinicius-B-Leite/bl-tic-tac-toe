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
import Row from '@/components/Row';
import Cell from '@/components/Celular';
import CellParent from './components/CellParent';


const TicTacToe2: React.FC = () => {
    const { top, bottom } = useSafeAreaInsets()
    const theme = useTheme<ThemeType>()
    const navigation = useAppNavigation()

    const { game, handleMark, currentPlayer, nextCellToPlay, wins } = useTicTacToe2()

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

            <Box mt={80} justifyContent='center' alignItems='center'>
                {
                    game.map((lineParent, lineParentIndex) => (
                        <Row
                            key={`${lineParentIndex}`}
                            index={lineParentIndex}
                            borderColor='secondText'
                            flexDirection='row'
                            borderBottomWidth={[0, 1].includes(lineParentIndex) ? 2 : 0}
                        >

                            {
                                lineParent.map((columnParent, columnParentIndex) => (

                                    <CellParent
                                        key={`${columnParentIndex}`}
                                        lineParentIndex={lineParentIndex}
                                        wins={wins}
                                        columnParentIndex={columnParentIndex}
                                    >
                                        {
                                            columnParent.map((lineChild, lineChildIndex) => (
                                                <Row
                                                    opacity={nextCellToPlay.column == null || (nextCellToPlay.column === columnParentIndex && nextCellToPlay.line === lineParentIndex) ? 1 : 0.3}
                                                    index={lineChildIndex}
                                                    key={`${lineChildIndex}`}
                                                >
                                                    {

                                                        lineChild.map((columnChild, columnChildIndex) => (
                                                            <Cell
                                                                wasWined={wins[lineParentIndex][columnParentIndex].length > 0}
                                                                key={`${columnChildIndex}`}
                                                                onPress={() => handleMark({ columnChildIndex, columnParentIndex, lineChildIndex, lineParentIndex, player: currentPlayer })}
                                                                index={columnChildIndex}
                                                                width={28}
                                                                height={28}
                                                            >
                                                                <Text>{columnChild}</Text>
                                                            </Cell>
                                                        ))
                                                    }

                                                </Row>
                                            ))
                                        }

                                    </CellParent>
                                ))
                            }
                        </Row>
                    ))
                }
            </Box>
        </Box>
    )
}


export default TicTacToe2;