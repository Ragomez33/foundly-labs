# Contract: Sitemap & Robots

**Feature**: `005-technical-seo` | **Type**: Crawl contract

## Sitemap

**Obligations**

- The build MUST generate a sitemap index at `/sitemap-index.xml` (plus its shard files) listing all
  public routes with absolute URLs based on the configured site origin
  (`https://foundlylabs.com`).
- All currently published routes MUST appear: `/`, `/privacy/`, `/terms/`.
- Routes that are not meant to be indexed MUST be excluded.

**Implementation note**: enabled by the `@astrojs/sitemap` integration in `astro.config.mjs` (the
`site` property is already set).

## robots.txt (`public/robots.txt`)

```text
User-agent: *
Allow: /

Sitemap: https://foundlylabs.com/sitemap-index.xml
```

**Obligations**

- MUST allow all agents (`User-agent: *`, `Allow: /`).
- MUST advertise the sitemap index URL.

## Verification

- `dist/sitemap-index.xml` exists and references the route shards.
- `dist/robots.txt` exists at the site root and contains the rules and sitemap line above.
- Fetching `/robots.txt` and `/sitemap-index.xml` on the built preview returns 200.
