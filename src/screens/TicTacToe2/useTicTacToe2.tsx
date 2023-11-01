import { PlayerType } from "@/types/PlayerType";
import { verifyColumnWinner } from "@/utils/verifyColumnWinner";
import { verifyDiagonalWinner } from "@/utils/verifyDiagonalWinner";
import { verifyRowWinner } from "@/utils/verifyRowWinner";
import { useEffect, useState } from "react";
import { GAME_INITIAL_STATE, WINS_INITIAL_STATE } from "./constants";



type handleMarkProps = {
    lineParentIndex: number,
    columnParentIndex: number,
    lineChildIndex: number,
    columnChildIndex: number,
    player: PlayerType
}

export default function useTicTacToe2() {
    const [game, setGame] = useState(GAME_INITIAL_STATE)
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('X')
    const [wins, setWins] = useState(WINS_INITIAL_STATE)
    const [nextCellToPlay, setNextCellToPlay] = useState<{ line: number | null, column: number | null }>({ line: null, column: null })

    const ableToPlay = (lineParentIndex: number, columnParentIndex: number) => {

        const isCorrectCell = (nextCellToPlay.column == columnParentIndex && nextCellToPlay.line == lineParentIndex)

        if (nextCellToPlay.column && !isCorrectCell) {
            return false
        }

        return true

    }

    const handleMark = ({ columnChildIndex, columnParentIndex, lineChildIndex, lineParentIndex, player }: handleMarkProps) => {

        const isAbleToPlay = ableToPlay(lineParentIndex, columnParentIndex)
        if (!isAbleToPlay) return

        setGame(oldGame => {
            const copy = [...oldGame]


            const cellWasMarked = copy[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex].length > 0
            if (cellWasMarked) return [...copy]



            copy[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex] = player

            const nextCellToPlayWasWon = wins[lineChildIndex][columnChildIndex].length > 0
            if (nextCellToPlayWasWon) {
                setNextCellToPlay({ line: null, column: null })
            } else {
                setNextCellToPlay({ line: lineChildIndex, column: columnChildIndex })
            }



            const winnerChild =
                verifyRowWinner(copy[lineParentIndex][columnParentIndex]) ||
                verifyColumnWinner(copy[lineParentIndex][columnParentIndex], columnChildIndex) ||
                verifyDiagonalWinner(copy[lineParentIndex][columnParentIndex])



            if (winnerChild) {
                setWins(oldWins => {
                    oldWins[lineParentIndex][columnParentIndex] = winnerChild
                    const hasWinner = verifyRowWinner(oldWins) || verifyColumnWinner(oldWins, columnParentIndex) || verifyDiagonalWinner(oldWins)
                    if (hasWinner) {
                        alert(`O ganhador do jogo foi ${hasWinner}`)

                    }
                    return [...oldWins]
                })
            }
            setCurrentPlayer(oldPlayer => oldPlayer == 'X' ? 'O' : 'X')
            return [...copy]
        })
    }

    return {
        game,
        handleMark,
        currentPlayer,
        nextCellToPlay,
        wins
    }
}