import { Metadata } from "next"
import "./globals.css"
import localFont from "next/font/local"
import clsx from "clsx"
import Navbar from "./components/sidebar"
const graphik = localFont({
  src: [
    {
      path: "../public/fonts/Graphik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Graphik-Medium.ttf",
      weight: "600",
      style: "bold",
    },
  ],
  variable: "--font-graphik",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://bitly.dev"),
  title: {
    default: "Ed Zhao",
    template: "%s | Ed Zhao",
  },
  description: "Developer, writer, and designer.",
  openGraph: {
    title: "Ed Zhao",
    description: "Developer, writer, and designer.",
    url: "https://bitly.dev",
    siteName: "Ed Zhao",
    locale: "en_NZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Ed Zhao",
    card: "summary_large_image",
  },
  verification: {
    google: "wc5CTcOtpnEg95bqhClX8p4U52UmKFTqZjWm0ePCMoU",
    yandex: "",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "text-black bg-white dark:text-white dark:bg-[#111010]",
        graphik.variable
      )}
    >
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
