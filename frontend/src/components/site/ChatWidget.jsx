import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { X, Send, Sparkles, Briefcase, Hammer, Compass } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PERSONAS = [
  {
    id: "hiring",
    label: "I'm hiring",
    icon: Briefcase,
    welcome:
      "Hi — looking at Manav for a role? I'll lead with outcomes, seniority arc, and fit. Ask me anything.",
    seed: [
      "Give me a 30-second brief.",
      "What roles is he open to?",
      "Show his biggest outcome.",
    ],
  },
  {
    id: "building",
    label: "I'm building",
    icon: Hammer,
    welcome:
      "Hey builder — I'll go deep on AI craft, 0→1 systems, and shipping speed. What do you want to dig into?",
    seed: [
      "How does he design HITL AI?",
      "Walk me through Kredyble's 0→1.",
      "What's his eval-loop approach?",
    ],
  },
  {
    id: "curious",
    label: "Just curious",
    icon: Compass,
    welcome:
      "Welcome — happy you're here. Ask anything about Manav's work, frameworks, or how he thinks about AI products.",
    seed: [
      "What does he believe about AI?",
      "Tell me a story from Thryl.",
      "What's his product philosophy?",
    ],
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [persona, setPersona] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, suggestions]);

  const selectPersona = (p) => {
    setPersona(p.id);
    setMessages([{ role: "assistant", content: p.welcome }]);
    setSuggestions(p.seed);
    setTopics([]);
  };

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || sending) return;
    setMessages((m) => [...m, { role: "user", content: message }]);
    setInput("");
    setSending(true);
    setSuggestions([]);
    try {
      const res = await axios.post(`${API}/chat`, {
        message,
        session_id: sessionId,
        persona: persona,
      });
      setSessionId(res.data.session_id);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: res.data.reply },
      ]);
      setSuggestions(res.data.suggestions || []);
      // Merge topics — keep last 5 unique
      setTopics((prev) => {
        const merged = [...prev, ...(res.data.topics || [])];
        return Array.from(new Set(merged)).slice(-5);
      });
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry — I couldn't reach the model. Try again or email Manav directly at manavbhardwaj16@gmail.com.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setPersona(null);
    setMessages([]);
    setSuggestions([]);
    setTopics([]);
    setSessionId(null);
  };

  const activePersona = PERSONAS.find((p) => p.id === persona);

  return (
    <>
      {/* Trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          data-testid="chat-open-button"
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-[var(--cta)] text-[var(--cta-fg)] px-5 py-3.5 text-sm font-medium shadow-2xl hover:bg-[var(--cta-hover)] transition-all group"
        >
          <Sparkles className="size-4 transition-transform group-hover:rotate-12" />
          <span>Ask anything about Manav</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          data-testid="chat-panel"
          className="fixed inset-x-4 bottom-4 md:inset-auto md:bottom-6 md:right-6 md:w-[440px] z-50 bg-[var(--bg)] border border-[var(--border-strong)] shadow-2xl flex flex-col"
          style={{ maxHeight: "calc(100vh - 32px)" }}
        >
          {/* Header */}
          <div className="border-b border-[var(--border)] px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 border border-[var(--cta-ring)]/40 flex items-center justify-center">
                  <Sparkles className="size-3.5 text-[var(--cta)]" />
                </div>
                <div>
                  <div className="font-display text-base leading-tight">Manav AI</div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--muted-2)]">
                    {activePersona ? (
                      <>
                        Mode: <span className="text-[var(--cta)]">{activePersona.label}</span>
                      </>
                    ) : (
                      "Trained on his work"
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {persona && (
                  <button
                    onClick={reset}
                    data-testid="chat-reset-button"
                    className="text-[10px] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--fg)] border border-[var(--border)] px-2 py-1"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  data-testid="chat-close-button"
                  className="text-[var(--muted)] hover:text-[var(--fg)] p-1"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Live topic breadcrumb */}
            {topics.length > 0 && (
              <div
                className="mt-3 flex items-center gap-1.5 overflow-x-auto"
                data-testid="chat-topics"
              >
                <span className="text-[10px] uppercase tracking-widest text-[var(--muted-2)] shrink-0">
                  Talking about
                </span>
                <span className="text-[var(--muted-2)] shrink-0">·</span>
                {topics.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-widest text-[var(--cta)] border-b border-[var(--cta-ring)]/40 shrink-0"
                    data-testid={`chat-topic-${t}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Persona picker OR conversation */}
          {!persona ? (
            <div className="p-6 space-y-4">
              <div className="font-display text-xl leading-snug">
                How can I <span className="font-display-italic">help</span> today?
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Pick a lens — I'll tune my answers to what matters most for you.
              </p>
              <div className="grid gap-2 mt-4">
                {PERSONAS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => selectPersona(p)}
                      data-testid={`chat-persona-${p.id}`}
                      className="flex items-center gap-3 border border-[var(--border)] hover:border-[var(--cta-ring)] hover:bg-[var(--surface)] transition-all px-4 py-3.5 text-left group"
                    >
                      <Icon
                        strokeWidth={1.4}
                        className="size-4 text-[var(--muted)] group-hover:text-[var(--cta)] transition-colors"
                      />
                      <span className="text-sm">{p.label}</span>
                      <span className="ml-auto text-[var(--muted-2)] group-hover:text-[var(--cta)] transition-colors">
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--muted-2)] mt-4">
                Powered by Claude · context-aware
              </p>
            </div>
          ) : (
            <>
              <div
                ref={scrollRef}
                className="px-5 py-5 overflow-y-auto flex-1 min-h-[260px] max-h-[50vh] space-y-4"
                data-testid="chat-messages"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    data-testid={`chat-message-${m.role}-${i}`}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] text-sm leading-relaxed px-3.5 py-2.5 ${
                        m.role === "user"
                          ? "bg-[var(--cta)] text-[var(--cta-fg)]"
                          : "bg-[var(--surface)] text-[var(--fg)] border border-[var(--border)]"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex justify-start" data-testid="chat-typing">
                    <div className="bg-[var(--surface)] border border-[var(--border)] px-3.5 py-2.5 text-sm text-[var(--muted)] flex gap-1.5">
                      <span className="size-1.5 rounded-full bg-[var(--muted)] animate-bounce" />
                      <span
                        className="size-1.5 rounded-full bg-[var(--muted)] animate-bounce"
                        style={{ animationDelay: "120ms" }}
                      />
                      <span
                        className="size-1.5 rounded-full bg-[var(--muted)] animate-bounce"
                        style={{ animationDelay: "240ms" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Adaptive suggestions */}
              {!sending && suggestions.length > 0 && (
                <div
                  className="px-5 pt-1 pb-3 flex flex-col gap-1.5 border-t border-[var(--border)]/50"
                  data-testid="chat-suggestions"
                >
                  <div className="text-[10px] uppercase tracking-widest text-[var(--muted-2)] mb-1">
                    Suggested follow-ups
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((s, k) => (
                      <button
                        key={`${s}-${k}`}
                        onClick={() => send(s)}
                        data-testid={`chat-suggestion-${k}`}
                        className="text-[11px] text-left border border-[var(--border)] px-2.5 py-1.5 text-[var(--muted)] hover:text-[var(--cta)] hover:border-[var(--cta-ring)]/60 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex border-t border-[var(--border)]"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  data-testid="chat-input"
                  className="flex-1 bg-transparent px-5 py-4 text-sm text-[var(--fg)] placeholder:text-[var(--muted-2)] outline-none"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  data-testid="chat-send-button"
                  className="px-5 text-[var(--muted)] hover:text-[var(--cta)] disabled:opacity-40 transition-colors"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
