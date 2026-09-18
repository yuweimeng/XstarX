# UNTITLED / 無題 — Personal Publication v0.1

A motion-first editorial portfolio/archive scaffold built to the supplied `motion-web` rules.

## Run

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run preview
```

## Content

Works live in `src/data/works/*.md`. Add/edit Markdown directly, or use `/admin/` after configuring the CMS backend.

The CMS UI uses Decap CMS 3.15.1. `public/admin/config.yml` intentionally contains `REPLACE_ME/REPLACE_ME` because the repository/auth provider has not been chosen yet. Do not deploy the admin publicly with that placeholder and expect login to work.

## Working identity

`UNTITLED / 無題` and Issue `00` are working design copy, not a claim about the final brand. Edit `src/data/site.ts` when the publication name is decided.

## Media

No portfolio images were invented. Entries without images render a designed printer-proof placeholder. Upload real files to `public/uploads/` or set each work's `image` field.

## Domain

The project is static and can be deployed to any static host. Keep the GoDaddy domain at GoDaddy and point DNS to the chosen host after deployment.
