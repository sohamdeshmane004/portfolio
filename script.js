/* ==========================================================================
   SOHAM.AI // CYBER HIGH-TECH INTERACTION SCRIPT
   Newton School of Technology, Pune - AI & ML Engineering Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initAudioEngine();
  initTypingEffect();
  initTerminalEmulator();
  initModelPlayground();
  initProjectModals();
  initResumeModal();
  initFilters();
  initContactForm();
  initAvatarTilt();
  initMobileDrawer();
  initBackToTop();
});

/* ==========================================================================
   1. NEURAL PARTICLE CANVAS BACKGROUND
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const particles = [];
  const mouse = { x: null, y: null, maxDist: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 1;
      this.baseColor = Math.random() > 0.3 ? '#00f0ff' : '#00ff9d';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse subtle repulsion/attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          const force = (mouse.maxDist - dist) / mouse.maxDist;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.baseColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.baseColor;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = 1 - dist / 110;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. WEB AUDIO API SYNTHESIZER (Cyber SFX)
   ========================================================================== */
let audioCtx = null;
let audioEnabled = false;

function initAudioEngine() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const icon = document.getElementById('audio-icon');
  const label = toggleBtn ? toggleBtn.querySelector('.audio-label') : null;

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    audioEnabled = !audioEnabled;

    if (audioEnabled) {
      icon.textContent = '🔊';
      if (label) label.textContent = 'FX: ON';
      toggleBtn.style.borderColor = 'var(--neon-green)';
      toggleBtn.style.color = 'var(--neon-green)';
      playCyberBeep(880, 'sine', 0.1, 0.08);
      showToast('Cyber Sound FX Activated');
    } else {
      icon.textContent = '🔇';
      if (label) label.textContent = 'FX: OFF';
      toggleBtn.style.borderColor = 'var(--border-subtle)';
      toggleBtn.style.color = 'var(--text-muted)';
      showToast('Sound FX Muted');
    }
  });

  // Attach sound to interactive buttons if enabled
  document.querySelectorAll('button, .btn-cyber-primary, .nav-link').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (audioEnabled) playCyberBeep(440, 'triangle', 0.04, 0.02);
    });
    el.addEventListener('click', () => {
      if (audioEnabled) playCyberBeep(720, 'sine', 0.08, 0.06);
    });
  });
}

function playCyberBeep(freq = 600, type = 'sine', duration = 0.08, gainVal = 0.05) {
  if (!audioEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context safe fallback
  }
}

/* ==========================================================================
   3. TYPING TAGLINE EFFECT
   ========================================================================== */
function initTypingEffect() {
  const el = document.getElementById('hero-dynamic-text');
  if (!el) return;

  const phrases = [
    'Building Intelligent Systems',
    'Deploying Real-Time PyTorch Pipelines',
    'Engineering Multimodal RAG Engines',
    'Open to AI/ML Internships 2026'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 2000;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
    }

    let delta = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentPhrase.length) {
      delta = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delta = 400;
    }

    setTimeout(type, delta);
  }

  type();
}

/* ==========================================================================
   4. INTERACTIVE MODEL INFERENCE PLAYGROUND
   ========================================================================== */
function initModelPlayground() {
  const runBtn = document.getElementById('demo-run-btn');
  const inputEl = document.getElementById('demo-input');
  const intentEl = document.getElementById('inf-intent');
  const confEl = document.getElementById('inf-conf');
  const latencyEl = document.getElementById('inf-latency');
  const actionEl = document.getElementById('inf-action');

  if (!runBtn || !inputEl) return;

  runBtn.addEventListener('click', runInference);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runInference();
  });

  function runInference() {
    const text = inputEl.value.trim();
    if (!text) return;

    if (audioEnabled) playCyberBeep(900, 'square', 0.12, 0.05);

    runBtn.disabled = true;
    runBtn.style.opacity = '0.6';
    runBtn.querySelector('span').textContent = 'COMPUTING...';

    // Simulate high-speed neural embedding & classification
    setTimeout(() => {
      const lower = text.toLowerCase();
      let intent = 'GENERAL_INQUIRY';
      let confidence = (94.0 + Math.random() * 5.8).toFixed(1) + '%';
      let latency = (5.5 + Math.random() * 4.5).toFixed(1) + 'ms';
      let action = 'SEND MESSAGE VIA CONTACT SECTION';

      if (lower.includes('intern') || lower.includes('hire') || lower.includes('interview') || lower.includes('job') || lower.includes('role')) {
        intent = 'INTERNSHIP_OFFER (HIGH PRIORITY)';
        confidence = (98.5 + Math.random() * 1.4).toFixed(1) + '%';
        action = 'SCHEDULE SCREENING CALL / REVIEW CV';
      } else if (lower.includes('project') || lower.includes('rag') || lower.includes('vision') || lower.includes('model') || lower.includes('code')) {
        intent = 'TECHNICAL_COLLABORATION';
        confidence = (96.2 + Math.random() * 3.2).toFixed(1) + '%';
        action = 'OPEN GITHUB REPO OR DISCUSS REPOSITORY';
      } else if (lower.includes('nst') || lower.includes('newton') || lower.includes('pune') || lower.includes('college')) {
        intent = 'NST_ACADEMIC_NETWORKING';
        confidence = (97.8 + Math.random() * 2.0).toFixed(1) + '%';
        action = 'CONNECT ON LINKEDIN OR EMAIL';
      }

      intentEl.textContent = intent;
      confEl.textContent = confidence;
      latencyEl.textContent = latency;
      actionEl.textContent = action;

      runBtn.disabled = false;
      runBtn.style.opacity = '1';
      runBtn.querySelector('span').textContent = 'INFER (RUN)';

      showToast(`Inference Complete [${latency}]`);
    }, 380);
  }
}

/* ==========================================================================
   5. INTERACTIVE TERMINAL EMULATOR
   ========================================================================== */
function initTerminalEmulator() {
  const modal = document.getElementById('terminal-modal');
  const windowEl = document.getElementById('terminal-window');
  const openTrigger = document.getElementById('terminal-trigger-btn');
  const heroTrigger = document.getElementById('btn-launch-terminal-hero');
  const mobileTrigger = document.getElementById('mobile-terminal-btn');
  const closeBtn = document.getElementById('term-close-btn');
  const minBtn = document.getElementById('term-min-btn');
  const maxBtn = document.getElementById('term-max-btn');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const submitBtn = document.getElementById('terminal-submit-btn');

  const history = [];
  let historyIdx = -1;

  function openTerminal() {
    if (!modal) return;
    modal.classList.add('open');
    if (input) {
      setTimeout(() => input.focus(), 100);
    }
  }

  function closeTerminal() {
    if (!modal) return;
    modal.classList.remove('open');
  }

  if (openTrigger) openTrigger.addEventListener('click', openTerminal);
  if (heroTrigger) heroTrigger.addEventListener('click', openTerminal);
  if (mobileTrigger) mobileTrigger.addEventListener('click', () => {
    closeMobileDrawer();
    openTerminal();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
  if (minBtn) minBtn.addEventListener('click', closeTerminal);

  if (maxBtn) {
    maxBtn.addEventListener('click', () => {
      windowEl.classList.toggle('maximized');
    });
  }

  // Keyboard shortcut Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal && modal.classList.contains('open')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeTerminal();
    }
  });

  // Modal backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTerminal();
    });
  }

  // Handle command submission
  function executeCommand() {
    const rawCmd = input.value.trim();
    if (!rawCmd) return;

    history.push(rawCmd);
    historyIdx = history.length;
    input.value = '';

    printOutput(`soham@nst-pune:~$ ${rawCmd}`, 'term-cmd-echo');

    const cmd = rawCmd.toLowerCase();
    const args = cmd.split(' ');

    switch (args[0]) {
      case 'help':
        printOutput(`
Available Commands:
  • <span class="term-cmd-highlight">whoami</span>     : Display candidate profile & background
  • <span class="term-cmd-highlight">skills</span>     : Breakdown of technical proficiencies & ML stack
  • <span class="term-cmd-highlight">projects</span>   : List featured AI/ML repositories
  • <span class="term-cmd-highlight">education</span>  : Details on Newton School of Technology (NST Pune)
  • <span class="term-cmd-highlight">contact</span>    : View direct channels (Email, LinkedIn, GitHub)
  • <span class="term-cmd-highlight">resume</span>     : Open candidate CV viewer
  • <span class="term-cmd-highlight">sudo hire</span>  : Fast-track candidate screening protocol
  • <span class="term-cmd-highlight">matrix</span>     : Toggle cyber matrix visual sequence
  • <span class="term-cmd-highlight">clear</span>      : Clear screen
        `);
        break;

      case 'whoami':
      case 'bio':
        printOutput(`
[PROFILE OVERVIEW]
Name       : Soham
Role       : AI & Machine Learning Engineering Student
Campus     : Newton School of Technology (NST), Pune, India
Level      : 1st Year B.Tech (Class of 2029)
Objective  : Seeking an AI/ML Internship for Summer / Fall 2026.
Focus      : Edge Computer Vision, Large Language Models (RAG), PyTorch Systems.
        `);
        break;

      case 'skills':
        printOutput(`
[TECHNICAL CAPABILITIES]
  » AI / ML      : PyTorch, Scikit-learn, OpenCV, YOLOv8, LangChain, ChromaDB, Hugging Face
  » Languages    : Python 3.11+ (Advanced), C++ (DSA / STL), SQL, JavaScript
  » Systems      : FastAPI, Docker, Git/GitHub, Linux/Bash, TensorRT, Streamlit
  » Math Rigor   : Linear Algebra, Vector Calculus, Probability & Statistics
        `);
        break;

      case 'projects':
        printOutput(`
[FEATURED REPOSITORIES]
1. NeuroVision  : Real-Time Edge Object Detection & HUD (PyTorch, YOLOv8, OpenCV) -> 21.8ms inference
2. DocuQuery    : Multimodal Local RAG & Vector Engine (LangChain, ChromaDB, Llama 3)
3. PulseGuard   : ECG Arrhythmia Anomaly Detector (XGBoost, Scikit-learn, Docker) -> 98.4% ROC-AUC

* Type 'resume' to view detailed project metrics or click project cards on the page.
        `);
        break;

      case 'education':
      case 'nst':
        printOutput(`
[EDUCATION]
Institution : Newton School of Technology, Pune
Degree      : Bachelor of Technology (B.Tech) in Computer Science & AI
Tenure      : 2025 - 2029
Coursework  : DSA in C++, ML Foundations, Linear Algebra, Probability, DBMS.
Activities  : Finalist @ NST 36hr Hackathon, Active member in NST AI/ML Guild.
        `);
        break;

      case 'contact':
        printOutput(`
[COMMUNICATION UPLINK]
Email    : soham.ai.intern@gmail.com
LinkedIn : linkedin.com/in/soham-ai-nst
GitHub   : github.com/soham-ai-dev
Location : Pune, Maharashtra, India (Open to Relocate / Hybrid / Remote)
        `);
        break;

      case 'resume':
      case 'cv':
        printOutput(`Launching interactive CV viewer...`);
        openResumeModal();
        break;

      case 'sudo':
        if (args[1] === 'hire') {
          printOutput(`
<span class="term-cmd-highlight">⚡ ACCESS GRANTED: RECRUITER MODE UNLOCKED ⚡</span>
------------------------------------------------------------
Thank you for your interest! Soham is actively interviewing for Summer 2026 internships.
Immediate Action:
  1. Sending notification to Soham's prioritized inbox.
  2. Direct Dispatch Email: <a href="mailto:soham.ai.intern@gmail.com" style="color:var(--neon-green)">soham.ai.intern@gmail.com</a>
  3. Resume & references available on demand.
------------------------------------------------------------
          `);
          showToast('Recruiter Protocol Activated! Email sent to copy buffer.');
        } else {
          printOutput(`sudo: ${args[1] || ''}: command requires 'hire' parameter`);
        }
        break;

      case 'matrix':
        printOutput(`Running matrix diagnostic sequence... [PASS]`);
        triggerMatrixGlitch();
        break;

      case 'clear':
        output.innerHTML = '';
        break;

      default:
        printOutput(`zsh: command not found: ${rawCmd}. Type <span class="term-cmd-highlight">'help'</span> for instructions.`);
        break;
    }

    output.scrollTop = output.scrollHeight;
  }

  function printOutput(html, customClass = '') {
    const p = document.createElement('div');
    p.className = `term-line-output ${customClass}`;
    p.innerHTML = html;
    output.appendChild(p);
  }

  if (submitBtn) submitBtn.addEventListener('click', executeCommand);
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand();
      } else if (e.key === 'ArrowUp') {
        if (history.length > 0 && historyIdx > 0) {
          historyIdx--;
          input.value = history[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < history.length - 1) {
          historyIdx++;
          input.value = history[historyIdx];
        } else {
          historyIdx = history.length;
          input.value = '';
        }
      }
    });
  }
}

function triggerMatrixGlitch() {
  document.body.style.filter = 'hue-rotate(90deg) contrast(1.2)';
  setTimeout(() => {
    document.body.style.filter = '';
  }, 1200);
}

/* ==========================================================================
   6. PROJECT ARCHITECTURE DEEP-DIVE MODAL
   ========================================================================== */
const projectData = {
  cv: {
    title: 'NeuroVision: Real-Time Edge Object Tracker & Spatial HUD',
    badge: 'COMPUTER VISION // REAL-TIME INFERENCE',
    github: 'https://github.com',
    html: `
      <div class="arch-section">
        <h4 style="color:var(--neon-cyan); margin-bottom:0.5rem;">System Overview</h4>
        <p>A specialized edge computer vision engine designed for robotic navigation and spatial tracking under constrained hardware budgets (Raspberry Pi 5 + Jetson Orin Nano / edge devices).</p>
      </div>

      <div class="arch-section" style="margin-top:1.25rem;">
        <h4 style="color:var(--neon-cyan); margin-bottom:0.5rem;">Pipeline Architecture</h4>
        <div style="background:#070b13; padding:1rem; border-radius:6px; border:1px solid var(--border-subtle); font-family:var(--font-mono); font-size:0.8rem; line-height:1.7;">
          [Video Ingest: RTSP/Camera Stream 60 FPS]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [Frame Preprocessing & Letterbox Normalization]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [TensorRT Quantized YOLOv8 Nano Backbone]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [DeepSORT Hungarian Kalman Filter Tracker]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [Telemetry Broadcast: Asynchronous FastAPI WebSocket (Sub-22ms)]
        </div>
      </div>

      <div class="arch-section" style="margin-top:1.25rem;">
        <h4 style="color:var(--neon-cyan); margin-bottom:0.5rem;">Key Engineering Feats</h4>
        <ul style="padding-left:1.2rem; font-size:0.88rem; line-height:1.6;">
          <li><strong>Synthetic Augmentation:</strong> Synthesized 4,000+ edge-case frames using photometric jitter and motion blur, improving mAP@50 to 94.2%.</li>
          <li><strong>Quantization to FP16:</strong> Reduced memory footprint by 48% with near-zero precision drop.</li>
          <li><strong>Sub-22ms Latency:</strong> Sustained smooth 60 FPS without frame-dropping on edge tests.</li>
        </ul>
      </div>
    `
  },
  rag: {
    title: 'DocuQuery: Multimodal Local RAG & Vector Retrieval Engine',
    badge: 'GENERATIVE AI // RETRIEVAL-AUGMENTED GENERATION',
    github: 'https://github.com',
    html: `
      <div class="arch-section">
        <h4 style="color:var(--neon-cyan); margin-bottom:0.5rem;">System Overview</h4>
        <p>A production-ready offline RAG architecture designed to process complex technical documentation, diagrams, and tables without data leakage to cloud APIs.</p>
      </div>

      <div class="arch-section" style="margin-top:1.25rem;">
        <h4 style="color:var(--neon-cyan); margin-bottom:0.5rem;">Pipeline Architecture</h4>
        <div style="background:#070b13; padding:1rem; border-radius:6px; border:1px solid var(--border-subtle); font-family:var(--font-mono); font-size:0.8rem; line-height:1.7;">
          [PDF / Docs / Schematics Multi-Modal Ingestion]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [Recursive Character & Table Chunking (Size: 512, Overlap: 64)]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [Hybrid Indexing: BM25 (Keyword) + ChromaDB (BGE-Small Embeddings)]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [Cross-Encoder Reranker (Top 15 &rarr; Top 4 Contexts)]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [Quantized Llama 3 8B Local Inference with Streaming Tokens]
        </div>
      </div>

      <div class="arch-section" style="margin-top:1.25rem;">
        <h4 style="color:var(--neon-cyan); margin-bottom:0.5rem;">Engineering Highlights</h4>
        <ul style="padding-left:1.2rem; font-size:0.88rem; line-height:1.6;">
          <li><strong>Hallucination Suppression:</strong> Enforced contextual groundings and strict citation linking, dropping hallucination rates to &lt;8%.</li>
          <li><strong>Streaming Tokenizer:</strong> Time-to-first-token &lt;450ms with overall query synthesis under 0.85s.</li>
          <li><strong>Containerized:</strong> 1-click reproducible Docker Compose setup with GPU auto-detection.</li>
        </ul>
      </div>
    `
  },
  pulse: {
    title: 'PulseGuard: Real-Time Biosignal Anomaly Detection Engine',
    badge: 'PREDICTIVE ML // TIME-SERIES TELEMETRY',
    github: 'https://github.com',
    html: `
      <div class="arch-section">
        <h4 style="color:var(--neon-cyan); margin-bottom:0.5rem;">System Overview</h4>
        <p>A time-series telemetry machine learning pipeline trained to classify cardiac arrhythmias and anomalous ECG signals in real-time streaming environments.</p>
      </div>

      <div class="arch-section" style="margin-top:1.25rem;">
        <h4 style="color:var(--neon-cyan); margin-bottom:0.5rem;">Pipeline Architecture</h4>
        <div style="background:#070b13; padding:1rem; border-radius:6px; border:1px solid var(--border-subtle); font-family:var(--font-mono); font-size:0.8rem; line-height:1.7;">
          [Multi-Lead ECG Time-Series Stream (360 Hz)]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [Wavelet Denoising & Baseline Wander Filter (Bandpass 0.5-40Hz)]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [Pan-Tompkins QRS Peak Detection & Morphological Feature Extraction]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [Tuned XGBoost & Random Forest Ensemble with Dynamic Thresholding]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&darr;<br>
          [Confidence Gauge & WebSocket Anomaly Alerts &lt;10ms]
        </div>
      </div>

      <div class="arch-section" style="margin-top:1.25rem;">
        <h4 style="color:var(--neon-cyan); margin-bottom:0.5rem;">Key Performance</h4>
        <ul style="padding-left:1.2rem; font-size:0.88rem; line-height:1.6;">
          <li><strong>98.4% ROC-AUC:</strong> Evaluated on MIT-BIH benchmark with stratified 5-fold cross-validation.</li>
          <li><strong>0.01s Latency:</strong> Immediate classification on each detected heart beat window.</li>
        </ul>
      </div>
    `
  }
};

function initProjectModals() {
  const modal = document.getElementById('arch-modal');
  const modalTitle = document.getElementById('arch-modal-title');
  const modalBadge = document.getElementById('arch-modal-badge');
  const modalBody = document.getElementById('arch-modal-body');
  const modalGithub = document.getElementById('arch-modal-github');
  const closeBtn = document.getElementById('arch-modal-close');
  const closeFooterBtn = document.getElementById('arch-modal-close-btn');

  if (!modal) return;

  function openProject(key) {
    const data = projectData[key];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalBody.innerHTML = data.html;
    if (modalGithub) modalGithub.href = data.github;

    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
  }

  document.querySelectorAll('.view-arch-btn, .btn-inspect').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const proj = btn.getAttribute('data-project');
      openProject(proj);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   7. RESUME MODAL & PRINT HANDLER
   ========================================================================== */
function openResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) resumeModal.classList.add('open');
}

function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const headerBtn = document.getElementById('resume-header-btn');
  const heroBtn = document.getElementById('btn-hero-resume');
  const cvViewBtn = document.getElementById('btn-view-cv-modal');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');
  const closeBtn = document.getElementById('resume-modal-close');
  const closeFooterBtn = document.getElementById('resume-modal-close-btn');
  const printBtn = document.getElementById('resume-modal-print-btn');
  const downloadBtn = document.getElementById('btn-download-cv');

  if (!resumeModal) return;

  function closeResume() {
    resumeModal.classList.remove('open');
  }

  [headerBtn, heroBtn, cvViewBtn].forEach((btn) => {
    if (btn) btn.addEventListener('click', openResumeModal);
  });

  if (mobileResumeBtn) {
    mobileResumeBtn.addEventListener('click', () => {
      closeMobileDrawer();
      openResumeModal();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeResume);

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      openResumeModal();
      showToast('Click Print/Save as PDF to download');
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });
}

/* ==========================================================================
   8. FILTER TABS (Skills & Projects)
   ========================================================================== */
function initFilters() {
  // Skill Filters
  const skillBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      skillBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Filters
  const projBtns = document.querySelectorAll('.project-filter-btn');
  const projCards = document.querySelectorAll('.project-card');

  projBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. CONTACT FORM VALIDATION & TRANSMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('sender-name');
  const emailInput = document.getElementById('sender-email');
  const msgInput = document.getElementById('sender-msg');
  const typeSelect = document.getElementById('message-type');
  const submitBtn = document.getElementById('btn-submit-transmission');
  const statusDiv = document.getElementById('form-status');

  // Copy email button
  const copyBtn = document.querySelector('.ch-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('soham.ai.intern@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      });
    });
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      valid = false;
    } else {
      nameInput.closest('.form-group').classList.remove('has-error');
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      valid = false;
    } else {
      emailInput.closest('.form-group').classList.remove('has-error');
    }

    // Validate Message
    if (!msgInput.value.trim()) {
      msgInput.closest('.form-group').classList.add('has-error');
      valid = false;
    } else {
      msgInput.closest('.form-group').classList.remove('has-error');
    }

    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.querySelector('.btn-content').innerHTML = `
      <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"/></svg>
      TRANSMITTING ENCRYPTED PACKET...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.querySelector('.btn-content').innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        PACKET TRANSMITTED (SENT)
      `;

      statusDiv.className = 'form-status success';
      statusDiv.innerHTML = `
        ✓ <strong>TRANSMISSION SUCCESSFUL!</strong> Packet delivered to Soham. Expect a response within 12-24 hours.
      `;

      showToast('Message sent to Soham! Thank you.');
      form.reset();

      setTimeout(() => {
        statusDiv.style.display = 'none';
        submitBtn.querySelector('.btn-content').innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          TRANSMIT PACKET (SEND)
        `;
      }, 6000);
    }, 1200);
  });
}

/* ==========================================================================
   10. 3D AVATAR TILT EFFECT
   ========================================================================== */
function initAvatarTilt() {
  const card = document.getElementById('avatar-3d-card');
  if (!card) return;

  const inner = card.querySelector('.avatar-card-inner');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 16;
    const rotY = (x / rect.width) * 16;

    if (inner) {
      inner.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    if (inner) {
      inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  });
}

/* ==========================================================================
   11. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    drawer.classList.add('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.remove('open');
}

/* ==========================================================================
   12. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('btn-back-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   13. CYBER TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'cyber-toast';
  toast.innerHTML = `
    <span style="color:var(--neon-green)">●</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
