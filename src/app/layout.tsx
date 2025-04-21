import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import { cn } from '@/lib/utils'
import Navbar from '@/components/shared/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/shared/Footer'

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
    <html lang="en" className='h-full'>
      <body className={cn(inter.className, "antialiased min-h-screen flex flex-col")}>
        <Providers>
          <Navbar />

          <main className="flex-grow pt-16">{children}</main>

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

          {/* Footer at the bottom */}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
