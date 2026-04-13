export type StoryMilestone = {
    year: string
    title: string
    description: string
}

export type StoryFact = {
    label: string
    value: string
    subline?: string
}

export type StoryChapter = {
    id: string
    eyebrow: string
    title: string
    description: string
    imageSrc: string
}