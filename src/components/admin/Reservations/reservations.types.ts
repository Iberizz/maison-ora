export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Reservation {
    id: string
    name: string
    email: string
    phone?: string | null
    guests: number | null
    date: string
    time: string
    status: ReservationStatus
    created_at?: string
}

export interface ReservationMetrics {
    today: number
    pending: number
    confirmed: number
    cancelled: number
    total: number
    totalGuests: number
    conversionRate: number
}
