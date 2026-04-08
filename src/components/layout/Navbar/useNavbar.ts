import { useState, useEffect } from 'react'

export const useNavbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return { scrolled, hoveredLink, setHoveredLink }
}