# District Training Institute, Shimoga — Demo Website

A demo website for the District Training Institute, Shimoga (Government of Karnataka), built from a supplied page layout and the official Karnataka Government logo. It's a static site — plain HTML/CSS/JS, no build step, no server required.

## What's included

- `index.html` — staff login page
- `pages/home.html` — landing page with quick links
- `pages/about.html` — About Us (Principal / Vice Principal / Instructor)
- `pages/training-material.html` — General Topic, Office Procedure, K.F.C, K.C.S.R
- `pages/circular.html` — departmental circulars
- `pages/designed-by.html` — credits
- `pages/view-document.html` — view-only document viewer (used for the Time Management and CG Appointment training material)
- `assets/` — logo, and pre-rendered page images for the two training documents
- `css/style.css`, `js/script.js` — shared styling and behavior

The two training documents (Time Management, CG Appointment) are shown as page images inside a custom in-browser viewer rather than as downloadable PDFs — there's a watermark, right-click/print/save shortcuts are disabled, and there's no direct download link. This is a **deterrent, not a hard guarantee**: no browser-based viewer can fully stop someone from taking a screenshot or extracting a file via developer tools, but it does stop casual saving, downloading, and printing.

## Deploying on GitHub Pages

This repo is already a plain static site, so GitHub Pages can serve it with no build step.

1. Push this repo to GitHub (if you haven't already):
   ```
   git remote add origin https://github.com/vivekgwork-cmd/govt_website_roque.git
   git push -u origin main
   ```
2. On GitHub, open the repo → **Settings** → **Pages** (left sidebar, under "Code and automation").
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
5. Wait a minute or two — GitHub will show a banner with your live URL, typically:
   ```
   https://vivekgwork-cmd.github.io/govt_website_roque/
   ```
   You can also check progress under the repo's **Actions** tab (a "pages build and deployment" workflow run).
6. Open that URL — it should land on the login page (`index.html`).

### Updating the site later

Any time you push new commits to the `main` branch, GitHub Pages automatically rebuilds and redeploys within a minute or two. No extra steps needed.

### Using a custom domain (optional)

If you own a domain and want the site to use it instead of the `github.io` URL:
1. In **Settings → Pages → Custom domain**, enter your domain and save (this creates a `CNAME` file in the repo).
2. At your domain registrar, add a `CNAME` record pointing your subdomain (e.g. `www`) to `vivekgwork-cmd.github.io`, or the `A` records GitHub's docs specify for an apex domain.
3. Once DNS propagates, optionally enable **Enforce HTTPS** in the same settings page.

## Login credentials (demo)

- **Login ID:** `dtc_shimoga`
- **Password:** `Karnataka@123`

These are hardcoded client-side for demo purposes only — this is not real authentication and shouldn't be used to gate anything sensitive.
