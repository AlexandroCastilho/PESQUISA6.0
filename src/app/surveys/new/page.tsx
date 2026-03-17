'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import {
  ArrowLeft,
  Gauge,
  ThumbsUp,
  ListChecks,
  Sparkles,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react'

const surveyTypes = [
  { key: 'nps', label: 'NPS', desc: 'Escala de 0 a 10 para medir lealdade', icon: Gauge, color: '#2563eb' },
  { key: 'csat', label: 'CSAT', desc: 'Escala de satisfação do cliente', icon: ThumbsUp, color: '#22c55e' },
  { key: 'multiple_choice', label: 'Múltipla Escolha', desc: 'Perguntas com opções de resposta', icon: ListChecks, color: '#f59e0b' },
  { key: 'custom', label: 'Personalizada', desc: 'Crie perguntas livres e abertas', icon: Sparkles, color: '#8b5cf6' },
]

interface Question {
  id: string
  text: string
  type: string
  options: string[]
}

export default function NewSurveyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: '', type: 'nps_scale', options: [] },
  ])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now().toString(), text: '', type: 'open_text', options: [] },
    ])
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const updateQuestion = (id: string, field: string, value: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  return (
    <DashboardLayout title="Nova Pesquisa">
      {/* Back */}
      <button
        onClick={() => (step > 1 ? setStep(step - 1) : router.push('/surveys'))}
        className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                s === step
                  ? 'bg-[var(--color-primary)] text-white'
                  : s < step
                    ? 'bg-[var(--color-success)] text-white'
                    : 'bg-[var(--color-border-light)] text-[var(--color-text-muted)]'
              }`}
            >
              {s}
            </div>
            <span className={`text-sm ${s === step ? 'text-[var(--color-text-primary)] font-medium' : 'text-[var(--color-text-muted)]'}`}>
              {s === 1 ? 'Tipo e Título' : 'Perguntas'}
            </span>
            {s < 2 && <div className="w-12 h-0.5 bg-[var(--color-border)] mx-2" />}
          </div>
        ))}
      </div>

      {/* Step 1: Type + Title */}
      {step === 1 && (
        <div className="animate-fade-in space-y-6">
          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
              Escolha o tipo da pesquisa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {surveyTypes.map((t) => {
                const Icon = t.icon
                return (
                  <button
                    key={t.key}
                    onClick={() => setSelectedType(t.key)}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      selectedType === t.key
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-50)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/30 bg-white'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${t.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: t.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{t.label}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{t.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="card p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                Título da pesquisa
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: NPS Q1 2026"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                Descrição (opcional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o objetivo desta pesquisa..."
                className="input min-h-[80px] resize-y"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!selectedType || !title}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Questions */}
      {step === 2 && (
        <div className="animate-fade-in space-y-4">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
            Configure as perguntas
          </h2>

          {questions.map((q, i) => (
            <div key={q.id} className="card p-5 animate-fade-in">
              <div className="flex items-start gap-3">
                <GripVertical className="w-5 h-5 text-[var(--color-text-muted)] mt-2.5 shrink-0 cursor-grab" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">
                      Pergunta {i + 1}
                    </span>
                    <select
                      value={q.type}
                      onChange={(e) => updateQuestion(q.id, 'type', e.target.value)}
                      className="input w-auto text-xs px-2 py-1"
                    >
                      <option value="nps_scale">Escala NPS (0-10)</option>
                      <option value="csat_scale">Escala CSAT (1-5)</option>
                      <option value="multiple_choice">Múltipla Escolha</option>
                      <option value="open_text">Texto Aberto</option>
                      <option value="rating">Avaliação (Estrelas)</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    value={q.text}
                    onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                    placeholder="Digite a pergunta..."
                    className="input"
                  />
                </div>
                <button
                  onClick={() => removeQuestion(q.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors cursor-pointer mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="btn btn-secondary w-full border-dashed"
          >
            <Plus className="w-4 h-4" />
            Adicionar pergunta
          </button>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(1)} className="btn btn-secondary">
              Voltar
            </button>
            <div className="flex gap-3">
              <button className="btn btn-secondary">Salvar Rascunho</button>
              <button className="btn btn-primary">Publicar Pesquisa</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
