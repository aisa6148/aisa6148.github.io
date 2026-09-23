# aishwaryasatwani.com

Personal site. Static HTML/CSS/JS, no build step, no dependencies.

## Structure

```
index.html          all page content
css/
  tokens.css         color palette & design tokens (edit this to re-theme)
  base.css           reset, typography, nav, buttons
  sections.css       hero, value dial, research, industry, etc.
  responsive.css     breakpoints
js/
  main.js            entry point, wires the modules below
  theme.js           navy / deep-navy toggle
  nav.js             mobile nav + scroll-spy
  reveal.js           scroll-in animation
  valueDial.js        the interactive relevance/diversity slider
assets/              résumé PDF
images/              photos
```

## Run locally

Any static file server works, e.g.:

```
python3 -m http.server 8123
```

then open `http://localhost:8123`.

## Deploy

Push to `main` — GitHub Pages serves it directly. The `CNAME` file
points the custom domain (`www.aishwaryasatwani.com`) at this repo;
don't delete it or the domain mapping breaks.
