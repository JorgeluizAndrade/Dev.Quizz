"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Copy, Check, X, Coffee } from "lucide-react"
import { Button, Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react"
import { motion, AnimatePresence } from "framer-motion"
import qrcode from "../../public/qrcode.png"

export default function PixModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const pixKeyRef = useRef<HTMLSpanElement>(null)

  const pixData = {
    email: "luizj1718@gmail.com",
    nome: "Jorge Luiz Andrade",
    banco: "PicPay Serviços S.A",
  }

  const copyToClipboard = () => {
    if (pixKeyRef.current) {
      navigator.clipboard.writeText(pixData.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-4 left-4 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full shadow-lg flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
              size="md"
            >
              <Coffee className="h-4 w-4" />
              Buy a coffee for developer
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1], // Custom ease curve for a more natural feel
            }}
            className="fixed bottom-4 left-4 z-50"
          >
            <Card className="w-72 shadow-lg border-2 border-amber-900">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <h2 className="text-lg font-medium">Buy me a coffee</h2>
                <Button variant="ghost" size="md" onClick={() => setIsOpen(false)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardBody className="space-y-4 pt-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex justify-center"
                >
                  <div className="relative w-48 h-48 bg-white p-2 border rounded-md">
                    <Image src={qrcode || "/placeholder.svg"} alt="QR Code PIX" fill className="object-contain" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex items-center justify-between bg-amber-50 p-2 rounded-md"
                >
                  <span ref={pixKeyRef} className="text-sm font-medium text-amber-900 truncate max-w-[180px]">
                    {pixData.email}
                  </span>
                  <Tooltip content={copied ? "Copied!" : "Copy PIX key"}>
                    <Button variant="ghost" size="md" className="h-6 w-6" onClick={copyToClipboard}>
                      <motion.div animate={copied ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
                        {copied ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3 text-amber-700" />
                        )}
                      </motion.div>
                    </Button>
                  </Tooltip>
                </motion.div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
