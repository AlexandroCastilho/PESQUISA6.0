import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PulseMetric — Pesquisa de Satisfação Inteligente',
  description: 'Plataforma SaaS para pesquisas de satisfação NPS, CSAT e múltipla escolha. Meça, analise e melhore a experiência dos seus clientes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
