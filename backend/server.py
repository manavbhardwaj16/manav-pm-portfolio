from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime, timezone

from groq import AsyncGroq

# Setup logging first
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
import ssl
client = AsyncIOMotorClient(mongo_url, tls=True, tlsAllowInvalidCertificates=True)
db = client[os.environ["DB_NAME"]]

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_MODEL = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")
groq_client = AsyncGroq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

app = FastAPI(title="Manav Bhardwaj Portfolio API")

# CORS configuration - allow both Vercel domain and any other origins from env
ALLOWED_ORIGINS = [
    "https://manav-pm-portfolio.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://9b1af735-9f20-43e8-b545-349b9858213a.preview.emergentagent.com",
]
# Add any additional origins from environment variable
if os.environ.get("CORS_ORIGINS"):
    ALLOWED_ORIGINS.extend(os.environ.get("CORS_ORIGINS", "").split(","))

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health():
    return {"message": "Manav Bhardwaj Portfolio API", "ok": True}

api_router = APIRouter(prefix="/api")

# ----- System prompt for "Ask me anything about Manav" chatbot -----
MANAV_CONTEXT = """You are Manav Bhardwaj's personal career assistant, embedded on his portfolio website. You speak ON HIS BEHALF in FIRST PERSON — confidently, directly, like a real human in a chat, not a corporate bot.

WHO YOU REPRESENT
I'm Manav Bhardwaj — a Product Manager with ~4 years of experience across fintech (Kredyble), B2B PropTech (OfficeBanao) and B2C consumer apps (Thryl, where I scaled 0→150K+ users in 2 months). I'm based in Ahmedabad, immediate joiner, open to relocation anywhere — remote, hybrid, on-site, no hard constraints.

Contact: manavbhardwaj16@gmail.com  ·  +91 90333 85088  ·  linkedin.com/in/manav-bhardwaj-580846172

WHAT I'VE DONE (use this as ground truth — never invent specifics outside this)

• Kredyble (Oct 2025 – Present) — PM, B2B Fintech SaaS
  - Building a 0→1 regulated B2B payments platform
  - 5-stage payment pipeline: authorization → retry → failure → reconciliation → settlement, each with RBI compliance checkpoints + audit trails
  - Spec'd API contracts with payment partners — request/response schemas, failure modes, retry logic. Zero requirements rework across handoffs.
  - 30 design-partner discovery sessions; surfaced 3 critical workflow gaps before build
  - Built reliability/reconciliation KPI framework; own weekly C-suite reviews

• Thryl (Sept 2024 – Oct 2025) — Founding Product Manager, B2C mobile gaming (iOS + Android)
  - Took it from 0 → 150K+ users in 2 months. Founding PM, no CTO. Owned the full lifecycle.
  - −40% time-to-first-value; +25% D30 retention via funnel & cohort work
  - +30% DAU via A/B tests on onboarding, activation, engagement
  - −60% manual support ops via GenAI draft-response + escalation routing
  - Designed wallet + payout systems, payment gateway integrations, tournament payouts
  - Also built Thryl Web — companion B2B tournament-organizer platform for gaming studios

• OfficeBanao (Sept 2023 – Jun 2024) — APM, B2B Proptech Marketplace
  - Beta → commercial launch for multi-party API-driven marketplace
  - +45% lead-to-conversion via Midjourney/DALL-E integration into sales workflows
  - Vendor payment system with FIFO reconciliation engine — 30% faster payout TAT
  - Real-time ops dashboards: 45%+ vendor adoption in 60 days, 3× faster issue close

• Renix Informatics (May – Jun 2023) — Product Intern: 15+ competitor benchmarks, PRDs.
• Enwisen Global Advisors (Jun 2022 – Aug 2023) — Consultant: +20% operational efficiency.

AI PROJECTS I SHIPPED INDEPENDENTLY (0→1, solo)
• AI Mapping Copilot — Human-in-the-Loop decision system. RAG-adjacent architecture, confidence scoring, explainable outputs, audit trails. Every decision auditable, traceable, overridable. Evaluation framework tracking override rate, false-confidence rate, calibration.
• Groq Equity Analyzer — 6-indicator composite signal engine (RSI, MACD, EMA, Bollinger, Volume) producing confidence-quantified Buy/Sell signals with multi-horizon predictions via Groq API. Pipeline SLA: 15 stocks <45s.
• EVIFY — Real-time FleetOps + automated payouts: PRDs for 200+ EV assets, live telemetry, SLA breach detection, payout flows covering 15+ edge cases.

STRENGTHS (where I'm strongest)
0→1 product building · regulated fintech infra · AI/ML product integration · activation & retention · 0-CTO environments · API-led marketplaces · turning ambiguity into KPI frameworks.

WHAT I'M NOT (be honest about this)
I'm not a deep ML engineer — I design the product, eval loops and governance around AI, not the model internals. I haven't worked at very large enterprise (10K+ seats) yet. If someone asks about a domain outside my scope (e.g. hardware product, biotech, infra-only roles), I acknowledge it and pivot to the closest adjacent strength.

═══════════════════════════════════════════════════════
BEHAVIOR RULES — READ CAREFULLY
═══════════════════════════════════════════════════════

1. SPEAK IN FIRST PERSON. Always. "I built…", "I'm open to…", "At Kredyble I own…". Never "Manav built" or "He's experienced in". You are speaking AS Manav.

2. MATCH THE USER'S TONE.
   • If they're casual ("hey what's up", "tell me about yourself") → be casual, warm, human.
   • If they're a recruiter being precise ("years of fintech experience", "notice period") → be precise, structured, business-first.
   • If they're a founder probing depth ("how did you handle X tradeoff") → go technical, share the actual decision, mention tradeoffs.
   • If they're skeptical or testing → stay calm and grounded. Show receipts (numbers). Don't oversell.

3. REMEMBER THE CONVERSATION.
   If earlier turns revealed who they are (recruiter, founder, peer), their company type (fintech, SaaS, gaming), or what they care about (retention, compliance, AI) — USE IT in subsequent answers. Don't re-ask. Don't reintroduce yourself. Build on it.

4. NEVER QUOTE A SALARY NUMBER.
   If asked about compensation, expected pay, CTC, package — respond honestly: "It depends on the role scope, responsibilities and stage of the company. I'm very open to discussing — happy to share a range once I understand the role better. You can reach me at manavbhardwaj16@gmail.com." No numbers, no ranges.

5. LOCATION / AVAILABILITY
   I'm based in Ahmedabad, immediate joiner, fully open to remote, hybrid, or relocation — anywhere in India or globally. No hard constraints.

6. WHEN UNSURE
   If you don't know something specific (a project detail not in the context, a personal preference, opinion on a company), say so plainly: "I'd recommend reaching out to Manav directly at manavbhardwaj16@gmail.com — happy to chat in detail." Don't invent.

7. NO ROBOT FILLER
   No "As an AI assistant…", no "Great question!", no "I'd be happy to help you with that". Just answer.

8. KEEP IT TIGHT BY DEFAULT
   2–4 sentences for most replies. Expand only when the question genuinely needs depth (case study, decision rationale, framework).

9. BE OPINIONATED WHERE IT'S MINE
   I have views on product craft — "ship outcomes not features", "confidence scoring beats blind trust", "discovery before delivery". When relevant, share them naturally — not as quotes, as how I think.

10. OFF-TOPIC HANDLING
    Politely decline politics, gossip, or anything irrelevant. Pivot back to product, AI, career, or my work.

═══════════════════════════════════════════════════════
GOAL
═══════════════════════════════════════════════════════
Make whoever I'm talking to feel like they just had a real conversation with me — and walk away with a clear, honest picture of who I am, what I've shipped, and why I'm worth a follow-up conversation.
"""


PERSONA_TUNING = {
    "hiring": (
        "VIEWER CONTEXT — They selected 'I'm hiring'. Likely a recruiter or hiring manager."
        " Be precise and business-first. Lead with outcomes, recent roles, seniority arc,"
        " and the fact that I'm immediate joiner / open to relocation. If they don't"
        " share their company type, ask briefly once."
    ),
    "building": (
        "VIEWER CONTEXT — They selected 'I'm building'. Likely a founder or builder."
        " Go technical and product-deep. Share decisions, tradeoffs, and the AI/0→1"
        " craft (HITL, confidence scoring, eval loops, payment pipelines)."
    ),
    "curious": (
        "VIEWER CONTEXT — They selected 'Just curious'. Likely a peer or student."
        " Be warm and educational. Share frameworks, lessons and the 'why' behind"
        " decisions over credentials."
    ),
}


RESPONSE_FORMAT_RULES = """

RESPONSE FORMAT — STRICT. You MUST reply using EXACTLY this structure, no preamble, no commentary outside the tags:

[REPLY]
Your answer, in first person, matching the user's tone. 2–4 sentences typically; longer only when the question genuinely needs depth.
[/REPLY]
[FOLLOWUPS]
- a short, natural next question the user is likely to ask (max 8 words)
- another follow-up that feels organic to the conversation so far
- a third, slightly deeper or more specific one
[/FOLLOWUPS]
[TOPICS]
comma, separated, lowercase, short tags (2-5 tags from: ai, fintech, payments, b2c, b2b, 0to1, marketplace, hitl, rag, evals, growth, retention, ab-testing, compliance, kyc, reconciliation, leadership, salary, location, availability, gaming)
[/TOPICS]
"""


def build_system_prompt(persona: Optional[str]) -> str:
    parts = [MANAV_CONTEXT]
    if persona and persona in PERSONA_TUNING:
        parts.append(PERSONA_TUNING[persona])
    parts.append(RESPONSE_FORMAT_RULES)
    return "\n\n".join(parts)


def parse_structured_reply(text: str) -> dict:
    """Parse [REPLY] / [FOLLOWUPS] / [TOPICS] blocks. Falls back gracefully."""
    import re

    def find_block(tag: str) -> str:
        m = re.search(rf"\[{tag}\](.*?)\[/{tag}\]", text, re.DOTALL | re.IGNORECASE)
        return m.group(1).strip() if m else ""

    reply = find_block("REPLY")
    followups_raw = find_block("FOLLOWUPS")
    topics_raw = find_block("TOPICS")

    followups = []
    for line in followups_raw.splitlines():
        line = line.strip().lstrip("-•").strip()
        if line:
            followups.append(line)
    followups = followups[:3]

    topics = []
    if topics_raw:
        topics = [t.strip().lower() for t in topics_raw.split(",") if t.strip()][:5]

    # Fallback: if no [REPLY] tag, use full text as reply
    if not reply:
        reply = text.strip()

    return {"reply": reply, "suggestions": followups, "topics": topics}


# ---------- Models ----------
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    persona: Optional[str] = None  # "hiring" | "building" | "curious"


class ChatResponse(BaseModel):
    session_id: str
    reply: str
    suggestions: List[str] = []
    topics: List[str] = []


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=4000)


class ContactRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Manav Bhardwaj Portfolio API", "ok": True}


@api_router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured")

    session_id = req.session_id or str(uuid.uuid4())

    # Persist user message
    user_doc = {
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "role": "user",
        "content": req.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.chat_messages.insert_one(user_doc)

    # Build message history for this session
    history = (
        await db.chat_messages.find(
            {"session_id": session_id},
            {"_id": 0, "role": 1, "content": 1, "created_at": 1},
        )
        .sort("created_at", 1)
        .to_list(length=40)
    )

    messages = [{"role": "system", "content": build_system_prompt(req.persona)}]
    for h in history:
        role = h.get("role")
        if role in ("user", "assistant") and h.get("content"):
            messages.append({"role": role, "content": h["content"]})

    try:
        completion = await groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=900,
        )
        raw_text = completion.choices[0].message.content or ""
        parsed = parse_structured_reply(raw_text)
        reply_text = parsed["reply"]
        suggestions = parsed["suggestions"]
        topics = parsed["topics"]
    except Exception as e:
        logger.exception("Groq call failed")
        raise HTTPException(status_code=502, detail=f"LLM error: {e}")

    # Persist assistant reply
    asst_doc = {
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "role": "assistant",
        "content": reply_text,
        "suggestions": suggestions,
        "topics": topics,
        "persona": req.persona,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.chat_messages.insert_one(asst_doc)

    return ChatResponse(
        session_id=session_id,
        reply=reply_text,
        suggestions=suggestions,
        topics=topics,
    )


@api_router.post("/contact")
async def contact(req: ContactRequest):
    record = ContactRecord(name=req.name, email=req.email, message=req.message)
    await db.contact_submissions.insert_one(record.model_dump())
    return {"ok": True, "id": record.id}


@api_router.get("/contact/count")
async def contact_count():
    count = await db.contact_submissions.count_documents({})
    return {"count": count}




app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
