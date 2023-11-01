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

export default function useTicTacToe2() {
    const [game, setGame] = useState(INITIAL_STATE)
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('X')
    const [winner, setWinner] = useState<PlayerType | string>('')
    const [xWinsIndex, setXWinsIndex] = useState<string[]>([])
    const [nextCellToPlay, setNextCellToPlay] = useState<{ line: number | null, column: number | null }>({ line: null, column: null })


    const handleMark = ({ columnChildIndex, columnParentIndex, lineChildIndex, lineParentIndex, player }: handleMarkProps) => {


        setGame(oldGame => {
            const hableToMark = (nextCellToPlay.column == columnParentIndex && nextCellToPlay.line == lineParentIndex)
            if (nextCellToPlay.column && !hableToMark) {
                alert('Nao pode jogar aqui jogue no ' + nextCellToPlay)
                return [...oldGame]
            }
            const copy = [...oldGame]


            const cellWasMarked = copy[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex].length > 0
            if (cellWasMarked) return [...copy]



            copy[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex] = player
            setNextCellToPlay({ line: lineChildIndex, column: columnChildIndex })

            const hasWinner =
                verifyRowWinner(copy[lineParentIndex][columnParentIndex]) ||
                verifyColumnWinner(copy[lineParentIndex][columnParentIndex], columnChildIndex) ||
                verifyDiagonalWinner(copy[lineParentIndex][columnParentIndex])

            if (hasWinner) {
                setXWinsIndex(oldXWins => [...oldXWins, `${lineParentIndex}${columnParentIndex}`])
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
        nextCellToPlay
    }
}