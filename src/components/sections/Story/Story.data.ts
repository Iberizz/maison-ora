import type { StoryChapter, StoryFact, StoryMilestone } from './Story.types'

export const STORY_HERO = {
    eyebrow: 'Maison \u014cra \u2014 Histoire',
    title: 'Un r\u00e9cit culinaire fa\u00e7onn\u00e9 au rythme du d\u00e9tail',
    description:
        "De la premi\u00e8re table priv\u00e9e \u00e0 une maison orchestr\u00e9e comme une exp\u00e9rience, nous avan\u00e7ons avec la m\u00eame id\u00e9e fixe : transformer le repas en souvenir.",
}

export const STORY_FACTS: StoryFact[] = [
    { label: 'Couverts / service',       value: '32',       subline: 'une intimit\u00e9 voulue'            },
    { label: 'Producteurs partenaires',  value: '18',       subline: 'des artisans de confiance'        },
    { label: 'R\u00e9f\u00e9rences cave',value: '240+',     subline: 'choisis par notre sommelier'      },
    { label: 'Ville',                    value: 'Paris ', subline: 'rue du Faubourg Saint-Honor\u00e9' },
]

export const STORY_CHAPTERS: StoryChapter[] = [
    {
        id: 'origine',
        eyebrow: 'Chapitre 01',
        title: 'Origine',
        description:
            "Au d\u00e9part, une cuisine intime et quelques convives. Tr\u00e8s vite, un langage se dessine : pr\u00e9cision des gestes, clart\u00e9 des go\u00fbts, sobriet\u00e9 des assiettes.",
        imageSrc: '/images/histoire-origine.png',
    },
    {
        id: 'saisonnalite',
        eyebrow: 'Chapitre 02',
        title: 'Saisonnalit\u00e9',
        description:
            "Chaque carte \u00e9volue avec les saisons et nos producteurs. Les produits imposent le tempo : nous adaptons les cr\u00e9ations, jamais l'inverse.",
        imageSrc: '/images/histoire-saison.png',
    },
    {
        id: 'service',
        eyebrow: 'Chapitre 03',
        title: 'Service',
        description:
            "En salle, l'\u00e9l\u00e9gance se mesure au calme. Un service attentif, discret, qui accompagne l'exp\u00e9rience sans jamais la surjouer.",
        imageSrc: '/images/histoire-service.png',
    },
]

export const STORY_MILESTONES: StoryMilestone[] = [
    {
        year: '2014',
        title: 'Premi\u00e8re table priv\u00e9e',
        description: "Une dizaine de couverts, un menu unique, et d\u00e9j\u00e0 l'obsession du d\u00e9tail dans chaque assiette.",
    },
    {
        year: '2018',
        title: 'Ouverture Maison \u014cra',
        description: 'Naissance de la maison \u00e0 Paris 8e, avec une vision claire : pr\u00e9cision, saisonnalit\u00e9 et \u00e9l\u00e9gance.',
    },
    {
        year: '2022',
        title: 'R\u00e9seau producteurs consolid\u00e9',
        description: 'Partenariats durables avec des artisans fran\u00e7ais pour s\u00e9curiser qualit\u00e9, tra\u00e7abilit\u00e9 et r\u00e9gularit\u00e9.',
    },
    {
        year: '2026',
        title: 'Maison connect\u00e9e',
        description: 'Digitalisation des r\u00e9servations, du menu et du backoffice pour piloter une exp\u00e9rience fluide.',
    },
]

export const STORY_CLOSING = {
    title: 'La suite se vit \u00e0 table',
    description:
        "Chaque service prolonge cette histoire. Le menu change, l'exigence reste : pr\u00e9cision, saison, hospitalit\u00e9.",
}