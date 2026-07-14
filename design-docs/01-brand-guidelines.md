# BLANKWET ACADEMY — Brand Guidelines & Design System

## 1. Brand Identity

### 1.1 Name & Domain
- **Primary Domain**: `academy.blankwet.eu`
- **Brand Name**: "Blankwet Academy" / "Академия Blankwet"
- **Tagline Options**:
  1. "Знанието е най-секси аксесоарът" (primary)
  2. "Учи без срам. Живей без граници."
  3. "Твоето тяло. Твоите правила. Твоето откритие."
  4. "Образование, което не те съди"

### 1.2 Logo System

**Primary Logo (Horizontal)**
- Wordmark: "blankwet" in italic serif + "academy" in clean sans-serif sub-mark
- The iconic droplet/leaf symbol sits above the 'w' in "wet"
- Color: Primary Purple (#6B5B95) on light backgrounds
- Clear space: minimum 20px around the logo on all sides
- Minimum size: 120px width for digital

**Variations:**
| Variant | Usage | Color |
|---------|-------|-------|
| Horizontal (primary) | Header, nav | #6B5B95 |
| Vertical (stacked) | Footer, loading screens | #6B5B95 |
| Monochrome White | Dark backgrounds, hero overlays | #FFFFFF |
| Monochrome Dark | Light backgrounds, subtle placement | #2D2A33 |
| Icon Only | Favicon, app icon, small badges | #6B5B95 droplet |

### 1.3 Color Palette

**Primary Colors — Purple Family**
| Token | Hex | Usage |
|-------|-----|-------|
| `--purple-900` | #4A3F6B | Deepest shade, emphasis text |
| `--purple-800` | #5A4D80 | Hover states, dark accents |
| `--purple-700` | #6B5B95 | **PRIMARY** — logo, headings, icons, nav |
| `--purple-600` | #7B6BA5 | Interactive elements |
| `--purple-500` | #8B7BB5 | Secondary accents, badges |
| `--purple-400` | #A89BC9 | Decorative, backgrounds |
| `--purple-300` | #C4BBDB | Light backgrounds, borders |
| `--purple-200` | #DDD7EC | Subtle fills, hover bg |
| `--purple-100` | #F3F0F8 | Section backgrounds |
| `--purple-50`  | #F8F7FB | Lightest tint |

**Accent Colors — Gold Family**
| Token | Hex | Usage |
|-------|-----|-------|
| `--gold-600` | #C9A04D | Active states |
| `--gold-500` | #E0B65A | Hover on buttons |
| `--gold-400` | #F0C675 | **PRIMARY ACCENT** — CTAs, highlights |
| `--gold-300` | #F5D99A | Light highlights, tags |
| `--gold-200` | #FAEBC4 | Subtle accent backgrounds |
| `--gold-100` | #FDF6E9 | Warmest light background |

**Neutral Colors — Text & Surfaces**
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary`   | #2D2A33 | Main headings, body text |
| `--text-secondary` | #6B6575 | Descriptions, labels |
| `--text-muted`     | #9B95A5 | Placeholders, captions |
| `--text-inverse`   | #FFFFFF | Text on dark/colored backgrounds |
| `--surface-white`  | #FFFFFF | Cards, modals |
| `--surface-cream`  | #FAF8F5 | Alternate page backgrounds |
| `--surface-lavender` | #F3F0F8 | Soft section backgrounds |
| `--border-subtle`  | #E8E4EE | Card borders, dividers |
| `--border-default` | #D4CFE0 | Input borders |

**Gradients**
| Name | Value | Usage |
|------|-------|-------|
| `gradient-hero` | linear-gradient(135deg, #5A4D80 0%, #8B7BB5 100%) | Hero overlays |
| `gradient-newsletter` | linear-gradient(180deg, #5A4D80 0%, #B8AFC8 100%) | Newsletter CTA section |
| `gradient-gold` | linear-gradient(135deg, #F0C675 0%, #F5D99A 100%) | Accent highlights |
| `gradient-dark` | linear-gradient(180deg, #2D2A33 0%, #4A3F6B 100%) | Dark mode hero |

**Semantic Colors (Softened)**
| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | #7BA88C | Success states, confirmations |
| `--error`   | #C47B7B | Error states, validation (soft red) |
| `--warning` | #D4A76A | Warnings, caution |
| `--info`    | #7B9AC4 | Information, tips |

### 1.4 Typography

**Font Families**
| Role | Font | Weights | Fallback |
|------|------|---------|----------|
| Headings | **Playfair Display** | 400, 500, 600, 700 | Georgia, serif |
| Body | **Inter** | 300, 400, 500, 600, 700 | -apple-system, sans-serif |
| Accent/Quotes | **Cormorant Garamond** | 400, 400i, 600 | Times New Roman, serif |

**Type Scale** (Major Third — 1.250 ratio, Base 16px)
| Token | Size | Line-Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-display` | 80px / 5rem | 1.1 | 600 | Hero headlines (desktop) |
| `text-h1` | 64px / 4rem | 1.15 | 600 | Page titles |
| `text-h2` | 48px / 3rem | 1.2 | 600 | Section headings |
| `text-h3` | 36px / 2.25rem | 1.25 | 500 | Subsection headings |
| `text-h4` | 28px / 1.75rem | 1.3 | 500 | Card titles |
| `text-h5` | 22px / 1.375rem | 1.35 | 500 | Small headings |
| `text-h6` | 18px / 1.125rem | 1.4 | 600 | Labels, overlines |
| `text-body-lg` | 18px / 1.125rem | 1.65 | 400 | Lead paragraphs |
| `text-body` | 16px / 1rem | 1.6 | 400 | Body text |
| `text-body-sm` | 14px / 0.875rem | 1.55 | 400 | Small text |
| `text-caption` | 12px / 0.75rem | 1.5 | 500 | Captions, metadata |
| `text-overline` | 11px / 0.6875rem | 1.4 | 600 | Uppercase labels, tracking: 0.1em |

**Responsive Scale** (Mobile < 640px)
- Display: 80px → 40px
- H1: 64px → 36px
- H2: 48px → 32px
- H3: 36px → 24px
- H4: 28px → 20px

### 1.5 Visual Language

**Shapes & Radii**
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | Small buttons, badges, inputs |
| `radius-md` | 12px | Cards, panels |
| `radius-lg` | 20px | Large cards, modals |
| `radius-xl` | 28px | Hero containers, featured sections |
| `radius-full` | 9999px | Pill buttons, avatars, tags |

**Shadows**
| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | 0 1px 3px rgba(43, 42, 51, 0.06) | Subtle elevation |
| `shadow-md` | 0 4px 12px rgba(43, 42, 51, 0.08) | Cards, dropdowns |
| `shadow-lg` | 0 8px 24px rgba(43, 42, 51, 0.10) | Modals, popovers |
| `shadow-xl` | 0 16px 48px rgba(43, 42, 51, 0.12) | Overlays, featured |
| `shadow-gold` | 0 4px 16px rgba(240, 198, 117, 0.25) | CTA glow |

**Spacing Scale** (8px base)
| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-20` | 80px |
| `space-24` | 96px |

**Icons**
- Style: Outline (Lucide React)
- Stroke width: 1.5px
- Stroke cap: rounded
- Default color: `--purple-700` (#6B5B95)
- Size: 16px (sm), 20px (md), 24px (lg)

**Photography Style**
- Natural light, soft and warm
- Diverse women, authentic poses (no stock cliches)
- Soft focus backgrounds (bokeh)
- Warm color grading (slightly desaturated, golden tones)
- No explicit content — tasteful, intimate but not sexualized
- Comfortable, home-like settings
- Real women, not models — authentic representation

---

## 2. Tone of Voice & Copy Guidelines

### 2.1 Brand Voice Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Empowering** | Inspiring confidence without being preachy | "Твоето тяло знае какво иска — ние ти помагаме да го чуеш" |
| **Educational** | Expert but approachable | "Оргазмът не е дестинация, а част от пътуването" |
| **Playful** | Fun, sex-positive, with class | "Щастливи последствия — не само за чаршафите" |
| **Inclusive** | For ALL women, no exceptions | "Независимо дали си 25 или 55, независимо от опита ти" |
| **Non-judgmental** | No "shoulds", only "coulds" | "Не "трябва", а "можеш да опиташ" |

### 2.2 Writing Rules

✅ **DO:**
- Use "ти" form (not "Вие")
- Use active voice
- Explain medical terms when used
- Use emoji sparingly: ✨ 💡 🌿 ❤️ 🔮 💜 🌸
- Keep headlines benefit-driven
- Use curiosity gaps: "Неочакваната причина, поради която..."

❌ **DON'T:**
- Use shame-based language ("ако не знаеш това...")
- Use fear-based motivation
- Use 🍆 🍑 in official contexts
- Use aggressive CTAs ("Купи сега или изпусни!")
- Use medical jargon without explanation
- Use "трябва", "трябваше", "грешно"

### 2.3 Copy Examples by Section

**Hero Headlines:**
- "Сексуалното образование, което трябваше да получиш в училище — но наистина"
- "Научи се да обичаш тялото си — без срам и без табута"
- "Твоето пътуване към по-добър интимен живот започва тук"

**CTA Buttons:**
- "Започни безплатно" → Primary
- "Виж всички уроци" → Secondary
- "Научи повече" → Ghost
- "Запиши ме" → Primary
- "Пусни видеото" → Accent icon button

**Testimonials:**
- "По-уверена съм в себе си от всякога" — Мария, 32
- "Най-накрая информация на български, без срам" — Анна, 28

**Error Messages:**
- "Опа, нещо се обърка. Опитай отново 💜"
- "Тази страница не съществува — но има много други интересни неща"

---

## 3. Component Library

### 3.1 Buttons

**Primary Button**
- Background: `--gold-400` (#F0C675)
- Text: `--text-primary` (#2D2A33)
- Font: Inter 600, 14px, tracking 0.02em
- Padding: 14px 28px
- Border-radius: `radius-full` (pill)
- Hover: background `--gold-500` (#E0B65A), scale(1.02), shadow-gold
- Active: scale(0.98)
- Disabled: opacity 0.5, cursor not-allowed

**Secondary Button (Outline)**
- Background: transparent
- Border: 1.5px solid `--gold-400`
- Text: `--gold-600` (#C9A04D)
- Hover: background `--gold-100`, border `--gold-500`

**Ghost Button**
- Background: transparent
- Text: `--purple-700`
- Hover: background `--purple-100`

**Icon Button**
- Size: 40px × 40px
- Border-radius: `radius-full`
- Background: `--surface-white`
- Shadow: `shadow-sm`
- Hover: `shadow-md`, scale(1.05)

### 3.2 Cards

**Course Card**
- Background: `--surface-white` (#FFFFFF)
- Border: 1px solid `--border-subtle`
- Border-radius: `radius-lg` (20px)
- Shadow: `shadow-sm`
- Padding: 0 (image bleeds) / 20px (content area)
- Hover: translateY(-4px), `shadow-md`, 200ms ease-out
- Image: 16:9 aspect ratio, border-radius top 20px

**Value Proposition Card**
- Background: `--surface-white`
- Border-radius: `radius-lg`
- Shadow: `shadow-md`
- Padding: 32px
- Icon: 48px, `--purple-700`, centered top
- Text: centered, title + description

**Testimonial Card**
- Background: `--surface-lavender` (#F3F0F8)
- Border-radius: `radius-lg`
- Padding: 28px
- Quote icon: `--gold-400`, 32px
- Stars: `--gold-400` filled
- Avatar: 48px circle, illustrated or generic

### 3.3 Forms

**Text Input**
- Height: 48px
- Background: `--surface-white`
- Border: 1px solid `--border-default`
- Border-radius: `radius-full` (pill) or `radius-md`
- Padding: 0 20px
- Font: Inter 400, 16px
- Placeholder: `--text-muted`
- Focus: 2px solid `--purple-500`, shadow-sm
- Error: border `--error`, background tint 5%

**Textarea**
- Same as input but height: auto, min-height 120px
- Border-radius: `radius-md`

**Select/Dropdown**
- Same styling as input
- Custom dropdown with `--surface-white` background
- Hover: `--purple-100`

### 3.4 Navigation

**Header Navigation**
- Height: 72px desktop, 60px mobile
- Background: transparent → `--surface-white` with backdrop-blur on scroll
- Logo: left-aligned
- Links: Inter 500, 14px, `--text-secondary`
- Active: `--purple-700`
- Hover: `--purple-700`, underline animation
- CTA: Primary button "Започни"
- Mobile: Hamburger → full-screen overlay

**Footer**
- Background: `--purple-900` (#4A3F6B) or `--surface-cream`
- 4-column grid: Help, Contact, Payment, Socials
- Bottom bar: copyright, credits
- Link color: `--text-muted` → `--text-inverse` on hover

**Bottom Navigation (Mobile)**
- Fixed bottom, 64px height
- 4-5 icon + label items
- Active: `--purple-700` with icon filled
- Inactive: `--text-muted`
- Background: `--surface-white` with top border

### 3.5 Video Player (Custom)

**Container**
- Aspect ratio: 16:9 (landscape), 9:16 (portrait mobile)
- Border-radius: `radius-lg`
- Background: `#000000`

**Play Button**
- Size: 64px
- Background: `--gold-400` with 80% opacity
- Icon: white, 24px
- Pulse animation on idle

**Controls Bar**
- Height: 40px
- Background: linear-gradient(transparent, rgba(0,0,0,0.7))
- Progress: `--gold-400` fill on `--text-muted` track
- Buttons: white, 20px
- Auto-hide after 3s of inactivity

### 3.6 Modals & Overlays

**Modal**
- Backdrop: rgba(0,0,0,0.6) + backdrop-filter: blur(8px)
- Container: `--surface-white`, `radius-lg`, max-width 480px
- Padding: 32px
- Entrance: fade + scale(0.95→1), 200ms ease-out
- Exit: fade + scale(1→0.95), 150ms ease-in

**Toast / Snackbar**
- Background: `--purple-800`
- Text: white
- Border-radius: `radius-md`
- Position: bottom-center or top-right
- Auto-dismiss: 4s

### 3.7 Loading States

**Skeleton Screens**
- Background: `--purple-200` (#DDD7EC)
- Shimmer: linear-gradient animation
- Border-radius matching content

**Spinner**
- Size: 24px (sm), 40px (md), 64px (lg)
- Color: `--purple-700`
- Stroke: 3px
- Animation: rotate 1s linear infinite

---

## 4. Layout System

### 4.1 Grid
- 12-column grid
- Gutter: 24px (desktop), 16px (tablet), 12px (mobile)
- Max container: 1280px centered
- Side padding: 48px (desktop), 24px (tablet), 16px (mobile)

### 4.2 Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| `sm` | 640px | 2-column grids, stacked nav |
| `md` | 768px | Tablet optimizations |
| `lg` | 1024px | Full desktop layout |
| `xl` | 1280px | Max container width |
| `2xl` | 1440px | Wide screen enhancements |

### 4.3 Z-Index Scale
| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | 0 | Default |
| `z-elevated` | 10 | Cards, raised elements |
| `z-sticky` | 100 | Sticky header |
| `z-dropdown` | 200 | Dropdowns, tooltips |
| `z-modal` | 300 | Modals, drawers |
| `z-toast` | 400 | Notifications |

---

## 5. Animation & Motion

### 5.1 Page Transitions
- Type: Fade + slight slide up (translateY 20px → 0)
- Duration: 300ms
- Easing: cubic-bezier(0.25, 0.1, 0.25, 1)

### 5.2 Scroll Behavior
- Smooth scroll globally: scroll-behavior: smooth
- Scroll-triggered reveals: fade + translateY(30px → 0)
- Header: transparent → solid on scroll (after 50px)

### 5.3 Micro-interactions
| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Cards | Hover | translateY(-4px) + shadow | 200ms |
| Buttons | Hover | scale(1.02) + shadow | 150ms |
| Buttons | Press | scale(0.98) | 100ms |
| Links | Hover | Underline slide-in | 200ms |
| Icons | Hover | scale(1.1) + color change | 150ms |
| Inputs | Focus | Border color + shadow | 200ms |

### 5.4 Easing Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `ease-default` | cubic-bezier(0.25, 0.1, 0.25, 1) | General |
| `ease-in` | cubic-bezier(0.4, 0, 1, 1) | Exit animations |
| `ease-out` | cubic-bezier(0, 0, 0.2, 1) | Enter animations |
| `ease-bounce` | cubic-bezier(0.34, 1.56, 0.64, 1) | Playful elements |

---

## 6. Dark Mode (Optional)

### 6.1 Dark Theme Values
| Token | Light | Dark |
|-------|-------|------|
| `--bg-primary` | #FFFFFF | #1E1B26 |
| `--bg-secondary` | #FAF8F5 | #2A2733 |
| `--bg-tertiary` | #F3F0F8 | #363240 |
| `--text-primary` | #2D2A33 | #F0EDF5 |
| `--text-secondary` | #6B6575 | #A89FB8 |
| `--text-muted` | #9B95A5 | #7B7588 |
| `--border-subtle` | #E8E4EE | #4A4558 |
| `--purple-700` | #6B5B95 | #9B8BC5 |
| `--gold-400` | #F0C675 | #F5D180 |

---

## 7. Asset Guidelines

### 7.1 Favicon
- Format: PNG, SVG
- Sizes: 16×16, 32×32, 180×180 (apple-touch)
- Design: Droplet icon only (no text), purple #6B5B95
- Tab title: "Blankwet Academy" (discreet, generic)

### 7.2 OG Images
- Size: 1200×630px
- Design: Logo + tagline on gradient background
- Title format: "[Course Name] — Blankwet Academy"

### 7.3 Video Thumbnails
- Aspect ratio: 16:9
- Min resolution: 1280×720
- Style: Professional, tasteful, text overlay with course title
- No explicit imagery — professional, educational tone

---

*Document Version: 1.0*
*Last Updated: 2026-07-14*
*For: academy.blankwet.eu*
