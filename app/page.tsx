"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { CheckCircle2, ChevronDown, Play, Layout, TrendingUp, MonitorSmartphone, XCircle, ShieldAlert, Shield, Clock } from "lucide-react";

export default function Home() {
    // Countdown: calcula o próximo domingo (fim da semana)
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const getNextSunday = () => {
            const now = new Date();
            const day = now.getDay();
            const diff = day === 0 ? 7 : 7 - day;
            const target = new Date(now);
            target.setDate(now.getDate() + diff);
            target.setHours(23, 59, 59, 999);
            return target;
        };

        const deadline = getNextSunday();

        const tick = () => {
            const now = new Date().getTime();
            const distance = deadline.getTime() - now;
            if (distance <= 0) return;
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        :root {
            --primary: #00ffcc; 
            --primary-glow: rgba(0, 255, 204, 0.6);
            --success: #00ffcc;
            --alert: #ff4d4d;
            
            --bg-base: #050a10; 
            --text-main: #e2e8f0;
            --text-muted: #94a3b8;
            --text-body-glass: #94a3b8;
            
            --glass-bg: linear-gradient(160deg, rgba(30, 41, 59, 0.4) 0%, rgba(30, 41, 59, 0.1) 100%);
            --glass-border: #1e293b; 
            --glass-highlight: rgba(0, 255, 204, 0.15);
            --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }

        body {
            background-color: var(--bg-base);
            color: var(--text-main);
            font-family: var(--font-urbanist), 'Inter', system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
            padding-bottom: 120px;
        }

        /* FX */
        .noise-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999; opacity: 0.02; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
        .background-fx { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; animation: floatOrb 12s infinite alternate ease-in-out; }
        .orb-1 { top: -10%; left: 50%; transform: translateX(-50%); width: 600px; height: 500px; background: radial-gradient(circle, rgba(0, 255, 204, 0.15), transparent 70%); }
        .orb-2 { bottom: 10%; right: -20%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(14, 165, 233, 0.12), transparent 70%); } 
        .orb-3 { top: 40%; left: -20%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(0, 255, 204, 0.08), transparent 70%); }
        @keyframes floatOrb { 0% { transform: translate(-50%, 0) scale(1); } 100% { transform: translate(-50%, 40px) scale(1.1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(0,255,204,0.2); } 50% { box-shadow: 0 0 40px rgba(0,255,204,0.5); } }
        .animate-enter { animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; } .delay-2 { animation-delay: 0.2s; } .delay-3 { animation-delay: 0.3s; }

        /* SOCIAL PROOF BAR */
        .proof-strip { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; margin: 50px auto 0; padding: 24px 30px; border-radius: 16px; background: rgba(30, 41, 59, 0.3); border: 1px solid var(--glass-border); max-width: 700px; }
        .proof-item { text-align: center; }
        .proof-number { font-size: 1.8rem; font-weight: 900; color: var(--primary); line-height: 1; letter-spacing: -1px; }
        .proof-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
        .btn-pulse { animation: pulse-glow 2s infinite; }

        /* URGENCY */
        .urgency-bar { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; background: rgba(255, 77, 77, 0.08); border: 1px solid rgba(255, 77, 77, 0.3); color: #ff6b6b; font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; }
        .urgency-dot { width: 8px; height: 8px; border-radius: 50%; background: #ff4d4d; animation: pulse-glow 1.5s infinite; }

        /* CONTAINER PADRÃO */
        .container { max-width: 1000px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1;}
        
        h1, h2, h3, h4 { font-family: var(--font-space), sans-serif; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 10px; color: #fff; }
        .text-center { text-align: center; }
        .text-highlight { color: var(--primary); text-shadow: 0 0 30px rgba(0, 255, 204, 0.3); }
        .text-success { color: var(--success); font-weight: 700; }

        /* HEADER */
        .header { position: fixed; top: 0; width: 100%; z-index: 50; padding: 14px 0; background: rgba(5, 10, 16, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--glass-border); }
        .nav-content { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-family: var(--font-space), sans-serif; display: flex; align-items: center; gap: 8px; color: #fff; text-decoration: none; font-size: 1.1rem; font-weight: 800; letter-spacing: -0.03em; }

        /* BUTTONS */
        .btn-primary { display: inline-block; padding: 18px 36px; border-radius: 8px; font-weight: 700; text-decoration: none; cursor: pointer; font-size: 1rem; text-align: center; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); background: var(--primary); color: #050a10; box-shadow: 0 0 20px rgba(0, 255, 204, 0.2); border: 1px solid var(--primary); width: 100%; position: relative; z-index: 10; text-transform: uppercase; letter-spacing: 0.5px; }
        .btn-primary:hover { box-shadow: 0 0 50px rgba(0, 255, 204, 0.5); background: #33ffdb; }
        .btn-header-glow { background: rgba(0, 255, 204, 0.08); color: var(--primary); border: 1px solid var(--primary); box-shadow: 0 0 15px rgba(0, 255, 204, 0.2); padding: 8px 20px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; text-decoration: none; transition: 0.3s; position: relative; z-index: 10; text-transform: uppercase;}
        .btn-header-glow:hover { background: var(--primary); color: #050a10; box-shadow: 0 0 30px rgba(0, 255, 204, 0.6); }

        /* HERO */
        .hero { padding-top: 180px; padding-bottom: 80px; text-align: center; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 50px; background: rgba(0, 255, 204, 0.05); border: 1px solid rgba(0, 255, 204, 0.3); color: var(--primary); font-size: 0.8rem; font-weight: 700; margin-bottom: 24px; box-shadow: 0 0 20px rgba(0, 255, 204, 0.15); letter-spacing: 1px; text-transform: uppercase;}
        .display-text { font-size: 3.5rem; margin-bottom: 20px; text-shadow: 0 10px 40px rgba(0,0,0,0.8); letter-spacing: -2px; line-height: 1.1; }
        .sub-headline { color: var(--text-body-glass); font-size: 1.15rem; margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto; font-weight: 400; line-height: 1.6;}

        /* GLASS PANELS */
        .glass-panel { background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-top: 1px solid var(--glass-highlight); border-radius: 16px; box-shadow: var(--glass-shadow); margin: 60px auto; padding: 50px; max-width: 850px; position: relative; overflow: hidden; transition: transform 0.3s ease; }
        
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .caos-box { background: rgba(255, 77, 77, 0.05); border: 1px solid rgba(255, 77, 77, 0.2); padding: 30px; border-radius: 12px; }
        .controle-box { background: rgba(0, 255, 204, 0.05); border: 1px solid rgba(0, 255, 204, 0.2); padding: 30px; border-radius: 12px; }

        /* NAVE GRID */
        .nave-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 50px; }
        .nave-card { background: rgba(30, 41, 59, 0.3); border: 1px solid var(--glass-border); padding: 32px; border-radius: 16px; transition: all 0.3s ease; position: relative; overflow: hidden; }
        .nave-card:hover { border-color: rgba(0, 255, 204, 0.3); transform: translateY(-5px); background: rgba(30, 41, 59, 0.5); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .nave-letter { font-size: 3.5rem; font-weight: 900; color: var(--primary); opacity: 0.1; position: absolute; top: 10px; right: 20px; line-height: 1; }
        .nave-icon-wrap { width: 48px; height: 48px; background: rgba(0, 255, 204, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary); margin-bottom: 20px; border: 1px solid rgba(0, 255, 204, 0.2); }
        .nave-card h3 { font-size: 1.3rem; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;}
        .nave-list { list-style: none; margin-top: 15px; }
        .nave-list li { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; font-size: 0.95rem; color: var(--text-muted); }
        .nave-list li svg { flex-shrink: 0; margin-top: 3px; color: var(--primary); }

        /* METRICS */
        .metric-highlight { font-size: 4rem; font-weight: 900; color: #fff; line-height: 1; text-shadow: 0 0 40px rgba(0, 255, 204, 0.4); margin-bottom: 10px; letter-spacing: -2px; }
        .metric-label { font-size: 1.1rem; color: var(--primary); font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }

        /* OFFER TABLE */
        .offer-table { width: 100%; border-collapse: collapse; margin-top: 30px; text-align: left; }
        .offer-table th, .offer-table td { padding: 16px 20px; border-bottom: 1px solid var(--glass-border); }
        .offer-table tr:last-child td { border-bottom: none; }
        .offer-table td { color: var(--text-main); font-size: 1.05rem; }
        .offer-table .price-strike { color: var(--text-muted); text-decoration: line-through; font-size: 0.95rem; }
        .offer-table .price-free { color: var(--success); font-weight: 700; }
        .offer-highlight-row { background: rgba(0, 255, 204, 0.05); }

        /* TIMELINE */
        .timeline { position: relative; max-width: 800px; margin: 60px auto 0; padding-left: 30px; }
        .timeline::before { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: 2px; background: var(--glass-border); }
        .timeline-item { position: relative; margin-bottom: 40px; padding-left: 30px; }
        .timeline-item::before { content: ''; position: absolute; left: -35px; top: 5px; width: 12px; height: 12px; border-radius: 50%; background: var(--bg-base); border: 2px solid var(--primary); box-shadow: 0 0 10px var(--primary-glow); }
        .timeline-item h4 { font-size: 1.2rem; color: #fff; margin-bottom: 8px; }
        .timeline-item p { color: var(--text-muted); font-size: 1rem; }

        /* CARROSSEL DE AUTORIDADE (DUOTONE) */
        .carousel-container { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 20px; scrollbar-width: none; }
        .carousel-container::-webkit-scrollbar { display: none; }
        .duotone-card { min-width: 280px; flex: 1; position: relative; border-radius: 16px; overflow: hidden; scroll-snap-align: start; cursor: pointer; aspect-ratio: 3/4; border: 1px solid var(--glass-border); }
        .duotone-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(1.2); transition: all 0.5s ease; }
        .duotone-overlay { position: absolute; inset: 0; background-color: var(--primary); mix-blend-mode: multiply; opacity: 0.8; transition: opacity 0.5s ease; }
       .duotone-content { 
            position: absolute; 
            bottom: 0; 
            left: 0; 
            width: 100%; 
            padding: 25px 20px; 
            background: linear-gradient(to top, rgba(5,10,16,0.95) 0%, transparent 100%); 
            z-index: 2; 
            transition: padding-bottom 0.3s ease;
        }
        
        .duotone-card:hover .duotone-img { filter: grayscale(0%) contrast(1); transform: scale(1.05); }
        .duotone-card:hover .duotone-overlay { opacity: 0; }
        .duotone-card:hover .duotone-content { padding-bottom: 35px; }

        /* FAQ VIP */
        .faq-item { border: 1px solid var(--glass-border); background: var(--glass-bg); padding: 20px 24px; border-radius: 16px; margin-bottom: 12px; text-align: left; transition: all 0.3s ease; }
        .faq-item:hover { background: rgba(30, 41, 59, 0.4); border-color: rgba(0, 255, 204, 0.2); }
        details summary { cursor: pointer; font-weight: 700; list-style: none; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; color: #e2e8f0; transition: color 0.3s; }
        details summary:hover { color: var(--primary); }
        details summary::-webkit-details-marker { display: none; }
        details summary::after { content: '+'; font-size: 1.5rem; color: var(--primary); font-weight: 300; }
        details[open] summary::after { content: '-'; }
        details p { margin-top: 15px; color: var(--text-muted); font-size: 0.95rem; }

        /* COUNTDOWN */
        .countdown-strip { display: flex; justify-content: center; gap: 16px; margin: 20px auto 30px; }
        .countdown-box { background: rgba(30,41,59,0.5); border: 1px solid var(--glass-border); border-radius: 12px; padding: 12px 16px; min-width: 70px; text-align: center; }
        .countdown-num { font-size: 1.8rem; font-weight: 900; color: #fff; line-height: 1; }
        .countdown-label { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

        /* GUARANTEE */
        .guarantee-box { display: flex; align-items: center; gap: 16px; background: rgba(0, 255, 204, 0.04); border: 1px solid rgba(0, 255, 204, 0.15); border-radius: 16px; padding: 20px 24px; margin-top: 30px; max-width: 500px; margin-left: auto; margin-right: auto; text-align: left; }
        .guarantee-icon { width: 48px; height: 48px; background: rgba(0, 255, 204, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--primary); }

        /* EXCLUSION */
        .exclusion-list { list-style: none; display: flex; flex-direction: column; gap: 12px; max-width: 600px; margin: 30px auto 0; }
        .exclusion-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 0.95rem; color: var(--text-muted); }
        .exclusion-list li svg { flex-shrink: 0; margin-top: 3px; }

        /* MOBILE STICKY */
        .mobile-sticky { position: fixed; bottom: 20px; left: 20px; right: 20px; background: rgba(5, 10, 16, 0.9); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); padding: 12px 24px; border-radius: 20px; border: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center; box-shadow: 0 15px 50px rgba(0,0,0,0.8); z-index: 999; animation: fadeUp 1s 1s backwards; }
        .sticky-btn { background: var(--primary); color: #050a10; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 0.9rem; box-shadow: 0 0 15px rgba(0, 255, 204, 0.3); transition: 0.3s; position: relative; z-index: 10; text-transform: uppercase; }
        .sticky-btn:active { box-shadow: 0 0 40px rgba(0, 255, 204, 0.7); }

        @media (max-width: 768px) {
            .container { padding: 0 24px; }
            .display-text { font-size: 2rem; }
            .hero { padding-top: 130px; padding-bottom: 40px; }
            .glass-panel { padding: 30px 20px; margin: 40px auto; width: 100%; box-sizing: border-box; }
            .proof-strip { gap: 20px; padding: 24px 16px; flex-direction: column; align-items: center; text-align: center; }
            .grid-2, .nave-grid { grid-template-columns: 1fr; }
            .delay-1, .delay-2, .delay-3 { animation-delay: 0s; }
            .metric-highlight { font-size: 2.8rem; }
            
            /* Prevent Table Overflow */
            .offer-table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%; }
            .offer-table th, .offer-table td { padding: 12px 10px; font-size: 0.9rem; }
            .offer-table td:first-child { min-width: 200px; }
            
            /* Prevent Timeline Overflow */
            .timeline { padding-left: 30px; margin-top: 40px; }
            .timeline-item::before { left: -26px; }
            
            /* Prevent Countdown Overflow */
            .countdown-strip { flex-wrap: wrap; gap: 10px; }
            .countdown-box { min-width: 65px; padding: 10px; }
            
            /* Fix any potential wide containers */
            .exclusion-list { padding: 0 10px; }
            .guarantee-box { flex-direction: column; text-align: center; padding: 24px 20px; }
            .guarantee-icon { margin-bottom: 5px; }
            .mobile-sticky { padding: 12px 20px; left: 15px; right: 15px; }
        }
      `}} />

            <div className="noise-overlay"></div>
            <div className="background-fx">
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
                <div className="glow-orb orb-3"></div>
            </div>

            <header className="header">
                <div className="container nav-content">
                    <Link href="/" className="logo">
                        <img src="/nave-logo.png" alt="Método N.A.V.E." style={{ height: "24px", width: "auto" }} />
                    </Link>
                    <Link href="/diagnostico" className="btn-header-glow">APLICAÇÃO</Link>
                </div>
            </header>

            {/* SLIDE 1: CAPA */}
            <section className="hero container animate-enter">
                <div className="hero-badge">TURMA BETA — VAGAS LIMITADAS</div>
                <h1 className="display-text">
                    Pare de Ser o Segredo Mais Bem Guardado da Sua <span className="text-highlight">Região.</span>
                </h1>
                <p className="sub-headline">
                    O Método N.A.V.E. instala no seu negócio a mesma engenharia digital que já escalou perfis do zero aos 10 mil seguidores e gerenciou mais de R$ 500 mil em campanhas. Em 4 semanas, você sai com sua máquina de atração de clientes rodando.
                </p>
                <div style={{ maxWidth: "420px", margin: "0 auto" }}>
                    <Link href="/diagnostico" className="btn-primary btn-pulse">APLICAR PARA MINHA VAGA</Link>
                </div>
                <p style={{ marginTop: "16px", color: "var(--text-muted)", fontSize: "0.85rem" }}>Aplicação gratuita · Vagas sob análise</p>

                <div className="proof-strip">
                    <div className="proof-item">
                        <div className="proof-number">R$ 500k+</div>
                        <div className="proof-label">Em Tráfego Gerenciado</div>
                    </div>
                    <div className="proof-item">
                        <div className="proof-number">8+ Anos</div>
                        <div className="proof-label">Nos Bastidores das Vendas</div>
                    </div>
                    <div className="proof-item">
                        <div className="proof-number">4x</div>
                        <div className="proof-label">Mais Velocidade de Posicionamento</div>
                    </div>
                </div>
            </section>

            {/* SLIDE 2 & 3: INTRODUÇÃO E DIAGNÓSTICO */}
            <section className="container animate-enter delay-1" style={{ position: "relative" }}>
                {/* Efeito luminoso de fundo */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", height: "80%", background: "radial-gradient(ellipse, rgba(0, 255, 204, 0.05) 0%, transparent 60%)", zIndex: 0, pointerEvents: "none" }}></div>

                <div className="glass-panel" style={{ padding: "60px 50px", position: "relative", zIndex: 1 }}>
                    <div className="text-center" style={{ marginBottom: "50px", position: "relative", zIndex: 1 }}>
                        <span style={{ color: 'var(--alert)', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>O Inimigo Invisível</span>
                        <h2 style={{ fontSize: "2.6rem", marginTop: "10px", textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>O Paradoxo da Autoridade Oculta</h2>
                        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "700px", margin: "20px auto 0", lineHeight: "1.7" }}>
                            Você investe alto, domina a sua área e entrega o melhor resultado. Mas, na internet, <strong style={{ color: "#fff" }}>concorrentes com metade do seu conhecimento roubam os seus clientes todos os dias</strong> simplesmente porque sabem embalar e vender o próprio serviço melhor que você.
                        </p>
                    </div>

                    <div className="grid-2" style={{ position: "relative", zIndex: 1, alignItems: "stretch" }}>
                        {/* PONTO A */}
                        <div className="caos-box" style={{ background: "rgba(255, 77, 77, 0.03)", border: "1px solid rgba(255, 77, 77, 0.15)", borderRadius: "20px", padding: "40px 30px", position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "var(--alert)" }}></div>
                            <h3 style={{ color: "var(--alert)", display: "flex", alignItems: "center", gap: "10px", fontSize: "1.3rem", marginBottom: "20px" }}>
                                <ShieldAlert size={28} strokeWidth={1.5} /> A Prisão do Operacional
                            </h3>
                            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "15px" }}>
                                <li style={{ color: "var(--text-muted)", fontSize: "0.95rem", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                    <XCircle size={20} color="var(--alert)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                    <span>Você perde horas gravando vídeos que geram curtidas, mas não trazem clientes qualificados.</span>
                                </li>
                                <li style={{ color: "var(--text-muted)", fontSize: "0.95rem", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                    <XCircle size={20} color="var(--alert)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                    <span>Se frustra tentando gerenciar ferramentas, sites e anúncios complexos por conta própria.</span>
                                </li>
                                <li style={{ color: "var(--text-muted)", fontSize: "0.95rem", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                    <XCircle size={20} color="var(--alert)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                    <span>No fim do dia, você virou o "faz-tudo" do digital, enquanto a agenda principal continua travada.</span>
                                </li>
                            </ul>
                        </div>

                        {/* PONTO B */}
                        <div className="controle-box" style={{ background: "rgba(0, 255, 204, 0.05)", border: "1px solid rgba(0, 255, 204, 0.25)", borderRadius: "20px", padding: "40px 30px", position: "relative", overflow: "hidden", boxShadow: "0 10px 40px rgba(0, 255, 204, 0.05)" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "var(--primary)" }}></div>
                            <h3 style={{ color: "var(--primary)", display: "flex", alignItems: "center", gap: "10px", fontSize: "1.3rem", marginBottom: "20px" }}>
                                <CheckCircle2 size={28} strokeWidth={1.5} /> A Máquina de Previsibilidade
                            </h3>
                            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "15px" }}>
                                <li style={{ color: "#e2e8f0", fontSize: "0.95rem", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                    <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                    <span><strong>Ecossistema elegante e automatizado</strong> trabalhando por você 24h por dia.</span>
                                </li>
                                <li style={{ color: "#e2e8f0", fontSize: "0.95rem", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                    <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                    <span><strong>Posicionamento cinematográfico</strong> que ancora seu valor e elimina concorrência por preço.</span>
                                </li>
                                <li style={{ color: "#e2e8f0", fontSize: "0.95rem", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                    <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                    <span>Sua única preocupação será <strong>fechar as vendas e entregar o seu melhor serviço</strong>.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SLIDE 4, 5, 6, 7, 8: O MÉTODO N.A.V.E. */}
            <section className="container animate-enter delay-2" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
                <div className="text-center" style={{ marginBottom: "60px" }}>
                    <span style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>A Metodologia</span>
                    <h2 style={{ fontSize: "2.8rem", marginTop: "10px" }}>O Método N.A.V.E.</h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "15px auto 0" }}>
                        A estrutura completa para transformar conhecimento técnico em desejo de compra no digital.
                    </p>
                </div>

                <div className="nave-grid">
                    {/* N - NARRATIVA */}
                    <div className="nave-card">
                        <div className="nave-letter">N</div>
                        <div className="nave-icon-wrap">
                            <Layout size={24} />
                        </div>
                        <h3>Narrativa Estratégica</h3>
                        <p style={{ color: "var(--text-body-glass)", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "15px" }}>
                            O que você fala precisa gerar dinheiro, não apenas curtidas. Vamos criar um discurso direto que filtra curiosos e atrai quem realmente tem potencial de compra. Sem termos técnicos, apenas a mensagem certa para o cliente certo.
                        </p>
                        <ul className="nave-list">
                            <li><CheckCircle2 size={18} /> <strong>Atenção Imediata:</strong> Ganchos práticos para prender o cliente nos primeiros 3 segundos do vídeo.</li>
                            <li><CheckCircle2 size={18} /> <strong>Roteiros com IA:</strong> Prompts prontos para criar textos de vendas em minutos, mantendo a sua essência.</li>
                            <li><CheckCircle2 size={18} /> <strong>Filtro Anti-Curiosos:</strong> Como quebrar objeções e qualificar o lead antes mesmo de você falar o preço.</li>
                        </ul>
                    </div>

                    {/* A - AUDIOVISUAL */}
                    <div className="nave-card">
                        <div className="nave-letter">A</div>
                        <div className="nave-icon-wrap">
                            <Play size={24} />
                        </div>
                        <h3>Audiovisual e Performance</h3>
                        <p style={{ color: "var(--text-body-glass)", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "15px" }}>
                            Você não precisa de câmeras de cinema para parecer uma autoridade. Vou te mostrar como usar o celular que já está no seu bolso para gravar vídeos com qualidade premium que geram confiança instantânea.
                        </p>
                        <ul className="nave-list">
                            <li><CheckCircle2 size={18} /> <strong>O Setup do Especialista:</strong> Como ter iluminação profissional e áudio limpo usando equipamentos básicos.</li>
                            <li><CheckCircle2 size={18} /> <strong>Destrave em Frente à Câmera:</strong> Técnicas práticas de oratória para você gravar com naturalidade e sem gaguejar.</li>
                            <li><CheckCircle2 size={18} /> <strong>Edição Magnética:</strong> Cortes dinâmicos direto no celular para manter o cliente hipnotizado até o final.</li>
                        </ul>
                    </div>

                    {/* V - VITRINE */}
                    <div className="nave-card">
                        <div className="nave-letter">V</div>
                        <div className="nave-icon-wrap">
                            <MonitorSmartphone size={24} />
                        </div>
                        <h3>Vitrine de Conversão</h3>
                        <p style={{ color: "var(--text-body-glass)", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "15px" }}>
                            Pare de perder tempo respondendo dúvidas repetitivas no WhatsApp. Vamos construir uma página de vendas que trabalha 24 horas por dia como o seu melhor vendedor, transformando visitantes em agendamentos.
                        </p>
                        <ul className="nave-list">
                            <li><CheckCircle2 size={18} /> <strong>A Página de Alta Conversão:</strong> A estrutura exata que faz o cliente desejar o seu serviço.</li>
                            <li><CheckCircle2 size={18} /> <strong>Design Premium:</strong> Um visual que eleva o nível do seu negócio e justifica cobrar mais caro.</li>
                            <li><CheckCircle2 size={18} /> <strong>Automação Silenciosa:</strong> Sistemas inteligentes que recebem e organizam os leads no piloto automático, sem você precisar entender de programação.</li>
                        </ul>
                    </div>

                    {/* E - ESCALA */}
                    <div className="nave-card">
                        <div className="nave-letter">E</div>
                        <div className="nave-icon-wrap">
                            <TrendingUp size={24} />
                        </div>
                        <h3>Escala</h3>
                        <p style={{ color: "var(--text-body-glass)", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "15px" }}>
                            Com a sua vitrine pronta, é hora de trazer a multidão. Vamos ligar a máquina de anúncios para dominar a sua região e lotar a sua agenda com previsibilidade financeira.
                        </p>
                        <ul className="nave-list">
                            <li><CheckCircle2 size={18} /> <strong>Meta Ads (Instagram/Facebook):</strong> Como encontrar e atrair os clientes com maior poder aquisitivo da sua cidade.</li>
                            <li><CheckCircle2 size={18} /> <strong>Google Ads:</strong> O passo a passo para aparecer no topo exato da tela quando alguém pesquisar pelo seu serviço.</li>
                            <li><CheckCircle2 size={18} /> <strong>Lucro no Bolso:</strong> Como ler as métricas de forma rápida para saber exatamente se a campanha está dando lucro.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* SLIDE 9: AUTORIDADE (CARROSSEL DUOTONE E BIO) */}
            <section className="container animate-enter" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
                <div style={{ textAlign: "center", marginBottom: "50px" }}>
                    <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Quem está nos bastidores</span>
                    <h2 style={{ fontSize: '2.4rem', margin: "15px 0 30px" }}>O Arquiteto da Máquina</h2>
                </div>

                <div className="carousel-container">
                    {/* Card 1 */}
                    <div className="duotone-card">
                        <img src="/images/foto-ericles-1.jpg" alt="Audiovisual Estratégico" className="duotone-img" />
                        <div className="duotone-overlay"></div>
                        <div className="duotone-content">
                            <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "4px" }}>Audiovisual High-End</h3>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-body-glass)" }}>Há quase 10 anos traduzindo o valor de empresas físicas em imagens cinematográficas que geram desejo imediato.</p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="duotone-card">
                        <img src="/images/foto-ericles-2.jpg" alt="Tráfego Pago" className="duotone-img" />
                        <div className="duotone-overlay"></div>
                        <div className="duotone-content">
                            <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "4px" }}>Performance e Tráfego</h3>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-body-glass)" }}>Gestão de campanhas focadas em conversão. O vídeo bonito só tem valor quando traz o lead qualificado pro WhatsApp.</p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="duotone-card">
                        <img src="/images/foto-ericles-4.jpg" alt="Pós Graduação ESPM" className="duotone-img" />
                        <div className="duotone-overlay"></div>
                        <div className="duotone-content">
                            <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "4px" }}>Fundamento e Inovação</h3>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-body-glass)" }}>Pós-graduando em Comunicação e Marketing Digital pela ESPM. A tática muda todo dia, mas os fundamentos permanecem.</p>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="duotone-card">
                        <img src="/images/foto-ericles-3.jpg" alt="Visão de Negócio" className="duotone-img" />
                        <div className="duotone-overlay"></div>
                        <div className="duotone-content">
                            <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "4px" }}>Visão de Dono</h3>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-body-glass)" }}>À frente do Chama Labs. Sei na prática que curtida não paga folha de pagamento. Meu foco absoluto é faturamento real.</p>
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: "800px", margin: "50px auto 0", textAlign: "justify", padding: "0 20px" }}>
                    <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "15px" }}>
                        Muito prazer, sou <strong style={{ color: "#fff" }}>Éricles Lima</strong>.
                    </p>
                    <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "15px" }}>
                        Não sou mais um teórico repetindo fórmulas rasas de internet. Sou o estrategista que atua nos bastidores das câmeras e das telas, orquestrando posicionamentos que geram resultados reais. Por mais de 3 anos, atuei na linha de frente de uma das maiores produtoras de videoclipes do Nordeste, lapidando projetos que, somados, ultrapassam a marca colossal de <strong style={{ color: "var(--primary)" }}>1 bilhão de visualizações</strong>. Integrei também a equipe técnica de produções de relevância nacional, com conteúdos em vitrines como o <strong style={{ color: "var(--primary)" }}>Portal Léo Dias e o programa Hora do Faro (Record TV)</strong>.
                    </p>
                    <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "15px" }}>
                        Minha bagagem foi forjada no campo de batalha mais competitivo que existe: atuei como <strong style={{ color: "var(--primary)" }}>estrategista e editor audiovisual em 4 campanhas políticas (2018, 2020, 2022 e 2024)</strong> a nível municipal e estadual, orquestrando a percepção de imagem dos candidatos na TV e no digital.
                    </p>
                    <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "15px" }}>
                        No setor corporativo, assumi a direção e a produção de dezenas de comerciais — tanto para <strong style={{ color: "var(--primary)" }}>TV quanto para Campanhas Digitais</strong> — de grandes marcas regionais, como redes de supermercados, shoppings e concessionárias. Coroando essa trajetória, em 2024, fiz parte do time audiovisual da <strong style={{ color: "var(--primary)" }}>maior agência de publicidade do Rio Grande do Norte</strong>, dando vida a campanhas multimilionárias para o mercado imobiliário e corporativo.
                    </p>
                    <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.7" }}>
                        Eu respiro o jogo da percepção de valor. O <strong>Método N.A.V.E.</strong> nasceu dessa expertise refinada: é a engenharia exata que utilizo para <strong style={{ color: "var(--primary)" }}>transformar profissionais em autoridades incontestáveis</strong>. Agora, chegou a hora de instalar essa mesma máquina de dominação no seu negócio.
                    </p>
                </div>
            </section>

            {/* SLIDE 11: CRONOGRAMA */}
            <section className="container animate-enter" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
                <div className="text-center">
                    <h2 style={{ fontSize: "2.4rem" }}>4 Semanas Para a Decolagem</h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginTop: "10px" }}>O cronograma de implementação do Método N.A.V.E.</p>
                </div>

                <div className="timeline">
                    <div className="timeline-item">
                        <h4 style={{ color: "var(--primary)" }}>Semana 1: Narrativa e I.A.</h4>
                        <p>Posicionamento, construção da mensagem central e domínio prático da Inteligência Artificial para gerar ideias e roteiros todos os dias.</p>
                    </div>
                    <div className="timeline-item">
                        <h4 style={{ color: "var(--primary)" }}>Semana 2: Audiovisual</h4>
                        <p>Prática de Setup, ajustes de iluminação/áudio e destrave de performance em frente à lente.</p>
                    </div>
                    <div className="timeline-item">
                        <h4 style={{ color: "var(--primary)" }}>Semana 3: Vitrine</h4>
                        <p>Criação e aprovação de Landing Pages de alta conversão e automações de bastidores.</p>
                    </div>
                    <div className="timeline-item">
                        <h4 style={{ color: "var(--primary)" }}>Semana 4: Escala</h4>
                        <p>Configuração de Anúncios (Meta e Google Ads), lançamento das campanhas e otimização de métricas iniciais.</p>
                    </div>
                </div>
            </section>

            {/* SEÇÃO: PARA QUEM NÃO É */}
            <section className="container animate-enter" style={{ paddingTop: "0px", paddingBottom: "60px" }}>
                <div className="text-center">
                    <h2 style={{ fontSize: "2.2rem" }}>Essa Mentoria <span style={{ color: "var(--alert)" }}>Não</span> É Para Você Se...</h2>
                </div>
                <ul className="exclusion-list">
                    <li>
                        <XCircle size={20} color="var(--alert)" />
                        <span>Você busca uma <strong style={{ color: "#fff" }}>fórmula mágica</strong> para ficar rico sem trabalhar. Aqui é engenharia, não milagre.</span>
                    </li>
                    <li>
                        <XCircle size={20} color="var(--alert)" />
                        <span>Você não está disposto a <strong style={{ color: "#fff" }}>gravar e aparecer</strong>. O método exige que você seja o rosto do seu negócio.</span>
                    </li>
                    <li>
                        <XCircle size={20} color="var(--alert)" />
                        <span>Você não tem um <strong style={{ color: "#fff" }}>serviço ou produto definido</strong>. Precisamos de uma base para construir em cima.</span>
                    </li>
                    <li>
                        <XCircle size={20} color="var(--alert)" />
                        <span>Você quer <strong style={{ color: "#fff" }}>delegar tudo</strong> e não colocar a mão na massa. O Método N.A.V.E. forma donos, não espectadores.</span>
                    </li>
                </ul>
            </section>

            {/* PROPOSTA COMERCIAL */}
            <section id="proposta" className="container animate-enter" style={{ paddingTop: "40px", paddingBottom: "120px" }}>
                <div className="glass-panel" style={{ background: "linear-gradient(160deg, rgba(5, 10, 16, 0.9) 0%, rgba(30, 41, 59, 0.6) 100%)", border: "1px solid var(--primary)", boxShadow: "0 0 40px rgba(0, 255, 204, 0.15)" }}>
                    <div className="text-center">
                        <div className="urgency-bar" style={{ margin: "0 auto 20px" }}>
                            <div className="urgency-dot"></div>
                            Vagas sendo preenchidas agora
                        </div>
                        <span style={{ display: "inline-block", background: "rgba(0, 255, 204, 0.1)", color: "var(--primary)", padding: "6px 16px", borderRadius: "50px", fontSize: "0.85rem", fontWeight: "700", marginBottom: "20px", letterSpacing: "1px" }}>
                            TURMA BETA — GRUPO RESTRITO
                        </span>
                        <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Tudo Que Você Precisa Para Decolar</h2>
                        <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "550px", margin: "0 auto" }}>Veja o que está incluso na sua vaga da Turma Beta do Método N.A.V.E.:</p>
                    </div>

                    <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "12px", padding: "10px", marginTop: "30px" }}>
                        <table className="offer-table">
                            <tbody>
                                <tr>
                                    <td><strong>Mentoria (Método N.A.V.E.)</strong> (4 Encontros Estratégicos Ao Vivo via Zoom)</td>
                                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}><span className="price-strike">R$ 497,00</span></td>
                                </tr>
                                <tr>
                                    <td><strong>Hotseat Individual</strong> (Análise cirúrgica do seu site, campanha e roteiro)</td>
                                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}><span className="price-strike">R$ 297,00</span></td>
                                </tr>
                                <tr>
                                    <td><strong>Portal Chama Labs</strong> (1 Ano de Acesso às Aulas Gravadas)</td>
                                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}><span className="price-strike">R$ 197,00</span></td>
                                </tr>
                                <tr>
                                    <td><strong>Templates e Prompts de I.A.</strong> (Páginas validadas e comandos testados)</td>
                                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}><span className="price-strike">R$ 97,00</span></td>
                                </tr>
                                <tr>
                                    <td><strong>Suporte de Acompanhamento</strong> no Grupo Exclusivo</td>
                                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}><span className="price-strike">R$ 109,00</span></td>
                                </tr>
                                <tr className="offer-highlight-row">
                                    <td style={{ fontWeight: 800, color: "#fff" }}>Valor Total do Pacote</td>
                                    <td style={{ textAlign: "right", whiteSpace: "nowrap", fontWeight: 800 }}><span className="price-strike" style={{ fontSize: "1.1rem" }}>R$ 1.197,00</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center" style={{ marginTop: "40px" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "2px" }}>Condição Especial Turma Beta</div>
                        <div style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700, marginBottom: "15px" }}>50% DE DESCONTO — APENAS PARA APROVADOS</div>
                        <div style={{ fontSize: "4.5rem", fontWeight: "900", color: "#fff", lineHeight: "1", textShadow: "0 0 30px rgba(0, 255, 204, 0.3)", marginBottom: "10px" }}>
                            <span style={{ fontSize: "2rem", verticalAlign: "top", color: "var(--primary)" }}>R$</span> 599<span style={{ fontSize: "2rem" }}>,00</span>
                        </div>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "15px" }}>ou 12x de R$ 57,78 no cartão</p>

                        <div style={{ background: "rgba(255, 107, 107, 0.1)", border: "1px solid rgba(255, 107, 107, 0.3)", padding: "12px 16px", borderRadius: "12px", marginBottom: "20px", display: "inline-block", maxWidth: "95%", textAlign: "left" }}>
                            <p style={{ color: "#ff6b6b", fontSize: "0.95rem", lineHeight: "1.5", fontWeight: 500, margin: 0 }}>
                                ⚠️ <strong style={{ color: "#fff" }}>APENAS 10 VAGAS DISPONÍVEIS:</strong> Para garantir uma análise cirúrgica e o meu acompanhamento estratégico individualizado com cada projeto, as aprovações para esta turma inaugural serão encerradas assim que atingirmos o limite.
                            </p>
                        </div>

                        {/* COUNTDOWN */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px" }}>
                            <Clock size={16} color="#ff6b6b" />
                            <span style={{ color: "#ff6b6b", fontSize: "0.85rem", fontWeight: 700 }}>Inscrições encerram esta semana</span>
                        </div>
                        <div className="countdown-strip">
                            <div className="countdown-box">
                                <div className="countdown-num">{timeLeft.days}</div>
                                <div className="countdown-label">Dias</div>
                            </div>
                            <div className="countdown-box">
                                <div className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</div>
                                <div className="countdown-label">Horas</div>
                            </div>
                            <div className="countdown-box">
                                <div className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                <div className="countdown-label">Min</div>
                            </div>
                            <div className="countdown-box">
                                <div className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                <div className="countdown-label">Seg</div>
                            </div>
                        </div>

                        <div style={{ maxWidth: "450px", margin: "0 auto" }}>
                            <Link href="/diagnostico" className="btn-primary btn-pulse" style={{ padding: "20px 40px", fontSize: "1.1rem", display: "inline-block", width: "100%" }}>GARANTIR MINHA VAGA NA TURMA BETA</Link>
                        </div>

                        {/* GARANTIA */}
                        <div className="guarantee-box">
                            <div className="guarantee-icon">
                                <Shield size={24} />
                            </div>
                            <div>
                                <p style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700, marginBottom: "4px" }}>Garantia do Primeiro Encontro</p>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.5" }}>Se após o primeiro encontro ao vivo você sentir que a mentoria não é para você, devolvemos 100% do seu investimento. Sem burocracia.</p>
                            </div>
                        </div>

                        <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontStyle: "italic", borderTop: "1px solid var(--glass-border)", paddingTop: "20px", maxWidth: "500px", margin: "30px auto 0" }}>
                            "A diferença entre ser a escolha principal ou apenas mais uma opção está na forma como o seu valor é percebido na internet."
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="container animate-enter" style={{ paddingTop: "0px", paddingBottom: "100px", maxWidth: "800px" }}>
                <div className="text-center" style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontSize: "2.2rem" }}>Perguntas Frequentes</h2>
                </div>

                <details className="faq-item">
                    <summary>Para quem é o Método N.A.V.E.?</summary>
                    <p>Para profissionais liberais, donos de negócios e especialistas que têm dificuldade em empacotar seu conhecimento para atrair bons clientes pelas redes sociais, sem precisar desvalorizar o próprio serviço. Se você é dentista, advogado, arquiteto, nutricionista, dono de clínica, loja ou agência — essa mentoria foi pensada para você.</p>
                </details>
                <details className="faq-item">
                    <summary>Preciso de câmera profissional ou equipamento caro?</summary>
                    <p>Não. O Método N.A.V.E. foi validado para que você crie um posicionamento visual magnético e profissional utilizando apenas o seu celular, combinando iluminação e áudio adequados. Você vai se surpreender com o resultado.</p>
                </details>
                <details className="faq-item">
                    <summary>Como funcionam os encontros ao vivo?</summary>
                    <p>Teremos 4 encontros direto comigo pelo Zoom, um para cada pilar do método: Narrativa, Audiovisual, Vitrine e Escala. Durante as sessões, teremos o momento de <strong>Hotseat</strong>, onde analisarei individualmente suas páginas, roteiros e campanhas.</p>
                </details>
                <details className="faq-item">
                    <summary>Em quanto tempo vejo resultado?</summary>
                    <p>A estrutura completa é instalada em 4 semanas. Alunos que aplicam tudo já começam a receber os primeiros leads qualificados ainda durante o programa, especialmente na Semana 4 (Escala), quando ligamos as campanhas de tráfego.</p>
                </details>
                <details className="faq-item">
                    <summary>Por que as vagas são através de aplicação?</summary>
                    <p>Como a turma conta com acompanhamento cirúrgico nos seus negócios, o grupo precisa ser restrito. A aplicação me ajuda a garantir que você está no momento certo para aproveitar 100% e não perder dinheiro. Não é sobre exclusividade, é sobre responsabilidade.</p>
                </details>
                <details className="faq-item">
                    <summary>Tenho acesso ao conteúdo depois que a turma acabar?</summary>
                    <p>Sim. Além dos 4 encontros ao vivo, você terá <strong>1 ano de acesso ao Portal Chama Labs</strong> com todas as aulas gravadas, templates de páginas e prompts de I.A. para consultar sempre que precisar.</p>
                </details>
            </section>

            <footer className="header" style={{ position: "static", background: "transparent", borderBottom: "none", borderTop: "1px solid var(--glass-border)", padding: "40px 0" }}>
                <div className="container text-center" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    <p>&copy; {new Date().getFullYear()} chamalabs.co</p>
                </div>
            </footer>

            <div className="mobile-sticky">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "white" }}>Método N.A.V.E.</span>
                    <span style={{ color: "var(--primary)", fontSize: "0.85rem" }}>Aplicação Liberada</span>
                </div>
                <Link href="/diagnostico" className="sticky-btn">APLICAR</Link>
            </div>
        </>
    );
}