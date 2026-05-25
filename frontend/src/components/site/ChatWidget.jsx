import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUGGESTIONS = [
  "What does Manav specialize in?",
  "Walk me through Thryl's 0→150K scale.",
  "What does he know about RBI-compliant payments?",
  "Show me an AI product he built end-to-end.",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi — I'm Manav AI. Ask me anything about Manav's work, AI products, or fintech experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || sending) return;
    setMessages((m) => [...m, { role: "user", content: message }]);
    setInput("");
    setSending(true);
    try {
      const res = await axios.post(`${API}/chat`, {
        message,
        session_id: sessionId,
      });
      setSessionId(res.data.session_id);
      setMessages((m) => [...m, { role: "assistant", content: res.data.reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry — I couldn't reach the model. Please try again, or email Manav directly at manavbhardwaj16@gmail.com.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          data-testid="chat-open-button"
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-[var(--fg)] text-[var(--bg)] px-5 py-3.5 text-sm font-medium shadow-xl hover:bg-[var(--muted)] transition-colors group"
        >
          <Sparkles className="size-4 transition-transform group-hover:rotate-12" />
          <span>Ask anything about Manav</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          data-testid="chat-panel"
          className="fixed inset-x-4 bottom-4 md:inset-auto md:bottom-6 md:right-6 md:w-[420px] z-50 bg-[var(--bg)] border border-[var(--border-strong)] shadow-2xl flex flex-col"
          style={{ maxHeight: "calc(100vh - 32px)" }}
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-[var(--muted)]" />
              <div>
                <div className="font-display text-base">Manav AI</div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--muted-2)]">
                  Trained on his work
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              data-testid="chat-close-button"
              className="text-[var(--muted)] hover:text-[var(--fg)] p-1"
            >
              <X className="size-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="px-5 py-5 overflow-y-auto flex-1 min-h-[280px] max-h-[55vh] space-y-4"
            data-testid="chat-messages"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                data-testid={`chat-message-${m.role}-${i}`}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] text-sm leading-relaxed px-3.5 py-2.5 ${
                    m.role === "user"
                      ? "bg-[var(--fg)] text-[var(--bg)]"
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

          {messages.length <= 1 && (
            <div className="px-5 pb-3 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  data-testid={`chat-suggestion-${s.slice(0, 12).toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[11px] border border-[var(--border)] px-2.5 py-1.5 text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--border-strong)] transition-colors"
                >
                  {s}
                </button>
              ))}
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
              className="px-5 text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-40 transition-colors"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
