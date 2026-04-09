export interface SiteSettings {
    restaurant_name: string
    tagline: string
    email: string
    phone: string
    address: string
}

export interface Schedule {
    day: string
    open: boolean
    hours: string
}

export interface SettingsState {
    site: SiteSettings
    schedule: Schedule[]
    tax_rate: number
    service_fee: number
}