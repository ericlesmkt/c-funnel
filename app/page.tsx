"use client";

import Head from "next/head";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            --primary: #ffca85; 
            --primary-glow: rgba(255, 202, 133, 0.6);
            --success: #61ffca;
            --alert: #ff6767;
            
            --bg-base: #15141b; 
            --text-main: #edecee;
            --text-muted: #a1a1aa;
            --text-body-glass: #c0bfc4;
            
            --glass-bg: linear-gradient(160deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
            --glass-border: rgba(255, 202, 133, 0.15); 
            --glass-highlight: rgba(255, 202, 133, 0.25);
            --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }

        body {
            background-color: var(--bg-base);
            color: var(--text-main);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            overflow-x: hidden;
            padding-bottom: 120px;
        }

        /* FX */
        .noise-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999; opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
        .background-fx { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; animation: floatOrb 10s infinite alternate ease-in-out; }
        .orb-1 { top: -10%; left: 50%; transform: translateX(-50%); width: 600px; height: 500px; background: radial-gradient(circle, rgba(255, 202, 133, 0.15), transparent 70%); }
        .orb-2 { bottom: 10%; right: -20%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(162, 119, 255, 0.12), transparent 70%); } 
        .orb-3 { top: 40%; left: -20%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255, 202, 133, 0.08), transparent 70%); }
        @keyframes floatOrb { 0% { transform: translate(-50%, 0) scale(1); } 100% { transform: translate(-50%, 30px) scale(1.1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-enter { animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; } .delay-2 { animation-delay: 0.2s; } .delay-3 { animation-delay: 0.3s; }

        /* CONTAINER PADRÃO */
        .container { max-width: 1000px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1;}
        
        h1, h2, h3, h4 { font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 10px; }
        .text-center { text-align: center; }
        .text-highlight { color: var(--primary); text-shadow: 0 0 30px rgba(255, 202, 133, 0.3); }
        .text-success { color: var(--success); font-family: 'Space Grotesk', sans-serif; font-weight: 700; }

        /* HEADER */
        .header { position: fixed; top: 0; width: 100%; z-index: 50; padding: 14px 0; background: rgba(21, 20, 27, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-content { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-family: 'Space Grotesk', sans-serif; display: flex; align-items: center; gap: 8px; color: #fff; text-decoration: none; font-size: 1.1rem; letter-spacing: -0.03em; }
        .logo-img { height: 24px; width: auto; filter: drop-shadow(0 0 8px rgba(255, 202, 133, 0.5)); }

        /* BUTTONS */
        .btn-primary { display: inline-block; padding: 16px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; cursor: pointer; font-size: 1rem; text-align: center; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); background: var(--primary); color: #15141b; box-shadow: 0 0 20px rgba(255, 202, 133, 0.2); border: 1px solid var(--primary); width: 100%; position: relative; z-index: 10; }
        .btn-primary:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 0 50px rgba(255, 202, 133, 0.7); background: #e6b677; }
        .btn-header-glow { background: rgba(255, 202, 133, 0.08); color: var(--primary); border: 1px solid var(--primary); box-shadow: 0 0 15px rgba(255, 202, 133, 0.2); padding: 8px 18px; border-radius: 50px; font-size: 0.85rem; font-weight: 700; text-decoration: none; transition: 0.3s; position: relative; z-index: 10; }
        .btn-header-glow:hover { background: var(--primary); color: #15141b; box-shadow: 0 0 30px rgba(255, 202, 133, 0.6); }

        /* HERO */
        .hero { padding: 150px 0 60px; text-align: center; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 50px; background: rgba(255, 202, 133, 0.05); border: 1px solid rgba(255, 202, 133, 0.3); color: var(--primary); font-size: 0.8rem; font-weight: 700; margin-bottom: 24px; box-shadow: 0 0 20px rgba(255, 202, 133, 0.15); }
        .display-text { font-size: 2.8rem; margin-bottom: 20px; text-shadow: 0 10px 40px rgba(0,0,0,0.8); letter-spacing: -1px; line-height: 1.1; }
        .sub-headline { color: var(--text-body-glass); font-size: 1rem; margin-bottom: 15px; max-width: 550px; margin-left: auto; margin-right: auto; font-weight: 500; }
        .urgency-badge { display: inline-block; color: var(--alert); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 30px; border-bottom: 1px solid rgba(255,77,77,0.3); padding-bottom: 2px;}

        /* GLASS PANELS */
        .glass-panel { background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-top: 1px solid var(--glass-highlight); border-bottom: 1px solid rgba(0,0,0,0.5); border-radius: 24px; box-shadow: var(--glass-shadow); margin: 40px auto; padding: 40px; max-width: 800px; text-align: center; position: relative; overflow: hidden; transition: transform 0.3s ease; }
        
        /* LISTA DE DORES */
        .pain-list { text-align: left; margin-top: 25px; display: grid; gap: 10px; }
        .pain-item { display: flex; align-items: flex-start; gap: 10px; color: var(--text-muted); font-size: 0.95rem; }
        .pain-icon { color: var(--alert); }

        /* PROVA SOCIAL (STATS) */
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 30px; text-align: center; }
        .stat-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 15px; border-radius: 12px; }
        .stat-number { display: block; font-size: 1.6rem; line-height: 1; margin-bottom: 5px; }
        .stat-label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }

        /* AUTORIDADE */
        .authority-bar { max-width: 700px; margin: 40px auto; display: flex; align-items: flex-start; gap: 15px; background: rgba(255,255,255,0.03); padding: 20px 25px; border-radius: 12px; border-left: 3px solid var(--primary); }
        .authority-text { text-align: left; font-size: 0.95rem; color: var(--text-body-glass); line-height: 1.5; }
        .authority-text strong { color: #fff; }

        /* AURA GRID (COMO FUNCIONA) */
        .aura-grid { display: flex; flex-direction: column; gap: 16px; margin-top: 40px; text-align: left; }
        .step-card { display: flex; gap: 20px; padding: 24px; background: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); align-items: flex-start; transition: 0.3s; }
        .step-card:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1); transform: translateX(5px); }
        .step-letter { font-family: 'Space Grotesk', sans-serif; font-size: 2.5rem; font-weight: 700; color: var(--primary); line-height: 1; text-shadow: 0 0 20px rgba(255, 202, 133, 0.3); min-width: 45px; }
        .step-card p { color: var(--text-body-glass); font-size: 0.95rem; margin: 5px 0 0 0;}

        /* OFERTA */
        .offer-wrapper { margin: 60px auto; padding: 60px 30px; max-width: 550px; border: 1px solid var(--primary); box-shadow: 0 0 50px rgba(255, 202, 133, 0.15); background: linear-gradient(180deg, rgba(255,202,133,0.05) 0%, rgba(0,0,0,0) 100%); border-radius: 24px; position: relative; overflow: hidden; animation: fadeUp 1s ease-out; }
        .offer-wrapper::before { content:''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,202,133,0.08), transparent 50%); animation: pulseGlow 8s infinite; }
        .price-new { font-family: 'Space Grotesk', sans-serif; font-size: 3.8rem; font-weight: 700; color: #fff; line-height: 1; display: block; margin: 10px 0 20px; text-shadow: 0 0 15px rgba(255,202,133,0.2); }
        
        /* EFEITO 1: SHIMMER (VARREDURA) */
        .btn-super-offer { display: inline-block; padding: 22px 40px; border-radius: 14px; font-weight: 900; text-decoration: none; cursor: pointer; font-size: 1.3rem; text-align: center; background: var(--primary); color: #15141b; border: none; width: 100%; text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s, box-shadow 0.2s; position: relative; z-index: 10; margin-bottom: 15px; overflow: hidden; }
        .btn-super-offer:hover { transform: scale(1.02); background: #e6b677; box-shadow: 0 0 30px rgba(255, 202, 133, 0.4); }
        .btn-super-offer::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%); transform: skewX(-20deg); animation: shimmer 3s infinite; }
        @keyframes shimmer { 0% { left: -100%; } 20% { left: 200%; } 100% { left: 200%; } }

        /* FOOTER CORRIGIDO */
        .footer { padding: 60px 20px 80px; text-align: center; color: var(--text-muted); font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 100px; background: transparent; }

        .mobile-sticky { position: fixed; bottom: 20px; left: 20px; right: 20px; background: rgba(21, 20, 27, 0.9); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); padding: 12px 24px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.15); display: flex; justify-content: space-between; align-items: center; box-shadow: 0 15px 50px rgba(0,0,0,0.8); z-index: 999; animation: fadeUp 1s 1s backwards; }
        .sticky-btn { background: var(--primary); color: #15141b; padding: 10px 24px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 0.9rem; box-shadow: 0 0 15px rgba(255, 202, 133, 0.3); transition: 0.3s; position: relative; z-index: 10; }
        .sticky-btn:active { box-shadow: 0 0 40px rgba(255, 202, 133, 0.7); }

        @media (max-width: 768px) {
            .container { padding: 0 32px; }
            .display-text { font-size: 2.2rem; }
            .hero { padding-top: 130px; padding-bottom: 40px; }
            .glass-panel { padding: 32px 24px; margin: 30px auto; }
            .stats-grid { gap: 10px; }
            .stat-number { font-size: 1.4rem; }
            .delay-1, .delay-2, .delay-3 { animation-delay: 0s; }
        }
            /* CARROSSEL DE AUTORIDADE (DUOTONE) */
        .carousel-container { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 20px; scrollbar-width: none; }
        .carousel-container::-webkit-scrollbar { display: none; }
        .duotone-card { min-width: 280px; flex: 1; position: relative; border-radius: 16px; overflow: hidden; scroll-snap-align: start; cursor: pointer; aspect-ratio: 3/4; border: 1px solid rgba(255,255,255,0.05); }
        .duotone-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(1.2); transition: all 0.5s ease; }
        .duotone-overlay { position: absolute; inset: 0; background-color: var(--primary); mix-blend-mode: multiply; opacity: 0.8; transition: opacity 0.5s ease; }
       .duotone-content { 
            position: absolute; 
            bottom: 0; 
            left: 0; 
            width: 100%; 
            padding: 25px 20px; 
            background: linear-gradient(to top, rgba(15,14,19,0.95) 0%, transparent 100%); 
            z-index: 2; 
            transition: padding-bottom 0.3s ease;
        }
        
        .duotone-card:hover .duotone-img { filter: grayscale(0%) contrast(1); transform: scale(1.05); }
        .duotone-card:hover .duotone-overlay { opacity: 0; }
        .duotone-card:hover .duotone-content { padding-bottom: 35px; }

        /* FAQ VIP */
        .faq-item { border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02); padding: 20px 24px; border-radius: 16px; margin-bottom: 12px; text-align: left; transition: all 0.3s ease; }
        .faq-item:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,202,133,0.2); }
        details summary { cursor: pointer; font-weight: 700; list-style: none; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; color: #edecee; transition: color 0.3s; }
        details summary:hover { color: var(--primary); }
        details summary::-webkit-details-marker { display: none; }
        details summary::after { content: '+'; font-size: 1.5rem; color: var(--primary); font-weight: 300; }
        details[open] summary::after { content: '-'; }
        details p { margin-top: 15px; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; }
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
                  <img src="/candeeiro-amarelo-brilho.png" alt="Logo ChamaLabs" className="logo-img" />
                  <span className="logo-bold" style={{ marginLeft: "8px" }}>CHAMALABS</span>
              </Link>
              <Link href="/diagnostico" className="btn-header-glow">APLICAÇÃO</Link>
          </div>
      </header>

      <section className="hero container animate-enter">
          <div className="hero-badge">⚡ ANÁLISE ESTRATÉGICA</div>
          <h1 className="display-text">
              Transforme seu conteúdo em <br />
              <span className="text-highlight">vendas diárias</span>.
          </h1>
          
          <p className="sub-headline">
              Aprenda a criar vídeos que prendem a atenção, geram desejo e convertem seguidores em clientes para o seu negócio local.
          </p>
          
          <span className="urgency-badge">🔴 Vagas limitadas para acompanhamento individual</span>

          <div style={{ maxWidth: "350px", margin: "20px auto 0" }}>
              <Link href="/diagnostico" className="btn-primary">QUERO MEU DIAGNÓSTICO</Link>
          </div>
      </section>

      <div className="glass-panel animate-enter delay-1">
          <h2>😤 Posta, posta, posta... e nada?</h2>
          <p style={{ color: "var(--text-body-glass)", marginTop: "10px", fontSize: "1rem" }}>
              Seus vídeos continuam morrendo com alcance baixo, sem repercussão e sem trazer clientes. A culpa não é sua, é da falta de roteiro e estratégia.
          </p>
          
          <div className="pain-list">
              <div className="pain-item"><span className="pain-icon">❌</span> Nunca sabe o que falar no vídeo.</div>
              <div className="pain-item"><span className="pain-icon">❌</span> Grava 10 vezes e nunca fica bom.</div>
              <div className="pain-item"><span className="pain-icon">❌</span> Sente que o concorrente sempre aparece mais.</div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "25px", paddingTop: "20px" }}>
              <p style={{ fontSize: "0.9rem", marginBottom: "15px", color: "#fff" }}>Resultados reais da Imersão:</p>
              <div className="stats-grid">
                  <div className="stat-item">
                      <span className="stat-number text-success">15x</span>
                      <span className="stat-label">Mais Alcance</span>
                  </div>
                  <div className="stat-item">
                      <span className="stat-number text-success">+180%</span>
                      <span className="stat-label">Retenção</span>
                  </div>
                  <div className="stat-item">
                      <span className="stat-number text-success">ROI</span>
                      <span className="stat-label">Positivo</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="container animate-enter delay-2">
          <div className="authority-bar">
              <div style={{ fontSize: "2rem" }}>💡</div>
              <div className="authority-text">
                  <strong>Diferente de quem só ensina teoria:</strong> Eu venho do mercado real. Mais de 6 anos trabalhando com audiovisual para empresas e projetos que precisavam performar de verdade. O que mostro aqui não é "opinião", é campo de batalha.
              </div>
          </div>
      </div>

      {/* SEÇÃO COMO FUNCIONA (PASSO A PASSO) */}
      <section className="container animate-enter" style={{ marginTop: "80px", marginBottom: "40px" }}>
          <h2 className="text-center" style={{ marginBottom: "40px", fontSize: "2rem" }}>A Rota dos 45 Dias</h2>
          
          <div className="aura-grid" style={{ marginTop: "0" }}>
              <div className="step-card">
                  <div className="step-letter">1</div>
                  <div>
                      <h3 style={{ color: "white", fontSize: "1.2rem", marginBottom: "6px" }}>Raio-X e Estratégia</h3>
                      <p>Nossa primeira imersão. Analisamos seu negócio a fundo, entendemos suas margens e definimos a linha editorial exata de crescimento.</p>
                  </div>
              </div>
              <div className="step-card">
                  <div className="step-letter">2</div>
                  <div>
                      <h3 style={{ color: "white", fontSize: "1.2rem", marginBottom: "6px" }}>Blueprint e Gravação</h3>
                      <p>Entrega dos roteiros magnéticos e início das gravações orientadas, aplicando as regras de posicionamento High-End.</p>
                  </div>
              </div>
              <div className="step-card">
                  <div className="step-letter">3</div>
                  <div>
                      <h3 style={{ color: "white", fontSize: "1.2rem", marginBottom: "6px" }}>Treinamento da Equipe</h3>
                      <p>Sua equipe recebe acesso ao portal ChamaLabs para aprender a editar e masterizar os vídeos internamente, sem depender de agências.</p>
                  </div>
              </div>
              <div className="step-card">
                  <div className="step-letter">4</div>
                  <div>
                      <h3 style={{ color: "white", fontSize: "1.2rem", marginBottom: "6px" }}>Tráfego e Correção de Rota</h3>
                      <p>Nos últimos encontros, analisamos o desempenho dos vídeos e estruturamos as campanhas de Meta Ads para escalar suas vendas.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* SEÇÃO TANGIBILIDADE (O PRINT DO CHAMALABS) */}
      <section className="container animate-enter" style={{ marginBottom: "80px" }}>
          <div className="glass-panel" style={{ padding: "0", overflow: "hidden", border: "1px solid var(--primary)", boxShadow: "0 0 30px rgba(255, 202, 133, 0.1)" }}>
              <div style={{ padding: "40px 30px", textAlign: "left", background: "rgba(21, 20, 27, 0.8)" }}>
                  <div style={{ display: "inline-block", padding: "4px 12px", background: "rgba(255,202,133,0.1)", color: "var(--primary)", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "700", marginBottom: "15px" }}>TECNOLOGIA INCLUSA</div>
                  <h3 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>Portal ChamaLabs</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "600px" }}>
                      Você não está comprando apenas encontros, está levando uma plataforma corporativa. Sua equipe terá acesso a módulos práticos de edição no CapCut, fundamentos de gravação e roteirização rápida.
                  </p>
              </div>
              <div style={{ width: "100%", height: "auto", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <img 
                      src="/portal-chamalabs.png" 
                      alt="Interface do Portal ChamaLabs" 
                      style={{ width: "100%", display: "block", opacity: "0.95" }} 
                  />
              </div>
          </div>
      </section>

      {/* SEÇÃO DE AUTORIDADE (CARROSSEL DUOTONE E BIO) */}
      <section className="container animate-enter" style={{ marginBottom: "100px", marginTop: "40px" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Quem está nos bastidores</span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '10px' }}>O Arquiteto da Máquina</h2>
          </div>

          <div className="carousel-container">
              {/* Card 1 */}
              <div className="duotone-card">
                  <img src="/images/foto-ericles-1.jpg" alt="Audiovisual Premium" className="duotone-img" />
                  <div className="duotone-overlay"></div>
                  <div className="duotone-content">
                      <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "4px" }}>Audiovisual High-End</h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-body-glass)" }}>Mais de 6 anos traduzindo o valor de empresas físicas em imagens cinematográficas que geram desejo imediato.</p>
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
                  <img src="/images/foto-ericles-3.jpg" alt="Visão de Negócio" className="duotone-img" />
                  <div className="duotone-overlay"></div>
                  <div className="duotone-content">
                      <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "4px" }}>Visão de Dono</h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-body-glass)" }}>À frente da Chama Agência Digital. Sei que curtida não paga folha de pagamento. O foco é faturamento.</p>
                  </div>
              </div>
          </div>

          <div style={{ maxWidth: "750px", margin: "50px auto 0", textAlign: "center", padding: "0 20px" }}>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.7" }}>
                  Muito prazer, sou <strong style={{ color: "#fff" }}>Éricles Lima</strong>. Não sou um "guru de internet" tentando te vender fórmula mágica. Sou um estrategista de negócios locais. Cansei de ver empresários excelentes perdendo clientes para concorrentes medíocres só porque não sabem se posicionar no digital. Criei a <strong>Imersão Conteúdo High-End</strong> para instalar na sua empresa o mesmo sistema de captação visual que utilizo nos meus bastidores.
              </p>
          </div>
      </section>

      {/* SEÇÃO FAQ (QUEBRA DE OBJEÇÕES) */}
      <section className="container animate-enter" style={{ marginBottom: "80px" }}>
          <h2 className="text-center" style={{ marginBottom: "40px", fontSize: "2rem" }}>Perguntas Frequentes</h2>
          
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <div className="faq-item">
                  <details>
                      <summary>Meu nicho é muito específico, isso funciona pra mim?</summary>
                      <p>Sim. A Imersão Conteúdo High-End não é sobre "fazer dancinhas", é sobre fundamentos de atenção humana e conversão. Se o seu negócio resolve o problema de alguém na sua cidade, nós vamos construir a ponte visual para que esse cliente te encontre e compre de você.</p>
                  </details>
              </div>
              <div className="faq-item">
                  <details>
                      <summary>Qual a diferença entre isso e contratar uma agência tradicional?</summary>
                      <p>A agência tradicional te faz refém dela e foca em "postagens bonitinhas". Nós construímos a máquina de vendas <strong>dentro</strong> da sua empresa. Eu mapeio a estratégia nos encontros ao vivo e treino você (ou sua equipe) pelo Portal ChamaLabs para rodar tudo com total autonomia. Você vira o dono da sua própria aquisição.</p>
                  </details>
              </div>
              <div className="faq-item">
                  <details>
                      <summary>Preciso de uma equipe grande ou equipamentos caros?</summary>
                      <p>De forma alguma. No Portal ChamaLabs, nós ensinamos o seu funcionário (ou você) a captar, editar e subir campanhas usando apenas um celular atual e ferramentas acessíveis. O que importa é a estrutura narrativa e o enquadramento, não se o vídeo foi gravado com câmera de cinema.</p>
                  </details>
              </div>
          </div>
      </section>

      {/* NOVA SEÇÃO DE OFERTA VIP */}
      <section id="offer" className="container animate-enter" style={{ marginBottom: "100px" }}>
          <div style={{ background: "linear-gradient(145deg, rgba(255,202,133,0.05) 0%, rgba(20,19,26,0.8) 100%)", border: "1px solid rgba(255,202,133,0.2)", borderRadius: "24px", padding: "60px 40px", maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", overflow: "hidden" }}>
              
              <div style={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: "radial-gradient(circle, rgba(255,202,133,0.05) 0%, transparent 60%)", pointerEvents: "none" }}></div>

              <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>O Fim do Amadorismo</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '15px', marginBottom: '20px' }}>Imersão Conteúdo High-End</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                  Pare de terceirizar a alma da sua empresa. Um ecossistema de 45 dias para treinar você ou sua equipe a produzir vídeos cinematográficos pelo celular e atrair clientes de alto valor.
              </p>

              <div style={{ textAlign: "left", maxWidth: "550px", margin: "0 auto 40px", display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <CheckCircle2 color="var(--primary)" size={24} style={{ minWidth: "24px" }} />
                      <span style={{ fontSize: "1.05rem", color: "#edecee" }}><strong>4 Encontros de Diretoria:</strong> Estratégia, análise de métricas e correção de rota ao vivo.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <CheckCircle2 color="var(--primary)" size={24} style={{ minWidth: "24px" }} />
                      <span style={{ fontSize: "1.05rem", color: "#edecee" }}><strong>Portal ChamaLabs:</strong> Acesso à nossa plataforma com aulas práticas de gravação e edição.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <CheckCircle2 color="var(--primary)" size={24} style={{ minWidth: "24px" }} />
                      <span style={{ fontSize: "1.05rem", color: "#edecee" }}><strong>Autonomia Total:</strong> Sua equipe dominando a captação sem depender de agências lentas.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <CheckCircle2 color="var(--primary)" size={24} style={{ minWidth: "24px" }} />
                      <span style={{ fontSize: "1.05rem", color: "#edecee" }}><strong>Investimento:</strong> R$ 1.997 (Condição exclusiva para aprovados na aplicação).</span>
                  </div>
              </div>

              <Link href="/diagnostico" className="btn-super-offer" style={{ fontSize: "1.1rem", padding: "20px 40px", width: "100%", maxWidth: "400px", display: "inline-block" }}>
                  PREENCHER APLICAÇÃO
              </Link>
              <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Atenção: Preencher o formulário não garante sua vaga. Selecionamos apenas empresas com perfil de escala.
              </p>
          </div>
      </section>

      <footer className="footer">
          <p style={{ marginBottom: "10px" }}>&copy; 2026 Chama Inside.</p>
          <p style={{ opacity: 0.5, fontSize: "0.75rem" }}>Todos os direitos reservados.</p>
      </footer>

      <div className="mobile-sticky">
          <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "white" }}>Imersão High-End</span>
              <span style={{ color: "var(--primary)", fontSize: "0.85rem" }}>Vagas Abertas</span>
          </div>
          <Link href="/diagnostico" className="sticky-btn">APLICAR</Link>
      </div>
    </>
  );
}