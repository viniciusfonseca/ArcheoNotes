import { createContext, useContext } from "react";
import { Note } from "../types/Note";

interface AppState {
    notes: Note[],
    setAppState(payload: Partial<AppState>): void
}

export const AppContext = createContext<AppState>({
    notes: [],
    setAppState(payload: Partial<AppState>) {}
})

export const useAppContext = () => useContext(AppContext)