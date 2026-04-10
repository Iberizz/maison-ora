'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const nav = [
    { label: 'Dashboard', href: '/admin', icon: '▪' },
    { label: 'Réservations', href: '/admin/reservations', icon: '▪' },
    { label: 'Messages', href: '/admin/messages', icon: '▪' },
    { label: 'Clients', href: '/admin/clients', icon: '▪' },
    { label: 'Menu', href: '/admin/menu', icon: '▪' },
    { label: 'Commandes', href: '/admin/commandes', icon: '▪' },
    { label: 'Analytics', href: '/admin/analytics', icon: '▪' },
    { label: 'Logs', href: '/admin/logs', icon: '▪' },
    { label: 'Paramètres', href: '/admin/settings', icon: '▪' },
]

const Sidebar = () => {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <aside
            className="fixed left-0 top-0 h-screen w-64 flex flex-col"
            style={{ backgroundColor: '#111110', borderRight: '0.5px solid rgba(255,255,255,0.06)' }}
        >
            <div className="px-6 py-8 mb-4" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <span className="font-serif text-lg tracking-widest block" style={{ color: '#FAF8F5' }}>
          Maison Ōra
        </span>
                <span className="text-xs tracking-widest uppercase font-light" style={{ color: '#C9A96E' }}>
          Administration
        </span>
            </div>

            <nav className="flex-1 px-3 py-4">
                {nav.map(item => {
                    const active = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 mb-1 text-xs tracking-widest uppercase font-light transition-all duration-200 rounded-sm"
                            style={{
                                backgroundColor: active ? 'rgba(201,169,110,0.1)' : 'transparent',
                                color: active ? '#C9A96E' : 'rgba(250,248,245,0.4)',
                                borderLeft: active ? '2px solid #C9A96E' : '2px solid transparent',
                            }}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="px-6 py-6" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-light mb-3" style={{ color: 'rgba(250,248,245,0.3)' }}>
                    admin@ora.fr
                </p>
                <button
                    onClick={handleLogout}
                    className="text-xs tracking-widest uppercase font-light transition-all duration-200"
                    style={{ color: 'rgba(250,248,245,0.3)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E24B4A')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,248,245,0.3)')}
                >
                    Déconnexion
                </button>
            </div>
        </aside>
    )
}

export default Sidebar