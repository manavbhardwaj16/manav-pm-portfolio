import React from "react";
import { ArrowUpRight, Mail, Phone, Linkedin } from "lucide-react";

export default function Contact() {
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Headline */}
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

            <div className="mt-10">
              <a
                href="mailto:manavbhardwaj16@gmail.com?subject=Hello%20Manav"
                data-testid="contact-cta-email"
                className="group inline-flex items-center gap-3 bg-[var(--cta)] text-[var(--cta-fg)] px-7 py-4 text-sm font-medium hover:bg-[var(--cta-hover)] transition-colors"
              >
                Write to Manav
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Right: Channels list */}
          <div className="lg:col-span-5 reveal lg:pt-6">
            <div className="eyebrow mb-6">Direct lines</div>
            <ul className="border-t border-[var(--border)]">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label} className="border-b border-[var(--border)] group">
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      data-testid={c.testid}
                      className="flex items-center justify-between py-6 hover:bg-[var(--surface)] transition-colors px-2"
                    >
                      <div className="flex items-center gap-6">
                        <Icon strokeWidth={1.4} className="size-5 text-[var(--muted)] group-hover:text-[var(--cta)] transition-colors" />
                        <div>
                          <div className="eyebrow">{c.label}</div>
                          <div className="mt-1 text-base font-display-italic">
                            {c.value}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="size-5 text-[var(--muted)] group-hover:text-[var(--cta)] transition-colors" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
