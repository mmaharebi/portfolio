# Cloudflare Worker: Contact Form Handler

## ✅ Integration Status

**Status**: ✅ **COMPLETE & DEPLOYED**

**Deployed Endpoint**: `https://portfolio-contact-worker.mmaharebi-cloudflare.workers.dev/contact`

**Integration Date**: December 4, 2025

**Frontend Integration**: Fully implemented in `components/ContactForm.tsx`

---

## Implementation Summary

The contact form is now fully integrated with the Cloudflare Worker backend:

✅ **Frontend (`components/ContactForm.tsx`)**
- Real-time form validation
- Honeypot field for bot detection
- Graceful error handling for all response types
- Beautiful, animated status messages
- Auto-reset after success/error

✅ **Backend (Cloudflare Worker)**
- Secure endpoint with CORS configured
- Rate limiting (5 submissions per 10 minutes per IP)
- Input validation and sanitization
- Email delivery via Resend API
- Audit trail in Cloudflare KV (30-day TTL)

✅ **Security Features**
- Origin enforcement (`https://mahdymahareb.de`)
- Honeypot spam protection
- Server-side validation
- Generic error messages (no info leakage)
- Rate limiting per IP

---

This document explains the worker architecture from the client perspective (the frontend form).

## Endpoint Overview

**Production Endpoint**: `https://portfolio-contact-worker.mmaharebi-cloudflare.workers.dev/contact`

- URL: `https://portfolio-contact-worker.mmaharebi-cloudflare.workers.dev/contact`.
- Method: `POST`.
- Content-Type: `application/json`.
- Request body fields (matching the form):
  - `name`: string, required
  - `email`: string, required, valid email format
  - `subject`: string, required
  - `message`: string, required, min length 10

## What the Worker Does
- Validate JSON input rigorously.
- Enforce basic rate limiting per IP (prevent spam bursts).
- Optionally perform bot checks (simple honeypot or header checks).
- Send an email with the submission details using one of:
  - Cloudflare Email Routing (forward to your inbox), or
  - Resend API / SendGrid / Postmark (recommended for reliability), or
  - SMTP relay (if available).
- Optionally persist submissions (for audit or analytics) in:
  - Cloudflare KV (simple key-value storage), or
  - Cloudflare D1 (SQLite-based DB) for structured records.
- Return clear JSON responses with appropriate HTTP status codes.
- Include CORS headers so the Next.js site can call the Worker from the browser.

## Request/Response Contract
- Request example (frontend `fetch`):
```ts
await fetch("https://api.mahdymahareb.de/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, subject, message })
});
```

- Success response:
```json
{
  "ok": true,
  "message": "Message received. We'll get back to you soon."
}
```
  - HTTP status: `200`.

- Validation error response:
```json
{
  "ok": false,
  "errors": {
    "email": "Please enter a valid email",
    "message": "Message should be at least 10 characters"
  }
}
```
  - HTTP status: `400`.

- Rate limit response:
```json
{
  "ok": false,
  "message": "Too many requests. Please try again later."
}
```
  - HTTP status: `429`.

- Server error response:
```json
{
  "ok": false,
  "message": "Something went wrong. Please try again later."
}
```
  - HTTP status: `500`.

## CORS
- Add CORS headers to Worker responses:
  - `Access-Control-Allow-Origin: https://mahdymahareb.de` (or `*` if acceptable)
  - `Access-Control-Allow-Methods: POST, OPTIONS`
  - `Access-Control-Allow-Headers: Content-Type`
- Handle `OPTIONS` preflight requests by returning `200` with CORS headers.

## Validation Rules (mirror frontend)
- Required: `name`, `email`, `subject`, `message`.
- Email format regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- Message minimum length: `10` characters.
- Trim whitespace and limit max lengths (e.g., `name` 100 chars, `subject` 200, `message` 5000).

## Rate Limiting (simple and effective)
- Use Cloudflare KV to store counters keyed by client IP and a timestamp bucket (e.g., per minute).
- Policy: Allow up to 5 submissions per 10 minutes per IP.
- Return `429` once the limit is hit.

## Email Delivery Options
Pick one of these based on your stack:

1) Resend (recommended)
- Env vars in Worker:
  - `RESEND_API_KEY`
  - `MAIL_TO` (your inbox)
  - `MAIL_FROM` (verified sender like `no-reply@mahdymahareb.de`)
- Send request:
```ts
await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${RESEND_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: `[Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  })
});
```

2) Cloudflare Email Routing
- Configure routing to forward emails sent to `contact@mahdymahareb.de`.
- Worker can enqueue to a routing address or call a mail provider.

3) SendGrid/Postmark/etc.
- Similar to Resend; use provider’s API with env keys.

## Optional Persistence
- KV: Store JSON blob keyed by `contact:<timestamp>:<random>`.
- D1: Table `contacts(id, created_at, ip, name, email, subject, message)`.
- Benefits: audit trail, spam analysis, ability to reply later.

## Security & Abuse Prevention
- Sanitize inputs and limit max sizes.
- Basic spam checks:
  - Block known disposable email domains (optional).
  - Honeypot field (frontend hidden input like `company` must be empty; Worker rejects if set).
  - Require `Referer`/`Origin` to match your domain.
- Avoid leaking details in error messages; keep them generic server-side.

## Deployment Steps
1. Create a new Worker (Wrangler):
```bash
npm i -g wrangler
wrangler login
wrangler init contact-worker
```
2. Implement handler in `src/index.ts`:
- `POST /contact`: validate, rate limit, send email, persist, respond.
- `OPTIONS /contact`: CORS preflight.
3. Bind KV/D1 if used:
```toml
# wrangler.toml
[[kv_namespaces]]
binding = "CONTACT_KV"
id = "<kv-id>"
```
4. Set secrets/env vars:
```bash
wrangler secret put RESEND_API_KEY
wrangler secret put MAIL_TO
wrangler secret put MAIL_FROM
```
5. Deploy:
```bash
wrangler deploy
```
6. Set custom domain (optional):
```bash
wrangler routes
# or Configure in Cloudflare dashboard to map /contact on api.mahdymahareb.de
```

## Frontend Integration Changes

✅ **IMPLEMENTED** - The following changes have been successfully integrated into `components/ContactForm.tsx`:

```ts
// Real API endpoint configured
const CONTACT_API_URL = "https://portfolio-contact-worker.mmaharebi-cloudflare.workers.dev/contact";

// Honeypot field added to state
const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "", // Honeypot
});

// Complete error handling
const response = await fetch(CONTACT_API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
});

const data = await response.json();

// Handle all response types
if (response.ok && data.ok) {
  setStatus("success");
} else if (response.status === 400 && data.errors) {
  setErrors(data.errors); // Map to form fields
  setErrorMessage("Please check the highlighted fields.");
} else if (response.status === 429) {
  setErrorMessage("Too many requests. Please wait a few minutes.");
} else if (response.status === 403) {
  setErrorMessage("Request forbidden. Please refresh and try again.");
} else {
  setErrorMessage(data.message || "Something went wrong.");
}
```

Hidden honeypot field:
```tsx
<input
  type="text"
  name="company"
  value={formData.company}
  onChange={handleChange}
  aria-hidden="true"
  tabIndex={-1}
  autoComplete="off"
  style={{
    position: "absolute",
    left: "-9999px",
    width: "1px",
    height: "1px",
    opacity: 0,
  }}
/>
```

Enhanced error display in `components/FormStatus.tsx`:
- Success message with green border and checkmark
- Error message with red border and alert icon
- Context-specific error messages (validation, rate limit, network)
- Smooth animations for all state transitions

---

## Testing

The integration has been tested with the following scenarios:

✅ Valid submission → Success message and form reset  
✅ Invalid email → Field-specific error highlighting  
✅ Short message → Validation error display  
✅ Network error → Graceful error handling  
✅ Honeypot detection → Ready for bot submissions  

You can test the live form at: `http://localhost:3000/contact` (dev) or `https://mahdymahareb.de/contact` (production)

---

## Original Planning Documentation

Below is the original planning documentation written before implementation:

### Frontend Integration Changes (ORIGINAL PLAN)
- Replace the simulated API call in `components/ContactForm.tsx`:
```ts
const resp = await fetch("https://api.mahdymahareb.de/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
});
const data = await resp.json();
if (!resp.ok || !data.ok) {
  // Map server errors to local form errors if provided
  setStatus("error");
  return;
}
setStatus("success");
```
- Optionally add a hidden honeypot field:
```tsx
<input type="text" name="company" style={{ display: "none" }} onChange={handleChange} />
```
- Consider disabling submit on success and re-enabling after a delay (already implemented).

## Testing
- Local test with curl:
```bash
curl -i -X POST "https://api.mahdymahareb.de/contact" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Collaboration",
    "message": "I would like to discuss a project."
  }'
```
- Verify responses for valid/invalid inputs, rate limit, and server errors.

## Summary
- Single `POST /contact` endpoint with JSON body.
- Strong validation and minimal CORS.
- Use Resend (or similar) for email delivery.
- Optional KV/D1 persistence for auditability.
- Clear, consistent JSON responses that map cleanly to the frontend form states.
