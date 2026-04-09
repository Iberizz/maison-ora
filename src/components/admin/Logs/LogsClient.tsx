'use client'

import { motion } from 'framer-motion'
import { useLogs } from './useLogs'
import { Log } from './Logs.types'

const entityColors: Record<string, { color: string, bg: string }> = {
    reservation: { color: '#C9A96E', bg: 'rgba(201,169,110,0.1)' },
    menu:        { color: '#1D9E75', bg: 'rgba(29,158,117,0.1)' },
    client:      { color: '#378ADD', bg: 'rgba(55,138,221,0.1)' },
    auth:        { color: '#EF9F27', bg: 'rgba(239,159,39,0.1)' },
}

const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('fr-FR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    })
}

const LogsClient = ({ logs }: { logs: Log[] }) => {
    const { search, setSearch, entity, setEntity, filtered, entities } = useLogs(logs)

    return (
        <div>
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="font-serif font-light text-3xl mb-1" style={{ color: '#FAF8F5' }}>
                        Logs
                    </h1>
                    <p className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                        {filtered.length} événement{filtered.length > 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            <div
                className="flex items-center gap-6 mb-6 px-4 py-3 rounded-sm"
                style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
            >
                <input
                    type="text"
                    placeholder="Rechercher une action, un utilisateur..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="bg-transparent text-sm font-light outline-none flex-1"
                    style={{ color: '#FAF8F5' }}
                />
                <div className="flex gap-2">
                    {entities.map(e => (
                        <button
                            key={e}
                            onClick={() => setEntity(e)}
                            className="px-3 py-1.5 text-xs tracking-widest uppercase font-light transition-all duration-200 rounded-sm"
                            style={{
                                backgroundColor: entity === e ? 'rgba(201,169,110,0.15)' : 'transparent',
                                color: entity === e ? '#C9A96E' : 'rgba(250,248,245,0.4)',
                                border: entity === e ? '0.5px solid rgba(201,169,110,0.3)' : '0.5px solid transparent',
                            }}
                        >
                            {e === 'all' ? 'Tous' : e}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="rounded-sm overflow-hidden"
                style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
            >
                {filtered.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-sm font-light" style={{ color: 'rgba(250,248,245,0.3)' }}>
                            Aucun log pour le moment.
                        </p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                        <tr style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                            {['Date', 'Action', 'Entité', 'Utilisateur', 'Détails'].map(h => (
                                <th key={h} className="text-left px-6 py-4 text-xs tracking-widest uppercase font-light"
                                    style={{ color: 'rgba(250,248,245,0.3)' }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map((log, i) => {
                            const ec = entityColors[log.entity] ?? { color: 'rgba(250,248,245,0.5)', bg: 'rgba(255,255,255,0.05)' }
                            return (
                                <motion.tr
                                    key={log.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2, delay: i * 0.02 }}
                                    style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}
                                >
                                    <td className="px-6 py-3 text-xs font-light whitespace-nowrap" style={{ color: 'rgba(250,248,245,0.4)' }}>
                                        {formatDate(log.created_at)}
                                    </td>
                                    <td className="px-6 py-3 text-sm font-light" style={{ color: '#FAF8F5' }}>
                                        {log.action}
                                    </td>
                                    <td className="px-6 py-3">
                      <span
                          className="text-xs tracking-widest uppercase font-light px-3 py-1 rounded-sm"
                          style={{ color: ec.color, backgroundColor: ec.bg }}
                      >
                        {log.entity}
                      </span>
                                    </td>
                                    <td className="px-6 py-3 text-xs font-light" style={{ color: 'rgba(250,248,245,0.5)' }}>
                                        {log.user_email ?? '—'}
                                    </td>
                                    <td className="px-6 py-3 text-xs font-light"
                                        style={{color: 'rgba(250,248,245,0.3)'}}>
                                        {log.metadata
                                            ? Object.entries(log.metadata).map(([k, v]) => (
                                                <span key={k} className="mr-3">
          <span style={{color: 'rgba(250,248,245,0.5)'}}>{k}: </span>
          <span style={{color: '#FAF8F5'}}>{String(v)}</span>
        </span>
                                            ))
                                            : '—'}
                                    </td>
                                </motion.tr>
                            )
                        })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default LogsClient