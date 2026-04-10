import type { StoryChapter, StoryFact, StoryMilestone } from './Story.types'

export const STORY_HERO = {
    eyebrow: 'Maison Ōra — Histoire',
    title: 'Un récit culinaire façonné au rythme du détail',
    description:
        'De la première table privée à une maison orchestrée comme une expérience, nous avançons avec la même idée fixe: transformer le repas en souvenir.',
}

export const STORY_MILESTONES: StoryMilestone[] = [
    {
        year: '2014',
        title: 'Première table privée',
        description: 'Une dizaine de couverts, un menu unique, et déjà l’obsession du détail dans chaque assiette.',
    },
    {
        year: '2018',
        title: 'Ouverture Maison Ōra',
        description: 'Naissance de la maison à Paris 8e, avec une vision claire: précision, saisonnalité et élégance.',
    },
    {
        year: '2022',
        title: 'Réseau producteurs consolidé',
        description: 'Partenariats durables avec des artisans français pour sécuriser qualité, traçabilité et régularité.',
    },
    {
        year: '2026',
        title: 'Maison connectée',
        description: 'Digitalisation des réservations, du menu et du backoffice pour piloter une expérience fluide.',
    },
]

export const STORY_CHAPTERS: StoryChapter[] = [
    {
        id: 'origine',
        eyebrow: 'Chapitre 01',
        title: 'Origine',
        description:
            'Au départ, une cuisine intime et quelques convives. Très vite, un langage se dessine: précision des gestes, clarté des goûts, sobriété des assiettes.',
        imageSrc: '/images/philosophy.png',
    },
    {
        id: 'saisonnalite',
        eyebrow: 'Chapitre 02',
        title: 'Saisonnalité',
        description:
            'Chaque carte évolue avec les saisons et nos producteurs. Les produits imposent le tempo: nous adaptons les créations, jamais l’inverse.',
        imageSrc: '/images/menu-vegetal.png',
    },
    {
        id: 'service',
        eyebrow: 'Chapitre 03',
        title: 'Service',
        description:
            'En salle, l’élégance se mesure au calme. Un service attentif, discret, qui accompagne l’expérience sans jamais la surjouer.',
        imageSrc: '/images/menu-fish.png',
    },
]

export const STORY_FACTS: StoryFact[] = [
    { label: 'Couverts / service', value: '32' },
    { label: 'Producteurs partenaires', value: '18' },
    { label: 'Références cave', value: '240+' },
    { label: 'Ville', value: 'Paris 8e' },
]

export const STORY_CLOSING = {
    title: 'La suite se vit à table',
    description:
        'Chaque service prolonge cette histoire. Le menu change, l’exigence reste: précision, saison, hospitalité.',
}
