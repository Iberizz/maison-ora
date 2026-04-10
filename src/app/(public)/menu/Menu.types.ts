// Page.types.ts

// --- Supabase raw row (miroir exact de la table menu_items) ---
export type MenuItemRow = {
    id: string
    name: string
    description: string | null
    price: number
    category: MenuCategory
    image_url: string | null
    is_available: boolean
    created_at: string
}

// --- Catégories ---
export type MenuCategory =
    | 'entrees'
    | 'plats'
    | 'desserts'
    | 'boissons'

export const MENU_CATEGORIES: { label: string; value: MenuCategory }[] = [
    { label: 'Entrées',   value: 'entrees'  },
    { label: 'Plats',     value: 'plats'    },
    { label: 'Desserts',  value: 'desserts' },
    { label: 'Boissons',  value: 'boissons' },
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