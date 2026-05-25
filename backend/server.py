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

from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")

app = FastAPI(title="Manav Bhardwaj Portfolio API")
api_router = APIRouter(prefix="/api")

# ----- System prompt for "Ask me anything about Manav" chatbot -----
MANAV_CONTEXT = """You are Manav AI — a concise, candid assistant that answers questions about Manav Bhardwaj on his portfolio site. You speak about Manav in the third person, with confidence and editorial calm. Keep answers tight (2-5 sentences typically). Surface outcomes and numbers first. If asked something not in the context, say you don't have that information and recommend reaching out via the contact section.

ABOUT MANAV BHARDWAJ
- Title: Global Product Manager & AI-Native Product Builder
- Experience: 3.5+ years building B2B SaaS, B2C consumer, fintech, and marketplace products end-to-end
- Based in India (open to global remote roles)
- Email: manavbhardwaj16@gmail.com  |  Phone: +91 90333 85088  |  LinkedIn: linkedin.com/in/manav-bhardwaj-580846172

POSITIONING (one line)
"Ships outcomes, not features. 0→1 product builder with AI-native instincts, regulated-fintech rigor, and zero mid-sprint changes."

HEADLINE OUTCOMES
- Scaled a B2C mobile platform from 0 → 150,000+ users in 2 months post-launch
- Owned 0→1 lifecycle of a regulated B2B fintech payments product under RBI compliance
- 40% reduction in time-to-first-value; 25% lift in D30 retention; 30% DAU growth via structured A/B testing
- 60% reduction in manual support ops via GenAI draft-response + escalation routing
- 45% improvement in lead-to-conversion via AI tool integration (Midjourney/DALL-E) into sales workflow
- 30% faster vendor payout turnaround via FIFO reconciliation engine
- Zero mid-sprint changes across all sprints owned (career-wide track record)
- Zero requirements rework across engineering handoffs at Kredyble

EXPERIENCE
1. Product Manager, Kredyble — B2B Fintech SaaS  (Oct 2025 – Present)
   • Owns 0→1 lifecycle for a regulated B2B payments platform with a 5-stage pipeline (authorization → retry → failure → reconciliation → settlement) and RBI compliance checkpoints at each stage with audit trails.
   • Specs API contracts across payment partner integrations — request/response schemas, failure modes, retry logic. Zero requirements rework across handoffs.
   • Ran structured discovery with 30 B2B design partners, uncovered 3 critical workflow gaps pre-build, reprioritized backlog.
   • Built KPI framework tracking system reliability, failure rates, reconciliation accuracy; owns weekly C-suite reviews.

2. Product Manager, Thryl — B2C Consumer Mobile App (Sept 2024 – Oct 2025)
   • 0 → 150K+ users in 2 months as a 0→1 and 1→10 builder.
   • Funnel + cohort analysis drove 40% reduction in time-to-first-value and 25% improvement in D30 retention.
   • Structured A/B tests on onboarding, activation, engagement → 30% DAU growth.
   • Deployed GenAI-powered support ops (draft-response + escalation routing) — 60% manual dependency reduction at scale.
   • 4 major releases on time, coordinating 6 parallel workstreams (Eng, Design, Growth, Analytics).

3. Associate Product Manager, OfficeBanao — B2B Proptech & Marketplace (Sept 2023 – Jun 2024)
   • Drove B2B marketplace from beta to commercial launch — API-driven integrations across fulfillment, payments, project management, procurement for a multi-party platform.
   • Integrated Midjourney/DALL-E into sales workflows → 45% lift in lead-to-conversion.
   • Built vendor payment system with FIFO reconciliation engine → 30% faster payout turnaround.
   • Real-time ops monitoring dashboards with 45%+ vendor adoption in 60 days; 3x faster issue resolution.

4. Product Intern, Renix Informatics (May – Jun 2023)
   • Benchmarked 15+ competitors, surfaced 3 underserved use cases that shaped the MVP scope and compressed time to first customer demo.

5. Business Consultant, Enwisen Global Advisors (Jun 2022 – Aug 2023)
   • Improved enterprise operational efficiency by 20%; created BRDs, execution roadmaps, KPI tracking across cross-functional teams.

SELECTED CASE STUDIES (Product work)
A. Thryl — B2C Esports & Gaming Platform: 0→150K users, +30% DAU, +25% D30 retention, in-app currency + rewards, B2B Organizer Panel.
B. Kredyble — B2B Fintech Payments: 0→1 regulated payments infra; 5-stage payment pipeline; RBI compliance; zero requirements rework.
C. OfficeBanao — B2B Proptech Marketplace: Beta → commercial launch; 30% reduced project TAT; 12% conversion lift; 4.8★ satisfaction.
D. Evify — Rider App & FleetOps ERP: Real-time GPS + facial recognition; 40% reduction in manual payout reconciliation; 70% rider retention.

AI PROJECTS (0→1, shipped independently)
1. AI Mapping Copilot — Human-in-the-Loop Decision System
   • RAG-adjacent architecture, confidence scoring, explainable outputs, audit trails.
   • Every decision is auditable, traceable, and overridable by human reviewers.
   • Evaluation framework tracking override rate, false confidence rate, calibration — improved AI output quality in a high-stakes domain.

2. Groq Equity Analyzer — AI-Powered Stock Analysis MVP
   • 6-indicator composite signal scoring engine (RSI, MACD, EMA, Bollinger Bands, Volume).
   • Confidence-quantified Buy/Sell signals with multi-horizon price predictions (Intraday, T+1, T+2) via Groq API.
   • Performance SLA: full pipeline for 15 stocks <45s; caching + on-demand AI call governance balancing cost/speed/reliability.

3. EVIFY — Real-Time FleetOps Platform & Automated Payout System
   • PRDs for real-time ops across 200+ EV assets — live telemetry ingestion, SLA breach detection, anomaly alerting.
   • Automated payout workflows covering 15+ edge cases. Zero mid-sprint changes.

SKILLS
• AI & Agentic Systems: Agentic Architecture, Human-in-the-Loop Design, Confidence Scoring, Escalation Logic, RAG, Evaluation Loops, Prompt Engineering, GenAI Automation, Hallucination Mitigation, AI Explainability & Audit, n8n.
• Fintech & Payments: Card-Based Payment Flows, Authorization Cycles, Settlement & Reconciliation, Retry Logic, Payment Orchestration, KYC, RBI Compliance, FIFO Reconciliation, Vendor Payments.
• Product Management: End-to-End Lifecycle, 0→1 Development, PRD & BRD Authoring, Roadmapping, Backlog, OKRs/KPIs, Agile/Scrum, GTM Strategy.
• Analytics & Growth: Funnel Analysis, Cohort & Retention, A/B Testing, KPI Monitoring, DAU/MAU, Activation & Conversion, SQL (Basic).
• Platform & API: API-Based Product Design, Multi-Party Platform Architecture, Marketplaces, System Integrations, Data Pipelines, Order Management, Procurement Workflows.
• Tools: Claude, ChatGPT, Gemini, Groq, n8n, Cursor, Figma, JIRA, Notion, Postman, Mixpanel, Amplitude, Google Analytics, HubSpot, Airtable.

EDUCATION
• AI Product Management Bootcamp — Airtribe, 2025
• Product Management Bootcamp — UpGrad, 2022–2023
• B.B.A. — Gujarat Technological University, 2018–2021

PHILOSOPHY
"Ship outcomes, not features."  "Confidence scoring beats blind trust."  "Discovery before delivery."  "Zero mid-sprint changes is a craft, not a constraint."  "AI is most useful when embedded into workflows, not bolted on."

STYLE GUIDE FOR ANSWERS
- Lead with outcome/number. Then the mechanism. Then the relevance.
- Don't be salesy. Be precise.
- If asked about something off-topic (politics, gossip), politely decline and redirect to product/AI/career questions.
- If asked to contact Manav, point them to manavbhardwaj16@gmail.com or the LinkedIn profile.
"""


PERSONA_TUNING = {
    "hiring": (
        "VIEWER PERSONA — Recruiter / Hiring Manager.\n"
        "Tone: tight, business-first. Lead with role fit, recent outcomes, and signal."
        " Mention seniority arc (APM → PM → Global PM track), domain fits (AI, fintech, B2C),"
        " and the fact that he is currently OPEN TO ROLES."
    ),
    "building": (
        "VIEWER PERSONA — Founder / Builder.\n"
        "Tone: technical, product-deep. Lead with shipping speed, AI craft (HITL, confidence scoring,"
        " RAG, eval loops), and 0→1 systems thinking. Show product depth and decisions."
    ),
    "curious": (
        "VIEWER PERSONA — Curious peer or student.\n"
        "Tone: warm and educational. Share frameworks and lessons over credentials."
        " Explain why decisions were made, not just what they were."
    ),
}


RESPONSE_FORMAT_RULES = """

RESPONSE FORMAT — STRICT. You MUST reply using EXACTLY this structure, no preamble, no commentary:

[REPLY]
Your answer in 2–5 sentences. Plain prose, no markdown lists.
[/REPLY]
[FOLLOWUPS]
- a short, specific next question the user is likely to ask (max 7 words)
- another natural follow-up
- a third, slightly more advanced follow-up
[/FOLLOWUPS]
[TOPICS]
comma, separated, lowercase, short tags (2-5 tags from: ai, fintech, payments, b2c, b2b, 0to1, marketplace, hitl, rag, evals, growth, retention, ab-testing, compliance, kyc, reconciliation, leadership)
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
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

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

    try:
        chat_instance = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=build_system_prompt(req.persona),
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")

        raw = await chat_instance.send_message(UserMessage(text=req.message))
        raw_text = str(raw) if raw is not None else ""
        parsed = parse_structured_reply(raw_text)
        reply_text = parsed["reply"]
        suggestions = parsed["suggestions"]
        topics = parsed["topics"]
    except Exception as e:
        logger.exception("LLM call failed")
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

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
