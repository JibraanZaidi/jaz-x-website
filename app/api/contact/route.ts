import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}

interface ContactSuccessResponse {
  success: true;
  message: string;
}

interface ContactErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

// ------------------------------------------------------------------
// Config
// ------------------------------------------------------------------
const BUSINESS_EMAIL = "chat@jazx.online";
// Resend requires the "from" address to be on a domain you've verified
// in the Resend dashboard. Update this once jazx.online is verified.
const FROM_EMAIL = "JAZ-X Innovation <chat@jazx.online>";

const VALID_SERVICES = [
  "Website Development",
  "App Development",
  "Game Development",
  "SEO",
  "App Testing & QA",
  "Social Media Marketing",
  "Not sure yet",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

/** Strip any characters that could be used for HTML/script injection. */
function sanitizeText(value: string): string {
  return value
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

function validate(body: Partial<ContactRequestBody>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  } else if (body.name.trim().length > 100) {
    errors.name = "Name is too long.";
  }

  if (!body.email || typeof body.email !== "string" || !EMAIL_REGEX.test(body.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (body.company && (typeof body.company !== "string" || body.company.length > 150)) {
    errors.company = "Company name is too long.";
  }

  if (!body.service || typeof body.service !== "string" || !VALID_SERVICES.includes(body.service)) {
    errors.service = "Please select a valid service.";
  }

  if (!body.message || typeof body.message !== "string" || body.message.trim().length < 10) {
    errors.message = "Please provide a few more details (at least 10 characters).";
  } else if (body.message.trim().length > 5000) {
    errors.message = "Message is too long (max 5000 characters).";
  }

  return errors;
}

function businessEmailHtml(data: ContactRequestBody): string {
  return `
  <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#0a0a0a; padding:32px; color:#e5e5e5;">
    <div style="max-width:560px; margin:0 auto; background:#111111; border:1px solid #262626; border-radius:16px; overflow:hidden;">
      <div style="background:linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.02)); padding:24px 28px; border-bottom:1px solid #262626;">
        <p style="margin:0; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#00E5FF;">New Website Inquiry</p>
        <h1 style="margin:8px 0 0; font-size:20px; color:#ffffff;">${sanitizeText(data.service)}</h1>
      </div>
      <div style="padding:28px;">
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr>
            <td style="padding:10px 0; color:#8a8a8a; width:120px; vertical-align:top;">Name</td>
            <td style="padding:10px 0; color:#ffffff;">${sanitizeText(data.name)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0; color:#8a8a8a; vertical-align:top;">Email</td>
            <td style="padding:10px 0; color:#ffffff;">${sanitizeText(data.email)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0; color:#8a8a8a; vertical-align:top;">Company</td>
            <td style="padding:10px 0; color:#ffffff;">${data.company ? sanitizeText(data.company) : "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 0; color:#8a8a8a; vertical-align:top;">Service</td>
            <td style="padding:10px 0; color:#ffffff;">${sanitizeText(data.service)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0; color:#8a8a8a; vertical-align:top;">Message</td>
            <td style="padding:10px 0; color:#ffffff; white-space:pre-wrap;">${sanitizeText(data.message)}</td>
          </tr>
        </table>
      </div>
      <div style="padding:16px 28px; border-top:1px solid #262626;">
        <p style="margin:0; font-size:12px; color:#5a5a5a;">Sent from the JAZ-X Innovation contact form.</p>
      </div>
    </div>
  </div>`;
}

function autoReplyHtml(name: string): string {
  return `
  <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#0a0a0a; padding:32px; color:#e5e5e5;">
    <div style="max-width:560px; margin:0 auto; background:#111111; border:1px solid #262626; border-radius:16px; overflow:hidden;">
      <div style="background:linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.02)); padding:24px 28px; border-bottom:1px solid #262626;">
        <h1 style="margin:0; font-size:20px; color:#ffffff;">Thank you for contacting JAZ-X Innovation</h1>
      </div>
      <div style="padding:28px; font-size:14px; line-height:1.7; color:#d0d0d0;">
        <p>Hi ${sanitizeText(name)},</p>
        <p>Thank you for contacting JAZ-X Innovation. We have successfully received your inquiry.</p>
        <p>Our team will contact you within one business day.</p>
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
): Promise<NextResponse<ContactSuccessResponse | ContactErrorResponse>> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { success: false, message: "Server is not configured correctly. Please try again later." },
        { status: 500 }
      );
    }

    let body: Partial<ContactRequestBody>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const errors = validate(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Please correct the errors in the form.", errors },
        { status: 422 }
      );
    }

    const data: ContactRequestBody = {
      name: sanitizeText(body.name as string),
      email: (body.email as string).trim(),
      company: body.company ? sanitizeText(body.company) : undefined,
      service: (body.service as string).trim(),
      message: sanitizeText(body.message as string),
    };

    // 1. Notify the business
    const businessSend = await resend.emails.send({
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      replyTo: data.email,
      subject: `New Website Inquiry - ${data.service}`,
      html: businessEmailHtml(data),
    });

    if (businessSend.error) {
      console.error("Resend business email error:", businessSend.error);
      return NextResponse.json(
        { success: false, message: "Failed to send your message. Please try again shortly." },
        { status: 502 }
      );
    }

    // 2. Auto-reply to the customer (non-blocking failure: log but don't fail the request)
    try {
      const autoReplySend = await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: "Thank you for contacting JAZ-X Innovation",
        html: autoReplyHtml(data.name),
      });

      if (autoReplySend.error) {
        console.error("Resend auto-reply error:", autoReplySend.error);
      }
    } catch (autoReplyErr) {
      console.error("Auto-reply send threw:", autoReplyErr);
    }

    return NextResponse.json(
      { success: true, message: "Message received. We'll get back to you within one business day." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact route unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// Reject other HTTP methods explicitly
export async function GET() {
  return NextResponse.json({ success: false, message: "Method not allowed." }, { status: 405 });
}
