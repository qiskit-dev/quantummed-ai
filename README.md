# QuantumMed AI

**Hybrid Quantum-Classical Vision Models for Biomedical Image Analysis**

Built for **Qiskit Fall Fest 2026** — Global Healthcare Track.

Theme: *Quantum AI for Biomedical Diagnostics: Hybrid Vision Models for Early Disease Detection.*

---

## Overview

QuantumMed AI is an educational research prototype that demonstrates how hybrid quantum-classical machine learning could potentially assist medical-image analysis and early disease detection. It combines classical convolutional neural networks for feature extraction with variational quantum circuits for quantum-enhanced processing.

The interactive lab lets you upload images or select demo images and watch a simulated analysis pipeline execute step by step — from classical preprocessing through quantum encoding and variational inference to a final prediction.

> **Disclaimer:** This is an educational research prototype, NOT a medical device. It must not be used for diagnosis, treatment, or clinical decision-making. All results are simulated.

## Features

- **Interactive Diagnostic Lab** — Drag-and-drop image upload, simulated hybrid analysis pipeline with step-by-step animation
- **Quantum Circuit Visualization** — Adjustable qubit count (4–8), animated gate execution, measurement indicators
- **Quantum Feature Encoding** — Visual feature vector mapping to quantum rotation angles
- **Results Dashboard** — Simulated metrics (accuracy, precision, recall, F1, ROC-AUC) with Recharts visualizations
- **Classical vs Hybrid Comparison** — Side-by-side architectural comparison with toggle
- **Architecture Diagram** — Interactive pipeline with technical details
- **Research Section** — Research topics, open questions, and known limitations
- Fully responsive — desktop, tablet, mobile
- Respects `prefers-reduced-motion`

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts (data visualization)
- Framer Motion (animations)
- Lucide React (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/           # Content and simulated data
├── hooks/          # Custom React hooks
├── pages/          # Top-level pages
├── sections/       # Home page sections
└── utils/          # Utility functions
```

## Pages

| Page | Description |
|------|-------------|
| Home | Hero, problem, solution pipeline, research teaser, hackathon timeline |
| Lab | Interactive diagnostic demo with quantum circuit |
| How It Works | 7-step workflow explanation |
| Architecture | Interactive pipeline diagram |
| Results | Simulated metrics dashboard with charts |
| Research | Research topics, comparison, open questions |
| About | Team, tech stack, project info |

## Important Notes

- All performance metrics are **simulated** for demonstration purposes
- No real patient data is used
- No quantum advantage is claimed — quantum ML is an active research field
- This is NOT a medical device and must not be used for clinical decisions

## License

MIT — Built for Qiskit Fall Fest 2026.
