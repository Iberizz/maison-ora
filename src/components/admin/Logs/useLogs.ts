import { useState } from 'react'
import { Log } from './Logs.types'

export const useLogs = (logs: Log[]) => {
    const [search, setSearch] = useState('')
    const [entity, setEntity] = useState('all')

    const filtered = logs.filter(l => {
        const matchSearch = search === '' ||
            l.action.toLowerCase().includes(search.toLowerCase()) ||
            l.user_email?.toLowerCase().includes(search.toLowerCase()) ||
            l.entity.toLowerCase().includes(search.toLowerCase())
        const matchEntity = entity === 'all' || l.entity === entity
        return matchSearch && matchEntity
    })

    const entities = ['all', ...Array.from(new Set(logs.map(l => l.entity)))]

    return { search, setSearch, entity, setEntity, filtered, entities }
}