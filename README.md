# 🌿 EcoPower Suite — Official Website & Release Portal

Official public repository for **EcoPower Suite** — the intelligent Windows desktop utility for hardware energy optimization, power-scheme management, DDC/CI monitor dimming, AI/bot workload protection and battery-life maximization.

🌐 **Website**: <https://bambadooma-star.github.io/ecopower-suite-app/>  
📦 **Latest release**: [v1.1.1](https://github.com/bambadooma-star/ecopower-suite-app/releases/tag/v1.1.1)  
🤖 **AI documentation**: [llms.txt](https://bambadooma-star.github.io/ecopower-suite-app/llms.txt)

---

## ⚡ Download
- **Executable**: [EcoPowerSuite.exe (v1.1.1)](https://github.com/bambadooma-star/ecopower-suite-app/releases/download/v1.1.1/EcoPowerSuite.exe)
- **Direct mirror**: [downloads/EcoPowerSuite.exe](https://bambadooma-star.github.io/ecopower-suite-app/downloads/EcoPowerSuite.exe)
- **Size**: 17.1 MB (single file, no installer)
- **Platform**: Windows 10 & 11 (64-bit, x86_64)
- **Release date**: 2026-11-11
- **SHA-256**: `5838F5E89D73B47A0D705E10193336CA0AA53E68A162B16B978EDFAFFB517C5D`

### 🔑 Verify the download (PowerShell)
```powershell
Get-FileHash .\EcoPowerSuite.exe -Algorithm SHA256
```
The output must match the SHA-256 above. You can also look the hash up on VirusTotal:
<https://www.virustotal.com/gui/file/5838F5E89D73B47A0D705E10193336CA0AA53E68A162B16B978EDFAFFB517C5D> (or upload the file at <https://www.virustotal.com/gui/home/upload>) and review the engines' verdicts yourself.

---

## ✨ What's new in v1.1.0
- Redesigned dashboard with sidebar navigation and a live power gauge.
- Smoother, faster UI — background commands no longer block the window.
- Non-blocking brightness control with correct DDC/CI range scaling.
- **Fixes**: brightness no longer reset to 100% on launch · electricity tariff setting now applies · true year-to-date savings · shutdown snooze really reschedules · CLI `--status` detects Eco correctly · laptop brightness via CLI works.
- Safer in-app updater (integrity checks) and an **opt-in** automatic update check (off by default).

---

## 🤖 AI & Bot Workload Support
1. **Smart AI Workload Shield** — detects local AI engines (**Ollama, LM Studio, ComfyUI, llama.cpp, Whisper**) and NVIDIA CUDA compute (>15% load); prevents idle sleep and CPU capping during active generation or rendering.
2. **Headless CLI with structured JSON output** for scripts and AI agents:
   ```bash
   EcoPowerSuite.exe --status --json                    # power, brightness, battery, shield status
   EcoPowerSuite.exe --mode <eco|balanced|perf> --json  # one-shot power mode
   EcoPowerSuite.exe --brightness <0-100> --json        # backlight (DDC/CI + WMI)
   EcoPowerSuite.exe --ai-shield --json                 # AI & bot workload detection
   EcoPowerSuite.exe --check-update --json              # check GitHub for a newer release
   ```

---

## 🛡️ Security & Privacy
- **Verify it yourself**: published SHA-256 checksum and a VirusTotal hash-lookup/upload link — don't take our word for it.
- **No telemetry, no accounts, no ads.** Power control runs through local Windows APIs. The only network activity is an **optional, user-initiated update check and download from GitHub** (`api.github.com` / `github.com` releases): when you click *Check for updates*, or if you opt in to the automatic check (off by default in v1.1.0).
- **Non-destructive**: no kernel drivers, no permanent system modifications. *Exit & Restore* returns the power plan to Balanced; remove the app by deleting the single file.
- **Windows SmartScreen**: for a new, unsigned free utility Windows may show *Unknown publisher*. Click **More info → Run anyway** after confirming the SHA-256 matches.

---

## ⚖️ Legal, Privacy & Accessibility
- **"AS-IS" warranty disclaimer & limitation of liability.** Energy, CO₂ and currency figures are simulated estimates.
- **Privacy**: no cookies, no trackers; local-first. EU GDPR, US CCPA/CPRA and the Israeli Privacy Protection Law (5741-1981) addressed.
- **Accessibility**: Israeli Standard IS 5568 (Level AA) and WCAG 2.1 AA targeted.
- Documents:
  - [Terms of Service & EULA](https://bambadooma-star.github.io/ecopower-suite-app/terms.html)
  - [Privacy Policy](https://bambadooma-star.github.io/ecopower-suite-app/privacy.html)
  - [הצהרת נגישות (Accessibility Statement)](https://bambadooma-star.github.io/ecopower-suite-app/accessibility.html)

---

## 🌐 About this site
Static site with no build step and no third-party scripts or fonts: `index.html`, `terms.html`, `privacy.html`, `accessibility.html`, shared `assets/site.css`, `assets/common.js`, `assets/index.js` and an SVG icon sprite. Dark-first with a light theme; English/Hebrew (RTL) on the home page.

## 📄 License
Free to use, proprietary closed-source software © 2026 Ziv Shabat. All rights reserved. Unauthorized copying, redistribution of modified binaries, decompilation or reverse engineering is prohibited. Supported by voluntary donations.
