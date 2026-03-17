'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import {
  ArrowLeft,
  Send,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Mail,
  BarChart3,
  TrendingUp,
  Minus,
  TrendingDown,
  ExternalLink,
  Settings,
} from 'lucide-react'
import Link from 'next/link'

const surveyData = {
  title: 'NPS Q1 2026',
  type: 'NPS',
  status: 'active',
  responses: 234,
  total: 500,
  npsScore: 72,
  promoters: 58,
  passives: 28,
  detractors: 14,
}

const sends = [
  { name: 'Maria Silva', email: 'maria@empresa.com', status: 'responded', sentAt: '12 Mar', respondedAt: '12 Mar' },
  { name: 'João Santos', email: 'joao@empresa.com', status: 'responded', sentAt: '12 Mar', respondedAt: '13 Mar' },
  { name: 'Ana Costa', email: 'ana@empresa.com', status: 'opened', sentAt: '12 Mar', respondedAt: null },
  { name: 'Carlos Oliveira', email: 'carlos@empresa.com', status: 'sent', sentAt: '12 Mar', respondedAt: null },
  { name: 'Beatriz Lima', email: 'beatriz@empresa.com', status: 'pending', sentAt: null, respondedAt: null },
  { name: 'Pedro Rocha', email: 'pedro@empresa.com', status: 'bounced', sentAt: '12 Mar', respondedAt: null },
]

const statusConfig: Record<string, { label: string; badge: string; icon: React.ElementType }> = {
  responded: { label: 'Respondeu', badge: 'badge-success', icon: CheckCircle2 },
  opened: { label: 'Abriu', badge: 'badge-info', icon: Mail },
  sent: { label: 'Enviado', badge: 'badge-neutral', icon: Send },
  pending: { label: 'Pendente', badge: 'badge-warning', icon: Clock },
  bounced: { label: 'Não entregue', badge: 'badge-danger', icon: XCircle },
}

export default function SurveyDetailPage() {
  return (
    <DashboardLayout title="Detalhes da Pesquisa">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Navigation */}
        <Link
          href="/surveys"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all mb-8 group no-underline"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Voltar para Pesquisas
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[var(--color-border-light)]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="badge badge-info px-3 py-1 font-semibold">{surveyData.type}</span>
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-success)] bg-[var(--color-success-light)] px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                Ativa
              </div>
            </div>
            <h1 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">{surveyData.title}</h1>
            <p className="text-[var(--color-text-muted)] text-base">Gerencie a estrutura da pesquisa e acompanhe as respostas dos participantes.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] rounded-lg text-[var(--color-text-secondary)] text-sm font-semibold hover:bg-[var(--color-surface-hover)] transition-colors">
              <Settings className="w-5 h-5" />
              Configurações
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--color-primary-hover)] transition-colors">
              <Send className="w-5 h-5" />
              Enviar para Contatos
            </button>
          </div>
        </div>

        {/* NPS Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card p-6 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <BarChart3 className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-[var(--color-primary-light)]">
                <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">NPS Score</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-[var(--color-primary)]">{surveyData.npsScore}</p>
              <span className="text-xs font-medium text-[var(--color-success)]">+5 pts este mês</span>
            </div>
          </div>

          <div className="card p-6 animate-fade-in" style={{ animationDelay: '80ms' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Promotores</span>
              <TrendingUp className="w-4 h-4 text-[var(--color-success)]" />
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <p className="text-3xl font-bold text-[var(--color-success)]">{surveyData.promoters}%</p>
              <span className="text-xs text-[var(--color-text-muted)]">58 clientes</span>
            </div>
            <div className="progress-bar h-2.5">
              <div className="progress-bar-fill" style={{ width: `${surveyData.promoters}%`, backgroundColor: 'var(--color-success)' }} />
            </div>
          </div>

          <div className="card p-6 animate-fade-in" style={{ animationDelay: '160ms' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Passivos</span>
              <Minus className="w-4 h-4 text-[var(--color-warning)]" />
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <p className="text-3xl font-bold text-[var(--color-warning)]">{surveyData.passives}%</p>
              <span className="text-xs text-[var(--color-text-muted)]">28 clientes</span>
            </div>
            <div className="progress-bar h-2.5">
              <div className="progress-bar-fill" style={{ width: `${surveyData.passives}%`, backgroundColor: 'var(--color-warning)' }} />
            </div>
          </div>

          <div className="card p-6 animate-fade-in" style={{ animationDelay: '240ms' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Detratores</span>
              <TrendingDown className="w-4 h-4 text-[var(--color-danger)]" />
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <p className="text-3xl font-bold text-[var(--color-danger)]">{surveyData.detractors}%</p>
              <span className="text-xs text-[var(--color-text-muted)]">14 clientes</span>
            </div>
            <div className="progress-bar h-2.5">
              <div className="progress-bar-fill" style={{ width: `${surveyData.detractors}%`, backgroundColor: 'var(--color-danger)' }} />
            </div>
          </div>
        </div>

        {/* Sends table */}
        <div className="card animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-light)]">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Gestão de Envios</h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                <span className="font-semibold text-[var(--color-text-primary)]">{surveyData.responses}</span> de {surveyData.total} respostas coletadas
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-hover)] rounded-lg text-sm font-medium text-[var(--color-text-secondary)]">
                <Users className="w-4 h-4" />
                {surveyData.total} total
              </div>
              <button className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {/* Desktop header */}
            <div className="min-w-[800px] grid grid-cols-[1.5fr_1.5fr_1fr_100px_100px] items-center gap-4 px-8 py-4 bg-[var(--color-surface-hover)]/50 text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border-light)]">
              <span>Cliente</span>
              <span>Contato</span>
              <span>Status</span>
              <span className="text-center">Enviado</span>
              <span className="text-center">Resposta</span>
            </div>

            <div className="min-w-[800px] divide-y divide-[var(--color-border-light)]">
              {sends.map((s, i) => {
                const config = statusConfig[s.status]
                const StatusIcon = config.icon
                return (
                  <div
                    key={i}
                    className="grid grid-cols-[1.5fr_1.5fr_1fr_100px_100px] items-center gap-4 px-8 py-5 hover:bg-[var(--color-surface-hover)] transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                        {s.name}
                      </span>
                    </div>
                    <span className="text-sm text-[var(--color-text-secondary)] font-medium">{s.email}</span>
                    <div className="flex">
                      <span className={`badge ${config.badge} px-2.5 py-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {config.label}
                      </span>
                    </div>
                    <span className="text-xs text-center font-medium text-[var(--color-text-muted)]">{s.sentAt || '—'}</span>
                    <span className="text-xs text-center font-medium text-[var(--color-text-primary)]">{s.respondedAt || '—'}</span>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="p-6 border-t border-[var(--color-border-light)] flex justify-center">
            <button className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
              Ver todos os 234 respondentes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

