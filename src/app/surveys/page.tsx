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
  Star,
  Smile,
  ListTodo,
  Inbox,
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

const typeLabel: Record<string, string> = { nps: 'NPS', csat: 'CSAT', multiple_choice: 'Múltipla Escolha', custom: 'Personalizada' }

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'active':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Ativa
        </span>
      )
    case 'paused':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
          <Pause className="w-3 h-3" /> Pausada
        </span>
      )
    case 'draft':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <FileText className="w-3 h-3" /> Rascunho
        </span>
      )
    default:
      return <span className="badge badge-neutral">Desconhecido</span>
  }
}

const getTypeConfig = (type: string) => {
  switch(type) {
    case 'nps': return { icon: Star, colorClass: 'text-amber-500', bgClass: 'bg-amber-50' }
    case 'csat': return { icon: Smile, colorClass: 'text-emerald-500', bgClass: 'bg-emerald-50' }
    case 'multiple_choice': return { icon: ListTodo, colorClass: 'text-blue-500', bgClass: 'bg-blue-50' }
    default: return { icon: FileText, colorClass: 'text-slate-500', bgClass: 'bg-slate-50' }
  }
}

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
              className="input pl-10 text-sm focus:ring-blue-500/20"
            />
          </div>
        </div>
        <Link href="/surveys/new" className="btn btn-primary text-sm shadow-sm">
          <Plus className="w-4 h-4 text-white" />
          <span className="font-semibold">Nova Pesquisa</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl w-fit mb-6 shadow-sm border border-slate-200/50">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.key
                ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/50'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Survey List */}
      <div className="card">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-[1fr_120px_120px_100px_100px_40px] items-center gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-t-2xl">
          <span>Pesquisa</span>
          <span>Tipo</span>
          <span>Status</span>
          <span>Respostas</span>
          <span>Criada em</span>
          <span></span>
        </div>

        <div className="divide-y divide-slate-100 border-x border-b border-transparent">
          {filtered.map((survey) => {
            const TypeIconConfig = getTypeConfig(survey.type)
            const TypeIcon = TypeIconConfig.icon

            return (
            <div
              key={survey.id}
              className="relative flex flex-col md:grid md:grid-cols-[1fr_120px_120px_100px_100px_40px] md:items-center gap-2 md:gap-4 p-5 hover:bg-blue-50/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${TypeIconConfig.bgClass} flex items-center justify-center shrink-0 shadow-sm border border-white/50`}>
                  <TypeIcon className={`w-5 h-5 ${TypeIconConfig.colorClass}`} />
                </div>
                <div className="min-w-0">
                  <Link href={`/surveys/${survey.id}`} className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors no-underline truncate block">
                    {survey.title}
                  </Link>
                </div>
              </div>

              <span className="badge badge-info text-xs w-fit">{typeLabel[survey.type]}</span>
              {getStatusBadge(survey.status)}

              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {survey.total > 0 ? `${survey.responses}/${survey.total}` : '—'}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
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
                  className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <MoreHorizontal className="w-5 h-5 text-slate-500" />
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
            )
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Inbox className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">Nenhuma pesquisa encontrada</h3>
              <p className="text-sm mb-4">Comece criando sua primeira pesquisa de satisfação.</p>
              <Link href="/surveys/new" className="btn btn-secondary text-sm">
                <Plus className="w-4 h-4" />
                Criar Rascunho
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
