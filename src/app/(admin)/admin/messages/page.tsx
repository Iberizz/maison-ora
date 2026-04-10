import { createServerSupabaseClient } from '@/lib/supabase/server'
import MessagesClient from '@/components/admin/Messages/MessagesClient'

export default async function MessagesPage() {
    const supabase = await createServerSupabaseClient()

    const { data: messages } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

    return <MessagesClient messages={messages ?? []} />
}
