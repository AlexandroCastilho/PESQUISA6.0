'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  X,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navGroups = [
  {
    items: [
      { label: 'Início', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Pesquisas', href: '/surveys', icon: FileText },
      { label: 'Relatórios', href: '/reports', icon: BarChart3 },
    ]
  },
  {
    items: [
      { label: 'Configurações', href: '/settings', icon: Settings },
    ]
  }
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn('sidebar-overlay lg:hidden', isOpen && 'active')}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-white border-r border-[var(--color-border)] shadow-sm flex flex-col transition-all duration-300 ease-in-out',
          collapsed ? 'w-[72px]' : 'w-[260px]',
          'max-lg:w-[280px]',
          isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full',
          'lg:translate-x-0 lg:sticky lg:top-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Activity className="w-4.5 h-4.5 text-white" />
            </div>
            {!collapsed && (
              <span className="text-xl font-extrabold text-slate-900 tracking-tighter">
                PulseMetric
              </span>
            )}
          </Link>

          {/* Close button (mobile) */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-4 overflow-y-auto">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="px-3">
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 no-underline',
                        isActive
                          ? 'bg-[var(--color-primary-50)] text-[var(--color-primary)] font-semibold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      )}
                    >
                      <Icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-[var(--color-primary)]' : 'text-slate-400')} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  )
                })}
              </div>
              {groupIdx < navGroups.length - 1 && (
                <div className="h-px bg-slate-100 my-4 mx-2" />
              )}
            </div>
          ))}
        </nav>

        {/* Footer User Profile */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center gap-3 overflow-hidden", collapsed && "justify-center w-full")}>
              <div className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-[var(--color-primary)] text-xs font-bold">AS</span>
              </div>
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-slate-900 truncate">Alex Silva</span>
                  <span className="text-xs text-slate-500 truncate">alex@pulsemetric.com</span>
                </div>
              )}
            </div>
            {!collapsed && (
              <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                <LogOut className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        </div>

        {/* Collapse button (desktop only) */}
        <div className="hidden lg:block p-3 border-t border-slate-100">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-400 cursor-pointer"
          >
            {collapsed ? (
              <ChevronRight className="w-4.5 h-4.5" />
            ) : (
              <ChevronLeft className="w-4.5 h-4.5" />
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
