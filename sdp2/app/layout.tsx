import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Shopfloor",
  description: "A shopfloor application for Delware",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Content (rechts naast navbar) */}
            <div className="flex-1 md:ml-64 transition-all duration-300 ease-in-out">
              <main className="p-8 w-full">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

