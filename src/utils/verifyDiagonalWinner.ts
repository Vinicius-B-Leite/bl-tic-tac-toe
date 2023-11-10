import { PlayerType } from "@/types/PlayerType"

export const verifyDiagonalWinner = (currentGame: string[][], player: PlayerType): PlayerType | null => {
    const firstDiagonalIsEmpty = currentGame[0][0].length == 0

    const diagonalLeftToRigth = [currentGame[0][0], currentGame[1][1], currentGame[2][2]]
    const diagonalLeftToRigthWinner = diagonalLeftToRigth.every(d => d == 'OX' || d == player)
    if (!firstDiagonalIsEmpty && diagonalLeftToRigthWinner) {
        const playerWinner = player
        return playerWinner
    }

    const lastDiagonalIsEmpty = currentGame[0][2].length == 0
    const diagonalRigthToLeft = [currentGame[0][2], currentGame[1][1], currentGame[2][0]]
    const diagonalRigthToLeftWinner = diagonalRigthToLeft.every(d => d == 'OX' || d == player)
    if (!lastDiagonalIsEmpty && diagonalRigthToLeftWinner) {
        const playerWinner = player
        return playerWinner
    }

    return null
}