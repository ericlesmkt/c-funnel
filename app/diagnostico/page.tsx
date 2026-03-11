"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, TrendingUp, Target, AlertCircle, 
  Building2, User, Instagram, Phone, Loader2, CheckCircle2,
  Briefcase, Users, Video
} from "lucide-react";

export default function LeadFunnel() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Aplicacao_Imersao_HighEnd',
          value: 1997.00,
          currency: 'BRL'
        });
      }
      
      // MONTA O DOSSIÊ FINAL PARA O ZAP
      const textoZap = `Olá, Éricles! Preenchi a aplicação para a Imersão Conteúdo High-End.\n\n*📋 Dossiê da Empresa:*\n*Nome:* ${formData.nome}\n*Empresa:* ${formData.empresa}\n*Nicho:* ${formData.nicho}\n*Instagram:* ${formData.instagram} (${formData.seguidores} seguidores)\n\n*💰 Financeiro:*\n*Faturamento:* ${formData.faturamento}\n\n*⚠️ Situação Atual:*\n*Produção de Conteúdo:* ${formData.statusConteudo}\n*Maior Desafio:* ${formData.gargalo}\n\nAguardo o agendamento da minha análise.`;
      
      const seuNumero = "558499145820"; 
      const zapLink = `https://wa.me/${seuNumero}?text=${encodeURIComponent(textoZap)}`;
      
      window.location.href = zapLink;

    } catch (error) {
      console.error("❌ Erro ao salvar lead:", error);
      alert("Ocorreu um erro ao processar seus dados. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#15141b]">
      {/* Efeito de luz ao fundo com a cor Dourada do Aura */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#ffca85]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10 flex flex-col min-h-[85vh] justify-between">
        
        {/* BARRA DE PROGRESSO */}
        <div className="space-y-6 mt-8">
          <div className="flex items-center justify-between">
            <span className="text-[#a1a1aa] font-bold text-xs uppercase tracking-widest">Triagem Clínica</span>
            <span className="text-[#ffca85] font-medium text-xs bg-[#ffca85]/10 border border-[#ffca85]/20 px-3 py-1 rounded-full">Etapa {step} de {totalSteps}</span>
          </div>
          <div className="w-full h-1.5 bg-[#1e1d27] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#ffca85]"
              initial={{ width: "20%" }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="flex-1 relative mt-10">
          <AnimatePresence mode="wait">
            
            {/* ETAPA 1: O NICHO (Ancoragem) */}
            {step === 1 && (
              <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-[#1e1d27] rounded-lg"><Briefcase className="text-[#ffca85]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#edecee]">Qual é o seu mercado?</h2>
                </div>
                <p className="text-[#a1a1aa] text-sm mb-6">Precisamos entender o perfil do seu negócio para validar a aplicação.</p>
                
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
                      className={`w-full p-4 rounded-xl text-left transition-all border text-sm font-medium ${formData.nicho === nicho ? "bg-[#ffca85]/10 border-[#ffca85]/50 text-[#ffca85]" : "bg-[#1e1d27] border-[#2d2b3b] hover:border-[#ffca85]/30 text-[#c0bfc4]"}`}
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
                  <div className="p-2.5 bg-[#1e1d27] rounded-lg"><TrendingUp className="text-[#ffca85]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#edecee]">Qual o momento atual do negócio?</h2>
                </div>
                <p className="text-[#a1a1aa] text-sm mb-6">Selecione a faixa de faturamento mensal para dimensionarmos a estratégia.</p>
                <div className="space-y-3">
                  {[
                    { id: "ate-10k", label: "Até R$ 10.000 / mês" },
                    { id: "10k-50k", label: "De R$ 10.000 a R$ 50.000 / mês" },
                    { id: "mais-50k", label: "Acima de R$ 50.000 / mês" }
                  ].map((op) => (
                    <button 
                      key={op.id} 
                      onClick={() => { setFormData({ ...formData, faturamento: op.label }); setTimeout(nextStep, 300); }} 
                      className={`w-full p-5 rounded-xl flex items-center justify-between transition-all border ${formData.faturamento === op.label ? "bg-[#ffca85]/10 border-[#ffca85]/50 text-[#ffca85]" : "bg-[#1e1d27] border-[#2d2b3b] hover:border-[#ffca85]/30 text-[#c0bfc4]"}`}
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
                  <div className="p-2.5 bg-[#1e1d27] rounded-lg"><Video className="text-[#ffca85]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#edecee]">Raio-X Digital</h2>
                </div>
                <p className="text-[#a1a1aa] text-sm mb-6">Como está a sua estrutura no Instagram hoje?</p>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[#a1a1aa] text-xs font-bold uppercase ml-1">Volume de Seguidores</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-4 text-[#a1a1aa]" size={18} />
                      <select 
                        value={formData.seguidores}
                        onChange={(e) => setFormData({...formData, seguidores: e.target.value})}
                        className="w-full p-4 pl-12 bg-[#1e1d27] border border-[#2d2b3b] rounded-xl text-[#edecee] outline-none focus:border-[#ffca85] transition-all text-sm appearance-none"
                      >
                        <option value="" disabled>Selecione uma opção...</option>
                        <option value="Menos de 1.000">Menos de 1.000 seguidores</option>
                        <option value="De 1.000 a 10.000">De 1.000 a 10.000 seguidores</option>
                        <option value="Mais de 10.000">Mais de 10.000 seguidores</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                     <label className="text-[#a1a1aa] text-xs font-bold uppercase ml-1">Como você produz conteúdo hoje?</label>
                    {[
                      "Não gravo (falta tempo ou tenho vergonha)",
                      "Delego para agência (mas os posts não vendem)",
                      "Tento gravar internamente (mas sinto que fica amador)"
                    ].map((status) => (
                      <button 
                        key={status} 
                        onClick={() => { setFormData({ ...formData, statusConteudo: status }); }} 
                        className={`w-full p-4 rounded-xl text-left transition-all border text-sm ${formData.statusConteudo === status ? "bg-[#ffca85]/10 border-[#ffca85]/50 text-[#ffca85]" : "bg-[#1e1d27] border-[#2d2b3b] hover:border-[#ffca85]/30 text-[#c0bfc4]"}`}
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
                  <div className="p-2.5 bg-[#1e1d27] rounded-lg"><AlertCircle className="text-[#ffca85]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#edecee]">Qual o seu maior obstáculo?</h2>
                </div>
                <p className="text-[#a1a1aa] text-sm mb-6">Onde o processo trava na hora de atrair clientes?</p>
                
                <div className="space-y-3">
                  {[
                    "Não sei o que postar (falta de ideias estratégicas)",
                    "Tenho seguidores, mas eles não geram orçamentos",
                    "Dependo apenas de indicação boca-a-boca",
                    "Não faço anúncios patrocinados (Tráfego Pago)"
                  ].map((gargalo) => (
                    <button 
                      key={gargalo} 
                      onClick={() => { setFormData({ ...formData, gargalo: gargalo }); setTimeout(nextStep, 300); }} 
                      className={`w-full p-4 rounded-xl text-left transition-all border text-sm ${formData.gargalo === gargalo ? "bg-[#ffca85]/10 border-[#ffca85]/50 text-[#ffca85]" : "bg-[#1e1d27] border-[#2d2b3b] hover:border-[#ffca85]/30 text-[#c0bfc4]"}`}
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
                  <div className="p-2.5 bg-[#1e1d27] rounded-lg"><Building2 className="text-[#ffca85]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#edecee]">Dados da Empresa</h2>
                </div>
                <p className="text-[#a1a1aa] text-sm mb-4">Última etapa. Nossa equipe fará a pré-análise antes do nosso contato.</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                     <div className="space-y-1">
                      <label className="text-[#a1a1aa] text-[10px] font-bold uppercase ml-1">Seu Nome</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 text-[#a1a1aa]" size={16} />
                        <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} className="w-full p-3 pl-10 bg-[#1e1d27] border border-[#2d2b3b] rounded-xl text-[#edecee] outline-none focus:border-[#ffca85] transition-all text-sm" placeholder="Nome" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[#a1a1aa] text-[10px] font-bold uppercase ml-1">Empresa</label>
                      <div className="relative">
                        <Target className="absolute left-3 top-3.5 text-[#a1a1aa]" size={16} />
                        <input type="text" value={formData.empresa} onChange={(e) => setFormData({...formData, empresa: e.target.value})} className="w-full p-3 pl-10 bg-[#1e1d27] border border-[#2d2b3b] rounded-xl text-[#edecee] outline-none focus:border-[#ffca85] transition-all text-sm" placeholder="Marca" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#a1a1aa] text-[10px] font-bold uppercase ml-1">Instagram do Negócio</label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-3.5 text-[#a1a1aa]" size={16} />
                      <input type="text" value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} className="w-full p-3 pl-10 bg-[#1e1d27] border border-[#2d2b3b] rounded-xl text-[#edecee] outline-none focus:border-[#ffca85] transition-all text-sm" placeholder="@suaempresa" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#a1a1aa] text-[10px] font-bold uppercase ml-1">WhatsApp de Contato</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 text-[#a1a1aa]" size={16} />
                      <input 
                        type="tel" 
                        value={formData.whatsapp} 
                        onChange={handlePhoneChange} 
                        maxLength={15}
                        className="w-full p-3 pl-10 bg-[#1e1d27] border border-[#2d2b3b] rounded-xl text-[#edecee] outline-none focus:border-[#ffca85] transition-all text-sm" 
                        placeholder="(00) 90000-0000" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="flex gap-3 mt-8 pb-8">
          {step > 1 && (
            <button disabled={isSubmitting} onClick={prevStep} className="p-4 rounded-xl bg-[#1e1d27] border border-[#2d2b3b] text-[#edecee] hover:bg-[#2d2b3b] disabled:opacity-50 transition-all">
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
            className="flex-1 py-4 rounded-xl bg-[#ffca85] text-[#15141b] font-bold text-base hover:bg-[#e6b677] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,202,133,0.2)]"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={20} /> Processando...</>
            ) : (
              <>{step === totalSteps ? "Enviar Aplicação" : "Continuar"} <ArrowRight size={20} /></>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}