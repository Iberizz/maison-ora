export interface Log {
    id: string
    created_at: string
    action: string
    entity: string
    entity_id: string | null
    user_email: string | null
    metadata: Record<string, any> | null
}