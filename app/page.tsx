"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Play, Layout, TrendingUp, MonitorSmartphone, XCircle, ShieldAlert, Shield, Clock } from "lucide-react";

export default function Home() {
    // Countdown: calcula o próximo domingo (fim da semana)
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [cookieState, setCookieState] = useState('pending');

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('nave_cookies')) {
            setCookieState('resolved');
        }
    }, []);

    const handleCookie = (accepted: boolean) => {
        setCookieState('closing');
        if (typeof window !== 'undefined') {
            localStorage.setItem('nave_cookies', accepted ? 'accepted' : 'declined');
        }
        setTimeout(() => setCookieState('resolved'), 500);
    };

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

        @keyframes slideDown { from { transform: translateY(0); opacity: 1; } to { transform: translateY(150%); opacity: 0; } }
        .animate-slide-down { animation: slideDown 0.5s ease forwards !important; }

        @media (max-width: 768px) {
            .container { padding: 0 20px; }
            .display-text { font-size: 1.8rem; line-height: 1.1; }
            .hero { padding-top: 110px; padding-bottom: 30px; }
            .sub-headline { font-size: 0.95rem; margin-bottom: 24px; }
            .btn-header-glow { padding: 8px 16px; font-size: 0.8rem; }
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
                    <Link href="/" className="logo" style={{ flexShrink: 0 }}>
                        <img src="/nave-logo.png" alt="Método N.A.V.E." className="h-7 md:h-12 w-auto object-contain flex-shrink-0" />
                    </Link>
                    <Link href="/diagnostico" className="btn-header-glow">APLICAÇÃO</Link>
                </div>
            </header>

            {/* SLIDE 1: CAPA */}
            <section className="hero container animate-enter">
                <div className="hero-badge">TURMA BETA — VAGAS LIMITADAS</div>
                <h1 className="display-text">
                    Seu serviço já é <span className="text-highlight">excelente</span>. Está na hora da <span className="text-highlight">internet perceber</span> isso.
                </h1>
                <p className="sub-headline">
                    Em 4 semanas, transforme seu conhecimento em <strong className="text-highlight">autoridade</strong>, sua autoridade em <strong className="text-highlight">demanda</strong> e sua demanda em <strong className="text-highlight">clientes</strong>.
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
                        <div className="proof-number">✓</div>
                        <div className="proof-label">Método Validado em Múltiplos Segmentos</div>
                    </div>
                </div>
            </section>

            {/* SLIDE 2 & 3: INTRODUÇÃO E DIAGNÓSTICO */}
            <section className="container animate-enter delay-1" style={{ position: "relative" }}>
                {/* Efeito luminoso de fundo */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", height: "80%", background: "radial-gradient(ellipse, rgba(0, 255, 204, 0.05) 0%, transparent 60%)", zIndex: 0, pointerEvents: "none" }}></div>

                <div className="glass-panel" style={{ padding: "60px 50px", position: "relative", zIndex: 1 }}>
                    <div className="text-center" style={{ marginBottom: "50px", position: "relative", zIndex: 1 }}>
                        <span style={{ color: 'var(--alert)', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Você já percebeu isso?</span>
                        <h2 style={{ fontSize: "2.6rem", marginTop: "10px", textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>O Paradoxo da Autoridade Oculta</h2>
                        <div style={{ color: "var(--text-muted)", fontSize: "1.15rem", maxWidth: "700px", margin: "20px auto 0", lineHeight: "1.9" }}>
                            <p style={{ marginBottom: "8px" }}>O melhor dentista nem sempre é o mais procurado.</p>
                            <p style={{ marginBottom: "8px" }}>O melhor advogado nem sempre é o mais lembrado.</p>
                            <p style={{ marginBottom: "20px" }}>O melhor arquiteto nem sempre é o mais valorizado.</p>
                            <p style={{ marginBottom: "8px" }}>Enquanto isso, <strong style={{ color: "#fff" }}>profissionais medianos lotam a agenda</strong>.</p>
                            <p style={{ marginBottom: "8px" }}>Não porque são melhores.</p>
                            <p style={{ marginBottom: "20px" }}>Mas porque aprenderam a <strong style={{ color: "#fff" }}>controlar a percepção</strong>.</p>
                            <p style={{ marginBottom: "8px", color: "var(--primary)", fontWeight: 700 }}>O mercado não recompensa competência.</p>
                            <p style={{ marginBottom: "20px", color: "var(--primary)", fontWeight: 700 }}>O mercado recompensa competência percebida.</p>
                            <p>E é exatamente essa lacuna que o <strong style={{ color: "#fff" }}>Método N.A.V.E.</strong> resolve.</p>
                        </div>
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
                                    <span>No fim do dia, você virou o &quot;faz-tudo&quot; do digital, enquanto a agenda principal continua travada.</span>
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
                    {/* N - NOTÁVEL */}
                    <div className="nave-card">
                        <div className="nave-letter">N</div>
                        <div className="nave-icon-wrap">
                            <Layout size={24} />
                        </div>
                        <h3>N — Notável</h3>
                        <p style={{ color: "var(--primary)", fontSize: "1.05rem", lineHeight: "1.5", marginBottom: "15px", fontWeight: 600 }}>
                            Torne-se impossível de ignorar.
                        </p>
                        <p style={{ color: "var(--text-body-glass)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                            Você vai descobrir como transformar seu conhecimento em uma mensagem que chama atenção, gera autoridade e faz o cliente pensar: <strong style={{ color: "#fff" }}>&quot;é exatamente essa pessoa que eu preciso.&quot;</strong>
                        </p>
                    </div>

                    {/* A - AUTORIDADE */}
                    <div className="nave-card">
                        <div className="nave-letter">A</div>
                        <div className="nave-icon-wrap">
                            <Play size={24} />
                        </div>
                        <h3>A — Autoridade</h3>
                        <p style={{ color: "var(--primary)", fontSize: "1.05rem", lineHeight: "1.5", marginBottom: "15px", fontWeight: 600 }}>
                            Faça sua imagem trabalhar por você.
                        </p>
                        <p style={{ color: "var(--text-body-glass)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                            Mesmo usando apenas seu celular, você aprenderá a criar conteúdos que <strong style={{ color: "#fff" }}>aumentam confiança instantânea</strong> e elevam seu valor percebido.
                        </p>
                    </div>

                    {/* V - VENDAS */}
                    <div className="nave-card">
                        <div className="nave-letter">V</div>
                        <div className="nave-icon-wrap">
                            <MonitorSmartphone size={24} />
                        </div>
                        <h3>V — Vendas</h3>
                        <p style={{ color: "var(--primary)", fontSize: "1.05rem", lineHeight: "1.5", marginBottom: "15px", fontWeight: 600 }}>
                            Construa uma vitrine que vende enquanto você trabalha.
                        </p>
                        <p style={{ color: "var(--text-body-glass)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                            Uma estrutura digital capaz de <strong style={{ color: "#fff" }}>transformar visitantes em oportunidades reais</strong> — sem depender de indicação.
                        </p>
                    </div>

                    {/* E - ESCALA */}
                    <div className="nave-card">
                        <div className="nave-letter">E</div>
                        <div className="nave-icon-wrap">
                            <TrendingUp size={24} />
                        </div>
                        <h3>E — Escala</h3>
                        <p style={{ color: "var(--primary)", fontSize: "1.05rem", lineHeight: "1.5", marginBottom: "15px", fontWeight: 600 }}>
                            Ligue a máquina.
                        </p>
                        <p style={{ color: "var(--text-body-glass)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                            Aplique campanhas inteligentes para <strong style={{ color: "#fff" }}>amplificar sua autoridade</strong> e acelerar a chegada de novos clientes — com previsibilidade.
                        </p>
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

                <div style={{ maxWidth: "800px", margin: "50px auto 0", textAlign: "center", padding: "0 20px" }}>
                    <h3 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "30px" }}>Quem é Éricles Lima?</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
                        <p style={{ fontSize: "1.1rem", color: "var(--text-main)", lineHeight: "1.6" }}>
                            Mais de <strong style={{ color: "var(--primary)" }}>R$ 500 mil gerenciados</strong> em campanhas.
                        </p>
                        <p style={{ fontSize: "1.1rem", color: "var(--text-main)", lineHeight: "1.6" }}>
                            Participação em projetos que ultrapassaram <strong style={{ color: "var(--primary)" }}>1 bilhão de visualizações</strong>.
                        </p>
                        <p style={{ fontSize: "1.1rem", color: "var(--text-main)", lineHeight: "1.6" }}>
                            Experiência em <strong style={{ color: "var(--primary)" }}>campanhas políticas, grandes marcas regionais</strong> e em uma das maiores agências de publicidade do Rio Grande do Norte.
                        </p>
                    </div>
                    <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "25px" }}>
                        <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "12px" }}>
                            Nos últimos anos estive nos bastidores estudando uma única pergunta:
                        </p>
                        <p style={{ fontSize: "1.2rem", color: "#fff", lineHeight: "1.7", fontWeight: 700, fontStyle: "italic" }}>
                            &quot;Por que alguns profissionais se tornam referências enquanto outros permanecem invisíveis?&quot;
                        </p>
                        <p style={{ fontSize: "1.15rem", color: "var(--primary)", lineHeight: "1.7", fontWeight: 700, marginTop: "20px" }}>
                            O Método N.A.V.E. é a resposta.
                        </p>
                    </div>
                </div>
            </section>

            {/* SLIDE 11: CRONOGRAMA */}
            <section className="container animate-enter" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
                <div className="text-center">
                    <h2 style={{ fontSize: "2.4rem" }}>4 Semanas Para a Decolagem</h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginTop: "10px" }}>Sua jornada de profissional invisível a referência do mercado.</p>
                </div>

                <div className="timeline">
                    <div className="timeline-item">
                        <h4 style={{ color: "var(--primary)" }}>Semana 1: Clareza e Posicionamento</h4>
                        <p>Defina a mensagem que fará seu mercado enxergar seu valor.</p>
                    </div>
                    <div className="timeline-item">
                        <h4 style={{ color: "var(--primary)" }}>Semana 2: Autoridade Visual</h4>
                        <p>Aprenda a parecer tão bom quanto realmente é.</p>
                    </div>
                    <div className="timeline-item">
                        <h4 style={{ color: "var(--primary)" }}>Semana 3: Máquina de Conversão</h4>
                        <p>Construa uma estrutura que transforma atenção em oportunidades.</p>
                    </div>
                    <div className="timeline-item">
                        <h4 style={{ color: "var(--primary)" }}>Semana 4: Escala e Crescimento</h4>
                        <p>Multiplique seu alcance sem multiplicar seu esforço.</p>
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
                        <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Sua Primeira Máquina de Autoridade Digital</h2>
                        <div style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.8" }}>
                            <p style={{ marginBottom: "6px" }}>Em vez de contratar uma agência todos os meses...</p>
                            <p style={{ marginBottom: "6px" }}>Em vez de depender exclusivamente de indicação...</p>
                            <p style={{ marginBottom: "6px" }}>Em vez de torcer para que seus conteúdos funcionem...</p>
                            <p style={{ color: "#fff", fontWeight: 700, marginTop: "12px" }}>Você sairá com uma estrutura própria para atrair, convencer e converter clientes.</p>
                        </div>
                    </div>

                    {/* O QUE VOCÊ TERÁ AO FINAL */}
                    <div style={{ background: "rgba(0, 255, 204, 0.03)", border: "1px solid rgba(0, 255, 204, 0.15)", borderRadius: "16px", padding: "35px 30px", marginTop: "30px", marginBottom: "30px" }}>
                        <h3 style={{ fontSize: "1.3rem", color: "#fff", marginBottom: "20px", textAlign: "center" }}>O que você terá ao final da mentoria</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", maxWidth: "600px", margin: "0 auto" }}>
                            <p style={{ color: "var(--text-main)", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
                                <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0 }} /> Posicionamento definido
                            </p>
                            <p style={{ color: "var(--text-main)", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
                                <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0 }} /> Conteúdo orientado à conversão
                            </p>
                            <p style={{ color: "var(--text-main)", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
                                <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0 }} /> Landing page validada
                            </p>
                            <p style={{ color: "var(--text-main)", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
                                <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0 }} /> Estrutura de captação funcionando
                            </p>
                            <p style={{ color: "var(--text-main)", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
                                <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0 }} /> Primeiras campanhas no ar
                            </p>
                            <p style={{ color: "var(--text-main)", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
                                <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0 }} /> Processo de aquisição sob seu controle
                            </p>
                        </div>
                    </div>

                    <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "12px", padding: "10px" }}>
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

                    {/* BLOCO: IMAGINE DAQUI A 90 DIAS */}
                    <div style={{ background: "rgba(0, 255, 204, 0.03)", border: "1px solid rgba(0, 255, 204, 0.15)", borderRadius: "16px", padding: "40px 30px", marginTop: "40px", marginBottom: "40px", textAlign: "center" }}>
                        <h3 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "25px" }}>Imagine daqui a 90 dias...</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "500px", margin: "0 auto", textAlign: "left" }}>
                            <p style={{ color: "var(--text-main)", fontSize: "1.05rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                Seu Instagram transmitindo <strong style={{ color: "var(--primary)" }}>autoridade</strong>.
                            </p>
                            <p style={{ color: "var(--text-main)", fontSize: "1.05rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                Seu nome sendo <strong style={{ color: "var(--primary)" }}>lembrado</strong>.
                            </p>
                            <p style={{ color: "var(--text-main)", fontSize: "1.05rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                Seu WhatsApp recebendo <strong style={{ color: "var(--primary)" }}>contatos qualificados</strong>.
                            </p>
                            <p style={{ color: "var(--text-main)", fontSize: "1.05rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                Seus conteúdos <strong style={{ color: "var(--primary)" }}>trabalhando enquanto você atende</strong>.
                            </p>
                        </div>
                        <p style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginTop: "25px" }}>
                            E o melhor: <span style={{ color: "var(--primary)" }}>sem depender de agência</span> para fazer isso acontecer.
                        </p>
                    </div>

                    <div className="text-center">
                        <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "2px" }}>Condição Especial Turma Beta</div>
                        <div style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700, marginBottom: "15px" }}>50% DE DESCONTO — APENAS PARA APROVADOS</div>
                        <div style={{ fontSize: "4.5rem", fontWeight: "900", color: "#fff", lineHeight: "1", textShadow: "0 0 30px rgba(0, 255, 204, 0.3)", marginBottom: "10px" }}>
                            <span style={{ fontSize: "2rem", verticalAlign: "top", color: "var(--primary)" }}>R$</span> 599<span style={{ fontSize: "2rem" }}>,00</span>
                        </div>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "15px" }}>ou 12x de R$ 61,58 no cartão</p>

                        <div style={{ background: "rgba(255, 107, 107, 0.1)", border: "1px solid rgba(255, 107, 107, 0.3)", padding: "16px 20px", borderRadius: "12px", marginBottom: "20px", display: "inline-block", maxWidth: "95%", textAlign: "left" }}>
                            <p style={{ color: "#fff", fontSize: "1rem", fontWeight: 800, marginBottom: "8px" }}>
                                ⚠️ APENAS 10 ESPECIALISTAS SERÃO SELECIONADOS
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.6", margin: 0 }}>
                                Para garantir análises profundas, acompanhamento próximo e feedback individualizado, cada edição do Método N.A.V.E. possui um número máximo de participantes. Nesta turma inaugural, <strong style={{ color: "#ff6b6b" }}>apenas 10 projetos serão aprovados</strong>.
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
                            <Link href="/diagnostico" className="btn-primary btn-pulse" style={{ padding: "20px 40px", fontSize: "1.1rem", display: "inline-block", width: "100%" }}>ENVIAR MINHA APLICAÇÃO</Link>
                        </div>

                        {/* GARANTIA */}
                        <div className="guarantee-box">
                            <div className="guarantee-icon">
                                <Shield size={24} />
                            </div>
                            <div>
                                <p style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700, marginBottom: "4px" }}>Garantia de Alinhamento</p>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.5" }}>Se após o primeiro encontro ao vivo você sentir que a mentoria não é para você, devolvemos 100% do seu investimento. Sem burocracia.</p>
                            </div>
                        </div>

                        <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontStyle: "italic", borderTop: "1px solid var(--glass-border)", paddingTop: "20px", maxWidth: "500px", margin: "30px auto 0" }}>
                            &quot;A diferença entre ser a escolha principal ou apenas mais uma opção está na forma como o seu valor é percebido na internet.&quot;
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
                    <summary>O Método N.A.V.E. funciona para qualquer segmento?</summary>
                    <p>Sim. O método foi criado para profissionais que dependem de <strong>confiança</strong> para vender: médicos, dentistas, advogados, arquitetos, consultores, corretores, clínicas, lojas, prestadores de serviço e especialistas em geral. O princípio é sempre o mesmo: transformar conhecimento em autoridade e autoridade em demanda.</p>
                </details>
                <details className="faq-item">
                    <summary>Preciso de câmera profissional ou equipamento caro?</summary>
                    <p>Não. O Método N.A.V.E. foi validado para que você crie um posicionamento visual magnético e profissional utilizando apenas o seu celular, combinando iluminação e áudio adequados. Você vai se surpreender com o resultado.</p>
                </details>
                <details className="faq-item">
                    <summary>Já contratei agência e não tive resultado. Essa mentoria é diferente?</summary>
                    <p>Sim. Uma agência executa por você. O Método N.A.V.E. <strong>ensina você a compreender e controlar</strong> os pilares que fazem um negócio crescer no digital: posicionamento, conteúdo, conversão e aquisição de clientes. Você deixa de depender exclusivamente de terceiros para entender o que realmente gera resultado.</p>
                </details>
                <details className="faq-item">
                    <summary>Como funcionam os encontros ao vivo?</summary>
                    <p>Teremos 4 encontros direto comigo pelo Zoom, um para cada pilar do método. Durante as sessões, teremos o momento de <strong>Hotseat</strong>, onde analisarei individualmente suas páginas, roteiros e campanhas.</p>
                </details>
                <details className="faq-item">
                    <summary>Em quanto tempo vejo resultado?</summary>
                    <p>A estrutura completa é instalada em 4 semanas. Alunos que aplicam tudo já começam a receber os primeiros leads qualificados ainda durante o programa, especialmente na Semana 4 (Escala), quando ligamos as campanhas de tráfego.</p>
                </details>
                <details className="faq-item">
                    <summary>Preciso ter uma empresa grande para participar?</summary>
                    <p>Não. A maioria dos participantes chega justamente porque ainda não possui um sistema previsível de aquisição de clientes. O Método N.A.V.E. foi desenhado para quem quer <strong>estruturar essa máquina antes de crescer</strong>.</p>
                </details>
                <details className="faq-item">
                    <summary>E se eu não me sentir preparado para aparecer?</summary>
                    <p>Você não precisa ser influenciador, palestrante ou comunicador profissional. Uma das maiores vantagens do Método N.A.V.E. é justamente ajudar especialistas a <strong>transmitir autoridade com naturalidade</strong> — sem personagens, sem fórmulas artificiais e sem precisar virar criador de conteúdo em tempo integral.</p>
                </details>
                <details className="faq-item">
                    <summary>Tenho acesso ao conteúdo depois que a turma acabar?</summary>
                    <p>Sim. Além dos 4 encontros ao vivo, você terá <strong>1 ano de acesso ao Portal Chama Labs</strong> com todas as aulas gravadas, templates de páginas e prompts de I.A. para consultar sempre que precisar.</p>
                </details>
                <details className="faq-item">
                    <summary>Por que existe um processo de aplicação?</summary>
                    <p>Porque esta não é uma turma aberta. Cada participante recebe análises individuais, feedback estratégico e acompanhamento próximo. A aplicação garante que você está no momento certo para aproveitar o método e que conseguiremos <strong>gerar avanços reais</strong> durante a mentoria.</p>
                </details>
            </section>

            <footer className="header" style={{ position: "static", background: "transparent", borderBottom: "none", borderTop: "1px solid var(--glass-border)", padding: "40px 0" }}>
                <div className="container text-center" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    <p>&copy; {new Date().getFullYear()} chamalabs.co</p>
                </div>
            </footer>

            {cookieState !== 'resolved' ? (
                <div className={`mobile-sticky ${cookieState === 'closing' ? 'animate-slide-down' : ''}`} style={{ flexDirection: "column", gap: "12px", alignItems: "flex-start", animationDelay: "0s" }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-main)", lineHeight: "1.4" }}>
                        Utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência e medir o desempenho das nossas campanhas.
                    </div>
                    <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                        <button onClick={() => handleCookie(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "transparent", border: "1px solid var(--glass-border)", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "0.3s" }}>Apenas Essenciais</button>
                        <button onClick={() => handleCookie(true)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "var(--primary)", color: "#050a10", fontSize: "0.85rem", fontWeight: 800, cursor: "pointer", transition: "0.3s", boxShadow: "0 0 15px rgba(0, 255, 204, 0.2)" }}>Aceitar Todos</button>
                    </div>
                </div>
            ) : (
                <div className="mobile-sticky">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "white" }}>Método N.A.V.E.</span>
                        <span style={{ color: "var(--primary)", fontSize: "0.85rem" }}>Aplicação Liberada</span>
                    </div>
                    <Link href="/diagnostico" className="sticky-btn">APLICAR</Link>
                </div>
            )}
        </>
    );
}