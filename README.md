# VitaCore

Women's heart health hub for the **Heart Health at Warp Speed** track at VenusHacks. Track symptoms before, during, and after pregnancy to assess cardiovascular disease risk.

## Getting started

Requires [Node.js](https://nodejs.org/) (v18+).

```bash
npm install
cp .env.example .env
# Fill in Firebase credentials in .env
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Firebase setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Add a **Web app** and copy the config into `.env` (see `.env.example`).
3. Enable **Authentication**:
   - **Email/Password** sign-in
   - **Google** sign-in (add your app's domain to authorized domains; include `localhost` for dev)
4. Create a **Firestore Database** (start in test mode, then deploy rules below).
5. Deploy `firestore.rules` → Firestore Rules in the Firebase Console.

## Auth flows

- **Email:** Sign up (6-step wizard) → Firebase Auth + Firestore profile
- **Email sign in:** Existing users → dashboard success page (or complete profile if missing)
- **Google:** Welcome, sign-in, or sign-up → Google popup → profile saved to Firestore
  - New Google users complete health questions (steps 2–6) after first sign-in

Profiles are stored in Firestore `users/{uid}`. Pre-existing conditions are saved with NIH condition ids and ICD codes when available. Optional medical document filenames are saved in the profile metadata (files are not uploaded to cloud storage).

Condition search uses the [NIH Clinical Tables API](https://clinicaltables.nlm.nih.gov/) (proxied in dev via Vite).

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- React Router 7
- Firebase Auth, Firestore
