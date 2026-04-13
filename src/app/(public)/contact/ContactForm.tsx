'use client'

import { useActionState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {ContactFormState, submitContact} from "@/app/(public)/contact/Contact.action";

const INITIAL: ContactFormState = { status: 'idle' }

const fields = [
    { name: 'name',    label: 'Votre nom',              type: 'text',  placeholder: 'Votre nom' },
    { name: 'email',   label: 'Votre email',            type: 'email', placeholder: 'Votre email' },
]

export default function ContactForm() {
    const [state, action, pending] = useActionState(submitContact, INITIAL)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.status === 'success') formRef.current?.reset()
    }, [state.status])

    return (
        <section className="bg-dark py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="eyebrow mb-16"
                >
                    Nous écrire
                </motion.p>

                <div className="mx-auto max-w-2xl">
                    <AnimatePresence mode="wait">
                        {state.status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="py-16 text-center"
                            >
                                <span className="ora-line-gold block w-12 mb-8 mx-auto" />
                                <p
                                    className="font-serif font-light text-cream leading-relaxed"
                                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                                >
                                    Nous vous répondrons dans les 24 heures.
                                </p>
                                <p className="mt-4 text-sm font-light text-stone">À très bientôt.</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                ref={formRef}
                                action={action}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-12"
                            >
                                {/* Champs texte */}
                                {fields.map((field, i) => (
                                    <motion.div
                                        key={field.name}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.08 }}
                                    >
                                        <label className="eyebrow block mb-3">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            required
                                            className="w-full bg-transparent text-cream font-light pb-3 outline-none placeholder:text-stone/50 border-b border-gold/30 focus:border-gold transition-colors duration-300"
                                            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
                                        />
                                    </motion.div>
                                ))}

                                {/* Message */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.16 }}
                                >
                                    <label className="eyebrow block mb-3">Votre message</label>
                                    <textarea
                                        name="message"
                                        placeholder="Une question, une occasion particulière…"
                                        required
                                        rows={4}
                                        className="w-full bg-transparent text-cream font-light pb-3 outline-none placeholder:text-stone/50 border-b border-gold/30 focus:border-gold transition-colors duration-300 resize-none"
                                        style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
                                    />
                                </motion.div>

                                {/* Error */}
                                {state.status === 'error' && (
                                    <p className="text-sm font-light" style={{ color: '#E24B4A' }}>
                                        {state.message}
                                    </p>
                                )}

                                {/* Submit */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.24 }}
                                >
                                    <button
                                        type="submit"
                                        disabled={pending}
                                        className="btn-ora-gold disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <span className="h-px w-5 bg-current block" aria-hidden />
                                        {pending ? 'Envoi en cours…' : 'Envoyer'}
                                    </button>
                                </motion.div>

                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    )
}