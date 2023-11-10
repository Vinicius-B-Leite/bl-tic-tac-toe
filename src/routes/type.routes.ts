import { PlayerType } from "@/types/PlayerType"

export type RootParamsList = {
    Menu: undefined,
    TicTacToe1: undefined
    TicTacToe2: undefined
    Win: {
        winner: PlayerType
    }
}