import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Get user's company
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('company_id')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    const companyId = userData.company_id

    // Get SMTP settings for the company
    const { data: smtpSettings, error: smtpError } = await supabase
      .from('smtp_settings')
      .select('*')
      .eq('company_id', companyId)
      .single()

    if (smtpError || !smtpSettings) {
      return NextResponse.json(
        { error: 'Configurações SMTP não encontradas. Configure em Configurações > SMTP.' },
        { status: 400 }
      )
    }

    // Parse request body
    const { surveyId, customerIds } = await request.json()

    if (!surveyId || !customerIds?.length) {
      return NextResponse.json(
        { error: 'surveyId e customerIds são obrigatórios' },
        { status: 400 }
      )
    }

    // Get survey info
    const { data: survey, error: surveyError } = await supabase
      .from('surveys')
      .select('*')
      .eq('id', surveyId)
      .eq('company_id', companyId)
      .single()

    if (surveyError || !survey) {
      return NextResponse.json({ error: 'Pesquisa não encontrada' }, { status: 404 })
    }

    // Get customers
    const { data: customers, error: custError } = await supabase
      .from('customers')
      .select('*')
      .eq('company_id', companyId)
      .in('id', customerIds)

    if (custError || !customers?.length) {
      return NextResponse.json({ error: 'Nenhum contato encontrado' }, { status: 404 })
    }

    // Create SMTP transport
    const transporter = nodemailer.createTransport({
      host: smtpSettings.smtp_host,
      port: smtpSettings.smtp_port,
      secure: smtpSettings.use_tls && smtpSettings.smtp_port === 465,
      auth: {
        user: smtpSettings.smtp_user,
        pass: smtpSettings.smtp_pass_encrypted, // In production, decrypt this
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Send emails and create survey_sends records
    const results = []

    for (const customer of customers) {
      // Create survey_send record to get unique token
      const { data: sendRecord, error: sendError } = await supabase
        .from('survey_sends')
        .insert({
          survey_id: surveyId,
          customer_id: customer.id,
          company_id: companyId,
          status: 'pending',
        })
        .select()
        .single()

      if (sendError || !sendRecord) {
        results.push({ customerId: customer.id, success: false, error: 'Erro ao criar registro' })
        continue
      }

      try {
        const surveyLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/respond/${sendRecord.token}`

        await transporter.sendMail({
          from: `"${smtpSettings.from_name}" <${smtpSettings.from_email}>`,
          to: customer.email,
          subject: `${survey.title} — Queremos ouvir você!`,
          html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="width: 48px; height: 48px; background: #2563eb; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                  <span style="color: white; font-size: 20px; font-weight: bold;">P</span>
                </div>
                <h1 style="color: #0f172a; font-size: 24px; margin: 0;">PulseMetric</h1>
              </div>
              <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 32px;">
                <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 8px 0;">
                  Olá <strong>${customer.name}</strong>,
                </p>
                <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  Gostaríamos de ouvir a sua opinião! Responda nossa pesquisa <strong>"${survey.title}"</strong>.
                  Leva apenas 2 minutos.
                </p>
                <div style="text-align: center;">
                  <a href="${surveyLink}" style="display: inline-block; background: #2563eb; color: white; padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 16px;">
                    Responder Pesquisa →
                  </a>
                </div>
              </div>
              <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
                Se o botão não funcionar, copie e cole este link: ${surveyLink}
              </p>
            </div>
          `,
        })

        // Update status to sent
        await supabase
          .from('survey_sends')
          .update({ status: 'sent', sent_at: new Date().toISOString() })
          .eq('id', sendRecord.id)

        results.push({ customerId: customer.id, success: true })
      } catch (emailError) {
        // Update status to bounced
        await supabase
          .from('survey_sends')
          .update({ status: 'bounced' })
          .eq('id', sendRecord.id)

        results.push({
          customerId: customer.id,
          success: false,
          error: emailError instanceof Error ? emailError.message : 'Erro no envio',
        })
      }
    }

    const sent = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length

    return NextResponse.json({
      message: `${sent} e-mails enviados, ${failed} falharam`,
      results,
    })
  } catch (error) {
    console.error('Error sending survey:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
