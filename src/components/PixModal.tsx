"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Copy, Check, X } from "lucide-react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import { Tooltip } from "@nextui-org/react"
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

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} 
      variant="shadow"
      radius="md"
        color="secondary"
      className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg">
        Donate
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="w-72 shadow-lg">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <h2 className="text-lg">Contribute to the project</h2>
          <Button variant="ghost" size="md" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardBody className="space-y-4">
            <span className="text-sm text-blue-600">If you like to this project, support with your donated.</span>
            <span className="top-3">Scan the QR Code with your  {` bank's `} app or copy the PIX key.</span>
          <div className="flex justify-center">
            <div className="relative w-48 h-48 bg-white p-2 border rounded-md">
              <Image
                src={qrcode}
                alt="QR Code PIX"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Chave PIX:</span>
              <div className="flex items-center gap-1">
                <span ref={pixKeyRef} className="text-sm">
                  {pixData.email}
                </span>
                  <Tooltip>
                      <Button variant="ghost" size="md" className="h-6 w-6" onClick={copyToClipboard}>
                        {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                      </Button>
                  </Tooltip>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold">Nome:</span>
              <span>{pixData.nome}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold">Banco:</span>
              <span>{pixData.banco}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

