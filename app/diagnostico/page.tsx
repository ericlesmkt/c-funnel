"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, TrendingUp, Target, AlertCircle,
  Building2, User, Instagram, Phone, Loader2, CheckCircle2,
  Briefcase, Users, Video, MessageCircle
} from "lucide-react";

export default function LeadFunnel() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const [formData, setFormData] = useState({
    nicho: "",
    faturamento: "",
    seguidores: "",
    statusConteudo: "",
    gargalo: "",
    nome: "",
    empresa: "",
    instagram: "",
    whatsapp: "",
  });

  const totalSteps = 5;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Função para aplicar a máscara (DD) 9XXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    }
    if (value.length > 7) {
      value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    }

    setFormData({ ...formData, whatsapp: value });
  };

  const handleFinalizar = async () => {
    if (!formData.nome || !formData.whatsapp) {
      alert("Por favor, preencha seu nome e WhatsApp para continuarmos.");
      return;
    }

    setIsSubmitting(true);

    try {
      // O POST PARA A SUA API (QUE CHAMA O SUPABASE E O N8N)
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao salvar o lead no banco de dados.');
      }

      console.log("✅ Lead qualificado e salvo com sucesso:", data);

      // DISPARO DO EVENTO PRO META ADS
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== 'undefined' && (window as any).fbq) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).fbq('track', 'Lead', {
          content_name: 'Aplicacao_Imersao_HighEnd',
          value: 599.20,
          currency: 'BRL'
        });
      }

      const textoZap = `Olá, Éricles! Preenchi a aplicação para o Método N.A.V.E.\n\n*📋 Dossiê da Empresa:*\n*Nome:* ${formData.nome}\n*Empresa:* ${formData.empresa}\n*Nicho:* ${formData.nicho}\n*Instagram:* ${formData.instagram} (${formData.seguidores} seguidores)\n\n*💰 Financeiro:*\n*Faturamento:* ${formData.faturamento}\n\n*⚠️ Situação Atual:*\n*Produção de Conteúdo:* ${formData.statusConteudo}\n*Maior Desafio:* ${formData.gargalo}\n\nAguardo a análise para garantir minha vaga na Turma Beta.`;

      const seuNumero = "5584991465820";
      const zapLink = `https://wa.me/${seuNumero}?text=${encodeURIComponent(textoZap)}`;

      // Salva a URL para o botão na tela 6
      setWhatsappUrl(zapLink);
      setStep(6);
    } catch (error) {
      console.error("❌ Erro ao salvar lead:", error);
      alert("Ocorreu um erro ao processar seus dados. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#050a10]">
      {/* Efeito de luz ao fundo com a cor Neon do Método N.A.V.E. */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#00ffcc]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HEADER DE NAVEGAÇÃO */}
      <Link href="/" className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#050a10]/85 backdrop-blur-xl border-b border-[#1e293b]">
        <img src="/nave-logo.png" alt="Método N.A.V.E." className="h-7 md:h-12 w-auto flex-shrink-0 object-contain" />
        <span className="text-[#94a3b8] text-xs flex items-center gap-1.5 hover:text-[#00ffcc] transition-colors">
          <ArrowLeft size={14} /> Voltar
        </span>
      </Link>

      <div className="w-full max-w-md z-10 flex flex-col min-h-[85vh] justify-between pt-8">

        {/* BARRA DE PROGRESSO */}
        {step < 6 && (
          <div className="space-y-6 mt-8">
            <div className="flex items-center justify-between">
              <span className="text-[#94a3b8] font-bold text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-space)' }}>Triagem Clínica</span>
              <span className="text-[#00ffcc] font-medium text-xs bg-[#00ffcc]/10 border border-[#00ffcc]/20 px-3 py-1 rounded-full">Etapa {step} de {totalSteps}</span>
            </div>
            <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#00ffcc]"
                initial={{ width: "20%" }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 relative mt-10">
          <AnimatePresence mode="wait">

            {/* ETAPA 1: O NICHO (Ancoragem) */}
            {step === 1 && (
              <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-[#1e293b] rounded-lg"><Briefcase className="text-[#00ffcc]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#e2e8f0]" style={{ fontFamily: 'var(--font-space)' }}>Qual é o seu mercado?</h2>
                </div>
                <p className="text-[#94a3b8] text-sm mb-6">Precisamos entender o perfil do seu negócio para validar a aplicação.</p>

                <div className="space-y-3">
                  {[
                    "Saúde, Estética ou Clínica",
                    "Comércio / Loja Física",
                    "Serviços Locais / Profissional Liberal",
                    "Alimentação / Delivery",
                    "Outro nicho"
                  ].map((nicho) => (
                    <button
                      key={nicho}
                      onClick={() => { setFormData({ ...formData, nicho: nicho }); setTimeout(nextStep, 300); }}
                      className={`w-full p-4 rounded-xl text-left transition-all border text-sm font-medium ${formData.nicho === nicho ? "bg-[#00ffcc]/10 border-[#00ffcc]/50 text-[#00ffcc]" : "bg-[#1e293b]/50 border-[#1e293b] hover:border-[#00ffcc]/30 text-[#94a3b8]"}`}
                    >
                      {nicho}
                      {formData.nicho === nicho && <CheckCircle2 size={18} className="inline-block float-right" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ETAPA 2: FATURAMENTO (O Filtro Financeiro) */}
            {step === 2 && (
              <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-[#1e293b] rounded-lg"><TrendingUp className="text-[#00ffcc]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#e2e8f0]" style={{ fontFamily: 'var(--font-space)' }}>Qual o momento atual do negócio?</h2>
                </div>
                <p className="text-[#94a3b8] text-sm mb-6">Selecione a faixa de faturamento mensal para dimensionarmos a estratégia.</p>
                <div className="space-y-3">
                  {[
                    { id: "ate-10k", label: "Até R$ 10.000 / mês" },
                    { id: "10k-50k", label: "De R$ 10.000 a R$ 50.000 / mês" },
                    { id: "mais-50k", label: "Acima de R$ 50.000 / mês" }
                  ].map((op) => (
                    <button
                      key={op.id}
                      onClick={() => { setFormData({ ...formData, faturamento: op.label }); setTimeout(nextStep, 300); }}
                      className={`w-full p-5 rounded-xl flex items-center justify-between transition-all border ${formData.faturamento === op.label ? "bg-[#00ffcc]/10 border-[#00ffcc]/50 text-[#00ffcc]" : "bg-[#1e293b]/50 border-[#1e293b] hover:border-[#00ffcc]/30 text-[#94a3b8]"}`}
                    >
                      <span className="font-medium">{op.label}</span>
                      {formData.faturamento === op.label && <CheckCircle2 size={20} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ETAPA 3: RAIO-X DIGITAL (A Confissão) */}
            {step === 3 && (
              <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-[#1e293b] rounded-lg"><Video className="text-[#00ffcc]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#e2e8f0]" style={{ fontFamily: 'var(--font-space)' }}>Raio-X Digital</h2>
                </div>
                <p className="text-[#94a3b8] text-sm mb-6">Como está a sua estrutura no Instagram hoje?</p>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[#94a3b8] text-xs font-bold uppercase ml-1">Volume de Seguidores</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-4 text-[#94a3b8]" size={18} />
                      <select
                        value={formData.seguidores}
                        onChange={(e) => setFormData({ ...formData, seguidores: e.target.value })}
                        className="w-full p-4 pl-12 bg-[#1e293b]/50 border border-[#1e293b] rounded-xl text-[#e2e8f0] outline-none focus:border-[#00ffcc] transition-all text-sm appearance-none"
                      >
                        <option value="" disabled>Selecione uma opção...</option>
                        <option value="Menos de 1.000">Menos de 1.000 seguidores</option>
                        <option value="De 1.000 a 10.000">De 1.000 a 10.000 seguidores</option>
                        <option value="Mais de 10.000">Mais de 10.000 seguidores</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <label className="text-[#94a3b8] text-xs font-bold uppercase ml-1">Como você produz conteúdo hoje?</label>
                    {[
                      "Não gravo (falta tempo ou tenho vergonha)",
                      "Delego para agência (mas os posts não vendem)",
                      "Tento gravar internamente (mas sinto que fica amador)",
                      "Já gravo bem e com frequência (mas busco escalar minhas vendas)"
                    ].map((status) => (
                      <button
                        key={status}
                        onClick={() => { setFormData({ ...formData, statusConteudo: status }); }}
                        className={`w-full p-4 rounded-xl text-left transition-all border text-sm ${formData.statusConteudo === status ? "bg-[#00ffcc]/10 border-[#00ffcc]/50 text-[#00ffcc]" : "bg-[#1e293b]/50 border-[#1e293b] hover:border-[#00ffcc]/30 text-[#94a3b8]"}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ETAPA 4: O GARGALO (A Dor) */}
            {step === 4 && (
              <motion.div key="step4" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-[#1e293b] rounded-lg"><AlertCircle className="text-[#00ffcc]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#e2e8f0]" style={{ fontFamily: 'var(--font-space)' }}>Qual o seu maior obstáculo?</h2>
                </div>
                <p className="text-[#94a3b8] text-sm mb-6">Onde o processo trava na hora de atrair clientes?</p>

                <div className="space-y-3">
                  {[
                    "Gasto muito tempo com marketing, mas não vejo retorno em vendas.",
                    "Atraio curiosos, mas poucos clientes dispostos a pagar meu preço.",
                    "Dependo apenas de indicação boca-a-boca",
                    "Não faço anúncios patrocinados (Tráfego Pago)"
                  ].map((gargalo) => (
                    <button
                      key={gargalo}
                      onClick={() => { setFormData({ ...formData, gargalo: gargalo }); setTimeout(nextStep, 300); }}
                      className={`w-full p-4 rounded-xl text-left transition-all border text-sm ${formData.gargalo === gargalo ? "bg-[#00ffcc]/10 border-[#00ffcc]/50 text-[#00ffcc]" : "bg-[#1e293b]/50 border-[#1e293b] hover:border-[#00ffcc]/30 text-[#94a3b8]"}`}
                    >
                      {gargalo}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ETAPA 5: DADOS DA EMPRESA E CONTATO FINAL */}
            {step === 5 && (
              <motion.div key="step5" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-[#1e293b] rounded-lg"><Building2 className="text-[#00ffcc]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#e2e8f0]" style={{ fontFamily: 'var(--font-space)' }}>Dados da Empresa</h2>
                </div>
                <p className="text-[#94a3b8] text-sm mb-4">Última etapa. Nossa equipe fará a pré-análise antes do nosso contato.</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[#94a3b8] text-[10px] font-bold uppercase ml-1">Seu Nome</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 text-[#94a3b8]" size={16} />
                        <input type="text" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className="w-full p-3 pl-10 bg-[#1e293b]/50 border border-[#1e293b] rounded-xl text-[#e2e8f0] outline-none focus:border-[#00ffcc] transition-all text-sm" placeholder="Nome" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[#94a3b8] text-[10px] font-bold uppercase ml-1">Empresa</label>
                      <div className="relative">
                        <Target className="absolute left-3 top-3.5 text-[#94a3b8]" size={16} />
                        <input type="text" value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} className="w-full p-3 pl-10 bg-[#1e293b]/50 border border-[#1e293b] rounded-xl text-[#e2e8f0] outline-none focus:border-[#00ffcc] transition-all text-sm" placeholder="Marca" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#94a3b8] text-[10px] font-bold uppercase ml-1">Instagram do Negócio</label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-3.5 text-[#94a3b8]" size={16} />
                      <input type="text" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} className="w-full p-3 pl-10 bg-[#1e293b]/50 border border-[#1e293b] rounded-xl text-[#e2e8f0] outline-none focus:border-[#00ffcc] transition-all text-sm" placeholder="@suaempresa" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#94a3b8] text-[10px] font-bold uppercase ml-1">WhatsApp de Contato</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 text-[#94a3b8]" size={16} />
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={handlePhoneChange}
                        maxLength={15}
                        className="w-full p-3 pl-10 bg-[#1e293b]/50 border border-[#1e293b] rounded-xl text-[#e2e8f0] outline-none focus:border-[#00ffcc] transition-all text-sm"
                        placeholder="(00) 90000-0000"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ETAPA 6: TELA DE SUCESSO */}
            {step === 6 && (
              <motion.div key="step6" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6 text-center flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-24 h-24 bg-[#00ffcc]/10 rounded-full flex items-center justify-center mb-2 border border-[#00ffcc]/20">
                  <CheckCircle2 className="text-[#00ffcc]" size={48} />
                </div>
                <h2 className="text-3xl font-bold text-[#e2e8f0]" style={{ fontFamily: 'var(--font-space)' }}>Quase lá! 🚀</h2>
                <p className="text-[#94a3b8] text-base max-w-[340px] mx-auto leading-relaxed">
                  O raio-x do seu negócio foi gerado. <strong className="text-[#e2e8f0]">Falta apenas 1 passo</strong> para liberar sua pré-análise:
                </p>

                <div className="w-full max-w-[320px] text-left space-y-4 mt-4 bg-[#1e293b]/30 p-5 rounded-2xl border border-[#1e293b]">
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#00ffcc] text-xs font-bold">1</span>
                    </div>
                    <p className="text-[#e2e8f0] text-sm">Toque no botão abaixo para nos enviar seu dossiê diretamente no WhatsApp.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#00ffcc] text-xs font-bold">2</span>
                    </div>
                    <p className="text-[#e2e8f0] text-sm">Faremos uma análise rápida do seu perfil e do momento atual do seu negócio.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#00ffcc] text-xs font-bold">3</span>
                    </div>
                    <p className="text-[#e2e8f0] text-sm">Se houver algum consultor online, você já recebe um <strong>retorno imediato</strong> para adiantar o processo.</p>
                  </div>
                </div>

                <div className="mt-8 w-full max-w-[320px] mx-auto flex flex-col items-center">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#00ffcc] text-[#050a10] font-bold text-base hover:bg-[#33ffdb] transition-all shadow-[0_0_20px_rgba(0,255,204,0.3)] animate-[pulse_2s_ease-in-out_infinite]"
                  >
                    <MessageCircle size={20} /> Enviar Dossiê no WhatsApp
                  </a>
                  <p className="text-[#94a3b8] text-xs mt-4 font-medium flex items-center gap-1.5 text-center px-2">
                    <span className="text-xl">💡</span>
                    Envie a mensagem agora. Se nossa equipe estiver online, te atendemos na mesma hora.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* NAVEGAÇÃO */}
        {step < 6 && (
          <div className="flex gap-3 mt-8 pb-8">
            {step > 1 && (
              <button disabled={isSubmitting} onClick={prevStep} className="p-4 rounded-xl bg-[#1e293b] border border-[#1e293b] text-[#e2e8f0] hover:bg-[#1e293b]/80 disabled:opacity-50 transition-all">
                <ArrowLeft size={20} />
              </button>
            )}
            <button
              disabled={
                isSubmitting ||
                (step === 1 && !formData.nicho) ||
                (step === 2 && !formData.faturamento) ||
                (step === 3 && (!formData.seguidores || !formData.statusConteudo)) ||
                (step === 4 && !formData.gargalo) ||
                (step === 5 && (!formData.nome.trim() || !formData.empresa.trim() || formData.whatsapp.length < 14))
              }
              onClick={step === totalSteps ? handleFinalizar : nextStep}
              className="flex-1 py-4 rounded-xl bg-[#00ffcc] text-[#050a10] font-bold text-base hover:bg-[#33ffdb] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,255,204,0.2)]"
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin" size={20} /> Processando...</>
              ) : (
                <>{step === totalSteps ? "Enviar Aplicação" : "Continuar"} <ArrowRight size={20} /></>
              )}
            </button>
          </div>
        )}

      </div>
    </main>
  );
}