# The Buggy Playbook — App de Escritorio y Móvil

App de BJJ instructionals convertida a aplicación de escritorio (Electron) e instalable en móvil (PWA).

---

## 📦 Requisitos previos

- **Node.js** v18 o superior → https://nodejs.org
- **npm** v9 o superior (viene con Node.js)

---

## 🚀 Instalación rápida

```bash
# 1. Instala dependencias (solo la primera vez)
npm install

# 2. (Opcional) Prueba en el navegador primero
npm run dev
# → Abre http://localhost:3000
```

---

## 🖥️ Ejecutable de escritorio

### Opción A — Ejecutar directamente (sin instalar)
```bash
# Compilar + abrir la app directamente
npm run build:electron && npx electron .
```

### Opción B — Crear instalador para tu sistema

```bash
# Windows (.exe con instalador)
npm run dist:win

# macOS (.dmg)
npm run dist:mac

# Linux (.AppImage + .deb)
npm run dist:linux
```

Los archivos instalables se generan en la carpeta `release/`.

**En Windows:** ejecuta `release/The Buggy Playbook Setup x.x.x.exe`  
**En macOS:** abre `release/The Buggy Playbook-x.x.x.dmg`  
**En Linux:** ejecuta `release/The-Buggy-Playbook-x.x.x.AppImage`

---

## 📱 Móvil (PWA — instalar desde el navegador)

La app ya está configurada como PWA (Progressive Web App). Para instalarla en el móvil:

### Opción A — Desde tu red local

1. En tu ordenador, ejecuta:
   ```bash
   npm run dev
   ```
2. Anota la IP que aparece (ej: `http://192.168.1.X:3000`)
3. En tu móvil (misma red WiFi), abre esa URL en Chrome o Safari
4. **Android (Chrome):** toca el menú → "Añadir a pantalla de inicio"
5. **iPhone (Safari):** toca el botón compartir → "Añadir a inicio"

La app se instala con icono propio y funciona sin navegador visible.

### Opción B — Deploy gratuito en la nube (acceso desde cualquier red)

```bash
# Instala Vercel CLI
npm install -g vercel

# Publica la app (solo web, no Electron)
npm run build
vercel --prod
```

Te da una URL pública (ej: `https://buggy-playbook.vercel.app`) que puedes instalar como PWA desde cualquier móvil.

---

## 📁 Estructura del proyecto

```
Jiu-Jitsu-instructionals-main/
├── electron/
│   └── main.js          ← Proceso principal de Electron
├── src/
│   ├── App.tsx          ← Componente principal React
│   ├── data.ts          ← Datos de instructionals
│   └── types.ts         ← Tipos TypeScript
├── public/
│   └── CJHelioGracie.jpeg  ← Icono de la app
├── dist/                ← Build generado (no editar)
├── release/             ← Instaladores generados
├── vite.config.ts       ← Config de Vite + PWA
└── package.json         ← Scripts y dependencias
```

---

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en localhost:3000 |
| `npm run build` | Build web (con PWA) |
| `npm run build:electron` | Build para Electron |
| `npx electron .` | Lanza Electron con el build actual |
| `npm run dist:win` | Crea instalador Windows (.exe) |
| `npm run dist:mac` | Crea instalador macOS (.dmg) |
| `npm run dist:linux` | Crea AppImage + .deb para Linux |

---

## ❓ Solución de problemas

**"electron no se reconoce"**
```bash
npx electron .
# o instalar globalmente:
npm install -g electron
```

**La app no carga imágenes en Electron**
- Asegúrate de ejecutar `npm run build:electron` (no `npm run build`) antes de lanzar Electron.

**Error en macOS: "La app no puede abrirse porque no se puede verificar el desarrollador"**
- Haz clic derecho en la app → Abrir → Abrir igualmente (solo la primera vez)

---

## 📝 Notas

- La app **no necesita internet** una vez compilada (funciona offline)
- El icono es la imagen `public/CJHelioGracie.jpeg`
- Para cambiar el nombre de la app, edita `productName` en `package.json`
