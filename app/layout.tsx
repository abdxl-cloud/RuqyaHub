import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { CustomerChatWidget } from "@/components/customer-chat-widget"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"
import { ChatProvider } from "@/contexts/chat-context"
import { Toaster } from "@/components/ui/toaster"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ruqya Healing Hub - Healing through Qur'an and Sunnah",
  description: "Authentic Islamic Ruqya services, consultations, and spiritual healing resources",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <LoadingScreen />
        <AdminAuthProvider>
          <ChatProvider>
            <CartProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <Navigation />
                {children}
                <Footer />
                <CustomerChatWidget />
              </Suspense>
              <Toaster />
            </CartProvider>
          </ChatProvider>
        </AdminAuthProvider>
      </body>
    </html>
  )
}
