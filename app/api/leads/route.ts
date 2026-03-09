import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inicializa o cliente do Supabase com as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    // 1. Recebe os dados enviados pelo funil (Frontend)
    const body = await request.json();
    const { faturamento, gargalo, nome, empresa, instagram, whatsapp } = body;

    // Validação básica
    if (!nome || !whatsapp) {
      return NextResponse.json(
        { error: 'Nome e WhatsApp são obrigatórios' },
        { status: 400 }
      );
    }

    // 2. Insere os dados na tabela 'leads' no Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          nome,
          empresa,
          instagram,
          whatsapp,
          faturamento,
          gargalo,
          status: 'novo', // Status inicial para o seu pipeline
          criado_em: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.error('Erro no Supabase:', error);
      throw new Error(error.message);
    }

    // 3. Dispara o Webhook para o n8n (Sua notificação em tempo real)
    // O n8n vai escutar isso e te mandar uma mensagem no WhatsApp com os dados do empresário
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'novo_lead_high_ticket',
            lead: data[0] // Manda os dados recém-salvos no banco
          }),
        });
        console.log('✅ Alerta enviado para o n8n com sucesso.');
      } catch (n8nError) {
        // Se o n8n falhar, o log avisa, mas NÃO trava o processo do cliente
        console.error('⚠️ Erro ao notificar o n8n (mas o lead foi salvo no banco):', n8nError);
      }
    } else {
      console.warn('⚠️ N8N_WEBHOOK_URL não configurada no arquivo .env');
    }

    // 4. Retorna sucesso para o Frontend redirecionar o cliente para o seu WhatsApp
    return NextResponse.json({ 
      sucesso: true, 
      mensagem: 'Lead cadastrado com sucesso',
      lead: data[0] 
    });

  } catch (error: any) {
    console.error('❌ Erro na Rota da API:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor', detalhes: error.message },
      { status: 500 }
    );
  }
}