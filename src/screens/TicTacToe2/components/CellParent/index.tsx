import Cell from '@/components/Celular';
import React from 'react';



type CellParentProps = {
    columnParentIndex: number
    xWinsIndex: string[]
    oWinsIndex: string[]
    lineParentIndex: number,
    children: React.ReactNode
}

const CellParent: React.FC<CellParentProps> = ({ columnParentIndex, lineParentIndex, xWinsIndex, children, oWinsIndex }) => {
    const xWinsThisCell = xWinsIndex.includes(`${lineParentIndex}${columnParentIndex}`)
    const oWinsThisCell = oWinsIndex.includes(`${lineParentIndex}${columnParentIndex}`)



    const getWinnerbg = () => {
        const isTied = xWinsThisCell && oWinsThisCell
        if (isTied) return 'alert'
        if (xWinsThisCell) return 'primaryContrast'
        if (oWinsThisCell) return 'secondContrast'

        return 'bg'
    }

    return (
        <Cell
            key={`${columnParentIndex}`}
            onPress={() => { }}
            index={columnParentIndex}
            borderRightColor='secondText'
            p={20}
            backgroundColor={getWinnerbg()}

        >

            {children}
        </Cell>
    )
}

export default CellParent;