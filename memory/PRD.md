# Manav Bhardwaj — Portfolio Site

## Problem Statement
Build an editorial portfolio landing page for Manav Bhardwaj (Global Product Manager &
AI-Native Product Builder). Reference visual style: https://goyal-himanshu.vercel.app
(minimal, editorial dark, serif accents). Replace the current Lovable draft
(https://manavbhardwaj.lovable.app) with a refined, outcome-led narrative blended from
four resumes (AI PM, Fintech, B2B, B2C).

## Architecture
- React 19 + Tailwind + shadcn (frontend)
- FastAPI + MongoDB (backend)
- AI chatbot ("Ask anything about Manav") via Claude Sonnet 4.5 through Emergent LLM key
- Contact form persisted to MongoDB

## User Persona
- Recruiters / hiring managers at AI-native and fintech companies
- Founders seeking 0→1 product leaders
- Engineering / design partners evaluating Manav for collaboration

## Core Requirements
- Editorial dark theme (Newsreader serif display + Geist body, monochrome)
- Sections: Hero, About, Selected Work, AI Projects, Experience, Philosophy, Skills, Contact
- AI chatbot floating widget, persistent sessions in Mongo
- Contact form with sonner toasts, Mongo persistence
- All interactive elements carry data-testid

## What's been implemented (Dec 2025 — initial build)
- Backend: `/api/chat` (Claude Sonnet 4.5 via emergentintegrations), `/api/contact`,
  `/api/contact/count`, `/api/` — Mongo persistence for chat + contact
- Frontend: Hero (stat strip + currently-building marquee), About (portrait + facts),
  Selected Work (4 case studies w/ images + metric grids), AI Projects (3 cards),
  Experience (5 roles + Education trio), Philosophy (5 principles), Skills (6 groups),
  Contact (3 channels + form), Footer
- ChatWidget: floating "Ask anything about Manav" panel with suggestions, typing dots,
  bottom-right placement (Emergent badge moved to bottom-left to avoid collision)
- Outcomes-led copy, refined and unified across all four resumes

## Prioritized Backlog
- P1: Add a "Writing / Press" section once Manav shares links
- P1: Resume PDF download button in Hero (need a hosted resume URL)
- P2: Project detail pages (per case study deep-dive)
- P2: Analytics dashboard for contact submissions (admin)
- P2: SEO meta + OG image
- P3: Light mode toggle

## Next Tasks
- Collect resume PDF link + writing/press links from user
- Confirm chatbot copy and tone with Manav
