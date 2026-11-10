import type React from "react"
import type { Metadata, Viewport } from "next"
import { Quicksand, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Happy Birthday My Love ❤️",
  description: "A special birthday surprise for someone you love",
  creator: "Farhan Alam",
  authors: [{ name: "Farhan Alam", url: "https://github.com/FarhanAlam-Official" }],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#f472b6", // Pink theme color (original purple: "#a78bfa")
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
