'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { NavbarProps } from './Navbar.types'
import { useNavbar } from './useNavbar'
import Button from '@/components/ui/Button/Button'

const defaultLinks = [
    { label: 'Menu', href: '/menu' },
    { label: 'Histoire', href: '/histoire' },
    { label: 'Contact', href: '/contact' },
]

const Navbar = ({ links = defaultLinks }: NavbarProps) => {
    const { scrolled, hoveredLink, setHoveredLink } = useNavbar()

    return (
        <header className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
            scrolled ? 'bg-cream border-b border-border py-4' : 'bg-transparent py-6'
        )}>
            <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className={cn(
                    'font-serif text-xl tracking-widest transition-colors duration-400',
                    scrolled ? 'text-dark' : 'text-cream'
                )}>
                    Maison Ōra
                </Link>

                <ul className="hidden md:flex items-center gap-10">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.href)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className="text-xs tracking-widest uppercase font-light relative group"
                                style={{
                                    color: scrolled ? '#6B6560' : 'rgba(250,248,245,0.7)',
                                }}
                            >
                                {link.label}
                                <span
                                    className="absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500"
                                    style={{
                                        width: hoveredLink === link.href ? '100%' : '0%',
                                    }}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                <Button
                    label="Réserver"
                    size="sm"
                    variant={scrolled ? 'primary' : 'secondary'}
                />
            </nav>
        </header>
    )
}

export default Navbar