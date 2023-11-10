import { PlayerType } from "@/types/PlayerType"

export const verifyRowWinner = (currentGame: string[][]): PlayerType | null => {
    let winner: PlayerType | null = null

    currentGame.forEach((line) => {
        const XIsWinner = line.every(value => value == 'X' || value == 'OX')
        if (XIsWinner) {
            winner = 'X'
        }
        const OIsWinner = line.every(value => value == 'O' || value == 'OX')
        if (OIsWinner) {
            winner = 'O'
        }
    })

    return winner
}