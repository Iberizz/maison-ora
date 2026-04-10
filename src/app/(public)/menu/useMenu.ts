// useMenu.ts
'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type {
    MenuCategory,
    MenuItemRow,
    MenuPageState,
} from './Menu.types'

export function useMenu() {
    const supabase = createClient()

    const [items, setItems] = useState<MenuItemRow[]>([])
    const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch initial
    useEffect(() => {
        async function fetchMenu() {
            setIsLoading(true)
            setError(null)

            const { data, error } = await supabase
                .from('menu_items')
                .select('*')
                .order('created_at', { ascending: true })

            if (error) {
                setError('Impossible de charger le menu. Veuillez réessayer.')
                setIsLoading(false)
                return
            }

            setItems(data as MenuItemRow[])
            setIsLoading(false)
        }

        fetchMenu()
    }, [])

    // Filtre client-side — pas de requête Supabase supplémentaire
    const filteredItems = useMemo(() => {
        if (activeCategory === 'all') return items
        return items.filter((item) => item.category === activeCategory)
    }, [items, activeCategory])

    const state: MenuPageState = {
        items,
        filteredItems,
        activeCategory,
        isLoading,
        error,
    }

    return {
        ...state,
        setActiveCategory,
    }
}