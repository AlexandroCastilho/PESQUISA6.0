'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import {
  Plus,
  Search,
  MoreHorizontal,
  FileText,
  Clock,
  Users,
  Play,
  Pause,
  Trash2,
  Copy,
  Eye,
} from 'lucide-react'

type TabKey = 'all' | 'active' | 'paused' | 'draft'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'active', label: 'Ativas' },
  { key: 'paused', label: 'Pausadas' },
  { key: 'draft', label: 'Rascunhos' },
]

const surveys = [
  { id: '1', title: 'NPS Q1 2026', type: 'nps', status: 'active', responses: 234, total: 500, createdAt: '12 Mar 2026' },
  { id: '2', title: 'Satisfação Pós-Venda', type: 'csat', status: 'active', responses: 89, total: 150, createdAt: '10 Mar 2026' },
  { id: '3', title: 'Feedback Produto v3.0', type: 'multiple_choice', status: 'active', responses: 412, total: 600, createdAt: '08 Mar 2026' },
  { id: '4', title: 'Onboarding Experience', type: 'csat', status: 'paused', responses: 56, total: 200, createdAt: '05 Mar 2026' },
  { id: '5', title: 'Employee Satisfaction', type: 'nps', status: 'draft', responses: 0, total: 0, createdAt: '01 Mar 2026' },
  { id: '6', title: 'Pesquisa Anual de Clima', type: 'nps', status: 'draft', responses: 0, total: 0, createdAt: '28 Fev 2026' },
]

const statusBadge: Record<string, string> = { active: 'badge-success', paused: 'badge-warning', draft: 'badge-neutral', completed: 'badge-info' }
const statusLabel: Record<string, string> = { active: 'Ativa', paused: 'Pausada', draft: 'Rascunho', completed: 'Concluída' }
const typeLabel: Record<string, string> = { nps: 'NPS', csat: 'CSAT', multiple_choice: 'Múltipla Escolha', custom: 'Personalizada' }

export default function SurveysPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const filtered = surveys.filter((s) => {
    if (activeTab !== 'all' && s.status !== activeTab) return false
    if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <DashboardLayout title="Pesquisas">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Buscar pesquisa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 text-sm"
            />
          </div>
        </div>
        <Link href="/surveys/new" className="btn btn-primary text-sm">
          <Plus className="w-4 h-4" />
          Nova Pesquisa
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[var(--color-border-light)] rounded-lg w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
              activeTab === tab.key
                ? 'bg-white text-[var(--color-text-primary)] shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Survey List */}
      <div className="card">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-[1fr_120px_120px_100px_100px_40px] items-center gap-4 px-5 py-3 border-b border-[var(--color-border)] text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          <span>Pesquisa</span>
          <span>Tipo</span>
          <span>Status</span>
          <span>Respostas</span>
          <span>Criada em</span>
          <span></span>
        </div>

        <div className="divide-y divide-[var(--color-border)]">
          {filtered.map((survey) => (
            <div
              key={survey.id}
              className="relative flex flex-col md:grid md:grid-cols-[1fr_120px_120px_100px_100px_40px] md:items-center gap-2 md:gap-4 p-5 hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5 text-[var(--color-primary)]" />
                </div>
                <div className="min-w-0">
                  <Link href={`/surveys/${survey.id}`} className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors no-underline truncate block">
                    {survey.title}
                  </Link>
                </div>
              </div>

              <span className="badge badge-info text-xs w-fit">{typeLabel[survey.type]}</span>
              <span className={`badge ${statusBadge[survey.status]} text-xs w-fit`}>{statusLabel[survey.status]}</span>

              <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                <Users className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                {survey.total > 0 ? `${survey.responses}/${survey.total}` : '—'}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                <Clock className="w-3.5 h-3.5" />
                {survey.createdAt}
              </div>

              {/* Actions */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenMenu(openMenu === survey.id ? null : survey.id)
                  }}
                  className="p-1.5 rounded-lg hover:bg-[var(--color-border-light)] transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <MoreHorizontal className="w-4 h-4 text-[var(--color-text-muted)]" />
                </button>

                {openMenu === survey.id && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[var(--color-border)] rounded-lg shadow-lg z-10 py-1 animate-scale-in">
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
                      <Eye className="w-4 h-4" /> Ver detalhes
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
                      {survey.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {survey.status === 'active' ? 'Pausar' : 'Ativar'}
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
                      <Copy className="w-4 h-4" /> Duplicar
                    </button>
                    <div className="h-px bg-[var(--color-border)] my-1" />
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--color-danger)] hover:bg-red-50 transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4" /> Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-[var(--color-text-muted)]">
              <FileText className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">Nenhuma pesquisa encontrada</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
