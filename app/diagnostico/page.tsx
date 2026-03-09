"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, TrendingUp, Target, AlertCircle, 
  Building2, User, Instagram, Phone, Loader2, CheckCircle2 
} from "lucide-react";

export default function LeadFunnel() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    faturamento: "",
    gargalo: "",
    nome: "",
    empresa: "",
    instagram: "",
    whatsapp: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFinalizar = async () => {
    if (!formData.nome || !formData.whatsapp) {
      alert("Por favor, preencha seu nome e WhatsApp para continuarmos.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Fazendo a requisição real para a rota da API (Supabase)
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
      
      // Monta a mensagem para o WhatsApp com base nos dados preenchidos
      const textoZap = `Olá, Éricles! Preenchi o formulário de análise estratégica.\n\n*Empresa:* ${formData.empresa}\n*Instagram:* ${formData.instagram}\n*Faturamento:* ${formData.faturamento}\n*Principal Desafio:* ${formData.gargalo}\n\nQuero agendar minha reunião.`;
      
      // Substitua pelo seu número real
      const seuNumero = "5584999999999"; 
      const zapLink = `https://wa.me/${seuNumero}?text=${encodeURIComponent(textoZap)}`;
      
      // Redireciona o empresário para o seu WhatsApp já com a mensagem pronta
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

      <div className="w-full max-w-md z-10 flex flex-col h-[85vh] justify-between">
        
        {/* BARRA DE PROGRESSO */}
        <div className="space-y-6 mt-8">
          <div className="flex items-center justify-between">
            <span className="text-[#a1a1aa] font-bold text-xs uppercase tracking-widest">Diagnóstico Estratégico</span>
            <span className="text-[#ffca85] font-medium text-xs bg-[#ffca85]/10 border border-[#ffca85]/20 px-3 py-1 rounded-full">Etapa {step} de 4</span>
          </div>
          <div className="w-full h-1.5 bg-[#1e1d27] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#ffca85]"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="flex-1 relative mt-12">
          <AnimatePresence mode="wait">
            
            {/* PASSO 1: FATURAMENTO (O Filtro de Qualificação) */}
            {step === 1 && (
              <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <h2 className="text-2xl font-bold text-[#edecee] mb-2">Qual o momento atual do seu negócio?</h2>
                <p className="text-[#a1a1aa] text-sm mb-6">Selecione a faixa de faturamento mensal para direcionarmos a melhor estratégia.</p>
                <div className="space-y-3">
                  {[
                    { id: "ate-10k", label: "Até R$ 10.000 / mês" },
                    { id: "10k-50k", label: "De R$ 10.000 a R$ 50.000 / mês" },
                    { id: "mais-50k", label: "Acima de R$ 50.000 / mês" }
                  ].map((op) => (
                    <button 
                      key={op.id} 
                      onClick={() => { setFormData({ ...formData, faturamento: op.label }); setTimeout(nextStep, 300); }} 
                      className={`w-full p-5 rounded-xl flex items-center justify-between transition-all border ${formData.faturamento === op.label ? "bg-[#ffca85]/10 border-[#ffca85]/50 text-[#ffca85]" : "bg-[#1e1d27] border-[#2d2b3b] hover:border-[#a277ff]/50 text-[#c0bfc4]"}`}
                    >
                      <span className="font-medium">{op.label}</span>
                      {formData.faturamento === op.label && <CheckCircle2 size={20} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PASSO 2: O GARGALO (A Dor do Cliente) */}
            {step === 2 && (
              <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-[#1e1d27] rounded-lg"><AlertCircle className="text-[#ffca85]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#edecee]">Onde o seu digital está travando?</h2>
                </div>
                <p className="text-[#a1a1aa] text-sm mb-6">Qual é o maior obstáculo para vender mais hoje?</p>
                
                <div className="space-y-3">
                  {[
                    "Não sei o que postar (Falta de tempo/ideias)",
                    "Tenho seguidores, mas não gera vendas",
                    "Dependo de agência que demora a entregar",
                    "Não faço anúncios patrocinados"
                  ].map((gargalo) => (
                    <button 
                      key={gargalo} 
                      onClick={() => { setFormData({ ...formData, gargalo: gargalo }); setTimeout(nextStep, 300); }} 
                      className={`w-full p-4 rounded-xl text-left transition-all border text-sm ${formData.gargalo === gargalo ? "bg-[#ffca85]/10 border-[#ffca85]/50 text-[#ffca85]" : "bg-[#1e1d27] border-[#2d2b3b] hover:border-[#a277ff]/50 text-[#c0bfc4]"}`}
                    >
                      {gargalo}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PASSO 3: DADOS DA EMPRESA */}
            {step === 3 && (
              <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-[#1e1d27] rounded-lg"><Building2 className="text-[#ffca85]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#edecee]">Sobre a Empresa</h2>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[#a1a1aa] text-xs font-bold uppercase ml-1">Nome do Responsável</label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 text-[#a1a1aa]" size={18} />
                      <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} className="w-full p-4 pl-12 bg-[#1e1d27] border border-[#2d2b3b] rounded-xl text-[#edecee] outline-none focus:border-[#ffca85] transition-all text-sm" placeholder="Como devemos te chamar?" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#a1a1aa] text-xs font-bold uppercase ml-1">Nome da Empresa</label>
                    <div className="relative">
                      <Target className="absolute left-4 top-4 text-[#a1a1aa]" size={18} />
                      <input type="text" value={formData.empresa} onChange={(e) => setFormData({...formData, empresa: e.target.value})} className="w-full p-4 pl-12 bg-[#1e1d27] border border-[#2d2b3b] rounded-xl text-[#edecee] outline-none focus:border-[#ffca85] transition-all text-sm" placeholder="Ex: Clínica Sorriso" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PASSO 4: CONTATO FINAL */}
            {step === 4 && (
              <motion.div key="step4" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-[#1e1d27] rounded-lg"><TrendingUp className="text-[#ffca85]" size={20} /></div>
                  <h2 className="text-xl font-bold text-[#edecee]">Última etapa</h2>
                </div>
                <p className="text-[#a1a1aa] text-sm mb-6">Deixe seus contatos para nossa equipe analisar seu perfil antes da reunião.</p>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[#a1a1aa] text-xs font-bold uppercase ml-1">Instagram da Empresa</label>
                    <div className="relative">
                      <Instagram className="absolute left-4 top-4 text-[#a1a1aa]" size={18} />
                      <input type="text" value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} className="w-full p-4 pl-12 bg-[#1e1d27] border border-[#2d2b3b] rounded-xl text-[#edecee] outline-none focus:border-[#ffca85] transition-all text-sm" placeholder="@suaempresa" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#a1a1aa] text-xs font-bold uppercase ml-1">WhatsApp para contato</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-4 text-[#a1a1aa]" size={18} />
                      <input type="tel" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full p-4 pl-12 bg-[#1e1d27] border border-[#2d2b3b] rounded-xl text-[#edecee] outline-none focus:border-[#ffca85] transition-all text-sm" placeholder="(DD) 90000-0000" />
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
            disabled={isSubmitting || (step === 1 && !formData.faturamento) || (step === 2 && !formData.gargalo)} 
            onClick={step === 4 ? handleFinalizar : nextStep} 
            className="flex-1 py-4 rounded-xl bg-[#ffca85] text-[#15141b] font-bold text-base hover:bg-[#e6b677] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,202,133,0.2)]"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={20} /> Processando...</>
            ) : (
              <>{step === 4 ? "Solicitar Análise Gratuita" : "Continuar"} <ArrowRight size={20} /></>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}