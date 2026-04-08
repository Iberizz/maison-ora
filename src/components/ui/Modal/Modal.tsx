'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ModalProps } from './Modal.types'

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50"
                        style={{ backgroundColor: 'rgba(15,14,13,0.85)' }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
                    >
                        <div
                            className="relative w-full max-w-lg pointer-events-auto p-10"
                            style={{ backgroundColor: '#FAF8F5' }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                {title && (
                                    <span className="text-xs tracking-widest uppercase font-light" style={{ color: '#C9A96E' }}>
                    {title}
                  </span>
                                )}
                                <button
                                    onClick={onClose}
                                    className="ml-auto text-xs tracking-widest uppercase font-light transition-all duration-300"
                                    style={{ color: '#6B6560' }}
                                >
                                    Fermer ×
                                </button>
                            </div>

                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Modal