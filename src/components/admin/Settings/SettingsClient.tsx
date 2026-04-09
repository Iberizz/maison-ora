'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from './useSettings'

const tabs = [
    { key: 'site', label: 'Paramètres du site' },
    { key: 'schedule', label: 'Horaires' },
    { key: 'taxes', label: 'Taxes & frais' },
]

const inputStyle = {
    backgroundColor: 'transparent',
    borderBottom: '0.5px solid rgba(255,255,255,0.1)',
    color: '#FAF8F5',
    width: '100%',
    padding: '8px 0',
    outline: 'none',
    fontSize: '14px',
    fontWeight: 300,
}

const SettingsClient = () => {
    const { settings, activeTab, setActiveTab, updateSite, updateSchedule, updateTax, save, saved } = useSettings()

    return (
        <div>
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="font-serif font-light text-3xl mb-1" style={{ color: '#FAF8F5' }}>
                        Paramètres
                    </h1>
                    <p className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                        Configuration du site
                    </p>
                </div>
                <button
                    onClick={save}
                    className="px-6 py-2 text-xs tracking-widest uppercase font-light transition-all duration-300"
                    style={{
                        border: '0.5px solid #C9A96E',
                        color: saved ? '#0F0E0D' : '#C9A96E',
                        backgroundColor: saved ? '#C9A96E' : 'transparent',
                    }}
                >
                    {saved ? 'Sauvegardé ✓' : 'Sauvegarder'}
                </button>
            </div>

            <div className="flex gap-2 mb-8">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className="px-4 py-2 text-xs tracking-widest uppercase font-light transition-all duration-200 rounded-sm"
                        style={{
                            backgroundColor: activeTab === tab.key ? 'rgba(201,169,110,0.15)' : 'transparent',
                            color: activeTab === tab.key ? '#C9A96E' : 'rgba(250,248,245,0.4)',
                            border: activeTab === tab.key ? '0.5px solid rgba(201,169,110,0.3)' : '0.5px solid transparent',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'site' && (
                    <motion.div
                        key="site"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-sm p-8"
                        style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                    >
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { key: 'restaurant_name', label: 'Nom du restaurant' },
                                { key: 'tagline', label: 'Tagline' },
                                { key: 'email', label: 'Email de contact' },
                                { key: 'phone', label: 'Téléphone' },
                                { key: 'address', label: 'Adresse' },
                            ].map(field => (
                                <div key={field.key}>
                                    <label className="text-xs tracking-widest uppercase font-light block mb-3" style={{ color: '#C9A96E' }}>
                                        {field.label}
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.site[field.key as keyof typeof settings.site]}
                                        onChange={e => updateSite(field.key, e.target.value)}
                                        style={inputStyle}
                                        onFocus={e => (e.currentTarget.style.borderBottomColor = '#C9A96E')}
                                        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)')}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'schedule' && (
                    <motion.div
                        key="schedule"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-sm overflow-hidden"
                        style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                    >
                        <table className="w-full">
                            <thead>
                            <tr style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                                {['Jour', 'Ouvert', 'Horaires'].map(h => (
                                    <th key={h} className="text-left px-6 py-4 text-xs tracking-widest uppercase font-light"
                                        style={{ color: 'rgba(250,248,245,0.3)' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {settings.schedule.map((s, i) => (
                                <tr key={s.day} style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
                                    <td className="px-6 py-4 text-sm font-light" style={{ color: '#FAF8F5' }}>{s.day}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => updateSchedule(i, 'open', !s.open)}
                                            className="text-xs tracking-widest uppercase font-light px-3 py-1 rounded-sm transition-all duration-200"
                                            style={{
                                                backgroundColor: s.open ? 'rgba(29,158,117,0.1)' : 'rgba(226,75,74,0.1)',
                                                color: s.open ? '#1D9E75' : '#E24B4A',
                                            }}
                                        >
                                            {s.open ? 'Ouvert' : 'Fermé'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="text"
                                            value={s.hours}
                                            disabled={!s.open}
                                            onChange={e => updateSchedule(i, 'hours', e.target.value)}
                                            placeholder="ex: 19h00 — 22h30"
                                            style={{
                                                ...inputStyle,
                                                opacity: s.open ? 1 : 0.3,
                                                cursor: s.open ? 'text' : 'not-allowed',
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}

                {activeTab === 'taxes' && (
                    <motion.div
                        key="taxes"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-sm p-8"
                        style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                    >
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { key: 'tax_rate', label: 'TVA (%)', value: settings.tax_rate },
                                { key: 'service_fee', label: 'Frais de service (%)', value: settings.service_fee },
                            ].map(field => (
                                <div key={field.key}>
                                    <label className="text-xs tracking-widest uppercase font-light block mb-3" style={{ color: '#C9A96E' }}>
                                        {field.label}
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            value={field.value}
                                            onChange={e => updateTax(field.key as any, parseFloat(e.target.value))}
                                            style={{ ...inputStyle, width: '120px' }}
                                            onFocus={e => (e.currentTarget.style.borderBottomColor = '#C9A96E')}
                                            onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)')}
                                        />
                                        <span className="text-2xl font-serif font-light" style={{ color: '#C9A96E' }}>
                      {field.value}%
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SettingsClient