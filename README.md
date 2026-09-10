# 🎉 Party Overdue — Interactive Birthday Celebration

An interactive, cinematic birthday celebration website built with **HTML, CSS, and Vanilla JavaScript**. Designed with a unique **Wild-West bounty poster + royal museum** aesthetic, the site turns a traditional birthday page into an interactive digital experience.

## ✨ Features

### 🤠 Wild-West Bounty Aesthetic
- Aged parchment-style backgrounds
- Dark woodcut-inspired borders
- Wooden tack/pin styling
- Distressed typography and vintage visual effects
- `PARTY OVERDUE` rubber-stamp effect

### 📸 Interactive Mugshot Slideshow
- Dual-image slideshow
- Automatic 5-second transitions
- Smooth crossfade animations
- Slide indicator dots
- Dossier-style counters and badges

### 🃏 3D Flip Cards
Interactive Polaroid-style cards using CSS 3D transforms.

- Tap/click to flip
- Front side displays photos
- Back side reveals secret notes, captions, or messages
- Uses `perspective`, `preserve-3d`, `rotateY()` and `backface-visibility`

### 🪙 Interactive Scratch Card
A custom HTML5 Canvas scratch-card experience.

- Dynamically generated metallic scratch coating
- Mouse and touch support
- Canvas `destination-out` scratching
- Pixel-density analysis using `getImageData()`
- Automatically detects when enough of the card has been scratched
- Triggers a celebration and reveals the hidden message

### 🎂 Interactive Birthday Cake
- Individual candle interactions
- One-click **Blow Out All** option
- Animated candle flames
- Smoke effects after candles are extinguished
- Interactive cake-cutting sequence
- Celebration modal

### 🎊 Canvas Confetti
Celebration effects powered by the `canvas-confetti` library.

- Multi-angle confetti bursts
- Scratch-card celebration
- Birthday/cake celebration
- Interactive visual feedback

### 📝 Wall of Wishes
A browser-based interactive message board.

- Visitors can write birthday wishes
- Messages are stored using **HTML5 localStorage**
- Wishes remain after refreshing the page
- No external database required

### 🔊 Procedural Audio System
Instead of loading large MP3 files, the project uses the **Web Audio API** to generate sounds directly in the browser.

Includes synthesized:
- 🎂 Birthday chimes
- 💨 Candle-blowing effects
- 👏 Crowd cheering/applause
- 🎉 Celebration pops and fanfare

### 🏛️ Royal Museum Styling
- Ornate gold frames
- Decorative portrait sections
- Drop shadows
- Jewel-inspired visual details
- Royal/museum-inspired typography

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| Tailwind CSS | Responsive utility styling |
| Vanilla JavaScript ES6+ | Interactions and application logic |
| CSS3 | Animations, transitions and 3D effects |
| HTML5 Canvas | Scratch card and visual effects |
| Lucide Icons | SVG-based interface icons |
| Google Fonts | Custom typography |

### Audio

| Technology | Purpose |
|---|---|
| Web Audio API | Procedural sound generation |
| AudioContext | Browser audio processing |
| OscillatorNode | Musical tones/chimes |
| GainNode | Volume control |
| Noise synthesis | Whoosh, applause and effects |

### Storage

**HTML5 localStorage**

Used to persist visitor-generated wishes directly in the browser.

---

## 📁 Project Structure

```text
party-overdue/
│
├── index.html
├── style.css
├── app.js
├── aditya-data.js
├── audio.js
│
├── images/
│   ├── ...
│   └── ...
│
└── README.md
```

> File names may vary depending on the final project structure.

---

## 🧩 Architecture

This project follows a **static client-side architecture**.

```text
                    ┌──────────────────┐
                    │     index.html   │
                    └────────┬─────────┘
                             │
             ┌───────────────┼───────────────┐
             ↓               ↓               ↓
        style.css          app.js       audio.js
             │               │               │
             ↓               ↓               ↓
       Visual Design     Interactions     Web Audio
                             │
                             ↓
                      aditya-data.js
                             │
                             ↓
                       Content/Data
```

There is no traditional backend server or database.

---

## 💾 Data Architecture

Content is separated from the main application logic through:

```text
aditya-data.js
```

This file contains configurable content such as:

- Names
- Quotes
- Captions
- Friend roasts
- Birthday messages
- Polaroid notes
- Mugshot information

This makes it easier to update the website without modifying the main JavaScript logic.

---

## 🌐 Running Locally

The project can be served using Python's built-in HTTP server.

### 1. Open the project directory

```bash
cd party-overdue
```

### 2. Start the local server

```bash
python -m http.server 8000
```

### 3. Open the website

Visit:

```text
http://localhost:8000/
```

---

## 🚀 Deployment

Because the project is completely static, it can be deployed to platforms such as:

- Render
- GitHub Pages
- Netlify
- Vercel

### Render

For Render, create a:

**Static Site**

Typical configuration:

```text
Service Type: Static Site
Branch: main
Build Command: None
Publish Directory: .
```

No Python backend, Node.js server, database, or start command is required.

---

## 📱 Responsive Design

The website is designed to work across:

- 📱 Mobile phones
- 📲 Tablets
- 💻 Laptops
- 🖥️ Desktop screens

Responsive layouts use Tailwind CSS utilities, flexible grids, flexbox, and responsive breakpoints.

---

## 🔐 Privacy & Data

This project does not require a traditional database.

Visitor wishes are stored locally using:

```javascript
localStorage
```

This means the wishes are stored **only in the browser where they were submitted** and are not automatically shared between different devices or browsers.

---

## ⚡ Performance

The project intentionally avoids heavy frontend frameworks such as React or Angular.

It uses:

- Vanilla JavaScript
- Static HTML
- CSS animations
- Client-side processing
- Browser-native Web APIs

This keeps the website lightweight and suitable for mobile browsers.

---

## 🎨 Design Philosophy

The website combines several visual themes:

> **Wild West + Birthday Party + Royal Museum + Interactive Dossier**

Instead of presenting a conventional birthday greeting, the experience treats the birthday subject like a legendary character with:

- Mugshots
- Classified information
- Secret notes
- Bounty-style graphics
- Scratch cards
- Interactive evidence
- Birthday celebrations

---

## 🧑‍💻 Development

This project was created as an interactive frontend experience using browser-native technologies rather than a traditional application framework.

The architecture is intentionally simple:

```text
HTML
 +
CSS
 +
JavaScript
 +
Browser APIs
 =
Interactive Static Website
```

---

## 📜 License

This project is intended for personal/celebratory use.

If you reuse the project, make sure you have permission to use any included photographs, artwork, fonts, or third-party assets.

---

## 🎂 Final Note

This isn't just a birthday webpage.

It's a **digital birthday dossier** designed to make the visitor explore, interact, scratch, flip, blow out candles, and celebrate.

**The party isn't late.**

### 🎉 It's just PARTY OVERDUE.****
