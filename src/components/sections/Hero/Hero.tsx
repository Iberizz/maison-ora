'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button/Button'
import { HeroProps } from './Hero.types'

const Hero = ({
                  title = 'L\'art de recevoir',
                  subtitle = 'Une cuisine française contemporaine — intime, précise, mémorable.',
                  imageSrc = '/images/hero.png',
              }: HeroProps) => {
    const router = useRouter()

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Image
                src={imageSrc}
                alt="Maison Ōra"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-dark/60" />

            <div className="relative z-10 h-full w-full flex flex-col justify-end pb-24 px-16">
                <span className="text-gold text-xs tracking-widest uppercase font-light mb-6">
                Maison Ōra — Paris
                </span>

                <h1 className="text-cream mb-6">
                    {title}
                </h1>

                <p className="text-cream/60 font-light text-lg max-w-md mb-10">
                    {subtitle}
                </p>

                <div className="flex items-center gap-4">
                    <Button
                        label="Réserver une table"
                        size="lg"
                        variant="primary"
                        onClick={() => router.push('/#reservation')}
                    />
                    <Button
                        label="Découvrir le menu"
                        size="lg"
                        variant="secondary"
                        onClick={() => router.push('/menu')}
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero