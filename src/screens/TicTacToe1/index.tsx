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

            verifyRowWinner(oldGame)
            verifyColumnWinner(oldGame, columnIndex)
            verifyDiagonalWinner(oldGame)

            return [...oldGame]
        })
        setCurrentPlayer(oldPlayer => oldPlayer === 'O' ? 'X' : 'O')
    }

    const verifyRowWinner = (currentGame: string[][]) => {
        currentGame.forEach((line) => {
            const XIsWinner = line.every(value => value == 'X')
            if (XIsWinner) {
                setWinner('X')
                return
            }
            const OIsWinner = line.every(value => value == 'O')
            if (OIsWinner) {
                setWinner('O')
                return
            }

        })
    }
    const verifyColumnWinner = (currentGame: string[][], column: number) => {
        const hasColumnWinner = currentGame[0][column] == currentGame[1][column] && currentGame[0][column] == currentGame[2][column]
        if (hasColumnWinner) {
            console.log(hasColumnWinner);

            const playerWinner = currentGame[0][column] as PlayerType
            setWinner(playerWinner)
        }
    }
    const verifyDiagonalWinner = (currentGame: string[][]) => {
        const firstDiagonalIsEmpty = currentGame[0][0].length == 0

        const diagonalLeftToRigthWinner = currentGame[0][0] == currentGame[1][1] && currentGame[1][1] == currentGame[2][2]
        if (!firstDiagonalIsEmpty && diagonalLeftToRigthWinner) {
            const playerWinner = currentGame[0][0] as PlayerType
            setWinner(playerWinner)
            return
        }

        const lastDiagonalIsEmpty = currentGame[0][2].length == 0
        const diagonalRigthToLeftWinner = currentGame[0][2] == currentGame[1][1] && currentGame[1][1] == currentGame[2][0]
        if (!lastDiagonalIsEmpty && diagonalRigthToLeftWinner) {
            const playerWinner = currentGame[0][2] as PlayerType
            setWinner(playerWinner)
            return
        }

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