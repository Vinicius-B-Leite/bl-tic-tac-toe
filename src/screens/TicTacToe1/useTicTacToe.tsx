import { PlayerType } from "@/types/PlayerType"
import { verifyColumnWinner } from "@/utils/verifyColumnWinner"
import { verifyDiagonalWinner } from "@/utils/verifyDiagonalWinner"
import { verifyRowWinner } from "@/utils/verifyRowWinner"
import { useEffect, useState } from "react"



const INITIAL_STATE = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]


export default function useTicTacToe() {
    const [game, setGame] = useState(INITIAL_STATE)
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('X')
    const [winner, setWinner] = useState<PlayerType | string>('')

    const handleMark = (lineIndex: number, columnIndex: number, player: PlayerType) => {

        setGame(oldGame => {
            const newGame = oldGame

            const alreadyMarked = newGame[lineIndex][columnIndex].length > 0

            if (alreadyMarked) return [...oldGame]

            newGame[lineIndex][columnIndex] = player

            const winner = verifyRowWinner(oldGame) || verifyColumnWinner(oldGame, columnIndex) || verifyDiagonalWinner(oldGame)
            if (winner) {
                setWinner(winner)
            }


            return [...oldGame]
        })
        setCurrentPlayer(oldPlayer => oldPlayer === 'O' ? 'X' : 'O')
    }

    useEffect(() => {
        if (winner.length > 0) {
            alert(`O ganhador do jogo foi ${winner}`)
        }
    }, [winner])


    return {
        handleMark,
        game,
        currentPlayer
    }
}