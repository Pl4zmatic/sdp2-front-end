import { Machine } from "./Machine"

export interface Plant {
    name: string,
    status: string,
    health: number,
    maintenance: number
    location: string,
    machines: Machine[]
}