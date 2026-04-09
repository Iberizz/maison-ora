import { useState } from 'react'
import { SettingsState, Schedule } from './Settings.types'

const defaultSettings: SettingsState = {
    site: {
        restaurant_name: 'Maison Ōra',
        tagline: 'Une cuisine française contemporaine — intime, précise, mémorable.',
        email: 'contact@maison-ora.fr',
        phone: '+33 1 42 00 00 00',
        address: '12 rue du Faubourg Saint-Honoré, 75008 Paris',
    },
    schedule: [
        { day: 'Lundi', open: false, hours: '' },
        { day: 'Mardi', open: true, hours: '19h00 — 22h30' },
        { day: 'Mercredi', open: true, hours: '19h00 — 22h30' },
        { day: 'Jeudi', open: true, hours: '19h00 — 22h30' },
        { day: 'Vendredi', open: true, hours: '19h00 — 22h30' },
        { day: 'Samedi', open: true, hours: '12h00 — 14h30 · 19h00 — 23h00' },
        { day: 'Dimanche', open: false, hours: '' },
    ],
    tax_rate: 20,
    service_fee: 0,
}

export const useSettings = () => {
    const [settings, setSettings] = useState<SettingsState>(defaultSettings)
    const [saved, setSaved] = useState(false)
    const [activeTab, setActiveTab] = useState<'site' | 'schedule' | 'taxes'>('site')

    const updateSite = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, site: { ...prev.site, [key]: value } }))
    }

    const updateSchedule = (index: number, field: keyof Schedule, value: any) => {
        setSettings(prev => {
            const updated = [...prev.schedule]
            updated[index] = { ...updated[index], [field]: value }
            return { ...prev, schedule: updated }
        })
    }

    const updateTax = (key: 'tax_rate' | 'service_fee', value: number) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    const save = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return { settings, activeTab, setActiveTab, updateSite, updateSchedule, updateTax, save, saved }
}