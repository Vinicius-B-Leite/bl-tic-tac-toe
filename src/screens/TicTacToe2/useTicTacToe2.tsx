import { useState } from "react";


const SINGLE = [
    ['x', '', ''],
    ['', '', ''],
    ['', '', '']
]
const INITIAL_STATE = [
    [SINGLE, SINGLE, SINGLE],
    [SINGLE, SINGLE, SINGLE],
    [SINGLE, SINGLE, SINGLE],
]

export default function useTicTacToe2() {
    const [game, setGame] = useState(INITIAL_STATE)

    return {
        game
    }
}