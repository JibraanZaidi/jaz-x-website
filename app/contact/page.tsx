"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Clock, MapPin, ArrowRight, Loader2 } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import FloatingShape from "@/components/three/FloatingShape";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "chat@jazx.online" },
  { icon: Phone, label: "Phone", value: "+92 336 6067612" },
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

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof ContactFormState, string>>;

const INITIAL_FORM_STATE: ContactFormState = {
  name: "",
  email: "",
  company: "",
  service: SERVICE_OPTIONS[0],
  message: "",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const submitted = status === "success";
  const isLoading = status === "loading";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field-level error as the user edits it
    if (fieldErrors[name as keyof ContactFormState]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateClientSide = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.service) {
      errors.service = "Please select a service.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please provide a few more details (at least 10 characters).";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clientErrors = validateClientSide();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors as FieldErrors);
        }
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData(INITIAL_FORM_STATE);
    } catch (err) {
      console.error("Contact form submit error:", err);
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
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
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-secondary hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-white/40 mb-2 block">Full name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    disabled={isLoading}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors placeholder:text-white/25 disabled:opacity-50"
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-red-400 mt-1.5">{fieldErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-2 block">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@company.com"
                    disabled={isLoading}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors placeholder:text-white/25 disabled:opacity-50"
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-400 mt-1.5">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40 mb-2 block">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  disabled={isLoading}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors placeholder:text-white/25 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-xs text-white/40 mb-2 block">What do you need?</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors text-white/70 disabled:opacity-50"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0a0a0a]">
                      {opt}
                    </option>
                  ))}
                </select>
                {fieldErrors.service && (
                  <p className="text-xs text-red-400 mt-1.5">{fieldErrors.service}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-white/40 mb-2 block">Project details</label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you're building and what success looks like."
                  disabled={isLoading}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors placeholder:text-white/25 resize-none disabled:opacity-50"
                />
                {fieldErrors.message && (
                  <p className="text-xs text-red-400 mt-1.5">{fieldErrors.message}</p>
                )}
              </div>

              {status === "error" && errorMessage && (
                <div className="border border-red-400/20 bg-red-400/5 rounded-xl px-4 py-3">
                  <p className="text-sm text-red-400">{errorMessage}</p>
                </div>
              )}

              <MagneticButton
                type="submit"
               variant="primary"
               className="justify-center w-full"
                disabled={isLoading}
              >
                
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <ArrowRight size={16} />
                  </>
                )}
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
