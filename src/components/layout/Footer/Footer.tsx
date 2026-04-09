'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navLinks = [
    { label: 'Menu', href: '/menu' },
    { label: 'Histoire', href: '/histoire' },
    { label: 'Réservation', href: '/reservation' },
    { label: 'Contact', href: '/contact' },
    { label: 'Backoffice', href: '/admin' },
]

const socials = [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'TripAdvisor', href: '#' },
]

const horaires = [
    { jour: 'Mardi — Vendredi', heure: '19h00 — 22h30' },
    { jour: 'Samedi', heure: '12h00 — 14h30 · 19h00 — 23h00' },
    { jour: 'Dimanche — Lundi', heure: 'Fermé' },
]

const Footer = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = () => {
        if (email) setSubscribed(true)
    }

    return (
        <footer className="relative overflow-hidden py-24 px-6" style={{ backgroundColor: '#FAF8F5', borderTop: '1px solid #E0DDD7' }}>

            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{ zIndex: 0 }}
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="font-serif font-light whitespace-nowrap"
                    style={{
                        fontSize: 'clamp(5rem, 15vw, 14rem)',
                        color: 'rgba(201,169,110,0.06)',
                        letterSpacing: '0.05em',
                    }}
                >
                    MAISON ŌRA
                </motion.span>
            </div>

            <div className="relative max-w-7xl mx-auto" style={{ zIndex: 1 }}>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">

                    <div className="md:col-span-1">
            <span className="font-serif text-2xl tracking-widest block mb-6" style={{ color: '#0F0E0D' }}>
              Maison Ōra
            </span>
                        <p className="text-sm font-light leading-relaxed mb-6" style={{ color: '#6B6560' }}>
                            Une cuisine française contemporaine. Intime, précise, mémorable.
                        </p>
                        <div className="flex flex-col gap-2">
                            {socials.map(s => (
                                <Link
                                    key={s.label}
                                    href={s.href}
                                    className="text-xs tracking-widest uppercase font-light transition-all duration-300 w-fit"
                                    style={{ color: '#6B6560' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                                    onMouseLeave={e => (e.currentTarget.style.color = '#6B6560')}
                                >
                                    {s.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
            <span className="text-xs tracking-widest uppercase font-light block mb-8" style={{ color: '#C9A96E' }}>
              Navigation
            </span>
                        <div className="flex flex-col gap-4">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-light transition-all duration-300 w-fit"
                                    style={{ color: '#6B6560' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#0F0E0D')}
                                    onMouseLeave={e => (e.currentTarget.style.color = '#6B6560')}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
            <span className="text-xs tracking-widest uppercase font-light block mb-8" style={{ color: '#C9A96E' }}>
              Horaires
            </span>
                        <div className="flex flex-col gap-5">
                            {horaires.map((h, i) => (
                                <div key={i}>
                  <span className="text-xs tracking-widest uppercase font-light block mb-1" style={{ color: '#6B6560' }}>
                    {h.jour}
                  </span>
                                    <span className="text-sm font-light" style={{ color: '#0F0E0D' }}>
                    {h.heure}
                  </span>
                                </div>
                            ))}
                            <div>
                <span className="text-xs tracking-widest uppercase font-light block mb-1" style={{ color: '#6B6560' }}>
                  Adresse
                </span>
                                <span className="text-sm font-light leading-relaxed" style={{ color: '#0F0E0D' }}>
                  12 rue du Faubourg<br />Saint-Honoré, 75008 Paris
                </span>
                            </div>
                        </div>
                    </div>

                    <div>
            <span className="text-xs tracking-widest uppercase font-light block mb-8" style={{ color: '#C9A96E' }}>
              Newsletter
            </span>
                        <p className="text-sm font-light leading-relaxed mb-8" style={{ color: '#6B6560' }}>
                            Recevez nos menus saisonniers et événements en avant-première.
                        </p>
                        {subscribed ? (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm font-light"
                                style={{ color: '#C9A96E' }}
                            >
                                Merci — à très bientôt.
                            </motion.p>
                        ) : (
                            <div>
                                <input
                                    type="email"
                                    placeholder="votre@email.fr"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-transparent text-sm font-light pb-3 mb-6 outline-none"
                                    style={{
                                        borderBottom: '1px solid #E0DDD7',
                                        color: '#0F0E0D',
                                    }}
                                    onFocus={e => (e.currentTarget.style.borderBottomColor = '#C9A96E')}
                                    onBlur={e => (e.currentTarget.style.borderBottomColor = '#E0DDD7')}
                                />
                                <button
                                    onClick={handleSubscribe}
                                    className="text-xs tracking-widest uppercase font-light px-6 py-3 transition-all duration-300"
                                    style={{ border: '1px solid #0F0E0D', color: '#0F0E0D' }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.backgroundColor = '#0F0E0D'
                                        e.currentTarget.style.color = '#FAF8F5'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = 'transparent'
                                        e.currentTarget.style.color = '#0F0E0D'
                                    }}
                                >
                                    S'abonner
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8" style={{ borderTop: '1px solid #E0DDD7' }}>
          <span className="text-xs font-light tracking-widest" style={{ color: '#6B6560' }}>
            © 2025 Maison Ōra — Tous droits réservés
          </span>
                    <span className="text-xs font-light tracking-widest mt-4 md:mt-0" style={{ color: '#C9A96E' }}>
            Paris, France
          </span>
                </div>

            </div>
        </footer>
    )
}

export default Footer