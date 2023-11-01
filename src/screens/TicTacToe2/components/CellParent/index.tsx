import Cell from '@/components/Celular';
import { verifyColumnWinner } from '@/utils/verifyColumnWinner';
import { verifyRowWinner } from '@/utils/verifyRowWinner';
import React from 'react';



type CellParentProps = {
    columnParentIndex: number
    wins: string[][]
    lineParentIndex: number,
    children: React.ReactNode
}

const CellParent: React.FC<CellParentProps> = ({ columnParentIndex, wins, children, lineParentIndex }) => {

    const getCellWinner = () => {
        if (wins[lineParentIndex][columnParentIndex] == 'XO') return 'alert'
        if (wins[lineParentIndex][columnParentIndex] == 'X') return 'primaryContrast'
        if (wins[lineParentIndex][columnParentIndex] == 'O') return 'secondContrast'
        return 'bg'
    }


    return (
        <Cell
            key={`${columnParentIndex}`}
            wasWined={false}
            onPress={() => { }}
            index={columnParentIndex}
            borderRightColor='secondText'
            p={20}
            backgroundColor={getCellWinner()}

        >

            {children}
        </Cell>
    )
}

export default CellParent;