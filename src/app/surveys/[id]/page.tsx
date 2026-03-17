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
      {/* Back */}
      <Link
        href="/surveys"
        className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-6 no-underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Pesquisas
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{surveyData.title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="badge badge-info">{surveyData.type}</span>
            <span className="badge badge-success">Ativa</span>
          </div>
        </div>
        <button className="btn btn-primary">
          <Send className="w-4 h-4" />
          Enviar para Contatos
        </button>
      </div>

      {/* NPS Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-sm text-[var(--color-text-muted)]">NPS Score</span>
          </div>
          <p className="text-3xl font-bold text-[var(--color-primary)]">{surveyData.npsScore}</p>
        </div>
        <div className="card p-5 animate-fade-in" style={{ animationDelay: '80ms' }}>
          <p className="text-sm text-[var(--color-text-muted)] mb-2">Promotores</p>
          <p className="text-2xl font-bold text-[var(--color-success)]">{surveyData.promoters}%</p>
          <div className="progress-bar mt-2">
            <div className="progress-bar-fill" style={{ width: `${surveyData.promoters}%`, background: 'var(--color-success)' }} />
          </div>
        </div>
        <div className="card p-5 animate-fade-in" style={{ animationDelay: '160ms' }}>
          <p className="text-sm text-[var(--color-text-muted)] mb-2">Passivos</p>
          <p className="text-2xl font-bold text-[var(--color-warning)]">{surveyData.passives}%</p>
          <div className="progress-bar mt-2">
            <div className="progress-bar-fill" style={{ width: `${surveyData.passives}%`, background: 'var(--color-warning)' }} />
          </div>
        </div>
        <div className="card p-5 animate-fade-in" style={{ animationDelay: '240ms' }}>
          <p className="text-sm text-[var(--color-text-muted)] mb-2">Detratores</p>
          <p className="text-2xl font-bold text-[var(--color-danger)]">{surveyData.detractors}%</p>
          <div className="progress-bar mt-2">
            <div className="progress-bar-fill" style={{ width: `${surveyData.detractors}%`, background: 'var(--color-danger)' }} />
          </div>
        </div>
      </div>

      {/* Sends table */}
      <div className="card animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
          <div>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Contatos</h3>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
              {surveyData.responses} de {surveyData.total} responderam
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
            <Users className="w-4 h-4" />
            {surveyData.total} contatos
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-[1fr_1fr_120px_100px_100px] items-center gap-4 px-5 py-3 border-b border-[var(--color-border)] text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          <span>Nome</span>
          <span>E-mail</span>
          <span>Status</span>
          <span>Enviado</span>
          <span>Respondido</span>
        </div>

        <div className="divide-y divide-[var(--color-border)]">
          {sends.map((s, i) => {
            const config = statusConfig[s.status]
            const StatusIcon = config.icon
            return (
              <div
                key={i}
                className="flex flex-col md:grid md:grid-cols-[1fr_1fr_120px_100px_100px] md:items-center gap-1 md:gap-4 p-5 hover:bg-[var(--color-surface-hover)] transition-colors"
              >
                <span className="text-sm font-medium text-[var(--color-text-primary)]">{s.name}</span>
                <span className="text-sm text-[var(--color-text-muted)]">{s.email}</span>
                <span className={`badge ${config.badge} w-fit flex items-center gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {config.label}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{s.sentAt || '—'}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{s.respondedAt || '—'}</span>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
