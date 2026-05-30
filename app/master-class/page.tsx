"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, Users, Zap, TrendingUp, Target, ArrowRight, CheckCircle2 } from "lucide-react";

export default function MasterClass() {
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "", segmento: "" });
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const deadline = new Date("2026-06-05T19:00:00-03:00").getTime();
    const tick = () => {
      const now = new Date().getTime();
      const d = deadline - now;
      if (d <= 0) return;
      setTimeLeft({
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((d % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((d % (1000 * 60)) / 1000),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/masterclass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEnviado(true);
      // Redireciona para grupo do WhatsApp após 2s
      setTimeout(() => {
        window.open("https://chat.whatsapp.com/SEU_GRUPO_AQUI", "_blank");
      }, 2000);
    } catch {
      alert("Erro ao inscrever. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (v: string) => {
    const n = v.replace(/\D/g, "").slice(0, 11);
    if (n.length <= 2) return n;
    if (n.length <= 7) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
    return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --primary: #00ffcc;
          --primary-glow: rgba(0, 255, 204, 0.6);
          --bg-base: #050a10;
          --text-main: #e2e8f0;
          --text-muted: #94a3b8;
          --glass-bg: linear-gradient(160deg, rgba(30, 41, 59, 0.4) 0%, rgba(30, 41, 59, 0.1) 100%);
          --glass-border: #1e293b;
          --glass-highlight: rgba(0, 255, 204, 0.15);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background-color: var(--bg-base); color: var(--text-main); font-family: var(--font-urbanist), system-ui, sans-serif; line-height: 1.6; overflow-x: hidden; }
        h1, h2, h3, h4 { font-family: var(--font-space), sans-serif; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; color: #fff; }
        .mc-noise { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999; opacity: 0.02; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        .mc-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
        .mc-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; animation: mcFloat 12s infinite alternate ease-in-out; }
        .mc-orb-1 { top: -10%; left: 50%; transform: translateX(-50%); width: 600px; height: 500px; background: radial-gradient(circle, rgba(0, 255, 204, 0.15), transparent 70%); }
        .mc-orb-2 { bottom: 10%; right: -20%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(14, 165, 233, 0.12), transparent 70%); }
        @keyframes mcFloat { 0% { transform: translateX(-50%) scale(1); } 100% { transform: translateX(-50%) translateY(40px) scale(1.1); } }
        @keyframes mcFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes mcPulse { 0%, 100% { box-shadow: 0 0 20px rgba(0,255,204,0.2); } 50% { box-shadow: 0 0 40px rgba(0,255,204,0.5); } }

        .mc-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
        .mc-header { position: fixed; top: 0; width: 100%; z-index: 50; padding: 14px 0; background: rgba(5, 10, 16, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--glass-border); }
        .mc-header-inner { max-width: 1000px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: space-between; align-items: center; }
        .mc-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
        .mc-logo img { height: 36px; width: auto; object-fit: contain; }
        .mc-badge-live { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 50px; background: rgba(255, 77, 77, 0.1); border: 1px solid rgba(255, 77, 77, 0.4); color: #ff6b6b; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .mc-badge-live .dot { width: 8px; height: 8px; border-radius: 50%; background: #ff4d4d; animation: mcPulse 1.5s infinite; }

        .mc-hero { padding-top: 140px; padding-bottom: 60px; text-align: center; animation: mcFadeUp 0.8s ease forwards; }
        .mc-tag { display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 50px; background: rgba(0, 255, 204, 0.05); border: 1px solid rgba(0, 255, 204, 0.3); color: var(--primary); font-size: 0.8rem; font-weight: 700; margin-bottom: 24px; letter-spacing: 1px; text-transform: uppercase; }
        .mc-title { font-size: 3rem; margin-bottom: 20px; text-shadow: 0 10px 40px rgba(0,0,0,0.8); letter-spacing: -2px; }
        .mc-hl { color: var(--primary); text-shadow: 0 0 30px rgba(0, 255, 204, 0.3); }
        .mc-sub { color: var(--text-muted); font-size: 1.15rem; margin-bottom: 30px; max-width: 680px; margin-left: auto; margin-right: auto; font-weight: 400; }

        .mc-info-strip { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; margin-bottom: 40px; }
        .mc-info-item { display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 0.95rem; }
        .mc-info-item svg { color: var(--primary); flex-shrink: 0; }

        .mc-countdown { display: flex; justify-content: center; gap: 14px; margin: 30px auto 50px; }
        .mc-cd-box { background: rgba(30,41,59,0.5); border: 1px solid var(--glass-border); border-radius: 12px; padding: 14px 18px; min-width: 75px; text-align: center; }
        .mc-cd-num { font-size: 2rem; font-weight: 900; color: #fff; line-height: 1; font-family: var(--font-space), sans-serif; }
        .mc-cd-label { font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

        .mc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: start; margin-bottom: 80px; }

        .mc-benefits h2 { font-size: 1.6rem; margin-bottom: 30px; }
        .mc-benefit-card { background: rgba(30,41,59,0.3); border: 1px solid var(--glass-border); padding: 24px; border-radius: 14px; margin-bottom: 14px; transition: all 0.3s ease; display: flex; gap: 16px; align-items: flex-start; }
        .mc-benefit-card:hover { border-color: rgba(0, 255, 204, 0.3); transform: translateX(5px); }
        .mc-benefit-icon { width: 42px; height: 42px; background: rgba(0, 255, 204, 0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--primary); flex-shrink: 0; border: 1px solid rgba(0, 255, 204, 0.2); }
        .mc-benefit-card h4 { font-size: 1rem; margin-bottom: 4px; }
        .mc-benefit-card p { color: var(--text-muted); font-size: 0.9rem; margin: 0; }

        .mc-form-wrap { background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-top: 1px solid var(--glass-highlight); border-radius: 16px; padding: 40px 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); position: sticky; top: 90px; }
        .mc-form-wrap h3 { font-size: 1.3rem; margin-bottom: 6px; text-align: center; }
        .mc-form-sub { color: var(--text-muted); font-size: 0.85rem; text-align: center; margin-bottom: 24px; }
        .mc-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
        .mc-field label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .mc-field input, .mc-field select { width: 100%; padding: 14px 16px; border-radius: 10px; border: 1px solid var(--glass-border); background: rgba(15, 23, 42, 0.8); color: #fff; font-size: 1rem; font-family: inherit; transition: border-color 0.3s; }
        .mc-field input:focus, .mc-field select:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(0,255,204,0.1); }
        .mc-field input::placeholder { color: #475569; }
        .mc-field select { appearance: none; cursor: pointer; }
        .mc-field select option { background: #0f172a; color: #e2e8f0; }
        .mc-submit { width: 100%; padding: 16px; border: none; border-radius: 10px; background: var(--primary); color: #050a10; font-size: 1rem; font-weight: 800; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.3s; animation: mcPulse 2s infinite; margin-top: 8px; }
        .mc-submit:hover { background: #33ffdb; box-shadow: 0 0 50px rgba(0, 255, 204, 0.5); }
        .mc-submit:disabled { opacity: 0.6; cursor: not-allowed; animation: none; }
        .mc-vagas { text-align: center; margin-top: 12px; font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 6px; }
        .mc-vagas svg { color: var(--primary); }

        .mc-success { text-align: center; padding: 40px 20px; }
        .mc-success-icon { width: 70px; height: 70px; background: rgba(0, 255, 204, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--primary); }
        .mc-success h3 { font-size: 1.4rem; margin-bottom: 12px; }
        .mc-success p { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px; }
        .mc-wpp-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 10px; background: #25D366; color: #fff; font-weight: 700; text-decoration: none; font-size: 0.95rem; transition: 0.3s; }
        .mc-wpp-btn:hover { background: #20bd5a; box-shadow: 0 0 30px rgba(37, 211, 102, 0.4); }

        .mc-footer { text-align: center; padding: 40px 24px; border-top: 1px solid var(--glass-border); color: var(--text-muted); font-size: 0.85rem; }

        @media (max-width: 768px) {
          .mc-title { font-size: 2rem; }
          .mc-hero { padding-top: 110px; padding-bottom: 30px; }
          .mc-grid { grid-template-columns: 1fr; gap: 30px; }
          .mc-form-wrap { position: static; }
          .mc-countdown { flex-wrap: wrap; gap: 8px; }
          .mc-cd-box { min-width: 65px; padding: 10px 12px; }
          .mc-cd-num { font-size: 1.6rem; }
          .mc-info-strip { gap: 16px; }
          .mc-info-item { font-size: 0.85rem; }
          .mc-logo img { height: 28px; }
        }
      `}} />

      <div className="mc-noise" />
      <div className="mc-bg">
        <div className="mc-orb mc-orb-1" />
        <div className="mc-orb mc-orb-2" />
      </div>

      <header className="mc-header">
        <div className="mc-header-inner">
          <Link href="/" className="mc-logo">
            <img src="/nave-logo.png" alt="Método N.A.V.E." />
          </Link>
          <div className="mc-badge-live"><span className="dot" /> AO VIVO · 5 DE JUNHO</div>
        </div>
      </header>

      <section className="mc-hero mc-container">
        <div className="mc-tag">MASTERCLASS GRATUITA</div>
        <h1 className="mc-title">
          Os 4 passos para transformar <span className="mc-hl">audiência em vendas</span> todos os dias
        </h1>
        <p className="mc-sub">
          Uma aula ao vivo e gratuita onde você vai descobrir o sistema que conecta o seu conteúdo diretamente à sua agenda de vendas — seja de produtos ou de serviços.
        </p>
        <div className="mc-info-strip">
          <div className="mc-info-item"><Calendar size={18} /> 5 de Junho, 2026</div>
          <div className="mc-info-item"><Clock size={18} /> 19h (Horário de Brasília)</div>
          <div className="mc-info-item"><Users size={18} /> Vagas Limitadas</div>
        </div>
        <div className="mc-countdown">
          <div className="mc-cd-box"><div className="mc-cd-num">{String(timeLeft.days).padStart(2, "0")}</div><div className="mc-cd-label">Dias</div></div>
          <div className="mc-cd-box"><div className="mc-cd-num">{String(timeLeft.hours).padStart(2, "0")}</div><div className="mc-cd-label">Horas</div></div>
          <div className="mc-cd-box"><div className="mc-cd-num">{String(timeLeft.minutes).padStart(2, "0")}</div><div className="mc-cd-label">Min</div></div>
          <div className="mc-cd-box"><div className="mc-cd-num">{String(timeLeft.seconds).padStart(2, "0")}</div><div className="mc-cd-label">Seg</div></div>
        </div>
      </section>

      <section className="mc-container">
        <div className="mc-grid">
          <div className="mc-benefits">
            <h2>O que você vai descobrir nessa aula:</h2>

            <div className="mc-benefit-card">
              <div className="mc-benefit-icon"><Target size={20} /></div>
              <div>
                <h4>Passo 1 — O erro invisível</h4>
                <p>Por que 90% dos profissionais competentes continuam sendo &quot;mais um&quot; no mercado — e o que os outros 10% fazem diferente antes mesmo de postar.</p>
              </div>
            </div>

            <div className="mc-benefit-card">
              <div className="mc-benefit-icon"><TrendingUp size={20} /></div>
              <div>
                <h4>Passo 2 — A armadilha do engajamento</h4>
                <p>Curtidas não pagam boleto. Vou te mostrar por que o conteúdo que mais viraliza quase nunca é o que mais vende — e como inverter isso.</p>
              </div>
            </div>

            <div className="mc-benefit-card">
              <div className="mc-benefit-icon"><Zap size={20} /></div>
              <div>
                <h4>Passo 3 — O vendedor que nunca dorme</h4>
                <p>Existe uma engrenagem que trabalha enquanto você atende, dorme ou viaja. A maioria nem sabe que ela existe. Quem monta, para de correr atrás de cliente.</p>
              </div>
            </div>

            <div className="mc-benefit-card">
              <div className="mc-benefit-icon"><ArrowRight size={20} /></div>
              <div>
                <h4>Passo 4 — O multiplicador silencioso</h4>
                <p>A tecnologia que está permitindo que negócios de 1 pessoa entreguem resultado de equipe de 5. Quem não usar agora, vai pagar caro pela demora.</p>
              </div>
            </div>
          </div>

          <div className="mc-form-wrap" id="inscricao">
            {!enviado ? (
              <>
                <h3>Garanta sua vaga agora</h3>
                <p className="mc-form-sub">Preencha abaixo e entre no grupo de avisos pelo WhatsApp.</p>
                <form onSubmit={handleSubmit}>
                  <div className="mc-field">
                    <label>Seu nome</label>
                    <input type="text" placeholder="Como podemos te chamar?" required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                  </div>
                  <div className="mc-field">
                    <label>E-mail</label>
                    <input type="email" placeholder="seu@email.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="mc-field">
                    <label>WhatsApp</label>
                    <input type="tel" placeholder="(00) 00000-0000" required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: formatPhone(e.target.value) })} />
                  </div>
                  <div className="mc-field">
                    <label>Seu segmento</label>
                    <select required value={form.segmento} onChange={(e) => setForm({ ...form, segmento: e.target.value })}>
                      <option value="">Selecione...</option>
                      <option value="servicos_profissionais">Serviços Profissionais</option>
                      <option value="saude_bem_estar">Saúde e Bem-estar</option>
                      <option value="educacao_cursos">Educação e Cursos</option>
                      <option value="ecommerce_produtos">E-commerce / Produtos</option>
                      <option value="gastronomia">Gastronomia</option>
                      <option value="beleza_estetica">Beleza e Estética</option>
                      <option value="consultoria">Consultoria</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <button type="submit" className="mc-submit" disabled={loading}>
                    {loading ? "INSCREVENDO..." : "QUERO PARTICIPAR — É GRATUITO"}
                  </button>
                  <div className="mc-vagas"><CheckCircle2 size={14} /> 100% gratuita · Vagas limitadas</div>
                </form>
              </>
            ) : (
              <div className="mc-success">
                <div className="mc-success-icon"><CheckCircle2 size={32} /></div>
                <h3>Inscrição confirmada! 🎉</h3>
                <p>Agora entre no grupo do WhatsApp para receber o link da aula e os avisos exclusivos.</p>
                <a href="https://chat.whatsapp.com/SEU_GRUPO_AQUI" target="_blank" rel="noopener noreferrer" className="mc-wpp-btn">
                  <Zap size={18} /> ENTRAR NO GRUPO DE AVISOS
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="mc-footer">
        <p>&copy; {new Date().getFullYear()} chamalabs.co · Método N.A.V.E.</p>
      </footer>
    </>
  );
}
