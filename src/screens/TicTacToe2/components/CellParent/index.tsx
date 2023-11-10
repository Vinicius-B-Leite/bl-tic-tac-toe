import Box from '@/components/Box';
import Cell from '@/components/Celular';
import Text from '@/components/Text';
import { PlayerType } from '@/types/PlayerType';
import React, { useEffect, useState } from 'react';



type CellParentProps = {
    columnParentIndex: number
    wins: string[][]
    lineParentIndex: number,
    children: React.ReactNode,
}
const CellParent: React.FC<CellParentProps> = ({ columnParentIndex, wins, children, lineParentIndex }) => {

    const [winner, setWinner] = useState<PlayerType | 'OX'>()

    const getCellWinner = () => {
        if (wins[lineParentIndex][columnParentIndex] == 'X') {
            setWinner('X')
            return
        }
        if (wins[lineParentIndex][columnParentIndex] == 'O') {
            setWinner('O')
            return
        }
        if (wins[lineParentIndex][columnParentIndex] == 'OX') {
            setWinner('OX')
            return
        }
    }

    const getBg = () => {
        if (wins[lineParentIndex][columnParentIndex] == 'X') {
            return 'primaryTranslucentContrast'
        }
        if (wins[lineParentIndex][columnParentIndex] == 'O') {
            return 'secondTranslucentContrast'
        }
        if (wins[lineParentIndex][columnParentIndex] == 'OX') {
            return 'alertTranslucent'
        }

        return 'bg'
    }

    const getFontColor = () => {
        if (wins[lineParentIndex][columnParentIndex] == 'X') {
            return 'primaryContrast'
        }
        if (wins[lineParentIndex][columnParentIndex] == 'O') {
            return 'secondContrast'
        }
        if (wins[lineParentIndex][columnParentIndex] == 'OX') {
            return 'alert'
        }

        return 'bg'
    }
    useEffect(() => {
        getCellWinner()
    }, [wins])

    return (
        <Cell
            wasWined={false}
            onPress={() => { }}
            index={columnParentIndex}
            borderRightColor='secondText'
            borderRightWidth={columnParentIndex !== 2 ? 2 : 0}
            p={20}
            position='relative'
            backgroundColor={getBg()}

        >
            {
                winner &&
                <Box
                    position='absolute'
                    zIndex={2}
                    justifyContent='center'
                    alignItems='center'
                >
                    <Text
                        color={getFontColor()}
                        fontSize={winner.length > 1 ? 60 : 100}
                    >{winner}</Text>
                </Box>
            }
            {children}
        </Cell>
    )
}

export default CellParent;