"use client";

import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Rocket,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Figma,
  X,
  ShieldCheck,
  Sparkles,
  Zap,
  Globe2,
  HeadphonesIcon,
  BadgeCheck,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import FloatingShape from "@/components/three/FloatingShape";
import CursorGlow from "@/components/ui/CursorGlow";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface StartProjectFormData {
  projectName: string;
  companyName: string;
  projectType: string;
  description: string;
  features: string[];
  budget: string;
  timeline: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  country: string;
  preferredContact: string;
}

type StepErrors = Partial<Record<keyof StartProjectFormData, string>>;

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------
const STEPS = [
  { id: 1, label: "Project" },
  { id: 2, label: "Budget" },
  { id: 3, label: "Timeline" },
  { id: 4, label: "Contact" },
] as const;

const PROJECT_TYPES = [
  "Website",
  "Mobile App",
  "AI Solution",
  "Game Development",
  "SEO",
  "UI/UX",
  "Digital Marketing",
  "Other",
];

const FEATURES = [
  "Admin Dashboard",
  "AI Chatbot",
  "Authentication",
  "CMS",
  "Payment Gateway",
  "Analytics",
  "Hosting",
  "Maintenance",
  "Animations",
  "API Integration",
];

const BUDGET_OPTIONS = [
  { value: "Under $500", hint: "A focused starting point" },
  { value: "$500 - $1500", hint: "Small to mid-scope build" },
  { value: "$1500 - $5000", hint: "Full-featured product" },
  { value: "$5000+", hint: "Complex, multi-phase build" },
  { value: "Not Sure", hint: "We'll help you scope it" },
];

const TIMELINE_OPTIONS = [
  { value: "ASAP", hint: "We move fast" },
  { value: "1 Month", hint: "Standard delivery" },
  { value: "2-3 Months", hint: "Room to refine" },
  { value: "Flexible", hint: "No fixed deadline" },
];

const CONTACT_METHODS = ["Email", "WhatsApp", "Phone"];

const WHY_JAZX = [
  { icon: Sparkles, label: "Free Consultation" },
  { icon: ShieldCheck, label: "NDA Available" },
  { icon: Zap, label: "AI Experts" },
  { icon: Rocket, label: "Fast Delivery" },
  { icon: Globe2, label: "Worldwide Service" },
  { icon: HeadphonesIcon, label: "Dedicated Support" },
];

const INITIAL_FORM_DATA: StartProjectFormData = {
  projectName: "",
  companyName: "",
  projectType: PROJECT_TYPES[0],
  description: "",
  features: [],
  budget: "",
  timeline: "",
  fullName: "",
  email: "",
  phone: "",
  whatsapp: "",
  country: "",
  preferredContact: "Email",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ACCEPTED_FILE_TYPES = ".pdf,.png,.jpg,.jpeg,.svg,.fig,.webp";

// ------------------------------------------------------------------
// Small presentational helpers (kept in this file to avoid new imports)
// ------------------------------------------------------------------

function ProgressBar({ currentStep }: { currentStep: number }) {
  const percent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="mb-14">
      <div className="relative h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
          style={{ boxShadow: "0 0 16px rgba(0,229,255,0.6)" }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="flex justify-between mt-5">
        {STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isDone = step.id < currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-all duration-300 ${
                  isDone
                    ? "bg-secondary/20 border-secondary text-secondary"
                    : isActive
                    ? "border-secondary text-secondary shadow-[0_0_14px_rgba(0,229,255,0.45)]"
                    : "border-white/15 text-white/30"
                }`}
              >
                {isDone ? <Check size={14} /> : step.id}
              </div>
              <span
                className={`text-[11px] tracking-wide uppercase ${
                  isActive || isDone ? "text-white/70" : "text-white/25"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px -30px rgba(0,229,255,0.15)",
      }}
    >
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs text-white/40 mb-2 block">{children}</label>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-400 mt-1.5">{message}</p>;
}

const inputClasses =
  "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-secondary/50 transition-colors placeholder:text-white/25 disabled:opacity-50";

// ------------------------------------------------------------------
// Step 1 — Project
// ------------------------------------------------------------------
function StepProject({
  data,
  errors,
  onChange,
  onToggleFeature,
}: {
  data: StartProjectFormData;
  errors: StepErrors;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onToggleFeature: (feature: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <FieldLabel>Project name</FieldLabel>
          <input
            type="text"
            name="projectName"
            value={data.projectName}
            onChange={onChange}
            placeholder="e.g. Nova Commerce Platform"
            className={inputClasses}
          />
          <FieldError message={errors.projectName} />
        </div>
        <div>
          <FieldLabel>Company name</FieldLabel>
          <input
            type="text"
            name="companyName"
            value={data.companyName}
            onChange={onChange}
            placeholder="Your company (optional)"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <FieldLabel>Project type</FieldLabel>
        <select
          name="projectType"
          value={data.projectType}
          onChange={onChange}
          className={`${inputClasses} text-white/70`}
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type} className="bg-[#0a0a0a]">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <FieldLabel>Project description</FieldLabel>
        <textarea
          rows={5}
          name="description"
          value={data.description}
          onChange={onChange}
          placeholder="Tell us what you're building and what success looks like."
          className={`${inputClasses} resize-none`}
        />
        <FieldError message={errors.description} />
      </div>

      <div>
        <FieldLabel>Features you need</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {FEATURES.map((feature) => {
            const checked = data.features.includes(feature);
            return (
              <button
                type="button"
                key={feature}
                onClick={() => onToggleFeature(feature)}
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-3 text-xs text-left transition-all duration-200 ${
                  checked
                    ? "border-secondary/60 bg-secondary/10 text-white shadow-[0_0_14px_rgba(0,229,255,0.2)]"
                    : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                    checked ? "border-secondary bg-secondary/30" : "border-white/20"
                  }`}
                >
                  {checked && <Check size={11} className="text-secondary" />}
                </span>
                {feature}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Step 2 — Budget
// ------------------------------------------------------------------
function SelectableCard({
  active,
  title,
  hint,
  onClick,
}: {
  active: boolean;
  title: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left rounded-2xl border p-5 transition-all duration-200 ${
        active
          ? "border-secondary/70 bg-secondary/10 shadow-[0_0_24px_rgba(0,229,255,0.25)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      {active && (
        <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-secondary/25 border border-secondary flex items-center justify-center">
          <Check size={12} className="text-secondary" />
        </span>
      )}
      <p className={`text-base font-medium ${active ? "text-white" : "text-white/80"}`}>
        {title}
      </p>
      <p className="text-xs text-white/40 mt-1.5">{hint}</p>
    </button>
  );
}

function StepBudget({
  value,
  onSelect,
  error,
}: {
  value: string;
  onSelect: (val: string) => void;
  error?: string;
}) {
  return (
    <div>
      <FieldLabel>Select your budget range</FieldLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
        {BUDGET_OPTIONS.map((opt) => (
          <SelectableCard
            key={opt.value}
            active={value === opt.value}
            title={opt.value}
            hint={opt.hint}
            onClick={() => onSelect(opt.value)}
          />
        ))}
      </div>
      <FieldError message={error} />
    </div>
  );
}

// ------------------------------------------------------------------
// Step 3 — Timeline
// ------------------------------------------------------------------
function StepTimeline({
  value,
  onSelect,
  error,
}: {
  value: string;
  onSelect: (val: string) => void;
  error?: string;
}) {
  return (
    <div>
      <FieldLabel>When do you want to start?</FieldLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
        {TIMELINE_OPTIONS.map((opt) => (
          <SelectableCard
            key={opt.value}
            active={value === opt.value}
            title={opt.value}
            hint={opt.hint}
            onClick={() => onSelect(opt.value)}
          />
        ))}
      </div>
      <FieldError message={error} />
    </div>
  );
}

// ------------------------------------------------------------------
// Step 4 — Contact + Upload
// ------------------------------------------------------------------
function UploadArea({
  files,
  onFilesSelected,
  onRemoveFile,
}: {
  files: File[];
  onFilesSelected: (files: FileList | null) => void;
  onRemoveFile: (index: number) => void;
}) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);
      onFilesSelected(e.dataTransfer.files);
    },
    [onFilesSelected]
  );

  const fileIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "fig") return Figma;
    if (ext === "pdf") return FileText;
    return ImageIcon;
  };

  return (
    <div>
      <FieldLabel>Upload files (logo, PDF, images, Figma)</FieldLabel>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border border-dashed px-6 py-10 text-center transition-all duration-200 ${
          dragActive
            ? "border-secondary bg-secondary/5 shadow-[0_0_24px_rgba(0,229,255,0.2)]"
            : "border-white/15 bg-white/[0.02] hover:border-white/25"
        }`}
      >
        <UploadCloud
          size={26}
          className={dragActive ? "text-secondary mx-auto mb-3" : "text-white/30 mx-auto mb-3"}
        />
        <p className="text-sm text-white/60">
          Drag & drop files here, or{" "}
          <span className="text-secondary underline underline-offset-2">browse</span>
        </p>
        <p className="text-xs text-white/25 mt-1.5">PDF, PNG, JPG, SVG, Figma — up to 10MB each</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_FILE_TYPES}
          className="hidden"
          onChange={(e) => onFilesSelected(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => {
            const Icon = fileIcon(file.name);
            return (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon size={15} className="text-secondary shrink-0" />
                  <span className="text-xs text-white/60 truncate">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveFile(index)}
                  className="text-white/30 hover:text-white/70 transition-colors shrink-0"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StepContact({
  data,
  errors,
  files,
  onChange,
  onSelectContactMethod,
  onFilesSelected,
  onRemoveFile,
}: {
  data: StartProjectFormData;
  errors: StepErrors;
  files: File[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onSelectContactMethod: (method: string) => void;
  onFilesSelected: (files: FileList | null) => void;
  onRemoveFile: (index: number) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <FieldLabel>Full name</FieldLabel>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={onChange}
            placeholder="Your name"
            className={inputClasses}
          />
          <FieldError message={errors.fullName} />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            placeholder="your.email@company.com"
            className={inputClasses}
          />
          <FieldError message={errors.email} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <FieldLabel>Phone</FieldLabel>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={onChange}
            placeholder="+92 3XX XXXXXXX"
            className={inputClasses}
          />
        </div>
        <div>
          <FieldLabel>WhatsApp</FieldLabel>
          <input
            type="tel"
            name="whatsapp"
            value={data.whatsapp}
            onChange={onChange}
            placeholder="+92 3XX XXXXXXX"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <FieldLabel>Country</FieldLabel>
        <input
          type="text"
          name="country"
          value={data.country}
          onChange={onChange}
          placeholder="Your country"
          className={inputClasses}
        />
      </div>

      <div>
        <FieldLabel>Preferred contact method</FieldLabel>
        <div className="grid grid-cols-3 gap-3">
          {CONTACT_METHODS.map((method) => {
            const active = data.preferredContact === method;
            return (
              <button
                type="button"
                key={method}
                onClick={() => onSelectContactMethod(method)}
                className={`rounded-xl border px-3.5 py-3 text-xs font-medium transition-all duration-200 ${
                  active
                    ? "border-secondary/70 bg-secondary/10 text-white shadow-[0_0_14px_rgba(0,229,255,0.2)]"
                    : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20"
                }`}
              >
                {method}
              </button>
            );
          })}
        </div>
      </div>

      <UploadArea files={files} onFilesSelected={onFilesSelected} onRemoveFile={onRemoveFile} />
    </div>
  );
}

// ------------------------------------------------------------------
// Sidebar
// ------------------------------------------------------------------
function InfoSidebar() {
  return (
    <div className="lg:sticky lg:top-32 space-y-6">
      <GlassCard>
        <span className="text-xs text-secondary tracking-widest uppercase font-medium">
          Why choose JAZ-X
        </span>
        <div className="mt-5 space-y-4">
          {WHY_JAZX.map((item) => (
            <div key={item.label} className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/25 to-secondary/15 shrink-0">
                <item.icon size={14} color="#00E5FF" />
              </div>
              <p className="text-sm text-white/75">{item.label}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2 mb-2">
          <BadgeCheck size={16} className="text-secondary" />
          <p className="text-sm text-white/75 font-medium">Response time</p>
        </div>
        <p className="text-xs text-white/40 leading-relaxed">
          Our project manager reviews every request personally and replies within 24 hours with
          next steps.
        </p>
      </GlassCard>
    </div>
  );
}

// ------------------------------------------------------------------
// Success screen
// ------------------------------------------------------------------
function SuccessScreen({ onReturnHome }: { onReturnHome: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center py-20 px-6"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-8 relative"
      >
        <div className="absolute inset-0 rounded-full bg-secondary/20 blur-xl" />
        <div className="relative w-20 h-20 rounded-full border border-secondary/50 bg-secondary/10 flex items-center justify-center">
          <Check size={32} className="text-secondary" />
        </div>
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
        Project Request Submitted
      </h2>
      <p className="text-white/50 max-w-md leading-relaxed mb-2">
        Thank you for choosing JAZ-X Innovation.
      </p>
      <p className="text-white/50 max-w-md leading-relaxed mb-10">
        Our project manager will contact you within 24 hours.
      </p>

      <MagneticButton href="/" variant="primary" onClick={onReturnHome} className="justify-center">
        Return Home
      </MagneticButton>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// Main page
// ------------------------------------------------------------------
export default function StartProjectClient() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StartProjectFormData>(INITIAL_FORM_DATA);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<StepErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof StartProjectFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList) return;
    setFiles((prev) => [...prev, ...Array.from(fileList)]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateStep = (targetStep: number): StepErrors => {
    const stepErrors: StepErrors = {};

    if (targetStep === 1) {
      if (!formData.projectName.trim()) {
        stepErrors.projectName = "Please enter a project name.";
      }
      if (!formData.description.trim() || formData.description.trim().length < 10) {
        stepErrors.description = "Please describe your project (at least 10 characters).";
      }
    }

    if (targetStep === 2 && !formData.budget) {
      stepErrors.budget = "Please select a budget range.";
    }

    if (targetStep === 3 && !formData.timeline) {
      stepErrors.timeline = "Please select a timeline.";
    }

    if (targetStep === 4) {
      if (!formData.fullName.trim()) {
        stepErrors.fullName = "Please enter your full name.";
      }
      if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
        stepErrors.email = "Please enter a valid email address.";
      }
    }

    return stepErrors;
  };

  const goNext = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const goBack = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(4);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setStatus("loading");
    setSubmitError("");

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          payload.append(key, JSON.stringify(value));
        } else {
          payload.append(key, value);
        }
      });
      files.forEach((file) => payload.append("attachments", file));

      const res = await fetch("/api/start-project", {
        method: "POST",
        body: payload,
      });

      const result = await res.json().catch(() => ({ success: false }));

      if (!res.ok || !result.success) {
        setSubmitError(result.message || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch (err) {
      console.error("Start project submit error:", err);
      setSubmitError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const handleReturnHome = () => {
    setStep(1);
    setFormData(INITIAL_FORM_DATA);
    setFiles([]);
    setErrors({});
    setStatus("idle");
    window.location.href = "/";
  };

  const scrollToForm = () => {
    document.getElementById("start-project-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      <CursorGlow />

      {/* Ambient animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-secondary/10 blur-[140px]"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-primary/10 blur-[140px]"
          animate={{ opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero */}
      <section className="pt-32 px-6 md:px-16 max-w-7xl mx-auto pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <Reveal>
            <span className="text-xs text-secondary tracking-widest uppercase font-medium">
              Start a Project
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4 mb-6 max-w-2xl">
              Start Your Project
            </h1>
            <p className="text-white/50 text-lg max-w-xl leading-relaxed mb-10">
              Let&apos;s build something extraordinary together. Tell us about your project and
              our experts will contact you within 24 hours.
            </p>
            <MagneticButton variant="primary" onClick={scrollToForm}>
              Schedule Free Consultation <ArrowRight size={16} />
            </MagneticButton>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative h-72 md:h-96 rounded-2xl border border-white/10 overflow-hidden">
              <FloatingShape type="sphere" color="#00E5FF" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Wizard */}
      <section id="start-project-form" className="px-6 md:px-16 max-w-7xl mx-auto pb-28 pt-10">
        {isSuccess ? (
          <GlassCard className="max-w-3xl mx-auto">
            <SuccessScreen onReturnHome={handleReturnHome} />
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-14">
            <Reveal>
              <GlassCard>
                <ProgressBar currentStep={step} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step === 1 && (
                      <StepProject
                        data={formData}
                        errors={errors}
                        onChange={handleChange}
                        onToggleFeature={toggleFeature}
                      />
                    )}
                    {step === 2 && (
                      <StepBudget
                        value={formData.budget}
                        onSelect={(val) => {
                          setFormData((prev) => ({ ...prev, budget: val }));
                          setErrors((prev) => ({ ...prev, budget: undefined }));
                        }}
                        error={errors.budget}
                      />
                    )}
                    {step === 3 && (
                      <StepTimeline
                        value={formData.timeline}
                        onSelect={(val) => {
                          setFormData((prev) => ({ ...prev, timeline: val }));
                          setErrors((prev) => ({ ...prev, timeline: undefined }));
                        }}
                        error={errors.timeline}
                      />
                    )}
                    {step === 4 && (
                      <StepContact
                        data={formData}
                        errors={errors}
                        files={files}
                        onChange={handleChange}
                        onSelectContactMethod={(method) =>
                          setFormData((prev) => ({ ...prev, preferredContact: method }))
                        }
                        onFilesSelected={handleFilesSelected}
                        onRemoveFile={handleRemoveFile}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {status === "error" && submitError && (
                  <div className="mt-6 border border-red-400/20 bg-red-400/5 rounded-xl px-4 py-3">
                    <p className="text-sm text-red-400">{submitError}</p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-10">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={isLoading}
                      className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors disabled:opacity-40"
                    >
                      <ArrowLeft size={15} /> Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < STEPS.length ? (
                    <MagneticButton variant="primary" onClick={goNext}>
                      Continue <ArrowRight size={16} />
                    </MagneticButton>
                  ) : (
                    <MagneticButton
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Submitting..." : <>Start My Project</>}
                    </MagneticButton>
                  )}
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.1}>
              <InfoSidebar />
            </Reveal>
          </div>
        )}
      </section>
    </div>
  );
}
