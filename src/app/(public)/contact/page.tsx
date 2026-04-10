'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar/Navbar'
import Footer from '@/components/layout/Footer/Footer'
import Button from '@/components/ui/Button/Button'
import { useContact } from './useContact'

export default function ContactPage() {
    const { contactDetails, form, isSubmitted, loading, error, updateField, submitForm } = useContact()

    return (
        <>
            <Navbar />

            <main className="bg-cream pt-28">
                <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-12 text-center lg:text-left"
                    >
                        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                            Contact
                        </p>
                        <h1 className="mb-4 font-serif text-4xl text-dark sm:text-5xl">
                            Une attention aussi précise que notre cuisine
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone sm:text-base">
                            Une demande de privatisation, un événement sur-mesure, une question sur le
                            menu ou les réservations&nbsp;: notre équipe vous répond avec le même soin
                            que celui apporté à chaque service.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1.1fr]">
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <div className="space-y-5">
                                {contactDetails.map((item) => (
                                    <div
                                        key={item.label}
                                        className="border-b border-border pb-4"
                                    >
                                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gold">
                                            {item.label}
                                        </p>
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="text-base text-dark transition-colors hover:text-gold"
                                            >
                                                {item.value}
                                            </Link>
                                        ) : (
                                            <p className="text-base text-dark">{item.value}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 space-y-3 text-sm text-stone">
                                <p className="uppercase tracking-[0.2em] text-xs text-gold">
                                    Pour les privatisations
                                </p>
                                <p>
                                    Dîners d&apos;affaires, lancements confidentiels, tournages ou
                                    célébrations intimistes&nbsp;: nous imaginons avec vous une
                                    expérience sur-mesure.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
                        >
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="mb-2 font-serif text-2xl text-dark">
                                        Écrire à la maison
                                    </h2>
                                    <p className="text-sm text-stone">
                                        Nous revenons vers vous sous 24 heures ouvrées.
                                    </p>
                                </div>
                                <div className="hidden text-right text-xs uppercase tracking-[0.2em] text-stone/70 sm:block">
                                    <p>Paris&nbsp;8ᵉ</p>
                                    <p className="text-gold">Maison Ōra</p>
                                </div>
                            </div>

                            <form className="space-y-6" onSubmit={submitForm}>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone"
                                    >
                                        Nom complet
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Votre nom"
                                        value={form.name}
                                        onChange={(event) =>
                                            updateField('name', event.target.value)
                                        }
                                        className="w-full rounded-md border border-border px-4 py-3 text-sm text-dark outline-none transition-colors placeholder:text-[#A8A099] focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="vous@email.fr"
                                        value={form.email}
                                        onChange={(event) =>
                                            updateField('email', event.target.value)
                                        }
                                        className="w-full rounded-md border border-border px-4 py-3 text-sm text-dark outline-none transition-colors placeholder:text-[#A8A099] focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        placeholder="Précisez votre demande, vos dates, le nombre de convives..."
                                        value={form.message}
                                        onChange={(event) =>
                                            updateField('message', event.target.value)
                                        }
                                        className="w-full resize-y rounded-md border border-border px-4 py-3 text-sm text-dark outline-none transition-colors placeholder:text-[#A8A099] focus:border-gold"
                                    />
                                </div>

                                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                    <Button
                                        type="submit"
                                        label={loading ? 'Envoi...' : 'Envoyer ma demande'}
                                        size="sm"
                                        variant="primary"
                                        disabled={loading}
                                    />
                                    <p className="text-xs text-stone">
                                        Aucune newsletter automatique. Uniquement des réponses liées à
                                        votre message.
                                    </p>
                                </div>

                                {isSubmitted && (
                                    <p className="text-sm text-gold">
                                        Merci, votre message a bien été transmis à la maison.
                                    </p>
                                )}
                                {error && (
                                    <p className="text-sm text-red-600">
                                        {error}
                                    </p>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
