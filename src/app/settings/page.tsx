'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import {
  User,
  Mail,
  Server,
  Shield,
  Save,
  TestTube,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Crown,
  UserCog,
} from 'lucide-react'

type SettingsTab = 'profile' | 'smtp' | 'team'

const tabs: { key: SettingsTab; label: string; icon: React.ElementType }[] = [
  { key: 'profile', label: 'Perfil', icon: User },
  { key: 'smtp', label: 'Configurações SMTP', icon: Mail },
  { key: 'team', label: 'Equipe', icon: Shield },
]

const teamMembers = [
  { name: 'Alexandre Silva', email: 'alex@pulsemetric.com', role: 'master', active: true },
  { name: 'Maria Santos', email: 'maria@pulsemetric.com', role: 'admin', active: true },
  { name: 'João Costa', email: 'joao@pulsemetric.com', role: 'viewer', active: true },
  { name: 'Ana Lima', email: 'ana@pulsemetric.com', role: 'viewer', active: false },
]

const roleConfig: Record<string, { label: string; badge: string; icon: React.ElementType }> = {
  master: { label: 'Master', badge: 'badge-warning', icon: Crown },
  admin: { label: 'Admin', badge: 'badge-info', icon: UserCog },
  viewer: { label: 'Viewer', badge: 'badge-neutral', icon: User },
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [showSmtpPass, setShowSmtpPass] = useState(false)
  const [smtpTesting, setSmtpTesting] = useState(false)
  const [smtpTestResult, setSmtpTestResult] = useState<'success' | 'error' | null>(null)

  const handleTestSmtp = () => {
    setSmtpTesting(true)
    setSmtpTestResult(null)
    setTimeout(() => {
      setSmtpTesting(false)
      setSmtpTestResult('success')
    }, 2000)
  }

  return (
    <DashboardLayout title="Configurações">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Side tabs */}
        <div className="lg:w-56 shrink-0">
          <div className="flex lg:flex-col gap-1 p-1 bg-[var(--color-border-light)] lg:bg-transparent rounded-lg lg:rounded-none">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex-1 lg:flex-initial ${
                    activeTab === tab.key
                      ? 'bg-white lg:bg-[var(--color-primary-light)] text-[var(--color-primary)] shadow-sm lg:shadow-none'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-6">
                Perfil do Usuário
              </h2>
              <div className="space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-blue-400 flex items-center justify-center text-white text-xl font-bold">
                    AS
                  </div>
                  <div>
                    <button className="btn btn-secondary text-sm">Alterar foto</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Nome completo
                    </label>
                    <input type="text" defaultValue="Alexandre Silva" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                      E-mail
                    </label>
                    <input type="email" defaultValue="alex@pulsemetric.com" className="input" disabled />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Empresa
                  </label>
                  <input type="text" defaultValue="PulseMetric LTDA" className="input" />
                </div>

                <div className="flex justify-end pt-2">
                  <button className="btn btn-primary">
                    <Save className="w-4 h-4" />
                    Salvar alterações
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SMTP Tab */}
          {activeTab === 'smtp' && (
            <div className="card p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                    Configurações SMTP
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                    Configure seu servidor de e-mail para disparo de pesquisas
                  </p>
                </div>
                <Server className="w-5 h-5 text-[var(--color-text-muted)]" />
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Servidor SMTP
                    </label>
                    <input type="text" placeholder="smtp.gmail.com" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Porta
                    </label>
                    <input type="number" placeholder="587" className="input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Usuário SMTP
                    </label>
                    <input type="text" placeholder="noreply@suaempresa.com" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Senha SMTP
                    </label>
                    <div className="relative">
                      <input
                        type={showSmtpPass ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="input pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSmtpPass(!showSmtpPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer"
                      >
                        {showSmtpPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                      E-mail remetente
                    </label>
                    <input type="email" placeholder="pesquisa@suaempresa.com" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Nome do remetente
                    </label>
                    <input type="text" placeholder="Equipe de Pesquisa" className="input" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--color-primary)]" />
                    <span className="text-sm text-[var(--color-text-secondary)]">Usar TLS/SSL</span>
                  </label>
                </div>

                {/* Test result */}
                {smtpTestResult && (
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg text-sm animate-fade-in ${
                      smtpTestResult === 'success'
                        ? 'bg-[var(--color-success-light)] text-green-800'
                        : 'bg-[var(--color-danger-light)] text-red-800'
                    }`}
                  >
                    {smtpTestResult === 'success' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Conexão SMTP estabelecida com sucesso!
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        Falha na conexão. Verifique as credenciais.
                      </>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
                  <button
                    onClick={handleTestSmtp}
                    disabled={smtpTesting}
                    className="btn btn-secondary"
                  >
                    <TestTube className="w-4 h-4" />
                    {smtpTesting ? 'Testando...' : 'Testar Conexão'}
                  </button>
                  <button className="btn btn-primary">
                    <Save className="w-4 h-4" />
                    Salvar Configurações
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="card animate-fade-in">
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
                <div>
                  <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                    Gestão de Equipe
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                    Gerencie os membros e permissões da sua equipe
                  </p>
                </div>
                <button className="btn btn-primary text-sm">
                  <Plus className="w-4 h-4" />
                  Convidar
                </button>
              </div>

              <div className="divide-y divide-[var(--color-border)]">
                {teamMembers.map((member, i) => {
                  const roleConf = roleConfig[member.role]
                  const RoleIcon = roleConf.icon
                  return (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-5 hover:bg-[var(--color-surface-hover)] transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-blue-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {member.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                            {member.name}
                            {!member.active && (
                              <span className="text-xs text-[var(--color-text-muted)] ml-2">(inativo)</span>
                            )}
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)] truncate">{member.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`badge ${roleConf.badge} flex items-center gap-1`}>
                          <RoleIcon className="w-3 h-3" />
                          {roleConf.label}
                        </span>
                        {member.role !== 'master' && (
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
