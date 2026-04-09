'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        setError(null)

        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError('Email ou mot de passe incorrect.')
            setLoading(false)
            return
        }

        router.push('/admin')
    }

    return (
        <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0F0E0D' }}>
            <div className="w-full max-w-sm px-8">
        <span className="font-serif text-2xl tracking-widest block mb-2" style={{ color: '#FAF8F5' }}>
          Maison Ōra
        </span>
                <span className="text-xs tracking-widest uppercase font-light block mb-16" style={{ color: '#C9A96E' }}>
          Espace administration
        </span>

                <div className="flex flex-col gap-8 mb-10">
                    {[
                        { label: 'Email', value: email, set: setEmail, type: 'email' },
                        { label: 'Mot de passe', value: password, set: setPassword, type: 'password' },
                    ].map(field => (
                        <div key={field.label}>
                            <label className="text-xs tracking-widest uppercase font-light block mb-3" style={{ color: '#C9A96E' }}>
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                value={field.value}
                                onChange={e => field.set(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                                className="w-full bg-transparent font-light text-sm pb-3 outline-none"
                                style={{ borderBottom: '1px solid rgba(250,248,245,0.2)', color: '#FAF8F5' }}
                                onFocus={e => (e.currentTarget.style.borderBottomColor = '#C9A96E')}
                                onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(250,248,245,0.2)')}
                            />
                        </div>
                    ))}
                </div>

                {error && (
                    <p className="text-xs font-light mb-6" style={{ color: '#E24B4A' }}>
                        {error}
                    </p>
                )}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full py-4 text-xs tracking-widest uppercase font-light transition-all duration-300"
                    style={{ border: '1px solid #C9A96E', color: '#C9A96E' }}
                    onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#C9A96E'
                        e.currentTarget.style.color = '#0F0E0D'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = '#C9A96E'
                    }}
                >
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
            </div>
        </main>
    )
}