# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Domain: `mahdymahareb.de` configured

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/mmaharebi/portfolio.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Project:**
   - Project Name: `portfolio` or `mahdymahareb`
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `pnpm build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `pnpm install` (auto-detected)

4. **Environment Variables (Optional):**
   - Add any from `.env.example` if needed
   - Not required for basic deployment

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - You'll get a `.vercel.app` URL

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Custom Domain Setup

### Configure mahdymahareb.de:

1. **In Vercel Dashboard:**
   - Go to your project
   - Settings → Domains
   - Add `mahdymahareb.de`
   - Add `www.mahdymahareb.de` (optional)

2. **DNS Configuration:**
   
   Add these records to your domain registrar:

   **For mahdymahareb.de:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For www.mahdymahareb.de:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

   **Or use Vercel Nameservers (easier):**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

3. **Wait for DNS propagation** (5-60 minutes)

4. **Enable HTTPS:**
   - Automatic via Vercel (Let's Encrypt)
   - Force HTTPS redirect in Vercel settings

## Post-Deployment Checklist

- ✅ Site loads at mahdymahareb.de
- ✅ HTTPS is working
- ✅ All pages accessible (/, /about, /blog, /contact)
- ✅ Blog posts render correctly
- ✅ Contact form works (check console for submission)
- ✅ Mobile responsive
- ✅ SEO meta tags present
- ✅ Sitemap accessible at /sitemap.xml
- ✅ Robots.txt accessible at /robots.txt

## Build & Deploy Settings

Already configured in `vercel.json`:
```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["fra1"],
  "outputDirectory": ".next"
}
```

## Environment Variables (Production)

Currently no secrets required. If you add analytics or form backend:

```bash
# In Vercel Dashboard: Settings → Environment Variables
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-id
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=your-endpoint
```

## Continuous Deployment

- Push to `main` branch → Auto-deploy to production
- Push to other branches → Deploy preview URLs
- Pull requests → Preview deployments

## Performance Optimization

Vercel automatically handles:
- ✅ Edge caching
- ✅ Image optimization
- ✅ Automatic compression
- ✅ CDN distribution
- ✅ SSL/TLS

## Monitoring

- **Analytics:** Enable in Vercel settings (free tier available)
- **Speed Insights:** Automatically enabled
- **Logs:** Available in Vercel dashboard

## Troubleshooting

### Build Fails:
```bash
# Test build locally first
pnpm build

# Check build logs in Vercel dashboard
```

### Domain not connecting:
- Verify DNS records
- Check domain registrar settings
- Wait for DNS propagation (up to 48h)
- Use `dig mahdymahareb.de` to check DNS

### Contact form not working:
- Check browser console for errors
- Form currently simulates submission (no backend)
- To add backend: Use Formspree, Web3Forms, or custom API route

## Next Steps

1. **Enable Analytics:**
   - Vercel Analytics (free)
   - Google Analytics (optional)

2. **Add Form Backend:**
   - [Formspre](https://formspree.io/)
   - [Web3Forms](https://web3forms.com/)
   - Custom API route

3. **SEO Improvements:**
   - Submit sitemap to Google Search Console
   - Add structured data (JSON-LD)
   - Create OpenGraph images

4. **Monitoring:**
   - Set up uptime monitoring
   - Enable Vercel Speed Insights

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

**Domain:** mahdymahareb.de  
**Contact:** contact@mahdymahareb.de  
**GitHub:** github.com/mmaharebi
