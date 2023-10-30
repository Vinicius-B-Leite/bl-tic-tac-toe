import { PlayerType } from "@/types/PlayerType"

export const verifyDiagonalWinner = (currentGame: string[][]): PlayerType | null => {
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