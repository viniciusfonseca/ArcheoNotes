import { DBEntity } from "./DBEntity";

export interface Note extends DBEntity {
    id: number
    title: string
    content: string
}