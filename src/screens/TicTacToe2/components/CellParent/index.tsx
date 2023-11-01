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

    const [winner, setWinner] = useState<PlayerType>()

    const getCellWinner = () => {
        if (wins[lineParentIndex][columnParentIndex] == 'X') {
            setWinner('X')
        }
        if (wins[lineParentIndex][columnParentIndex] == 'O') {
            setWinner('O')
        }
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
            backgroundColor={winner === 'X' ? 'primaryTranslucentContrast' : winner === 'O' ? 'secondTranslucentContrast' : 'bg'}

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
                        color={winner == 'X' ? 'primaryContrast' : 'secondContrast'}
                        fontSize={100}
                    >{winner}</Text>
                </Box>
            }
            {children}
        </Cell>
    )
}

export default CellParent;