<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Securify — Document Intelligence Platform</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --navy:#0d1b2a; --navy2:#112236; --navy3:#162d45;
  --blue:#1a6cf6; --blue-light:#4d8ef8;
  --gold:#c9a84c; --gold-light:#e8c76a;
  --white:#f0f4fa; --gray:#8a9bb0; --border:rgba(255,255,255,0.08);
  --green:#2ecc71; --red:#e74c3c;
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:var(--navy);color:var(--white);overflow-x:hidden;}

/* Noise */
body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:.4;}

/* Nav */
nav{display:flex;align-items:center;justify-content:space-between;padding:20px 60px;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;background:rgba(13,27,42,0.9);backdrop-filter:blur(20px);}
.nav-logo{display:flex;align-items:center;gap:10px;}
.nav-logo-mark{width:32px;height:32px;background:linear-gradient(135deg,var(--blue),var(--gold));border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:16px;color:#fff;}
.nav-logo-text{font-family:'DM Serif Display',serif;font-size:18px;}
.nav-logo-text span{color:var(--gold);}
.nav-links{display:flex;gap:32px;}
.nav-links a{color:var(--gray);text-decoration:none;font-size:14px;font-weight:500;transition:color 0.2s;}
.nav-links a:hover{color:var(--white);}
.nav-cta{display:flex;gap:10px;align-items:center;}
.btn-ghost{padding:9px 20px;border:1px solid var(--border);background:transparent;color:var(--white);border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;transition:all 0.2s;font-family:'DM Sans',sans-serif;}
.btn-ghost:hover{border-color:rgba(255,255,255,0.2);background:rgba(255,255,255,0.05);}
.btn-blue{padding:9px 20px;background:var(--blue);color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;transition:all 0.2s;font-family:'DM Sans',sans-serif;box-shadow:0 4px 16px rgba(26,108,246,0.3);}
.btn-blue:hover{background:var(--blue-light);transform:translateY(-1px);}

/* Hero */
.hero{padding:100px 60px 80px;text-align:center;position:relative;z-index:1;}
.hero-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;background:rgba(26,108,246,0.1);border:1px solid rgba(26,108,246,0.25);border-radius:20px;font-size:12px;font-weight:600;color:var(--blue-light);letter-spacing:0.5px;margin-bottom:28px;}
.hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--blue-light);}
.hero h1{font-family:'DM Serif Display',serif;font-size:62px;line-height:1.1;max-width:820px;margin:0 auto 20px;letter-spacing:-1px;}
.hero h1 em{font-style:italic;color:var(--gold);}
.hero p{font-size:18px;color:var(--gray);max-width:560px;margin:0 auto 36px;line-height:1.7;}
.hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.btn-hero{padding:15px 36px;background:linear-gradient(135deg,var(--blue),#0f55cc);color:#fff;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;box-shadow:0 8px 28px rgba(26,108,246,0.4);transition:all 0.2s;}
.btn-hero:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(26,108,246,0.5);}
.btn-hero-outline{padding:15px 36px;background:transparent;color:var(--white);border:1.5px solid var(--border);border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
.btn-hero-outline:hover{border-color:rgba(255,255,255,0.2);background:rgba(255,255,255,0.04);}

/* Stats */
.stats{display:flex;justify-content:center;gap:60px;padding:40px 60px;border-top:1px solid var(--border);border-bottom:1px solid var(--border);position:relative;z-index:1;}
.stat-item{text-align:center;}
.stat-num{font-family:'DM Serif Display',serif;font-size:36px;color:var(--white);}
.stat-num span{color:var(--gold);}
.stat-label{font-size:13px;color:var(--gray);margin-top:4px;}

/* Section */
section{padding:80px 60px;position:relative;z-index:1;}
.section-label{font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--blue-light);margin-bottom:12px;}
.section-title{font-family:'DM Serif Display',serif;font-size:40px;line-height:1.2;margin-bottom:16px;}
.section-sub{font-size:16px;color:var(--gray);max-width:500px;line-height:1.7;}

/* Features */
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:48px;}
.feat-card{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:14px;padding:28px;transition:all 0.3s;}
.feat-card:hover{border-color:rgba(26,108,246,0.3);background:rgba(26,108,246,0.04);transform:translateY(-3px);}
.feat-icon{font-size:32px;margin-bottom:16px;display:block;}
.feat-card h3{font-size:16px;font-weight:600;margin-bottom:8px;}
.feat-card p{font-size:13px;color:var(--gray);line-height:1.65;}

/* Use cases */
.use-cases{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:48px;}
.use-card{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:14px;padding:28px;display:flex;gap:16px;}
.use-icon{font-size:36px;flex-shrink:0;}
.use-card h3{font-size:15px;font-weight:600;margin-bottom:6px;}
.use-card p{font-size:13px;color:var(--gray);line-height:1.65;}

/* Pricing */
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:48px;}
.price-card{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:16px;padding:32px;transition:border-color 0.2s;}
.price-card.featured{background:rgba(26,108,246,0.07);border-color:rgba(26,108,246,0.35);}
.price-badge{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);background:rgba(201,168,76,0.1);padding:4px 10px;border-radius:4px;display:inline-block;margin-bottom:12px;}
.price-card h3{font-size:18px;font-weight:700;margin-bottom:6px;}
.price-card .price{font-family:'DM Serif Display',serif;font-size:38px;margin:16px 0 4px;}
.price-card .price span{font-size:16px;font-family:'DM Sans',sans-serif;color:var(--gray);}
.price-card .price-desc{font-size:13px;color:var(--gray);margin-bottom:24px;}
.price-features{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px;}
.price-features li{font-size:13px;display:flex;align-items:center;gap:8px;}
.price-features li::before{content:'✓';color:var(--green);font-weight:700;flex-shrink:0;}
.price-features li.no::before{content:'✕';color:var(--gray);}
.price-features li.no{color:var(--gray);}
.price-btn{width:100%;padding:13px;border-radius:9px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
.price-btn-blue{background:var(--blue);color:#fff;border:none;box-shadow:0 4px 16px rgba(26,108,246,0.3);}
.price-btn-blue:hover{background:var(--blue-light);}
.price-btn-outline{background:transparent;color:var(--white);border:1.5px solid var(--border);}
.price-btn-outline:hover{border-color:rgba(255,255,255,0.25);}

/* CTA Banner */
.cta-banner{background:linear-gradient(135deg,rgba(26,108,246,0.15),rgba(201,168,76,0.08));border:1px solid rgba(26,108,246,0.2);border-radius:20px;padding:60px;text-align:center;margin:0 60px 80px;}
.cta-banner h2{font-family:'DM Serif Display',serif;font-size:36px;margin-bottom:12px;}
.cta-banner p{font-size:16px;color:var(--gray);max-width:480px;margin:0 auto 28px;}

/* Footer */
footer{padding:40px 60px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1;}
footer p{font-size:13px;color:var(--gray);}
.footer-links{display:flex;gap:24px;}
.footer-links a{font-size:13px;color:var(--gray);text-decoration:none;transition:color 0.2s;}
.footer-links a:hover{color:var(--white);}

@media(max-width:768px){
  nav{padding:16px 20px;}
  .nav-links,.nav-cta{display:none;}
  .hero{padding:60px 20px 40px;}
  .hero h1{font-size:36px;}
  .stats{flex-wrap:wrap;gap:32px;padding:32px 20px;}
  section{padding:60px 20px;}
  .features-grid,.use-cases,.pricing-grid{grid-template-columns:1fr;}
  .cta-banner{margin:0 20px 60px;padding:40px 24px;}
  footer{padding:28px 20px;flex-direction:column;gap:16px;text-align:center;}
}
</style>
</head>
<body>

<nav>
  <div class="nav-logo">
    <div class="nav-logo-mark">SF</div>
    <div class="nav-logo-text">Securi<span>fy</span></div>
  </div>
  <div class="nav-links">
    <a href="#features">Features</a>
    <a href="#use-cases">Use Cases</a>
    <a href="#pricing">Pricing</a>
    <a href="#contact">Contact</a>
  </div>
  <div class="nav-cta">
    <a href="index.html" class="btn-ghost">Sign In</a>
    <a href="index.html" class="btn-blue">Get Started →</a>
  </div>
</nav>

<!-- Hero -->
<section class="hero">
  <div class="hero-badge"><div class="hero-badge-dot"></div> Trusted by 200+ organisations across Africa</div>
  <h1>Stop Document Fraud <em>Before</em> It Costs You</h1>
  <p>Securify uses advanced forensic analysis to instantly verify the authenticity of IDs, certificates, financial documents, and medical records.</p>
  <div class="hero-actions">
    <a href="index.html" class="btn-hero">🔍 Start Verifying Free</a>
    <a href="#features" class="btn-hero-outline">Learn How It Works →</a>
  </div>
</section>

<!-- Stats -->
<div class="stats">
  <div class="stat-item">
    <div class="stat-num">94<span>%</span></div>
    <div class="stat-label">Detection Accuracy</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">8<span>s</span></div>
    <div class="stat-label">Average Scan Time</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">4<span>+</span></div>
    <div class="stat-label">Document Categories</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">200<span>+</span></div>
    <div class="stat-label">Organisations Served</div>
  </div>
</div>

<!-- Features -->
<section id="features">
  <div class="section-label">What We Check</div>
  <div class="section-title">8-Point Forensic Analysis<br>on Every Document</div>
  <div class="section-sub">Every scan runs a comprehensive forensic inspection across eight critical integrity markers.</div>

  <div class="features-grid">
    <div class="feat-card">
      <span class="feat-icon">🔤</span>
      <h3>Font & Typography</h3>
      <p>Detects inconsistent fonts, character spacing anomalies, and mixed typefaces that indicate text insertion or replacement.</p>
    </div>
    <div class="feat-card">
      <span class="feat-icon">📐</span>
      <h3>Layout & Formatting</h3>
      <p>Analyses margins, alignment, and structural consistency against authentic document templates for the document type.</p>
    </div>
    <div class="feat-card">
      <span class="feat-icon">🛡️</span>
      <h3>Security Features</h3>
      <p>Verifies visible security elements — watermarks, official seals, holograms, and embossed stamps expected on the document.</p>
    </div>
    <div class="feat-card">
      <span class="feat-icon">📝</span>
      <h3>Content Coherence</h3>
      <p>Checks whether extracted text makes logical sense, dates are valid, and names/numbers are internally consistent.</p>
    </div>
    <div class="feat-card">
      <span class="feat-icon">🏛️</span>
      <h3>Issuer Legitimacy</h3>
      <p>Evaluates whether the issuing authority, logo, and contact information appear genuine and structurally correct.</p>
    </div>
    <div class="feat-card">
      <span class="feat-icon">🖼️</span>
      <h3>Image Integrity</h3>
      <p>Detects digital manipulation, cloning, photo splicing, and pixel-level anomalies in photos and graphics within the document.</p>
    </div>
  </div>
</section>

<!-- Use cases -->
<section id="use-cases" style="background:rgba(255,255,255,0.01);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
  <div class="section-label">Who Uses Securify</div>
  <div class="section-title">Built for Every Organisation<br>That Handles Documents</div>

  <div class="use-cases">
    <div class="use-card">
      <div class="use-icon">🎓</div>
      <div>
        <h3>Schools & Universities</h3>
        <p>Screen incoming student certificates, transcripts, and diplomas to prevent academic credential fraud at admissions.</p>
      </div>
    </div>
    <div class="use-card">
      <div class="use-icon">🏢</div>
      <div>
        <h3>HR & Recruitment</h3>
        <p>Verify employee CVs, academic qualifications, and professional certificates before making hiring decisions.</p>
      </div>
    </div>
    <div class="use-card">
      <div class="use-icon">🏦</div>
      <div>
        <h3>Banks & Microfinance</h3>
        <p>Validate customer IDs, bank statements, and financial documents submitted for loan or account applications.</p>
      </div>
    </div>
    <div class="use-card">
      <div class="use-icon">🏥</div>
      <div>
        <h3>Hospitals & Clinics</h3>
        <p>Confirm the authenticity of medical records, insurance documents, and patient identification presented at intake.</p>
      </div>
    </div>
    <div class="use-card">
      <div class="use-icon">⚖️</div>
      <div>
        <h3>Legal & Notary</h3>
        <p>Support legal professionals in flagging potentially fraudulent documents submitted as evidence or for notarisation.</p>
      </div>
    </div>
    <div class="use-card">
      <div class="use-icon">🏛️</div>
      <div>
        <h3>Government & NGOs</h3>
        <p>Screen beneficiary documents, verify civil records, and protect public services from identity and credential fraud.</p>
      </div>
    </div>
  </div>
</section>

<!-- Pricing -->
<section id="pricing">
  <div class="section-label">Pricing Plans</div>
  <div class="section-title">Simple, Transparent Pricing</div>
  <div class="section-sub">No hidden fees. Pay monthly, cancel anytime. All plans include full forensic reports.</div>

  <div class="pricing-grid">
    <div class="price-card">
      <h3>Starter</h3>
      <p style="font-size:13px;color:var(--gray);margin-top:4px;">For small teams & trials</p>
      <div class="price">Free</div>
      <div class="price-desc">Up to 10 scans / month</div>
      <ul class="price-features">
        <li>10 document scans/month</li>
        <li>4 document types</li>
        <li>8-point forensic check</li>
        <li>PDF report export</li>
        <li class="no">Scan history</li>
        <li class="no">Priority support</li>
      </ul>
      <button class="price-btn price-btn-outline" onclick="window.location='index.html'">Get Started Free</button>
    </div>

    <div class="price-card featured">
      <div class="price-badge">Most Popular</div>
      <h3>Professional</h3>
      <p style="font-size:13px;color:var(--gray);margin-top:4px;">For active organisations</p>
      <div class="price">25,000 <span>XAF/mo</span></div>
      <div class="price-desc">Up to 100 scans / month</div>
      <ul class="price-features">
        <li>100 document scans/month</li>
        <li>4 document types</li>
        <li>8-point forensic check</li>
        <li>PDF report export</li>
        <li>Full scan history</li>
        <li>Custom organisation branding</li>
        <li class="no">API access</li>
      </ul>
      <button class="price-btn price-btn-blue" onclick="window.location='index.html'">Start Free Trial</button>
    </div>

    <div class="price-card">
      <h3>Enterprise</h3>
      <p style="font-size:13px;color:var(--gray);margin-top:4px;">For high-volume & government</p>
      <div class="price">Custom</div>
      <div class="price-desc">Unlimited scans</div>
      <ul class="price-features">
        <li>Unlimited document scans</li>
        <li>All document types</li>
        <li>8-point forensic check</li>
        <li>Branded PDF reports</li>
        <li>Full scan history</li>
        <li>API integration</li>
        <li>Dedicated support</li>
      </ul>
      <button class="price-btn price-btn-outline" onclick="window.location='#contact'">Contact Sales</button>
    </div>
  </div>
</section>

<!-- CTA Banner -->
<div class="cta-banner" id="contact">
  <h2>Ready to Eliminate Document Fraud?</h2>
  <p>Join hundreds of organisations already protecting themselves with Securify. Set up takes less than 2 minutes.</p>
  <a href="index.html" class="btn-hero">🔍 Start Verifying Free</a>
</div>

<!-- Footer -->
<footer>
  <div style="display:flex;align-items:center;gap:10px;">
    <div class="nav-logo-mark" style="width:28px;height:28px;font-size:14px;">SF</div>
    <p>© 2025 Securify. All rights reserved.</p>
  </div>
  <div class="footer-links">
    <a href="#">Privacy Policy</a>
    <a href="#">Terms of Service</a>
    <a href="#">Support</a>
    <a href="index.html">Launch App →</a>
  </div>
</footer>

</body>
</html>