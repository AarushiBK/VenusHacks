# VitaCor

Women's heart health hub for the **Heart Health at Warp Speed** track at VenusHacks. Track symptoms before, during, and after pregnancy to assess cardiovascular disease risk.

## Getting started

Requires [Node.js](https://nodejs.org/) (v18+). From the project root:

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Auth (current)

The sign-in / sign-up flow collects:

- **Account:** name, email, password
- **About you:** date of birth, pronouns, ethnicity
- **Lifestyle:** smoking, vaping, physical activity
- **Family history:** early heart disease in parents or siblings
- **Optional:** wearable connections, Apple Health import, medical document upload

Data is stored in memory for the demo until a backend is added.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- React Router 7
