import { useAppNavigation } from "@/hooks/useAppNavigation";
import { PlayerType } from "@/types/PlayerType";
import { verifyColumnWinner } from "@/utils/verifyColumnWinner";
import { verifyDiagonalWinner } from "@/utils/verifyDiagonalWinner";
import { verifyRowWinner } from "@/utils/verifyRowWinner";
import { useEffect, useState } from "react";
import { Alert } from "react-native";



type handleMarkProps = {
    lineParentIndex: number,
    columnParentIndex: number,
    lineChildIndex: number,
    columnChildIndex: number,
    player: PlayerType
}

export default function useTicTacToe2() {
    const navigation = useAppNavigation()

    const [game, setGame] = useState([[[['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']]], [[['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']]], [[['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']],],])
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('X')
    const [wins, setWins] = useState([['', '', ''], ['', '', ''], ['', '', '']])
    const [nextCellToPlay, setNextCellToPlay] = useState<{ line: number | null, column: number | null }>({ line: null, column: null })
    const [cellMarked, setCellMarked] = useState<Omit<handleMarkProps, 'player'>>()

    const handleMark = ({ columnChildIndex, columnParentIndex, lineChildIndex, lineParentIndex, player }: handleMarkProps) => {

        const anyWhereIsEnabled = nextCellToPlay.column == null && nextCellToPlay.line == null
        const isCorrectCell = nextCellToPlay.column === columnParentIndex && nextCellToPlay.line === lineParentIndex
        const cellWasMarked = game[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex].length > 0

        const canPlay = !cellWasMarked && (anyWhereIsEnabled || isCorrectCell)
        if (!canPlay) return


        setGame(oldGame => {
            oldGame[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex] = player
            return [...oldGame]
        })

        setCellMarked({ columnChildIndex, columnParentIndex, lineChildIndex, lineParentIndex })



        setCurrentPlayer(oldPlayer => oldPlayer === 'O' ? 'X' : 'O')
    }

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

    useEffect(() => {
        if (cellMarked === undefined) return
        const { lineParentIndex, columnChildIndex, columnParentIndex, lineChildIndex } = cellMarked

        const player = game[lineParentIndex][columnParentIndex][lineChildIndex][columnChildIndex] as PlayerType

        const winner = verifyRowWinner(wins) || verifyColumnWinner(wins, player) || verifyDiagonalWinner(wins, player)
        if (winner) {
            navigation.reset({
                index: 1,
                routes: [
                    {
                        name: 'Menu'
                    },
                    {
                        name: 'Win',
                        params: {
                            winner: winner as PlayerType
                        }
                    }
                ]
            })
        }

        const isTied = game.map(parentRow => parentRow.map(parentColumn => parentColumn.map(row => row.every(v => v !== '')))).flat().flat()
        console.log(isTied);

        if (isTied.every(v => v === true)) {
            Alert.alert(
                'O jogo empatou!',
                undefined,
                [{
                    onPress: () => {
                        setCellMarked(undefined)
                        setGame([[[['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']]], [[['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']]], [[['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']], [['', '', ''], ['', '', ''], ['', '', '']],],])
                        setCurrentPlayer('X')
                        setWins([['', '', ''], ['', '', ''], ['', '', '']])
                        setNextCellToPlay({ line: null, column: null })
                    }
                }])

        }
    }, [wins, cellMarked, currentPlayer])


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