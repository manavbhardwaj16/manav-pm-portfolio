import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Mail, Phone, Linkedin } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message received. Manav will get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Couldn't send your message. Try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: "manavbhardwaj16@gmail.com",
      href: "mailto:manavbhardwaj16@gmail.com",
      testid: "contact-email",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/manav-bhardwaj-580846172",
      href: "https://www.linkedin.com/in/manav-bhardwaj-580846172",
      testid: "contact-linkedin",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 90333 85088",
      href: "tel:+919033385088",
      testid: "contact-phone",
    },
  ];

  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Headline + channels */}
          <div className="lg:col-span-7 reveal">
            <p className="eyebrow">Contact</p>
            <h2
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] tracking-[-0.04em] leading-[0.92] mt-4"
              data-testid="contact-heading"
            >
              Let's build <br />
              <span className="font-display-italic text-[var(--muted)]">something</span>{" "}
              that ships.
            </h2>

            <p className="mt-8 text-[var(--muted)] text-base md:text-lg leading-relaxed max-w-xl">
              Open to <span className="text-[var(--fg)]">Global Product Manager</span>{" "}
              roles in <span className="text-[var(--fg)]">AI</span>,{" "}
              <span className="text-[var(--fg)]">fintech</span>, and{" "}
              <span className="text-[var(--fg)]">consumer</span>. Also happy to advise on
              0→1 AI product design or HITL evaluation systems.
            </p>

            <ul className="mt-12 border-t border-[var(--border)]">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li
                    key={c.label}
                    className="border-b border-[var(--border)] group"
                  >
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      data-testid={c.testid}
                      className="flex items-center justify-between py-5 hover:bg-[var(--surface)] transition-colors px-2"
                    >
                      <div className="flex items-center gap-6">
                        <Icon strokeWidth={1.4} className="size-5 text-[var(--muted)]" />
                        <div>
                          <div className="eyebrow">{c.label}</div>
                          <div className="mt-1 text-sm md:text-base font-display-italic">
                            {c.value}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="size-5 text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-5 reveal"
            data-testid="contact-form"
          >
            <div className="border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
              <div className="eyebrow">Send a message</div>
              <div className="font-display text-2xl mt-3">Direct line.</div>

              <div className="mt-8 space-y-6">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  testid="contact-input-name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  testid="contact-input-email"
                />
                <Field
                  label="Message"
                  textarea
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                  testid="contact-input-message"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                data-testid="contact-submit"
                className="mt-8 w-full bg-[var(--fg)] text-[var(--bg)] py-3.5 text-sm font-medium hover:bg-[var(--muted)] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {sending ? "Sending..." : "Send message"}
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", textarea, testid }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      {textarea ? (
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid={testid}
          className="mt-2 w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--fg)] outline-none py-3 text-base text-[var(--fg)] placeholder:text-[var(--muted-2)] resize-none transition-colors"
          placeholder="What are we building?"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid={testid}
          className="mt-2 w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--fg)] outline-none py-3 text-base text-[var(--fg)] placeholder:text-[var(--muted-2)] transition-colors"
          placeholder={label}
        />
      )}
    </label>
  );
}
