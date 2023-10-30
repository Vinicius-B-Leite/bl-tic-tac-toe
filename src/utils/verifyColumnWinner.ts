import { PlayerType } from "@/types/PlayerType"

export const verifyColumnWinner = (currentGame: string[][], column: number): PlayerType | null => {
    let winner: PlayerType | null = null

    const hasColumnWinner = currentGame[0][column] == currentGame[1][column] && currentGame[0][column] == currentGame[2][column]
    if (hasColumnWinner) {
        winner = currentGame[0][column] as PlayerType
        return winner
    }

    return winner
}