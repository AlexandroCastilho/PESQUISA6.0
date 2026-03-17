'use client'

import { Menu, Bell, Search, User } from 'lucide-react'

interface TopbarProps {
  onMenuClick: () => void
  title?: string
}

export function Topbar({ onMenuClick, title }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white/80 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5 text-[var(--color-text-secondary)]" />
        </button>

        {title && (
          <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Search (desktop) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-border-light)] w-64 transition-all focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 focus-within:bg-white focus-within:border focus-within:border-[var(--color-primary)]">
          <Search className="w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none text-sm w-full text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
          <Bell className="w-5 h-5 text-[var(--color-text-secondary)]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-danger)] rounded-full" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-blue-400 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>
    </header>
  )
}
