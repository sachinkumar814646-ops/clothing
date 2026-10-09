# MAISON — Luxury Fashion E-commerce

A full-featured, production-ready luxury fashion e-commerce website built with Next.js 14, Tailwind CSS, and Framer Motion. Inspired by Zara, COS, and other high-fashion brands.

## ✦ Features

- **Full e-commerce flow** — Browse → Product Detail → Cart → Checkout → Confirmation
- **Animated UI** — Page transitions, hover effects, staggered reveals via Framer Motion
- **Cart system** — Persistent cart with quantity controls, color/size selection
- **Wishlist** — Save favourite pieces across the session
- **Search** — Live search modal with product suggestions
- **Filters & Sorting** — Size, color, price range, newest/price sort
- **Responsive** — Mobile-first, fully responsive layout
- **Image zoom** — Hover-to-zoom on product detail pages
- **Newsletter** — Animated signup in footer

## ✦ Tech Stack

- **Next.js 14** (App Router)
- **JavaScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React** icons
- **Google Fonts** — Cormorant Garamond (display) + Jost (body)

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✦ Project Structure

```
maison/
├── app/
│   ├── layout\.jsx          # Root layout with fonts & providers
│   ├── page\.jsx            # Homepage
│   ├── globals.css
│   ├── women/page\.jsx
│   ├── men/page\.jsx
│   ├── kids/page\.jsx
│   ├── accessories/page\.jsx
│   ├── new/page\.jsx
│   ├── sale/page\.jsx
│   ├── product/[id]/page\.jsx
│   ├── cart/page\.jsx
│   ├── checkout/page\.jsx
│   ├── wishlist/page\.jsx
│   └── account/page\.jsx
├── components/
│   ├── layout/
│   │   ├── Navbar\.jsx      # Sticky nav with mobile drawer
│   │   └── Footer\.jsx      # Footer with newsletter
│   ├── home/
│   │   ├── Hero\.jsx        # Full-screen hero section
│   │   ├── CategoryGrid\.jsx
│   │   ├── FeaturedProducts\.jsx  # Horizontal scroll
│   │   └── Editorial\.jsx   # Magazine-style layouts
│   ├── product/
│   │   ├── ProductCard\.jsx # Card with hover image swap
│   │   ├── ProductDetail\.jsx # Full detail with zoom
│   │   ├── ProductGrid\.jsx # Listing with filters
│   │   └── ProductFilters\.jsx
│   ├── cart/
│   │   └── CartDrawer\.jsx  # Slide-in cart panel
│   └── ui/
│       └── SearchModal\.jsx # Live search overlay
├── lib/
│   ├── data.js             # 12 sample products + helpers
│   ├── cart-context\.jsx    # Cart state management
│   └── wishlist-context\.jsx
└── public/
```

## ✦ Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, category grid, featured products, editorial |
| `/women` `/men` `/accessories` | Category listing with filters |
| `/new` | New arrivals |
| `/sale` | Sale items |
| `/product/[id]` | Product detail with gallery, zoom, size/color selection |
| `/cart` | Cart summary page |
| `/checkout` | Multi-step checkout (shipping → payment → confirmation) |
| `/wishlist` | Saved items |
| `/account` | Login / Register |

## ✦ Customization

**Add products** — Edit `lib/data.js` to add/modify products.

**Change colors** — Edit `tailwind.config.js` and `globals.css` CSS variables.

**Replace images** — Swap Unsplash URLs in `lib/data.js` with your own CDN images.

**Add payment** — Integrate Stripe by replacing the mock form in `app/checkout/page\.jsx`.
