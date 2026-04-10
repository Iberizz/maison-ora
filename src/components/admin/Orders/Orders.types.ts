export type OrderStatus = 'pending' | 'preparing' | 'served' | 'paid' | 'cancelled'

export interface OrderItem {
    id: string
    title: string
    price: number
    quantity: number
}

export interface Order {
    id: string
    created_at: string
    reservation_id: string | null
    client_name: string
    client_email: string | null
    items: OrderItem[]
    total: number
    status: OrderStatus
    notes: string | null
    table_number: number | null
}