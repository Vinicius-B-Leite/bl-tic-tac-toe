import { PlayerType } from "@/types/PlayerType";
import { verifyColumnWinner } from "@/utils/verifyColumnWinner";
import { verifyDiagonalWinner } from "@/utils/verifyDiagonalWinner";
import { verifyRowWinner } from "@/utils/verifyRowWinner";
import { useEffect, useState } from "react";


const INITIAL_STATE = [
    [[
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ], [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ], [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]],
    [[
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ], [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ], [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]],
    [[
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ], [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ], [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]],
]

type handleMarkProps = {
    lineParentIndex: number,
    columnParentIndex: number,
    lineChildIndex: number,
    columnChildIndex: number,
    player: PlayerType
}
/**
 * marca a jogado
 * verifica se a celula esta ganha
 * 
 * ---------------
 * verificar se a celula esta empatada
 * verificar a proxima jogada numa celula que esta ganha
 * ganhar o jogo de fato
 * 
 */

export default function useTicTacToe2() {
    const [game, setGame] = useState(INITIAL_STATE)
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('X')
    const [winner, setWinner] = useState<PlayerType | string>('')
    const [xWinsIndex, setXWinsIndex] = useState<string[]>([])
    const [oWinsIndex, setOWinsIndex] = useState<string[]>([])
    const [nextCellToPlay, setNextCellToPlay] = useState<{ line: number | null, column: number | null }>({ line: null, column: null })

    const verifyCellWinner = (winner: PlayerType | PlayerType[], lineParentIndex: number, columnParentIndex: number) => {
        if (winner === 'X') {
            setXWinsIndex(oldXWins => [...oldXWins, `${lineParentIndex}${columnParentIndex}`])
            return
        }
        setOWinsIndex(oldOWins => [...oldOWins, `${lineParentIndex}${columnParentIndex}`])

    }
    const ableToPlay = (lineParentIndex: number, columnParentIndex: number) => {

        const ableToMark = (nextCellToPlay.column == columnParentIndex && nextCellToPlay.line == lineParentIndex)

        if (nextCellToPlay.column && !ableToMark) {
            return false
        }

        return true

    }

    const handleMark = ({ columnChildIndex, columnParentIndex, lineChildIndex, lineParentIndex, player }: handleMarkProps) => {

        const isCorrectCell = ableToPlay(lineParentIndex, columnParentIndex)
        if (!isCorrectCell) return

        setGame(oldGame => {
            const copy = [...oldGame]


            const cellWasMarked = copy[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex].length > 0
            if (cellWasMarked) return [...copy]



            copy[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex] = player
            setNextCellToPlay({ line: lineChildIndex, column: columnChildIndex })

            const winner =
                verifyRowWinner(copy[lineParentIndex][columnParentIndex]) ||
                verifyColumnWinner(copy[lineParentIndex][columnParentIndex], columnChildIndex) ||
                verifyDiagonalWinner(copy[lineParentIndex][columnParentIndex])



            const isTied = !copy[lineParentIndex][columnParentIndex].map(a => a.includes('')).some(v => v == true)

            if (isTied) {
                setXWinsIndex(oldXWins => [...oldXWins, `${lineParentIndex}${columnParentIndex}`])
                setOWinsIndex(oldOWins => [...oldOWins, `${lineParentIndex}${columnParentIndex}`])
            }
            if (winner) {
                verifyCellWinner(winner, lineParentIndex, columnParentIndex)
            }
            setCurrentPlayer(oldPlayer => oldPlayer == 'X' ? 'O' : 'X')
            return [...copy]
        })
    }
    useEffect(() => {
        if (winner.length > 0) {
            console.log('TEVE GANHADORERRR');

            alert(`O ganhador do jogo foi ${winner}`)
        }
    }, [winner])


    return {
        game,
        handleMark,
        currentPlayer,
        xWinsIndex,
        nextCellToPlay,
        oWinsIndex
    }
}