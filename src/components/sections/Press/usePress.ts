import { useState } from 'react'

export const usePress = (total: number) => {
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1)

    const next = () => {
        setDirection(1)
        setIndex(i => (i + 1) % total)
    }

    const prev = () => {
        setDirection(-1)
        setIndex(i => (i - 1 + total) % total)
    }

    return { index, direction, next, prev }
}