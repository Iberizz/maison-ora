import { createServerSupabaseClient } from '@/lib/supabase/server'
import LogsClient from '@/components/admin/Logs/LogsClient'

export default async function LogsPage() {
    const supabase = await createServerSupabaseClient()

    const { data: logs } = await supabase
        .from('logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200)

    return <LogsClient logs={logs ?? []} />
}