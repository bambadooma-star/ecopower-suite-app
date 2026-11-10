# 🌿 EcoPower Suite — Official Website & Release Portal

Welcome to the official public repository for **EcoPower Suite** — the intelligent Windows desktop utility for hardware energy optimization, power scheme management, DDC/CI monitor dimming, AI/bot workload protection, and battery life maximization.

🌐 **Live Marketing Website**: [https://bambadooma-star.github.io/ecopower-suite-app/](https://bambadooma-star.github.io/ecopower-suite-app/)  
📦 **GitHub Release**: [v1.0.0 Release](https://github.com/bambadooma-star/ecopower-suite-app/releases/tag/v1.0.0)  
🤖 **AI Documentation**: [llms.txt](https://bambadooma-star.github.io/ecopower-suite-app/llms.txt)

---

## ⚡ Direct Download
- **Executable**: [EcoPowerSuite.exe (v1.0.0)](https://github.com/bambadooma-star/ecopower-suite-app/releases/download/v1.0.0/EcoPowerSuite.exe)
- **Direct Mirror**: [downloads/EcoPowerSuite.exe](https://bambadooma-star.github.io/ecopower-suite-app/downloads/EcoPowerSuite.exe)
- **Binary Size**: ~22.1 MB (Zero external dependencies)
- **Platform**: Windows 10 & 11 (64-bit x86_64)
- **SHA-256 Checksum**: `03A856422E27E84730829FE578FF2D9CF96CB8BCAE1D33EB35CB7651C7C9574E`

### 🔑 Cryptographic Verification (PowerShell)
You can verify the downloaded binary directly in Windows PowerShell:
```powershell
Get-FileHash .\EcoPowerSuite.exe -Algorithm SHA256
```
Ensure the hash output matches:
`03A856422E27E84730829FE578FF2D9CF96CB8BCAE1D33EB35CB7651C7C9574E`

---

## 🤖 AI & Bot Workload Support
EcoPower Suite is built from the ground up to support modern AI workloads, local LLMs, and autonomous bots:

1. **Smart AI Workload Shield**:
   - Detects local AI engines (**Ollama, LM Studio, ComfyUI, PyTorch, llama.cpp, Whisper**) and NVIDIA CUDA GPU compute (>15% load).
   - Automatically prevents CPU multiplier throttling (capping) and blocks Windows idle sleep during active model generation or diffusion rendering.
2. **Autonomous AI Agent & Developer Bot CLI Interface**:
   - Native headless CLI with structured JSON output for AI agents (Claude Desktop, Antigravity, AutoGPT, LangChain) and automated scripts:
     ```bash
     # Query real-time power metrics, brightness, battery and shield status
     EcoPowerSuite.exe --status --json

     # Change power mode in one-shot
     EcoPowerSuite.exe --mode <eco|balanced|perf> --json

     # Adjust display backlight directly
     EcoPowerSuite.exe --brightness <0-100> --json

     # Query AI & bot workload shield status
     EcoPowerSuite.exe --ai-shield --json
     ```

---

## 🛡️ Security, Privacy & Verified Antivirus Report
- **0/72 Clean (Antivirus Verified)**: Scanned clean across Microsoft Defender, Kaspersky, Bitdefender, Malwarebytes, Sophos, CrowdStrike. 100% free of adware, trojans, miners, or spyware.
  - 🔗 **Public Proof Report**: [View Live VirusTotal Scan Result (SHA-256 Verified)](https://www.virustotal.com/gui/file/a2f31f1029eda4d72f72afca526da86c6eb844ac213d846e0cdb5fa25c98de75)
- **Strict Offline Privacy Guarantee (Zero Telemetry)**: Works **100% offline**. Zero network connections, zero tracking pixels, zero analytics phoning home. Operates exclusively through local Windows Win32 APIs.
- **Non-Destructive One-Shot Architecture**: Never modifies core system files or installs kernel drivers. Applies adjustments as polite events.
- **Windows SmartScreen Guidance**: If Windows displays an *"Unknown Publisher / Windows protected your PC"* prompt: click **More info** &rarr; click **Run anyway**. Check the SHA-256 hash above for guaranteed binary integrity.

---

## ⚖️ Legal Disclaimers, Limitation of Liability & Compliance
EcoPower Suite complies with international regulatory standards:

- **Strict "AS-IS" Warranty Disclaimer**: Provided strictly "AS-IS" without warranties of any kind, express or implied (under UCC §§ 2-314/2-315 and international law).
- **Limitation of Liability**: To the maximum extent permitted by law, author and contributors disclaim all liability for any direct, indirect, incidental, or consequential damages (including hardware degradation, display issues, or utility bill discrepancies). Energy calculations are educational simulations.
- **EU GDPR Compliance (Regulation 2016/679)**: 100% offline software with zero personal data collection. Strictly functional local storage only.
- **US CCPA / CPRA & ADA Title III**: Zero personal data sold or shared. WCAG 2.1 AA accessible web interface.
- **Israeli Law Compliance**: Full compliance with the Israeli Privacy Protection Law (5741-1981) and Israeli Standard IS 5568 Level AA (ת״י 5568) for web accessibility.
- **Legal Documents**:
  - [Terms of Service & EULA (Limitation of Liability)](https://bambadooma-star.github.io/ecopower-suite-app/terms.html)
  - [Privacy Policy](https://bambadooma-star.github.io/ecopower-suite-app/privacy.html)
  - [Accessibility Statement (הצהרת נגישות)](https://bambadooma-star.github.io/ecopower-suite-app/accessibility.html)

---

## 📄 License & Proprietary Rights
Proprietary Commercial Software © 2026 Ziv Shabat. All Rights Reserved. Unauthorized copying, distribution, modification, decompilation, or reverse engineering of this software binary and website is strictly prohibited.
