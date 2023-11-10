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
    const [cellMarked, setCellMarked] = useState<Omit<handleMarkProps, 'player'>>()

    const handleMark = ({ columnChildIndex, columnParentIndex, lineChildIndex, lineParentIndex, player }: handleMarkProps) => {

        //verificar se pode jogar

        const canPlay = nextCellToPlay.column == null || (nextCellToPlay.column === columnParentIndex && nextCellToPlay.line === lineParentIndex)
        if (!canPlay) return

        //marcar jogada
        setGame(oldGame => {
            oldGame[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex] = player
            return [...oldGame]
        })

        setCellMarked({ columnChildIndex, columnParentIndex, lineChildIndex, lineParentIndex })


        //troca jogador
        setCurrentPlayer(oldPlayer => oldPlayer === 'O' ? 'X' : 'O')
    }

    //marcou ponto?
    useEffect(() => {
        if (cellMarked === undefined) return

        const { lineParentIndex, columnChildIndex, columnParentIndex, lineChildIndex } = cellMarked

        const gameChild = game[lineParentIndex][columnParentIndex]

        const wasTied = gameChild.map(row => row.includes('')).every(emptySpace => emptySpace === false)
        const player = game[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex] as PlayerType
        const makePoint = verifyRowWinner(gameChild) || verifyColumnWinner(gameChild, player) || verifyDiagonalWinner(gameChild, player)

        if (makePoint) {
            setWins(oldWins => {
                oldWins[lineParentIndex][columnParentIndex] = makePoint
                return [...oldWins]
            })
        }

        if (!makePoint && wasTied) {
            setWins(oldWins => {
                oldWins[lineParentIndex][columnParentIndex] = 'OX'
                return [...oldWins]
            })
        }
    }, [game, cellMarked, currentPlayer])

    //venceu?
    useEffect(() => {
        if (cellMarked === undefined) return
        const { lineParentIndex, columnChildIndex, columnParentIndex, lineChildIndex } = cellMarked

        const player = game[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex] as PlayerType

        const winner = verifyRowWinner(wins) || verifyColumnWinner(wins, player) || verifyDiagonalWinner(wins, player)
        if (winner) {
            alert(winner)
        }
    }, [wins, cellMarked, currentPlayer])

    //lidar proxima jogada
    useEffect(() => {
        if (cellMarked === undefined) return
        const { columnChildIndex, lineChildIndex } = cellMarked

        const nextCellToPlayWasTied = game[lineChildIndex][columnChildIndex].map(row => row.includes('')).every(emptySpace => emptySpace === false)
        const nextCellToPlayWasWon = wins[lineChildIndex][columnChildIndex].length > 0

        if (nextCellToPlayWasWon || nextCellToPlayWasTied) {
            setNextCellToPlay({ line: null, column: null })
        } else {
            setNextCellToPlay({ line: lineChildIndex, column: columnChildIndex })
        }
    }, [wins, cellMarked, game])



    return {
        game,
        handleMark,
        currentPlayer,
        nextCellToPlay,
        wins
    }
}