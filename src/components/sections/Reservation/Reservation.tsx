'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useReservation } from './useReservation'
import Calendar from './Calendar'
import Modal from '@/components/ui/Modal/Modal'
import { useState } from 'react'

const GUESTS = [1, 2, 3, 4, 5, 6]
const TIMES = ['19h00', '19h30', '20h00', '20h30', '21h00', '21h30']

const stepVariants = {
    enter: { opacity: 0, x: 60 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
}

const Reservation = () => {
    const { step, data, update, nextStep, prevStep, canProceed, confirm, loading, error, getFieldError } = useReservation()
    const [confirmed, setConfirmed] = useState(false)

    const handleConfirm = async () => {
        const success = await confirm()
        if (success) setConfirmed(true)
    }

    const identityFields = [
        { key: 'name', label: 'Nom complet', type: 'text' },
        { key: 'email', label: 'Adresse email', type: 'email' },
        { key: 'phone', label: 'Téléphone', type: 'tel' },
    ] as const

    return (
        <section id="reservation" className="min-h-screen flex flex-col justify-center py-32 px-6" style={{ backgroundColor: '#0F0E0D' }}>
            <div className="max-w-2xl mx-auto w-full">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
          <span className="text-xs tracking-widest uppercase font-light mb-4 block" style={{ color: '#C9A96E' }}>
            Réservation
          </span>
                    <h2 style={{ color: '#FAF8F5' }}>Réservez votre table</h2>
                </motion.div>

                <div className="flex gap-2 mb-16">
                    {[1, 2, 3, 4].map(s => (
                        <div
                            key={s}
                            className="h-px flex-1 transition-all duration-700"
                            style={{ backgroundColor: s <= step ? '#C9A96E' : 'rgba(250,248,245,0.15)' }}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="text-sm tracking-widest uppercase font-light mb-10" style={{ color: 'rgba(250,248,245,0.5)' }}>
                                Combien serez-vous ?
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {GUESTS.map(n => (
                                    <button
                                        key={n}
                                        onClick={() => update({ guests: n })}
                                        className="w-16 h-16 font-serif text-2xl transition-all duration-300 cursor-pointer "
                                        style={{
                                            border: data.guests === n ? '1px solid #C9A96E' : '1px solid rgba(250,248,245,0.15)',
                                            color: data.guests === n ? '#C9A96E' : 'rgba(250,248,245,0.5)',
                                        }}
                                    >
                                        {n === 6 ? '6+' : n}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="text-sm tracking-widest uppercase font-light mb-10" style={{ color: 'rgba(250,248,245,0.5)' }}>
                                Choisissez votre soirée
                            </p>

                            <Calendar
                                selected={data.date}
                                onSelect={(date) => update({ date })}
                            />

                            <div className="flex flex-wrap gap-3 mt-10">
                                {TIMES.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => update({ time: t })}
                                        className="px-5 py-3 text-xs tracking-widest uppercase transition-all duration-300"
                                        style={{
                                            border: data.time === t ? '1px solid #C9A96E' : '1px solid rgba(250,248,245,0.15)',
                                            color: data.time === t ? '#C9A96E' : 'rgba(250,248,245,0.5)',
                                        }}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col gap-10"
                        >
                            <p className="text-sm tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.5)' }}>
                                Qui êtes-vous ?
                            </p>
                            {identityFields.map(field => (
                                <div key={field.key}>
                                    <label className="text-xs tracking-widest uppercase font-light block mb-3" style={{ color: '#C9A96E' }}>
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        value={data[field.key as keyof typeof data] as string}
                                        onChange={e => update({ [field.key]: e.target.value })}
                                        required
                                        aria-invalid={Boolean(getFieldError(field.key))}
                                        className="w-full bg-transparent font-light text-lg pb-3 outline-none transition-all duration-300"
                                        style={{
                                            borderBottom: `1px solid ${getFieldError(field.key) ? '#B34B4B' : 'rgba(250,248,245,0.2)'}`,
                                            color: '#FAF8F5',
                                        }}
                                    />
                                    {getFieldError(field.key) && (
                                        <p className="text-xs mt-2" style={{ color: '#B34B4B' }}>
                                            {getFieldError(field.key)}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col gap-6"
                        >
                            <p className="text-sm tracking-widest uppercase font-light mb-4" style={{ color: 'rgba(250,248,245,0.5)' }}>
                                Récapitulatif
                            </p>
                            {[
                                { label: 'Couverts', value: `${data.guests} personne${data.guests! > 1 ? 's' : ''}` },
                                { label: 'Date', value: data.date },
                                { label: 'Heure', value: data.time },
                                { label: 'Nom', value: data.name },
                                { label: 'Email', value: data.email },
                                { label: 'Téléphone', value: data.phone },
                            ].map(row => (
                                <div key={row.label} className="flex justify-between pb-4" style={{ borderBottom: '1px solid rgba(250,248,245,0.08)' }}>
                                    <span className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>{row.label}</span>
                                    <span className="font-light" style={{ color: '#FAF8F5' }}>{row.value}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <p className="mt-8 text-sm font-light" style={{ color: '#B34B4B' }}>
                        {error}
                    </p>
                )}

                <div className="flex justify-between items-center mt-16">
                    {step > 1 ? (
                        <button
                            onClick={prevStep}
                            className="text-xs tracking-widest uppercase font-light transition-all duration-300"
                            style={{ color: 'rgba(250,248,245,0.4)' }}
                        >
                            Retour
                        </button>
                    ) : <div />}

                    <button
                        onClick={step === 4 ? handleConfirm : nextStep}
                        disabled={!canProceed() || loading}
                        className="px-8 py-4 text-xs tracking-widest uppercase font-light transition-all duration-300"
                        style={{
                            border: '1px solid #C9A96E',
                            color: canProceed() && !loading ? '#C9A96E' : 'rgba(201,169,110,0.3)',
                            cursor: canProceed() && !loading ? 'pointer' : 'not-allowed',
                        }}
                    >
                        {loading ? 'Envoi...' : step === 4 ? 'Confirmer la réservation' : 'Continuer'}
                    </button>
                </div>
            </div>
            <Modal isOpen={confirmed} onClose={() => setConfirmed(false)} title="Confirmation">
                <h3 className="font-serif font-light mb-4" style={{ color: '#0F0E0D' }}>
                    Votre table est réservée
                </h3>
                <p className="font-light text-sm leading-relaxed mb-6" style={{ color: '#6B6560' }}>
                    Nous avons bien reçu votre réservation pour {data.guests} personne{data.guests! > 1 ? 's' : ''} le {data.date} à {data.time}. Un email de confirmation vous sera envoyé à {data.email}.
                </p>
                <div className="h-px w-8" style={{ backgroundColor: '#C9A96E' }} />
            </Modal>
        </section>
    )
}

export default Reservation