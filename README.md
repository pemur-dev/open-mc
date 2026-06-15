<p align="center">
  <img src="https://ibb.co/VpBwDJ2P" width="100" alt="open-mc logo" />
</p>

<h1 align="center">open-mc</h1>

<p align="center">
  <strong>The Ultimate Local Minecraft Server Manager CLI</strong><br />
  Setup, manage, and run optimized Minecraft servers directly from your terminal.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-Multi--Lang-blue?style=for-the-badge" alt="Multi-Language" />
  <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows" alt="Windows Support" />
  <img src="https://img.shields.io/badge/Powered%20By-PaperMC-FFCC00?style=for-the-badge" alt="PaperMC" />
  <img src="https://img.shields.io/badge/Plugins-Modrinth-00AF5C?style=for-the-badge" alt="Modrinth" />
</p>

---

## ✨ Features

- 🌍 **Multi-Language Support**: Choose your preferred language during setup (EN, CS, SK, RU, JA, KO, ZH).
- 📦 **Clean Structure**: All server files are isolated in a dedicated `/server` folder.
- 🚀 **Auto-Setup**: Automated `eula.txt` acceptance and `server.properties` generation.
- 🧩 **Real Plugin Installer**: Search and download plugins directly from **Modrinth** via CLI.
- ⚡ **Optimized Jars**: Downloads the latest high-performance **PaperMC** (Spigot fork) builds.
- 🛠️ **Custom Setup**: Set your server name, description (MOTD), and version interactively.
- 🎮 **Original Console**: Retains the native Minecraft console for full compatibility.

---

## 🚀 Quick Start

### 1. Requirements
- [Node.js](https://nodejs.org/) (Latest LTS)
- [Java](https://www.oracle.com/java/technologies/downloads/) (Matching your Minecraft version)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/yourusername/open-mc.git
cd open-mc
npm install
npm run build
```

### 3. Usage
Use the provided `open-mc.bat` for the easiest experience:

| Command | Action |
| :--- | :--- |
| `open-mc.bat init` | Start the interactive setup (Language, Version, Name). |
| `open-mc.bat plugin add <name>` | Search and install a plugin from Modrinth. |
| `open-mc.bat start` | Boot up your server. |

---

## 🛠️ Commands in Detail

### `init`
Launches the setup wizard.
1. **Language**: Select your native language.
2. **Version**: Choose from 50+ latest Minecraft versions.
3. **Identity**: Set your server's display name and MOTD.
4. **Download**: Automatically pulls the correct PaperMC jar.

### `plugin add <name>`
Installs plugins without leaving the terminal.
- Example: `open-mc.bat plugin add essentials`
- It automatically finds versions compatible with your server version.

### `start`
Runs the server with optimized 2GB RAM flags (`-Xmx2G -Xms2G`).

---

## 📂 Folder Structure
```text
open-mc/
├── server/           # All Minecraft server files (jar, logs, world, plugins)
├── src/              # Source code (TypeScript)
├── dist/             # Compiled JavaScript
├── open-mc.bat       # Main entry point for Windows
└── open-mc.json      # Your configuration (Language, Version)
```

---

## 🌐 Supported Languages
- 🇺🇸 English
- 🇨🇿 Čeština
- 🇸🇰 Slovenčina
- 🇷🇺 Русский
- 🇯🇵 日本語
- 🇰🇷 한국어
- 🇨🇳 中文

---

## 🤝 Contributing
Feel free to open issues or submit pull requests to help improve `open-mc`!

---

<p align="center">
  Made by Pemur._. for the Minecraft Community
</p>
