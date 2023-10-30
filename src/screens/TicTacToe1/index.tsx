import Box from '@/components/Box';
import Button from '@/components/Button';
import Text from '@/components/Text';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type PlayerType = 'X' | 'O'
const INITIAL_STATE = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

const TicTacToe1: React.FC = () => {
    const [game, setGame] = useState(INITIAL_STATE)
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('X')
    const [winner, setWinner] = useState<PlayerType | string>('')

    const { top, bottom } = useSafeAreaInsets()

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

    const verifyRowWinner = (currentGame: string[][]): PlayerType | null => {
        let winner: PlayerType | null = null

        currentGame.forEach((line) => {
            const XIsWinner = line.every(value => value == 'X')
            if (XIsWinner) {
                winner = 'X'
            }
            const OIsWinner = line.every(value => value == 'O')
            if (OIsWinner) {
                winner = 'O'
            }
        })

        return winner
    }
    const verifyColumnWinner = (currentGame: string[][], column: number): PlayerType | null => {
        let winner: PlayerType | null = null

        const hasColumnWinner = currentGame[0][column] == currentGame[1][column] && currentGame[0][column] == currentGame[2][column]
        if (hasColumnWinner) {
            winner = currentGame[0][column] as PlayerType
            return winner
        }

        return winner
    }
    const verifyDiagonalWinner = (currentGame: string[][]): PlayerType | null => {
        const firstDiagonalIsEmpty = currentGame[0][0].length == 0

        const diagonalLeftToRigthWinner = currentGame[0][0] == currentGame[1][1] && currentGame[1][1] == currentGame[2][2]
        if (!firstDiagonalIsEmpty && diagonalLeftToRigthWinner) {
            const playerWinner = currentGame[0][0] as PlayerType
            return playerWinner
        }

        const lastDiagonalIsEmpty = currentGame[0][2].length == 0
        const diagonalRigthToLeftWinner = currentGame[0][2] == currentGame[1][1] && currentGame[1][1] == currentGame[2][0]
        if (!lastDiagonalIsEmpty && diagonalRigthToLeftWinner) {
            const playerWinner = currentGame[0][2] as PlayerType
            return playerWinner
        }

        return null
    }


    useEffect(() => {
        if (winner.length > 0) {
            alert(`O ganhador do jogo foi ${winner}`)
        }
    }, [winner])

    return (
        <Box
            flex={1}
            backgroundColor='bg'
            p={18}
            justifyContent='center'
            alignItems='center' style={{ paddingTop: top, paddingBottom: bottom }}>
            <Box>
                {
                    game.map((line, lineIndex) => (
                        <Box
                            borderBottomColor='secondText'
                            borderBottomWidth={lineIndex !== 2 ? 1 : 0}
                            flexDirection='row'>
                            {
                                line.map((v, columnIndex) => (
                                    <Button
                                        onPress={() => handleMark(lineIndex, columnIndex, currentPlayer)}
                                        width={80}
                                        height={80}
                                        justifyContent='center'
                                        alignItems='center'
                                        borderRightWidth={columnIndex !== 2 ? 1 : 0}
                                        borderRightColor='secondText'

                                    >
                                        <Text>{v}</Text>
                                    </Button>
                                ))
                            }
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default TicTacToe1;