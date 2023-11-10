import { useAppNavigation } from "@/hooks/useAppNavigation"
import { PlayerType } from "@/types/PlayerType"
import { verifyColumnWinner } from "@/utils/verifyColumnWinner"
import { verifyDiagonalWinner } from "@/utils/verifyDiagonalWinner"
import { verifyRowWinner } from "@/utils/verifyRowWinner"
import { useEffect, useState } from "react"



export default function useTicTacToe() {

    const navigation = useAppNavigation()

    const [game, setGame] = useState([['', '', ''], ['', '', ''], ['', '', '']])
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('X')
    const [winner, setWinner] = useState<PlayerType | string>('')


    const handleMark = (lineIndex: number, columnIndex: number, player: PlayerType) => {

        setGame(oldGame => {
            const newGame = oldGame

            const alreadyMarked = newGame[lineIndex][columnIndex].length > 0

            if (alreadyMarked) return [...oldGame]

            newGame[lineIndex][columnIndex] = player

            const winner = verifyRowWinner(oldGame) || verifyColumnWinner(oldGame, player) || verifyDiagonalWinner(oldGame, player)
            if (winner) {
                setWinner(winner)
            }
            setCurrentPlayer(oldPlayer => oldPlayer === 'O' ? 'X' : 'O')


            return [...oldGame]
        })
    }

    useEffect(() => {
        if (winner.length > 0) {

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
    }, [winner, game])


    return {
        handleMark,
        game,
        currentPlayer
    }
}