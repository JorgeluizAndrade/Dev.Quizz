import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import { cn } from '@/lib/utils'
import Navabar from '@/components/Navabar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dev.Quizz',
  description: 'Dev.Quizz for developers who want to test their knowledge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={cn(inter.className, "antialiased min-h-screen pt-16")}>
        <Providers>
         <Navabar />
             {children}
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            /> 
        </Providers>
        </body>
    </html>
  )
}
