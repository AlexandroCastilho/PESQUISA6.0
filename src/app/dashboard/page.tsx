'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import {
  FileText,
  Users,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Clock,
} from 'lucide-react'

const stats = [
  { label: 'Pesquisas Ativas', value: '12', change: '+3', up: true, icon: FileText, color: 'var(--color-primary)' },
  { label: 'Total de Respostas', value: '2.847', change: '+18%', up: true, icon: Users, color: 'var(--color-success)' },
  { label: 'Taxa Média de Resposta', value: '67%', change: '-2%', up: false, icon: TrendingUp, color: 'var(--color-warning)' },
  { label: 'NPS Médio', value: '72', change: '+5', up: true, icon: BarChart3, color: 'var(--color-info)' },
]

const recentSurveys = [
  { title: 'NPS Q1 2026', type: 'NPS', status: 'active', responses: 234, total: 500, progress: 47 },
  { title: 'Satisfação Pós-Venda', type: 'CSAT', status: 'active', responses: 89, total: 150, progress: 59 },
  { title: 'Feedback Produto v3.0', type: 'Múltipla Escolha', status: 'active', responses: 412, total: 600, progress: 69 },
  { title: 'Onboarding Experience', type: 'CSAT', status: 'paused', responses: 56, total: 200, progress: 28 },
  { title: 'Employee Satisfaction', type: 'NPS', status: 'draft', responses: 0, total: 0, progress: 0 },
]

const statusBadge: Record<string, string> = {
  active: 'badge-success',
  paused: 'badge-warning',
  draft: 'badge-neutral',
  completed: 'badge-info',
}

const statusLabel: Record<string, string> = {
  active: 'Ativa',
  paused: 'Pausada',
  draft: 'Rascunho',
  completed: 'Concluída',
}

export default function DashboardPage() {
  return (
    <DashboardLayout title="Início">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="card p-5 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                  {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">{stat.value}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Surveys */}
      <div className="card animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Pesquisas em Andamento
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
              Acompanhe o progresso das suas pesquisas
            </p>
          </div>
          <a href="/surveys/new" className="btn btn-primary text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Pesquisa</span>
          </a>
        </div>

        <div className="divide-y divide-[var(--color-border)]">
          {recentSurveys.map((survey, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-5 hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                    {survey.title}
                  </h3>
                  <span className={`badge ${statusBadge[survey.status]}`}>
                    {statusLabel[survey.status]}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                  <span className="badge badge-info">{survey.type}</span>
                  {survey.total > 0 && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {survey.responses}/{survey.total} respostas
                    </span>
                  )}
                </div>
              </div>

              {survey.total > 0 && (
                <div className="w-full sm:w-40">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-1">
                    <span>Progresso</span>
                    <span className="font-medium text-[var(--color-text-primary)]">{survey.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${survey.progress}%` }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
