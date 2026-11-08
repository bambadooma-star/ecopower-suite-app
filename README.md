# 🌿 EcoPower Suite — Official Website & Release Portal

Welcome to the official public repository for **EcoPower Suite** — the intelligent Windows desktop utility for hardware energy optimization, power scheme management, DDC/CI monitor dimming, and battery life maximization.

🌐 **Live Marketing Website**: [https://bambadooma-star.github.io/ecopower-suite-app/](https://bambadooma-star.github.io/ecopower-suite-app/)  
📦 **GitHub Release**: [v1.0.0 Release](https://github.com/bambadooma-star/ecopower-suite-app/releases/tag/v1.0.0)

---

## ⚡ Direct Download
- **Executable**: [EcoPowerSuite.exe (v1.0.0)](https://github.com/bambadooma-star/ecopower-suite-app/releases/download/v1.0.0/EcoPowerSuite.exe)
- **Direct Mirror**: [downloads/EcoPowerSuite.exe](https://bambadooma-star.github.io/ecopower-suite-app/downloads/EcoPowerSuite.exe)
- **Binary Size**: ~22.1 MB (Zero external dependencies)
- **Platform**: Windows 10 & 11 (64-bit x86_64)
- **SHA-256 Checksum**: `DD2497D1FEC9BEFF8F62718A0960F9132A58245AF82C4159E29743E407D4136D`

### 🔑 Cryptographic Verification (PowerShell)
You can verify the downloaded binary directly in Windows PowerShell:
```powershell
Get-FileHash .\EcoPowerSuite.exe -Algorithm SHA256
```
Ensure the hash output matches:
`DD2497D1FEC9BEFF8F62718A0960F9132A58245AF82C4159E29743E407D4136D`

---

## 🛡️ Security, Privacy & Antivirus Report
EcoPower Suite is built for maximum user safety and complete privacy:

1. **0/72 Clean (Antivirus Verified)**:
   - Scanned and tested clean across major security suites (Microsoft Defender, Kaspersky, Bitdefender, Malwarebytes).
   - 100% free of adware, trojans, backdoors, miners, and unwanted bundled software.
2. **Strict Offline Privacy Guarantee (Zero Telemetry)**:
   - Works **100% offline**.
   - Zero background connections, zero tracking pixels, zero analytics phoning home.
   - Operates exclusively through local Windows Win32 APIs (`powercfg`, `dxva2.dll`, `WMI`, `XInput`, CoreAudio).
3. **Non-Destructive One-Shot Architecture**:
   - Never injects kernel drivers or modifies core operating system files.
   - Applies power scheme transitions and brightness adjustments as polite one-shot events.
   - Clean uninstallation: simply close the app and delete the file.
4. **Windows SmartScreen Guidance**:
   - Newly released open-source software requires time to accrue Microsoft download reputation.
   - If Windows SmartScreen displays an *"Unknown Publisher / Windows protected your PC"* prompt:
     Click **More info** &rarr; Click **Run anyway**. Check the SHA-256 hash above for guaranteed binary integrity.

---

## ✨ Key Features
- **💡 In-App Screen Brightness Control**: Seamless slider (0-100%), direct numeric entry box, and quick presets (`10% Eco`, `25%`, `50%`, `75%`, `100% Full`).
- **🖥️ Universal Display Dimming**: VESA DDC/CI hardware brightness control across HDMI/DisplayPort external monitors, plus internal laptop screen control via WMI.
- **⚖️ Intelligent Battery Balancing**: Automatically transitions laptops to **Balanced mode** upon AC disconnection to protect battery life without aggressive 10% screen blinding.
- **🛡️ Smart Inactivity Shield**: Continuously detects Windows audio sessions, full-screen apps/games, and gamepad inputs (XInput) to prevent annoying idle timeouts during movies or video calls.
- **⚡ Non-Intrusive One-Shot Architecture**: All commands execute once on demand; no aggressive polling loops overriding your manual adjustments.
- **📊 Real-Time Dynamic Wattage Calculation**: Hardware-calibrated display and CPU power estimations responding instantly to brightness adjustments.
- **🌙 Scheduled Daily Shutdowns**: Integrated with Windows Task Scheduler with a 30-second warning dialog, 1-hour snooze, or skip option.

---

## 📄 License
Proprietary & Open Utility © 2026 Ziv Shabat. All Rights Reserved.
