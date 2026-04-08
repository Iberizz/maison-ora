'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CalendarProps {
    selected: string
    onSelect: (date: string) => void
}

const DAYS = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const Calendar = ({ selected, onSelect }: CalendarProps) => {
    const today = new Date()
    const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

    const year = current.getFullYear()
    const month = current.getMonth()
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const nullCells: (number | null)[] = Array.from({ length: firstDay }, () => null)
    const dayCells: (number | null)[] = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const cells: (number | null)[] = [...nullCells, ...dayCells]

    const isDisabled = (day: number) => {
        const date = new Date(year, month, day)
        date.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)
        return date < today
    }

    const toISO = (day: number) => {
        const m = String(month + 1).padStart(2, '0')
        const d = String(day).padStart(2, '0')
        return `${year}-${m}-${d}`
    }

    const isSelected = (day: number) => selected === toISO(day)
    const isToday = (day: number) => toISO(day) === today.toISOString().split('T')[0]

    const prev = () => setCurrent(new Date(year, month - 1, 1))
    const next = () => setCurrent(new Date(year, month + 1, 1))

    return (
        <div className="w-full max-w-sm">
            <div className="flex items-center justify-between mb-8">
        <span className="font-serif font-light text-xl" style={{ color: '#FAF8F5' }}>
          {MONTHS[month]} {year}
        </span>
                <div className="flex gap-4">
                    <button onClick={prev} className="text-xs transition-all duration-300" style={{ color: '#C9A96E' }}>←</button>
                    <button onClick={next} className="text-xs transition-all duration-300" style={{ color: '#C9A96E' }}>→</button>
                </div>
            </div>

            <div className="grid grid-cols-7 mb-4">
                {DAYS.map(d => (
                    <div key={d} className="text-center text-xs tracking-widest py-2" style={{ color: 'rgba(250,248,245,0.3)' }}>
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2">
                {cells.map((day, i) => (
                    <div key={i} className="flex items-center justify-center">
                        {day && (
                            <motion.button
                                whileHover={!isDisabled(day) ? { scale: 1.1 } : {}}
                                whileTap={!isDisabled(day) ? { scale: 0.95 } : {}}
                                onClick={() => !isDisabled(day) && onSelect(toISO(day))}
                                className="w-9 h-9 text-sm font-light transition-all duration-300 rounded-none"
                                style={{
                                    backgroundColor: isSelected(day) ? '#C9A96E' : 'transparent',
                                    color: isDisabled(day)
                                        ? 'rgba(250,248,245,0.15)'
                                        : isSelected(day)
                                            ? '#0F0E0D'
                                            : isToday(day)
                                                ? '#C9A96E'
                                                : '#FAF8F5',
                                    cursor: isDisabled(day) ? 'not-allowed' : 'pointer',
                                    border: isToday(day) && !isSelected(day) ? '1px solid rgba(201,169,110,0.4)' : 'none',
                                }}
                            >
                                {day}
                            </motion.button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar