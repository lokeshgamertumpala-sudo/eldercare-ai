# 🌿 ElderCare AI — ICO Hackathon Multimodal Prototype
> **"Speak naturally. Show the camera. Understand clearly."**  
> *"One button. One voice. One calm answer."*

ElderCare AI is a mobile-first, Apple-inspired, accessible multimodal AI companion tailored for elderly users to understand medicine information, communicate naturally in their mother tongue (**Telugu**, **Hindi**, or **English**), inspect medicine packages using computer vision, manage automatic reminders, and access pharmacy/emergency workflows.

---

## 📱 Quick Launch

The application is running live at:
**[http://localhost:3000](http://localhost:3000)**

- **Launch by double clicking**: Double-click [`Run-ElderCare.bat`](./Run-ElderCare.bat) or open [`index.html`](./index.html).
- **Run from Terminal**:
  ```bash
  npm run start    # Starts the production server on http://localhost:3000
  ```
  Or for development:
  ```bash
  npm run dev
  ```

---

## 🌟 Key Product Capabilities

### 1. 🎙️ One-Touch Activation & Voice Interaction
- **Huge 68px+ Tactile Activation Button** labeled *"Start Assistant"* transitioning smoothly into *"Listening..."*.
- Represents the future concept of physical phone power-button double-press.
- **Natural Voice Conversations**:
  - Live transcription displayed directly below the orb.
  - Conversational Interruption: Speaking or tapping *"Stop"* immediately halts speech synthesis and resumes listening.
  - Supports **Telugu (తెలుగు)**, **Hindi (हिन्दी)**, and **English**.

### 2. 🔮 Apple Liquid Glass AI Orb
- Bespoke organic breathing orb with specular reflections, fluid ripples, and 5 distinct responsive states:
  - **Idle**: Gentle breathing sapphire/cyan glow.
  - **Listening**: Dynamic acoustic soundwave expansion.
  - **Thinking**: Smooth chromatic fluid rotation.
  - **Speaking**: Emerald acoustic waveform emission.
  - **Urgent**: Amber/Rose alert beacon.

### 3. 📸 Multimodal Medicine Camera Inspection
- Large accessible **Camera** button.
- Live WebRTC camera stream with mobile rear-camera preference.
- Snapshot preview, retake, and image upload fallback.
- **Built-in Sample Metformin Box**: Click *"Use Sample Metformin Box"* for instant testing even without physical medicine nearby!
- **Strict Medical Uncertainty & Safety**:
  - Never identifies unlabelled loose pills by visual sight alone.
  - Preserves uncertainty and highlights printed packaging text.

### 4. 🧠 Medicine Memory & Context-Aware Reasoning
- Pre-loaded elderly patient profile:
  - **Metformin 500mg**: 1 tablet at 8:00 AM daily after breakfast for blood sugar.
  - **Amlodipine 5mg**: 1 tablet at 8:00 PM daily after dinner for blood pressure.
- Contextual understanding: Asking *"When should I take my medicine?"* in Telugu (*"నా మందు ఎప్పుడు తీసుకోవాలి?"*) immediately references the stored regimen.

### 5. ⏰ Natural Reminders & Instant Voice Alert
- Voice-activated reminder setup (*"Remind me at 8 AM daily"* / *"రోజూ ఉదయం 8 గంటలకు గుర్తు చేయండి"*).
- Visual confirmation card with canvas confetti.
- **"Demo Reminder Now"**: Triggers an immediate medicine alert and speaks aloud in the selected language (*"మీ మందు తీసుకునే సమయం అయింది."*).

### 6. 📞 Simulated Pharmacy Call Bot (Demo Mode)
- Automated AI phone call to Apollo Pharmacy checking medicine availability.
- Multi-step live transcript with animated speaking states and confirmed stock outcome.

### 7. 🚨 Emergency Action & Safeguards
- Prominent high-contrast **Emergency** button.
- One-touch direct `tel:` dialer for Family Contact (*Rajesh*), Doctor (*Dr. Sharma*), and Ambulance (*108 / 112*).
- In-browser simulated demo call mode with live call timer.

### 8. 🛠️ Hackathon Judge Demo Toolbar
- Docked at the bottom with one-click actions:
  - 🔔 **Demo Reminder Now**
  - ⚠️ **Demo Urgent Warning**
  - 💊 **Demo Camera Analysis**
  - 📞 **Demo Pharmacy Call**
  - 🔄 **Reset Demo Data**

---

## 🏗️ Cloud AI Architecture & Security

```
BROWSER (Speech / Camera / UI)
          ↓
  Next.js Server API Routes (/api/assistant, /api/pharmacy)
          ↓ (Server-side process.env.GEMINI_API_KEY)
   Google Gemini API (gemini-3.8-flash)
          ↓
   Structured JSON Response
          ↓
BROWSER (Liquid Glass Cards + Web Speech TTS)
```

- **`GEMINI_API_KEY` is strictly protected on the server side**. It is never exposed in client bundles, HTML, or `localStorage`.
- **Hackathon Resilience**: If `GEMINI_API_KEY` is not provided in `.env.local`, the server automatically operates in intelligent offline heuristic demo mode, ensuring judges experience zero crashes.

---

## 🎨 Design Philosophy: Apple Liquid Glass & Elderly Ergonomics

- **Liquid Glass**: Translucent frosted surfaces (`backdrop-filter: blur(24px)`), soft borders, and specular highlights.
- **Skeuomorphism & Claymorphism**: Soft tactile depth, 3D pill radii, and responsive active press states.
- **Accessibility First**:
  - Minimum 56px–68px touch targets for elderly hands.
  - 18px baseline font size with Large and Extra-Large options.
  - High-Contrast mode for low-vision users.
  - `prefers-reduced-motion` compliance for motion sensitivity.
