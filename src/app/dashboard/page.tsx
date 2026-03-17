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
  { label: 'Pesquisas Ativas', value: '12', change: '+3', up: true, icon: FileText, colorClass: 'text-blue-600', bgClass: 'from-blue-50 to-blue-100/50' },
  { label: 'Total de Respostas', value: '2.847', change: '+18%', up: true, icon: Users, colorClass: 'text-emerald-600', bgClass: 'from-emerald-50 to-emerald-100/50' },
  { label: 'Taxa Média de Resposta', value: '67%', change: '-2%', up: false, icon: TrendingUp, colorClass: 'text-amber-600', bgClass: 'from-amber-50 to-amber-100/50' },
  { label: 'NPS Médio', value: '72', change: '+5', up: true, icon: BarChart3, colorClass: 'text-indigo-600', bgClass: 'from-indigo-50 to-indigo-100/50' },
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
              className="card p-5 animate-fade-in hover:-translate-y-0.5 transition-all duration-200"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.bgClass} shadow-sm border border-white/50`}
                >
                  <Icon className={`w-5.5 h-5.5 ${stat.colorClass}`} />
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${stat.up ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                  {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold tabular-nums text-slate-900">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Surveys */}
      <div className="card animate-fade-in mt-2" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Pesquisas em Andamento
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Acompanhe o progresso das suas pesquisas
            </p>
          </div>
          <a href="/surveys/new" className="btn btn-primary text-sm shadow-sm">
            <Plus className="w-4 h-4 text-white" />
            <span className="hidden sm:inline font-semibold">Nova Pesquisa</span>
          </a>
        </div>

        <div className="divide-y divide-slate-100">
          {recentSurveys.map((survey, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-5 hover:bg-blue-50/50 transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">
                    {survey.title}
                  </h3>
                  <span className={`badge ${statusBadge[survey.status]}`}>
                    {statusLabel[survey.status]}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="badge badge-info">{survey.type}</span>
                  {survey.total > 0 && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {survey.responses}/{survey.total} respostas
                    </span>
                  )}
                </div>
              </div>

              {survey.total > 0 && (
                <div className="w-full sm:w-48">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5">
                    <span>Progresso</span>
                    <span className="font-semibold text-slate-900">{survey.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill shadow-sm" style={{ width: `${survey.progress}%` }} />
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
