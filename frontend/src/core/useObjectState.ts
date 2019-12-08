import { useState, useRef } from 'react'

export function useObjectState<T>(
    initialState: T = {} as T
) : [
    () => T,
    (merge: Partial<T>) => void,
    () => void
] {

    const [ state, setState ] = useState<T>(() => initialState)
    const ref = useRef<T>()
    ref.current = state

    return [
        () => ref.current as T,
        (merge: Partial<T>) => setState(state => ({ ...state, ...merge })),
        () => setState(initialState)
    ]
}