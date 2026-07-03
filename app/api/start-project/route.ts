import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface StartProjectPayload {
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

interface StartProjectSuccessResponse {
  success: true;
  message: string;
}

interface StartProjectErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

// ------------------------------------------------------------------
// Config
// ------------------------------------------------------------------
const BUSINESS_EMAIL = "chat@jazx.online";
// Must be on a domain verified in your Resend dashboard.
const FROM_EMAIL = "JAZ-X Innovation <chat@jazx.online>";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file, matches the UI copy
const MAX_TOTAL_ATTACHMENT_SIZE = 25 * 1024 * 1024; // keep well under Resend's ~40MB request cap
const MAX_FILES = 10;

const ALLOWED_EXTENSIONS = ["pdf", "png", "jpg", "jpeg", "svg", "fig", "webp"];

const VALID_PROJECT_TYPES = [
  "Website",
  "Mobile App",
  "AI Solution",
  "Game Development",
  "SEO",
  "UI/UX",
  "Digital Marketing",
  "Other",
];

const VALID_BUDGETS = [
  "Under $500",
  "$500 - $1500",
  "$1500 - $5000",
  "$5000+",
  "Not Sure",
];

const VALID_TIMELINES = ["ASAP", "1 Month", "2-3 Months", "Flexible"];

const VALID_CONTACT_METHODS = ["Email", "WhatsApp", "Phone"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

function sanitizeText(value: string): string {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

function getExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

function parseFeatures(raw: FormDataEntryValue | null): string[] {
  if (!raw || typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string").map(sanitizeText);
    }
    return [];
  } catch {
    return [];
  }
}

function validate(data: StartProjectPayload): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.projectName.trim()) {
    errors.projectName = "Please enter a project name.";
  } else if (data.projectName.length > 150) {
    errors.projectName = "Project name is too long.";
  }

  if (data.companyName.length > 150) {
    errors.companyName = "Company name is too long.";
  }

  if (!VALID_PROJECT_TYPES.includes(data.projectType)) {
    errors.projectType = "Please select a valid project type.";
  }

  if (!data.description.trim() || data.description.trim().length < 10) {
    errors.description = "Please describe your project (at least 10 characters).";
  } else if (data.description.length > 5000) {
    errors.description = "Description is too long (max 5000 characters).";
  }

  if (!VALID_BUDGETS.includes(data.budget)) {
    errors.budget = "Please select a valid budget range.";
  }

  if (!VALID_TIMELINES.includes(data.timeline)) {
    errors.timeline = "Please select a valid timeline.";
  }

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  } else if (data.fullName.length > 100) {
    errors.fullName = "Name is too long.";
  }

  if (!data.email.trim() || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.phone && data.phone.length > 30) {
    errors.phone = "Phone number is too long.";
  }

  if (data.whatsapp && data.whatsapp.length > 30) {
    errors.whatsapp = "WhatsApp number is too long.";
  }

  if (data.country.length > 100) {
    errors.country = "Country is too long.";
  }

  if (!VALID_CONTACT_METHODS.includes(data.preferredContact)) {
    errors.preferredContact = "Please select a valid contact method.";
  }

  return errors;
}

function businessEmailHtml(data: StartProjectPayload, fileCount: number): string {
  const featuresHtml =
    data.features.length > 0
      ? data.features.map((f) => sanitizeText(f)).join(", ")
      : "—";

  const rows: Array<[string, string]> = [
    ["Project Name", sanitizeText(data.projectName)],
    ["Company", data.companyName ? sanitizeText(data.companyName) : "—"],
    ["Project Type", sanitizeText(data.projectType)],
    ["Features", featuresHtml],
    ["Budget", sanitizeText(data.budget)],
    ["Timeline", sanitizeText(data.timeline)],
    ["Full Name", sanitizeText(data.fullName)],
    ["Email", sanitizeText(data.email)],
    ["Phone", data.phone ? sanitizeText(data.phone) : "—"],
    ["WhatsApp", data.whatsapp ? sanitizeText(data.whatsapp) : "—"],
    ["Country", data.country ? sanitizeText(data.country) : "—"],
    ["Preferred Contact", sanitizeText(data.preferredContact)],
    ["Attachments", fileCount > 0 ? `${fileCount} file(s) attached` : "None"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0; color:#8a8a8a; width:140px; vertical-align:top;">${label}</td>
          <td style="padding:10px 0; color:#ffffff; white-space:pre-wrap;">${value}</td>
        </tr>`
    )
    .join("");

  return `
  <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#0a0a0a; padding:32px; color:#e5e5e5;">
    <div style="max-width:600px; margin:0 auto; background:#111111; border:1px solid #262626; border-radius:16px; overflow:hidden;">
      <div style="background:linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.02)); padding:24px 28px; border-bottom:1px solid #262626;">
        <p style="margin:0; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#00E5FF;">New Project Request</p>
        <h1 style="margin:8px 0 0; font-size:20px; color:#ffffff;">${sanitizeText(data.projectName)}</h1>
      </div>
      <div style="padding:28px;">
        <table style="width:100%; border-collapse:collapse; font-size:14px;">${rowsHtml}</table>
        <div style="margin-top:20px; padding-top:20px; border-top:1px solid #262626;">
          <p style="margin:0 0 8px; color:#8a8a8a; font-size:13px;">Description</p>
          <p style="margin:0; color:#ffffff; font-size:14px; white-space:pre-wrap;">${sanitizeText(
            data.description
          )}</p>
        </div>
      </div>
      <div style="padding:16px 28px; border-top:1px solid #262626;">
        <p style="margin:0; font-size:12px; color:#5a5a5a;">Submitted from the JAZ-X Innovation Start Your Project wizard.</p>
      </div>
    </div>
  </div>`;
}

function autoReplyHtml(name: string): string {
  return `
  <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#0a0a0a; padding:32px; color:#e5e5e5;">
    <div style="max-width:560px; margin:0 auto; background:#111111; border:1px solid #262626; border-radius:16px; overflow:hidden;">
      <div style="background:linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.02)); padding:24px 28px; border-bottom:1px solid #262626;">
        <h1 style="margin:0; font-size:20px; color:#ffffff;">Project Request Received</h1>
      </div>
      <div style="padding:28px; font-size:14px; line-height:1.7; color:#d0d0d0;">
        <p>Hi ${sanitizeText(name)},</p>
        <p>Thank you for choosing JAZ-X Innovation.</p>
        <p>Our project manager will contact you within 24 hours to discuss next steps.</p>
        <p style="margin-top:24px;">Regards,<br/>JAZ-X Innovation</p>
      </div>
    </div>
  </div>`;
}

// ------------------------------------------------------------------
// Route handler
// ------------------------------------------------------------------
export async function POST(
  req: NextRequest
): Promise<NextResponse<StartProjectSuccessResponse | StartProjectErrorResponse>> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { success: false, message: "Server is not configured correctly. Please try again later." },
        { status: 500 }
      );
    }

    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const getStringField = (key: string): string => {
      const value = form.get(key);
      return typeof value === "string" ? value : "";
    };

    const rawData: StartProjectPayload = {
      projectName: getStringField("projectName"),
      companyName: getStringField("companyName"),
      projectType: getStringField("projectType"),
      description: getStringField("description"),
      features: parseFeatures(form.get("features")),
      budget: getStringField("budget"),
      timeline: getStringField("timeline"),
      fullName: getStringField("fullName"),
      email: getStringField("email"),
      phone: getStringField("phone"),
      whatsapp: getStringField("whatsapp"),
      country: getStringField("country"),
      preferredContact: getStringField("preferredContact"),
    };

    const validationErrors = validate(rawData);
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Please correct the errors in the form.", errors: validationErrors },
        { status: 422 }
      );
    }

    const data: StartProjectPayload = {
      ...rawData,
      projectName: sanitizeText(rawData.projectName),
      companyName: sanitizeText(rawData.companyName),
      description: sanitizeText(rawData.description),
      fullName: sanitizeText(rawData.fullName),
      email: rawData.email.trim(),
      phone: sanitizeText(rawData.phone),
      whatsapp: sanitizeText(rawData.whatsapp),
      country: sanitizeText(rawData.country),
    };

    // ------------------------------------------------------------
    // Attachments
    // ------------------------------------------------------------
    const rawFiles = form.getAll("attachments").filter((entry): entry is File => entry instanceof File);

    if (rawFiles.length > MAX_FILES) {
      return NextResponse.json(
        { success: false, message: `You can attach up to ${MAX_FILES} files.` },
        { status: 422 }
      );
    }

    let totalSize = 0;
    for (const file of rawFiles) {
      const ext = getExtension(file.name);
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json(
          { success: false, message: `File type ".${ext}" is not supported.` },
          { status: 422 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, message: `"${file.name}" exceeds the 10MB size limit.` },
          { status: 422 }
        );
      }
      totalSize += file.size;
    }

    if (totalSize > MAX_TOTAL_ATTACHMENT_SIZE) {
      return NextResponse.json(
        { success: false, message: "Total attachment size is too large. Please remove a file and try again." },
        { status: 422 }
      );
    }

    const attachments = await Promise.all(
      rawFiles.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return { filename: file.name, content: buffer };
      })
    );

    // ------------------------------------------------------------
    // 1. Notify the business
    // ------------------------------------------------------------
    const businessSend = await resend.emails.send({
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      replyTo: data.email,
      subject: `New Project Request - ${data.projectType}`,
      html: businessEmailHtml(data, attachments.length),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (businessSend.error) {
      console.error("Resend business email error:", businessSend.error);
      return NextResponse.json(
        { success: false, message: "Failed to send your request. Please try again shortly." },
        { status: 502 }
      );
    }

    // ------------------------------------------------------------
    // 2. Auto-reply to the customer (non-blocking failure)
    // ------------------------------------------------------------
    try {
      const autoReplySend = await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: "Thank you for contacting JAZ-X Innovation",
        html: autoReplyHtml(data.fullName),
      });

      if (autoReplySend.error) {
        console.error("Resend auto-reply error:", autoReplySend.error);
      }
    } catch (autoReplyErr) {
      console.error("Auto-reply send threw:", autoReplyErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project request submitted. Our project manager will contact you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Start-project route unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: "Method not allowed." }, { status: 405 });
}
