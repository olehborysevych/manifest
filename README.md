# Manifest Leaflet Website

A simple, multi-language leaflet website with voting functionality and donation support. Designed to be print-friendly for creating physical leaflets.

## Features

- Multi-language support (English, Ukrainian, Spanish, French, German)
- Automatic language detection based on browser settings
- Print-optimized layout for A4 leaflets
- QR code generation pointing to the live site
- Vote counter with hCaptcha protection
- Crypto wallet donation section
- Fully responsive design

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Vercel Serverless Functions
- Database: Vercel KV (Redis)
- Captcha: hCaptcha
- QR Code: QRCode.js

## Setup Instructions

### 1. Prerequisites

- Node.js (v18 or higher)
- A Vercel account (free tier available)
- hCaptcha account (free tier available)

### 2. Get hCaptcha Keys

1. Go to https://www.hcaptcha.com/
2. Sign up for a free account
3. Create a new site
4. Copy your Site Key and Secret Key

### 3. Local Development

```bash
# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env and add your hCaptcha secret key
# HCAPTCHA_SECRET_KEY=your_secret_key_here

# Start local development server
npm run dev
```

### 4. Update Configuration

#### Update hCaptcha Site Key

Edit `index.html` and replace the placeholder:

```html
<div class="h-captcha" data-sitekey="YOUR_HCAPTCHA_SITE_KEY"></div>
```

Replace `YOUR_HCAPTCHA_SITE_KEY` with your actual hCaptcha site key.

#### Update Crypto Wallet Address

Edit `index.html` and replace the placeholder Bitcoin address:

```html
<code class="wallet-address">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
```

You can also add multiple cryptocurrencies by duplicating the crypto-wallet div.

#### Customize Content

Edit `script.js` to customize the text content for each language in the `translations` object.

### 5. Deploy to Vercel

#### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel --prod
```

#### Option B: Deploy via GitHub

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Configure environment variables in Vercel dashboard
5. Deploy

### 6. Set Up Vercel KV (Vote Storage)

1. Go to your project in Vercel Dashboard
2. Navigate to Storage tab
3. Create a new KV Database
4. Vercel will automatically add the required environment variables
5. Uncomment the KV code in `api/votes.js` and `api/vote.js`:

In both files, uncomment this block:
```javascript
const { kv } = await import('@vercel/kv');
const count = await kv.get('vote_count') || 0;
// or
newCount = await kv.incr('vote_count');
```

And remove/comment out the placeholder code.

6. Redeploy your site

### 7. Add Environment Variables to Vercel

In your Vercel project settings, add:

- `HCAPTCHA_SECRET_KEY`: Your hCaptcha secret key

### 8. Update QR Code URL

After deployment, your site will have a permanent URL (e.g., `your-project.vercel.app`). The QR code will automatically update to point to the live site.

If you want to use a custom domain:
1. Add custom domain in Vercel dashboard
2. The QR code will automatically use the custom domain

## Customization

### Adding More Languages

Edit `script.js` and add a new language object to the `translations` object:

```javascript
translations.it = {
    title: "Il Nostro Manifesto",
    paragraphs: [...],
    // ... other translations
};
```

Then add the language option to `index.html`:

```html
<option value="it">Italiano</option>
```

### Styling

Edit `styles.css` to customize colors, fonts, and layout. The print styles are in the `@media print` section.

### Print Tips

To print the leaflet:
1. Open the page in your browser
2. Press Ctrl/Cmd + P
3. Select A4 paper size
4. The voting section and language selector will be hidden automatically
5. Print or save as PDF

## Cost Breakdown (Free Tier)

- Vercel Hosting: Free (100GB bandwidth/month)
- Vercel KV: Free (256MB storage, 3000 commands/day)
- hCaptcha: Free (unlimited)
- Total: $0/month for small-scale usage

## Upgrading for Higher Traffic

If you exceed free tier limits:
- Vercel Pro: $20/month (unlimited sites, more bandwidth)
- Vercel KV: $1/100k commands after free tier
- hCaptcha Pro: $20/month (advanced features)

## Alternative Deployment Options

### Netlify (Alternative to Vercel)

Similar free tier, slightly different setup:
1. Use Netlify Functions instead of Vercel Functions
2. Use Netlify Blobs or external Redis for storage
3. Deploy via Netlify CLI or GitHub integration

### Cloudflare Pages + Workers (Very Cheap)

1. Deploy static files to Cloudflare Pages (free)
2. Use Cloudflare Workers for API (free tier: 100k requests/day)
3. Use Cloudflare KV for storage (free tier: 1GB, 100k reads/day)

## Security Notes

- The hCaptcha prevents automated voting
- Vercel KV is secure and encrypted
- No user data is collected (fully anonymous voting)
- HTTPS is enforced by Vercel automatically

## Troubleshooting

**Vote counter not working:**
- Check that hCaptcha keys are correctly configured
- Ensure Vercel KV is set up and code is uncommented
- Check browser console for errors

**QR code not generating:**
- Check that QRCode.js library is loading
- Verify no JavaScript errors in console

**Language not changing:**
- Clear browser cache and localStorage
- Check browser console for errors

## License

Free to use and modify for your purposes.
