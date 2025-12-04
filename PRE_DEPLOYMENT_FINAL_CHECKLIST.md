# Pre-Deployment Final Checklist
**Date**: December 4, 2025  
**Portfolio**: mahdymahareb.de

## ✅ COMPLETED

### Content & Structure
- [x] **Fiber-perturbation project added** to About page
  - Highlighted Research entry with proper tags
  - Links to blog article (`/blog/fiber-mode-perturbation`)
  - Links to GitHub repo (`mmaharebi/fiber-perturbation`)
  - Consistent with existing project card aesthetic

- [x] **Blog article created**: Fiber Mode Perturbation
  - Rigorous Sturm–Liouville operator theory
  - First-order perturbation formulas
  - 7 publication-quality figures in `public/posts/fiber-mode-perturbation/`
  - GitHub repo link included as entry point
  - All LaTeX math uses single backslashes (KaTeX compatible)

- [x] **Contact form integrated** with Cloudflare Worker
  - Real API endpoint configured
  - Honeypot field for bot detection
  - Comprehensive error handling (validation, rate limit, network)
  - Beautiful animated status messages
  - Auto-reset and error clearing

- [x] **Build verification**
  - Production build successful (`pnpm build`)
  - All routes generated correctly
  - TypeScript compilation clean
  - Blog routes include fiber-mode-perturbation

### Technical Setup
- [x] **Sitemap** (`app/sitemap.ts`)
  - Dynamically includes all blog posts
  - Proper URLs and priorities
  - Change frequencies set

- [x] **Robots.txt** (`app/robots.ts`)
  - Allows all crawlers
  - Points to sitemap
  - Disallows `/api/` and `/admin/`

- [x] **Git hygiene**
  - `.gitignore` excludes `fiber-perturbation/` directory
  - All changes committed with clear messages
  - No secrets in repository

---

## 🔍 TO VERIFY BEFORE DEPLOYMENT

### Contact Form Testing
- [ ] **Test contact form end-to-end**
  ```bash
  # From browser or terminal
  curl -X POST "https://portfolio-contact-worker.mmaharebi-cloudflare.workers.dev/contact" \
    -H "Content-Type: application/json" \
    -H "Origin: https://mahdymahareb.de" \
    --data '{
      "name": "Test User",
      "email": "test@example.com",
      "subject": "Pre-deployment test",
      "message": "Verifying contact form before deployment."
    }'
  ```
  - [ ] Verify email arrives at `contact@mahdymahareb.de`
  - [ ] Test validation errors (invalid email, short message)
  - [ ] Test rate limiting (6 submissions quickly)
  - [ ] Verify CORS works from `https://mahdymahareb.de`
  - [ ] Check honeypot catches bots (send with `company` field filled)

### Blog & Routes
- [ ] **Navigate to `/blog/fiber-mode-perturbation`**
  - [ ] Article loads correctly
  - [ ] All 7 figures render (check paths in browser devtools)
  - [ ] KaTeX math renders cleanly (no double backslashes, no align errors)
  - [ ] GitHub repo link is clickable and correct
  - [ ] Tags and metadata display properly

- [ ] **Check blog listing** (`/blog`)
  - [ ] Fiber article appears in the list
  - [ ] Tags filter includes new tags (Photonics, Perturbation Theory, Waveguides)
  - [ ] Search functionality finds fiber article
  - [ ] Sorting by date works

- [ ] **Navigate to `/about`**
  - [ ] Fiber project card appears
  - [ ] "Research" filter shows fiber project
  - [ ] Highlight badge shows on fiber project
  - [ ] Links to blog and GitHub work
  - [ ] Card aesthetic matches other projects

### SEO & Metadata
- [ ] **Check page metadata**
  - [ ] Fiber article has proper `<title>` and `<meta description>`
  - [ ] Open Graph tags present (`og:title`, `og:description`, `og:type`, `og:image`)
  - [ ] Twitter card tags if configured
  - [ ] Canonical URLs point to correct domain

- [ ] **Verify sitemap.xml**
  - Visit `https://mahdymahareb.de/sitemap.xml`
  - [ ] Includes `/blog/fiber-mode-perturbation`
  - [ ] All routes present
  - [ ] Proper lastModified dates

- [ ] **Verify robots.txt**
  - Visit `https://mahdymahareb.de/robots.txt`
  - [ ] Points to sitemap
  - [ ] Allows main routes

### Performance & UX
- [ ] **Lighthouse audit**
  - Run on `/`, `/about`, `/blog`, `/contact`, `/blog/fiber-mode-perturbation`
  - [ ] Performance score > 90
  - [ ] Accessibility score > 95
  - [ ] Best Practices score > 90
  - [ ] SEO score > 95
  - [ ] Check LCP (Largest Contentful Paint) < 2.5s
  - [ ] Check CLS (Cumulative Layout Shift) < 0.1

- [ ] **Mobile responsiveness**
  - [ ] Test on mobile viewport (375px, 768px, 1024px)
  - [ ] Contact form works on mobile
  - [ ] Blog article readable on mobile
  - [ ] Project cards responsive
  - [ ] Navigation menu functional

- [ ] **Accessibility**
  - [ ] Keyboard navigation works (Tab, Enter, Escape)
  - [ ] Honeypot field is truly invisible (not just `display: none`)
  - [ ] Focus indicators visible
  - [ ] ARIA labels present where needed
  - [ ] Color contrast passes WCAG AA

### Asset Verification
- [ ] **Image optimization**
  - [ ] All images use `next/image` where applicable
  - [ ] PDF figures load from `public/posts/fiber-mode-perturbation/`
  - [ ] No broken image links
  - [ ] Alt text present on images

- [ ] **Run asset copy script**
  ```bash
  bash scripts/copy-post-assets.sh
  ```
  - [ ] Verify output shows fiber article assets copied

### Code Quality
- [ ] **Fix linting warnings** (optional but recommended)
  - [ ] Remove unused imports in `app/contact/page.tsx`
  - [ ] Remove unused import in `app/page.tsx`
  - [ ] Fix `react/no-unescaped-entities` in About page
  - [ ] Consider fixing `react-hooks/set-state-in-effect` warnings

- [ ] **TypeScript strict mode**
  - [ ] No TS errors in build output
  - [ ] All props properly typed

### Environment & Secrets
- [ ] **Cloudflare Worker verification**
  - [ ] Worker deployed to production
  - [ ] `ALLOWED_ORIGIN` set to `https://mahdymahareb.de`
  - [ ] `RESEND_API_KEY` secret set
  - [ ] `MAIL_TO` secret set to `contact@mahdymahareb.de`
  - [ ] `MAIL_FROM` secret set to `no-reply@mahdymahareb.de`
  - [ ] KV namespace bound correctly

- [ ] **Resend email verification**
  - [ ] Domain `mahdymahareb.de` verified in Resend
  - [ ] DKIM records configured
  - [ ] SPF records configured
  - [ ] Test email delivery

### Vercel Configuration
- [ ] **Review `vercel.json`**
  - [ ] Routing rules correct
  - [ ] Headers configured (if any)
  - [ ] Environment variables set (if needed)

- [ ] **Deployment settings**
  - [ ] Production domain: `mahdymahareb.de`
  - [ ] Build command: `pnpm build`
  - [ ] Output directory: `.next`
  - [ ] Node version: Latest LTS

---

## 📋 FINAL PRE-DEPLOYMENT STEPS

### 1. Content Review
- [ ] Proofread all new content for typos
- [ ] Check no placeholder text remains (`TODO`, `FIXME`, etc.)
- [ ] Verify all external links work
- [ ] Ensure dates are current

### 2. Local Testing
```bash
# Clean build
rm -rf .next
pnpm build

# Run production preview
pnpm start

# Open in browser and test:
# - http://localhost:3000
# - http://localhost:3000/about
# - http://localhost:3000/blog
# - http://localhost:3000/blog/fiber-mode-perturbation
# - http://localhost:3000/contact
```

### 3. Git Status
```bash
git status
# Ensure all changes committed
# No uncommitted sensitive files
```

### 4. Deploy to Vercel
```bash
# Option 1: Push to main (if auto-deploy enabled)
git push origin main

# Option 2: Use Vercel CLI
vercel --prod
```

### 5. Post-Deployment Verification
- [ ] Visit `https://mahdymahareb.de`
- [ ] Click through all navigation items
- [ ] Submit test contact form
- [ ] Check email received
- [ ] Verify fiber article loads with figures
- [ ] Test on mobile device
- [ ] Share links to verify Open Graph previews

---

## 🎯 OPTIONAL ENHANCEMENTS (Post-Launch)

### Performance
- [ ] Add image CDN (Cloudinary, Imgix)
- [ ] Implement ISR for blog posts
- [ ] Add service worker for offline support
- [ ] Optimize font loading

### Analytics
- [ ] Set up Vercel Analytics
- [ ] Configure Google Analytics (if desired)
- [ ] Add error monitoring (Sentry)

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add structured data (JSON-LD) for blog posts
- [ ] Create `humans.txt`

### Content
- [ ] Add more blog posts
- [ ] Update projects as new work completes
- [ ] Add resume/CV download link
- [ ] Consider adding a newsletter signup

---

## 🚨 CRITICAL ITEMS (Must-Do Before Deploy)

1. **Test contact form** - Verify email delivery works
2. **Check fiber article** - All 7 figures must load
3. **Verify routes** - All pages accessible
4. **Mobile test** - Basic functionality on phone
5. **CORS check** - Worker accepts requests from production domain

---

## ✨ DEPLOYMENT READY WHEN

- [x] All "COMPLETED" items verified
- [ ] All "TO VERIFY" items checked
- [ ] Critical items tested
- [ ] No build errors
- [ ] Clean git state

**Estimated Time to Deployment**: 30-60 minutes (testing + verification)

---

**Good luck with the deployment! 🚀**
