import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export const useNavbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const [showBackoffice, setShowBackoffice] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const supabase = createClient()

        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()
            setShowBackoffice(Boolean(data.session))
        }

        checkSession()

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setShowBackoffice(Boolean(session))
        })

        return () => subscription.subscription.unsubscribe()
    }, [])

    return { scrolled, hoveredLink, setHoveredLink, showBackoffice }
}