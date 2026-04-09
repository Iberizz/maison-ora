import { createClient } from '@/lib/supabase/client'

interface LogPayload {
    action: string
    entity: string
    entity_id?: string
    user_email?: string
    metadata?: Record<string, any>
}

export const logAction = async (payload: LogPayload) => {
    const supabase = createClient()
    await supabase.from('logs').insert(payload)
}