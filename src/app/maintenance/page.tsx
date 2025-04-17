"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Wrench, Clock } from "lucide-react"
import Image from "next/image"
import innovationAnimate from '../../../public/innovation-animate.svg'

export default function MaintenancePage() {
  const [dots, setDots] = useState(".")

  // Animação dos pontos de carregamento
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden"
      >
        {/* Círculos decorativos */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-100 dark:bg-yellow-900/20 rounded-full opacity-50" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mb-6 w-full h-48 sm:h-56 mx-auto"
        >
          <Image src={innovationAnimate} alt="Maintenance illustration" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wrench className="h-6 w-6 text-purple-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Site em manutenção</h1>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Estamos atualizando o sistema para melhorar sua experiência.
            <br />
            Voltamos em breve!
          </p>

          <motion.div
            className="flex items-center justify-center gap-2 text-purple-500 font-medium"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <Clock className="h-5 w-5" />
            <p>Trabalhando nisso{dots}</p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 text-sm text-gray-500 dark:text-gray-400"
      >
        Agradecemos sua paciência e compreensão.
      </motion.p>
    </div>
  )
}
