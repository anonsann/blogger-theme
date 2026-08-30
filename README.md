# WIRED://LAIN — Terminal Fansub Theme for Blogger

**"No matter where you are, everyone is always connected."**

A complete, installable Blogger (Blogspot) theme built for
[lainfansub.blogspot.com](https://lainfansub.blogspot.com/) — an Indonesian
fansub blog for *Serial Experiments Lain*. The design is a CRT / Wired terminal
aesthetic: phosphor-green on near-black, scanlines, glitch typography, terminal
window cards, and a monospace interface — fully responsive and mobile-first.

---

## 📦 Files

| File | What it is |
|---|---|
| **`wired-lain-theme.xml`** | **The Blogger theme** — upload this to Blogger (see below). |
| `assets/theme.css` | Canonical stylesheet (same CSS embedded in the XML, kept in sync). |
| `assets/theme.js` | Canonical vanilla-JS (same script embedded in the XML). |
| `preview/index.html` | Static preview — **homepage** (hero + post cards + sidebar). |
| `preview/post.html` | Static preview — a **single episode post** (info table, related, comments). |
| `preview/label.html` | Static preview — **label / search results** page. |
| `preview/404.html` | Static preview — the themed **error 404** page. |

> The `preview/` folder is a plain static mirror used to preview the design
> outside of Blogger. The XML file is fully self-contained (CSS + JS are
> inlined), so it is the only file you actually upload.

---

## 🚀 Installation (2 minutes)

1. Back up your current theme first:
   Blogger dashboard → **Tema** → ⋮ (next to "Customize") → **Cadangkan** → **Unduh**.
2. Open **Tema** → ⋮ → **Pulihkan** (Restore).
3. Click **Unggah** and select **`wired-lain-theme.xml`** from this repo.
4. Done. Visit your blog — the WIRED terminal is live.

> The theme keeps your existing pages (About / Contact / Sitemap), labels, posts
> and the Telegram links inside posts. It works with the widgets Blogger already
> knows (Header, Pages, Blog, Popular Posts, Labels, Attribution).

---

## ✨ Features

**Aesthetic**
- CRT scanline overlay with subtle flicker + screen vignette
- Glitch RGB-split hero & logo text (animated on the homepage hero, hover-only on the logo)
- Terminal-window cards (traffic-light dots), blinking cursors, `$` command prompts
- Phosphor-green / cyan / red terminal palette with glow shadows
- Google Fonts: **Share Tech Mono** (UI/headings) + **Inter** (body)
- Subtle background perspective grid

**Blog-specific**
- Homepage **terminal hero** with CTAs (episodes + Telegram `t.me/lainsubs`)
- **Post cards** with thumbnail, auto **EP_XX badge** (parsed from "Episode N" titles),
  label, date, comment count, snippet, "baca selengkapnya" button
- **Single post page**: breadcrumb (home → label), meta line, themed **info tables**
  (your "Information" tables render as terminal tables), images, blockquotes, code,
  share buttons (FB / WA / X / Telegram), labels
- **Related posts** loaded automatically from the same label via the Blogger JSON feed
  (thumbnails where available, `EP_XX` fallback tiles otherwise)
- **Threaded comments** fully restyled (comment frames, author, date, reply nesting,
  comment form)
- **Label / search / archive** view headers (`$ grep -ri "query" ./wired`)
- **Custom 404** ("Sinyal putus... node tidak ditemukan")
- Pagination styled as `<< newer / home / older >>`

**Interaction (vanilla JS, no dependencies)**
- Mobile hamburger navigation
- Reading-progress bar at the top
- Back-to-top button
- Scroll-reveal animations (IntersectionObserver, no-JS safe)
- Auto EP-badge generation
- Related-posts feed loader
- Footer year auto-update
- Console easter egg for fellow Wired tinkerers

**SEO / technical**
- Responsive v3 Blogger layout (`b:responsive`, `b:layoutsVersion=3`)
- `all-head-content` kept (canonical, Open Graph, feeds, structured data from Blogger)
- Extra `WebSite` + `SearchAction` JSON-LD on the homepage
- Semantic HTML (`header/main/article/nav/aside/footer/section`, breadcrumb nav)
- Lazy-loaded thumbnails, accessible labels/aria on the nav toggle

---

## 🎨 Customization

- **Colors** — the theme registers Blogger theme variables
  (`backgroundColor`, `accentColor`, `textColor`, `panelColor`); tweak them under
  **Tema → Sesuaikan → Lanjutan**, or edit the `:root` CSS variables at the top of
  `assets/theme.css` / inside `<b:skin>` in the XML.
- **Header logo** — by default it renders the glitch text logo from your blog title.
  If you upload a header image via **Tata Letak → Header widget**, it shows that instead.
- **Hero / sidebar / footer text** — these live in the XML as fixed HTML widgets
  (the sidebar "the wired // node" card, the footer ASCII + status). Edit the text
  directly in the XML, or remove those widgets from **Tata Letak** and add your own.
- **Widgets** — add/remove sidebar widgets normally via **Tata Letak**
  (search, Popular Posts, Labels, HTML cards are all pre-styled).
- **Pages menu** — edit the **Pages** widget in Layout; the "Beranda" home link is added
  automatically.

---

## 🧪 Previewing locally

```bash
python3 -m http.server 8080
# open http://localhost:8080/preview/index.html
```

(The theme's live-preview server in this environment serves the same files.)

---

## 📝 Notes

- The XML is self-contained — CSS and JS are embedded in `<b:skin>` / `<script>`,
  so Blogger needs no external hosting. `assets/theme.css` and `assets/theme.js`
  mirror that content for easy editing and for the static preview.
- All text shown to readers is in Indonesian to match the blog; terminal chrome
  (prompts, commands) stays in the Wired/English style.
- Attribution to Blogger is preserved (required by Blogger's Terms of Service).

*Present day. Present time. — wire in.*
