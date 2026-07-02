"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Clock, MapPin, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import FloatingShape from "@/components/three/FloatingShape";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "hello@jaz-x.com" },
  { icon: Phone, label: "Phone", value: "+92 326 4380397" },
  { icon: MessageCircle, label: "WhatsApp", value: "+92 326 4380397" },
  { icon: Clock, label: "Business Hours", value: "Mon–Fri, 10:00 AM – 8:00 PM PKT" },
  { icon: MapPin, label: "Location", value: "Pakistan  , Lahore" },
];

const SERVICE_OPTIONS = [
  "Website Development",
  "App Development",
  "Game Development",
  "SEO",
  "App Testing & QA",
  "Social Media Marketing",
  "Not sure yet",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 px-6 md:px-16 max-w-7xl mx-auto pb-24">
      <Reveal>
        <span className="text-xs text-secondary tracking-widest uppercase font-medium">Contact</span>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4 mb-6 max-w-2xl">
          Let&apos;s Build the Future with AI.
        </h1>
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-16">
          Tell us about the project and we&apos;ll reply within one business day with next
          steps — usually a short discovery call.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-14">
        {/* Form */}
        <Reveal>
          {submitted ? (
            <div className="border border-white/10 rounded-2xl p-10 bg-white/[0.02]">
              <h2 className="text-2xl font-medium mb-3">Message received.</h2>
              <p className="text-white/50">
                Thanks for reaching out — we&apos;ll get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-white/40 mb-2 block">Full name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors placeholder:text-white/25"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-2 block">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="your.email@company.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors placeholder:text-white/25"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40 mb-2 block">Company</label>
                <input
                  type="text"
                  placeholder="Company name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors placeholder:text-white/25"
                />
              </div>

              <div>
                <label className="text-xs text-white/40 mb-2 block">What do you need?</label>
                <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors text-white/70">
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0a0a0a]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-white/40 mb-2 block">Project details</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you're building and what success looks like."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors placeholder:text-white/25 resize-none"
                />
              </div>

              <MagneticButton variant="primary" className="justify-center">
                Send Message <ArrowRight size={16} />
              </MagneticButton>
            </form>
          )}
        </Reveal>

        {/* Info + globe */}
        <Reveal delay={0.1}>
          <div className="space-y-8">
            <div className="relative h-56 rounded-2xl border border-white/10 overflow-hidden">
              <FloatingShape type="sphere" color="#00E5FF" />
            </div>
            <div className="space-y-5">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/25 to-secondary/15 shrink-0">
                    <item.icon size={16} color="#00E5FF" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{item.label}</p>
                    <p className="text-sm text-white/75">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Map placeholder area */}
      <Reveal>
        <div className="mt-24 border border-white/10 rounded-2xl overflow-hidden h-72">
          <iframe
            title="JAZ-X Location"
            src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"
            className="w-full h-full grayscale invert-[0.9] contrast-[1.1]"
            loading="lazy"
          />
        </div>
      </Reveal>
    </div>
  );
}
