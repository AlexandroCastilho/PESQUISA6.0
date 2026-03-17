'use client'

import { Menu, Bell, Search, User, ChevronRight } from 'lucide-react'

interface TopbarProps {
  onMenuClick: () => void
  title?: string
}

export function Topbar({ onMenuClick, title }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5 text-[var(--color-text-secondary)]" />
        </button>

        {title && (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
              <span>App</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Search (desktop) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 w-64 transition-all focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30 focus-within:bg-white focus-within:border-[var(--color-primary)]/50 shadow-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-slate-500 hover:text-slate-900">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </button>

        {/* Avatar */}
        <button className="relative flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-slate-200 transition-all cursor-pointer ml-1">
          <div className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center shadow-sm">
            <span className="text-[var(--color-primary)] text-xs font-bold">AS</span>
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </button>
      </div>
    </header>
  )
}
