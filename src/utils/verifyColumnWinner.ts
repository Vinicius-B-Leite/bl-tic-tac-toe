import { PlayerType } from "@/types/PlayerType"

export const verifyColumnWinner = (currentGame: string[][], player: string) => {
    let winner = ''

    const column0 = [currentGame[0][0], currentGame[1][0], currentGame[2][0]]
    const column1 = [currentGame[0][1], currentGame[1][1], currentGame[2][1]]
    const column2 = [currentGame[0][2], currentGame[1][2], currentGame[2][2]]

    const hasColumnWinner =
        column0.every(c => c == player || c == 'OX') ||
        column1.every(c => c == player || c == 'OX') ||
        column2.every(c => c == player || c == 'OX')


    if (hasColumnWinner) {
        winner = player
        return winner
    }

    return winner
}