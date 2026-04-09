'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Modal from '@/components/ui/Modal/Modal'
import { logAction } from '@/lib/supabase/logger'

interface MenuItem {
    id: string
    title: string
    description: string
    category: string
    price: number
    image: string
    available: boolean
    position: number
}

const categories = [
    { key: 'all', label: 'Tous' },
    { key: 'entree', label: 'Entrées' },
    { key: 'plat', label: 'Plats' },
    { key: 'dessert', label: 'Desserts' },
    { key: 'boisson', label: 'Boissons' },
]

const emptyForm = {
    title: '',
    description: '',
    category: 'plat',
    price: '',
    image: '',
    available: true,
}

const MenuClient = ({ items }: { items: MenuItem[] }) => {
    const [filter, setFilter] = useState('all')
    const [modalOpen, setModalOpen] = useState(false)
    const [deleteModal, setDeleteModal] = useState<{ open: boolean, id: string | null }>({ open: false, id: null })
    const [form, setForm] = useState(emptyForm)
    const [editing, setEditing] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const filtered = items.filter(i => filter === 'all' || i.category === filter)

    const openAdd = () => {
        setForm(emptyForm)
        setEditing(null)
        setModalOpen(true)
    }

    const openEdit = (item: MenuItem) => {
        setForm({
            title: item.title,
            description: item.description,
            category: item.category,
            price: item.price.toString(),
            image: item.image ?? '',
            available: item.available,
        })
        setEditing(item.id)
        setModalOpen(true)
    }

    const handleSave = async () => {
        if (!form.title || !form.price) return
        setLoading(true)
        const supabase = createClient()

        const payload = {
            title: form.title,
            description: form.description,
            category: form.category,
            price: parseFloat(form.price),
            image: form.image,
            available: form.available,
        }

        if (editing) {
            await supabase.from('menu_items').update(payload).eq('id', editing)
        } else {
            await supabase.from('menu_items').insert(payload)
        }
        await logAction({
            action: editing ? 'Plat modifié' : 'Plat ajouté',
            entity: 'menu',
            user_email: 'admin@ora.fr',
            metadata: { title: form.title, category: form.category }
        })
        setLoading(false)
        setModalOpen(false)
        router.refresh()
    }

    const handleDelete = async () => {
        if (!deleteModal.id) return
        setLoading(true)
        const supabase = createClient()
        await supabase.from('menu_items').delete().eq('id', deleteModal.id)
        await logAction({
            action: 'Plat supprimé',
            entity: 'menu',
            entity_id: deleteModal.id ?? undefined,
            user_email: 'admin@ora.fr',
        })
        setLoading(false)
        setDeleteModal({ open: false, id: null })
        router.refresh()
    }

    const toggleAvailable = async (id: string, current: boolean) => {
        const supabase = createClient()
        await supabase.from('menu_items').update({ available: !current }).eq('id', id)
        router.refresh()
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="font-serif font-light text-3xl mb-1" style={{ color: '#FAF8F5' }}>Menu</h1>
                    <p className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                        {filtered.length} plat{filtered.length > 1 ? 's' : ''}
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="px-4 py-2 text-xs tracking-widest uppercase font-light transition-all duration-200"
                    style={{ border: '0.5px solid #C9A96E', color: '#C9A96E' }}
                    onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#C9A96E'
                        e.currentTarget.style.color = '#0F0E0D'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = '#C9A96E'
                    }}
                >
                    + Ajouter un plat
                </button>
            </div>

            <div className="flex gap-2 mb-8">
                {categories.map(c => (
                    <button
                        key={c.key}
                        onClick={() => setFilter(c.key)}
                        className="px-4 py-1.5 text-xs tracking-widest uppercase font-light transition-all duration-200 rounded-sm"
                        style={{
                            backgroundColor: filter === c.key ? 'rgba(201,169,110,0.15)' : 'transparent',
                            color: filter === c.key ? '#C9A96E' : 'rgba(250,248,245,0.4)',
                            border: filter === c.key ? '0.5px solid rgba(201,169,110,0.3)' : '0.5px solid transparent',
                        }}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div
                    className="rounded-sm p-12 text-center"
                    style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                >
                    <p className="text-sm font-light mb-4" style={{ color: 'rgba(250,248,245,0.3)' }}>
                        Aucun plat dans cette catégorie
                    </p>
                    <button
                        onClick={openAdd}
                        className="text-xs tracking-widest uppercase font-light"
                        style={{ color: '#C9A96E' }}
                    >
                        + Ajouter un plat
                    </button>
                </div>
            ) : (
                <div
                    className="rounded-sm overflow-hidden"
                    style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                >
                    <table className="w-full">
                        <thead>
                        <tr style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                            {['Plat', 'Catégorie', 'Prix', 'Disponible', 'Actions'].map(h => (
                                <th key={h} className="text-left px-6 py-4 text-xs tracking-widest uppercase font-light"
                                    style={{ color: 'rgba(250,248,245,0.3)' }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <AnimatePresence>
                            {filtered.map((item, i) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2, delay: i * 0.04 }}
                                    style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {item.image && (
                                                <div className="w-12 h-12 rounded-sm overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-light"
                                                   style={{color: '#FAF8F5'}}>{item.title}</p>
                                                <p className="text-xs font-light mt-1"
                                                   style={{color: 'rgba(250,248,245,0.4)'}}>{item.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className="text-xs tracking-widest uppercase font-light px-3 py-1 rounded-sm"
                            style={{backgroundColor: 'rgba(201,169,110,0.1)', color: '#C9A96E'}}>
                        {item.category}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-light" style={{color: '#FAF8F5'}}>
                                        €{item.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleAvailable(item.id, item.available)}
                                            className="text-xs tracking-widest uppercase font-light px-3 py-1 rounded-sm transition-all duration-200"
                                            style={{
                                                backgroundColor: item.available ? 'rgba(29,158,117,0.1)' : 'rgba(226,75,74,0.1)',
                                                color: item.available ? '#1D9E75' : '#E24B4A',
                                            }}
                                        >
                                            {item.available ? 'Disponible' : 'Indisponible'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => openEdit(item)}
                                                className="text-xs tracking-widest uppercase font-light transition-all duration-200"
                                                style={{ color: '#C9A96E' }}
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => setDeleteModal({ open: true, id: item.id })}
                                                className="text-xs tracking-widest uppercase font-light transition-all duration-200"
                                                style={{ color: '#E24B4A' }}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier le plat' : 'Nouveau plat'}>
                <div className="flex flex-col gap-6">
                    {[
                        { key: 'title', label: 'Nom du plat', type: 'text' },
                        { key: 'description', label: 'Description', type: 'text' },
                        { key: 'price', label: 'Prix (€)', type: 'number' },
                        { key: 'image', label: 'URL image', type: 'text' },
                    ].map(field => (
                        <div key={field.key}>
                            <label className="text-xs tracking-widest uppercase font-light block mb-2" style={{ color: '#C9A96E' }}>
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                value={form[field.key as keyof typeof form] as string}
                                onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                                className="w-full bg-transparent text-sm font-light pb-2 outline-none"
                                style={{ borderBottom: '1px solid #E0DDD7', color: '#0F0E0D' }}
                            />
                        </div>
                    ))}

                    <div>
                        <label className="text-xs tracking-widest uppercase font-light block mb-2" style={{ color: '#C9A96E' }}>
                            Catégorie
                        </label>
                        <select
                            value={form.category}
                            onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full bg-transparent text-sm font-light pb-2 outline-none"
                            style={{ borderBottom: '1px solid #E0DDD7', color: '#0F0E0D' }}
                        >
                            <option value="entree">Entrée</option>
                            <option value="plat">Plat</option>
                            <option value="dessert">Dessert</option>
                            <option value="boisson">Boisson</option>
                        </select>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-6 py-3 text-xs tracking-widest uppercase font-light transition-all duration-200"
                            style={{ backgroundColor: '#0F0E0D', color: '#FAF8F5' }}
                        >
                            {loading ? 'Enregistrement...' : editing ? 'Modifier' : 'Ajouter'}
                        </button>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="px-6 py-3 text-xs tracking-widest uppercase font-light"
                            style={{ border: '0.5px solid #E0DDD7', color: '#6B6560' }}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={deleteModal.open} onClose={() => setDeleteModal({ open: false, id: null })} title="Supprimer">
                <div>
                    <p className="font-serif font-light text-xl mb-3" style={{ color: '#0F0E0D' }}>
                        Supprimer ce plat ?
                    </p>
                    <p className="text-sm font-light leading-relaxed mb-8" style={{ color: '#6B6560' }}>
                        Cette action est irréversible.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="px-6 py-3 text-xs tracking-widest uppercase font-light"
                            style={{ backgroundColor: '#E24B4A', color: '#FAF8F5' }}
                        >
                            {loading ? 'Suppression...' : 'Supprimer'}
                        </button>
                        <button
                            onClick={() => setDeleteModal({ open: false, id: null })}
                            className="px-6 py-3 text-xs tracking-widest uppercase font-light"
                            style={{ border: '0.5px solid #E0DDD7', color: '#6B6560' }}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MenuClient