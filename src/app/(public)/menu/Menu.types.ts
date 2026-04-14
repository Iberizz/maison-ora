// Page.types.ts

// --- Supabase raw row (miroir exact de la table menu_items) ---
export type MenuItemRow = {
    id: string
    title: string
    description: string | null
    price: number
    category: MenuCategory
    image: string | null
    available: boolean
    is_signature: boolean | null
    created_at: string | null
}

// --- Catégories ---
export type MenuCategory =
    | 'entree'
    | 'plat'
    | 'dessert'
    | 'boisson'

export const MENU_CATEGORIES: { label: string; value: MenuCategory }[] = [
    { label: 'Entrées',   value: 'entree'  },
    { label: 'Plats',     value: 'plat'    },
    { label: 'Desserts',  value: 'dessert' },
    { label: 'Boissons',  value: 'boisson' },
]

// --- Badge disponibilité ---
export type AvailabilityStatus = 'available' | 'unavailable'

// --- State du hook useMenu ---
export type MenuPageState = {
    items: MenuItemRow[]
    filteredItems: MenuItemRow[]
    activeCategory: MenuCategory | 'all'
    isLoading: boolean
    error: string | null
}

// --- Props des sous-composants ---
export type MenuCardProps = {
    item: MenuItemRow
}

export type CategoryFilterProps = {
    activeCategory: MenuCategory | 'all'
    onChange: (category: MenuCategory | 'all') => void
}