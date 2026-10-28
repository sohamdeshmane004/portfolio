# Soham | AI & Machine Learning Engineering Portfolio

A high-tech, cyber-themed portfolio website tailored for landing competitive AI/ML and Software Engineering internships. Built with pure modern Vanilla HTML5, CSS3, and JavaScript—zero bloated dependencies, zero frameworks required, and blazingly fast.

---

## 🚀 Quick Start (Local Preview)

The local server is already running in your background on port `3000`:
- **Open your browser and visit:** [http://localhost:3000](http://localhost:3000)
- Alternatively, you can double-click [`index.html`](file:///Users/soham/antigravity%20my%20first%20portfolio/index.html) to open it directly in Chrome, Safari, Arc, or Brave.

---

## ⚡ Key Features

1. **Cyber / Terminal Aesthetics**:
   - Deep void background with an interactive **Neural Network Synaptic Particle Canvas** (responds to mouse movements).
   - Dynamic **Typing Tagline** cycling through AI specialties.
   - Live **System Status HUD** showcasing your affiliation with Newton School of Technology (NST), Pune.

2. **Interactive CLI Terminal (`Ctrl + K` or `⌘ + K`)**:
   - A fully functional cyber shell right inside the website.
   - Built-in commands: `help`, `whoami`, `skills`, `projects`, `education`, `contact`, `resume`, `clear`.
   - **Recruiter Easter Egg**: Typing `sudo hire` triggers an exclusive priority candidate unlocked screen!

3. **Live AI Inference Simulator (Playground)**:
   - Recruiters can type prompt inquiries and run browser-side simulated neural classification of intent, confidence scores, and compute latency.

4. **Curated Showcase Projects (Tailored for Cracking Internships)**:
   - **NeuroVision**: Real-time edge object tracker (YOLOv8 + TensorRT + PyTorch) with sub-22ms latency.
   - **DocuQuery**: Multimodal local RAG & vector retrieval engine (LangChain + ChromaDB + Llama 3).
   - **PulseGuard**: Real-time ECG biosignal arrhythmia anomaly detector (98.4% ROC-AUC).
   - Deep-dive **Architecture Spec Modals** for each project explaining the data pipeline, tradeoffs, and metrics.

5. **Integrated CV / Resume Modal & One-Click PDF Print**:
   - Full in-browser curriculum vitae viewer with clean printing stylesheet.

6. **Synthesized Cyber Audio FX Engine**:
   - Subtle high-tech audio beeps synthesized via the browser's native **Web Audio API** (toggleable via the bottom-left pill).

---

## 🛠️ How to Customize Your Details

All files are located in `/Users/soham/antigravity my first portfolio/`:
- **Your Personal Links & Contact**:
  - Open [`index.html`](file:///Users/soham/antigravity%20my%20first%20portfolio/index.html) and update:
    - Email: `soham.ai.intern@gmail.com`
    - LinkedIn: `linkedin.com/in/...`
    - GitHub: `github.com/...`
- **Projects & Highlights**:
  - You can modify the project descriptions, stats, and GitHub links directly in `index.html` and the `projectData` object in [`script.js`](file:///Users/soham/antigravity%20my%20first%20portfolio/script.js).
- **Profile Avatar**:
  - Replace [`assets/images/avatar.jpg`](file:///Users/soham/antigravity%20my%20first%20portfolio/assets/images/avatar.jpg) with your own portrait if desired.

---

## 🌐 Free Deployment (GitHub Pages)

To launch this live on the web for recruiters to view:
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of cyber AI/ML portfolio"
   ```
2. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository settings, go to **Pages** &rarr; select **Deploy from a branch** (`main` / root) &rarr; Save. Your portfolio will be live at `https://<your-username>.github.io/<your-repo-name>/`!
