export type ReservationStep = 1 | 2 | 3 | 4

export interface ReservationData {
    guests: number | null
    date: string
    time: string
    name: string
    email: string
    phone: string
}