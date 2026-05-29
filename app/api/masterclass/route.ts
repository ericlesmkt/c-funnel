import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, whatsapp, segmento } = body;

    if (!nome || !email || !whatsapp) {
      return NextResponse.json(
        { error: 'Nome, email e WhatsApp são obrigatórios' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('leads_masterclass')
      .insert([
        {
          nome,
          email,
          whatsapp,
          segmento,
          evento: 'masterclass_audiencia_vendas',
          status: 'inscrito',
          criado_em: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.error('Erro no Supabase:', error);
      throw new Error(error.message);
    }

    // Notifica o n8n
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'nova_inscricao_masterclass',
            lead: data[0]
          }),
        });
      } catch (n8nError) {
        console.error('⚠️ Erro ao notificar n8n:', n8nError);
      }
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: 'Inscrição realizada com sucesso',
      lead: data[0]
    });

  } catch (error: unknown) {
    console.error('❌ Erro na API Masterclass:', error);
    return NextResponse.json(
      { error: 'Erro interno', detalhes: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
