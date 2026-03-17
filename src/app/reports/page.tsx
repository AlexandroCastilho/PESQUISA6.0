'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react'

const reportData = {
  totalSurveys: 24,
  totalResponses: 4892,
  avgResponseRate: 67,
  npsAvg: 72,
}

const monthlyData = [
  { month: 'Jan', responses: 320, surveys: 2 },
  { month: 'Fev', responses: 480, surveys: 3 },
  { month: 'Mar', responses: 890, surveys: 5 },
]

export default function ReportsPage() {
  return (
    <DashboardLayout title="Relatórios">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="card p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-sm text-[var(--color-text-muted)]">Total de Pesquisas</span>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{reportData.totalSurveys}</p>
        </div>
        <div className="card p-5 animate-fade-in" style={{ animationDelay: '80ms' }}>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-[var(--color-success)]" />
            <span className="text-sm text-[var(--color-text-muted)]">Total de Respostas</span>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{reportData.totalResponses.toLocaleString()}</p>
        </div>
        <div className="card p-5 animate-fade-in" style={{ animationDelay: '160ms' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[var(--color-warning)]" />
            <span className="text-sm text-[var(--color-text-muted)]">Taxa Média de Resposta</span>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{reportData.avgResponseRate}%</p>
        </div>
        <div className="card p-5 animate-fade-in" style={{ animationDelay: '240ms' }}>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-[var(--color-info)]" />
            <span className="text-sm text-[var(--color-text-muted)]">NPS Médio</span>
          </div>
          <p className="text-2xl font-bold text-[var(--color-primary)]">{reportData.npsAvg}</p>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="card animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="p-5 border-b border-[var(--color-border)]">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Resumo Mensal
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            Visão geral das pesquisas e respostas por mês
          </p>
        </div>

        {/* Visual bars */}
        <div className="p-5 space-y-6">
          {monthlyData.map((item, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-text-muted)]" />
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{item.month} 2026</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                  <span>{item.surveys} pesquisas</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{item.responses} respostas</span>
                </div>
              </div>
              <div className="progress-bar h-3">
                <div
                  className="progress-bar-fill h-3"
                  style={{ width: `${(item.responses / 1000) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
