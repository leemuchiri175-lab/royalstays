# 🇰🇪 RoyalStays v2

**Kenya's premier short-term accommodation platform** — Airbnb-style booking system built with React + Vite + Tailwind + Supabase, fully tailored for the Kenyan market with M-Pesa payments and KES cashback.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your Supabase keys

# 3. Start development server
npm run dev
# Opens at http://localhost:5173

# 4. Build for production
npm run build
```

---

## 🏗 Project Structure

```
royalstays/
├── src/
│   ├── App.jsx                   # Main app router
│   ├── main.jsx                  # Entry point
│   ├── index.css                 # Global styles + CSS variables
│   ├── components/
│   │   ├── ui.jsx                # Shared UI primitives (Icon, Modal, Badge, Toast…)
│   │   ├── Navbar.jsx            # Navigation + notifications
│   │   ├── Footer.jsx            # Site footer
│   │   ├── PropertyCard.jsx      # Grid and list view cards
│   │   ├── Compare.jsx           # Compare bar + modal
│   │   ├── Messaging.jsx         # Host-guest chat
│   │   └── ReviewModal.jsx       # Star rating + review form
│   ├── pages/
│   │   ├── HomePage.jsx          # Landing page
│   │   ├── SearchPage.jsx        # Property search (grid/list/map)
│   │   ├── PropertyPage.jsx      # Full property detail + booking widget
│   │   ├── CheckoutPage.jsx      # 2-step checkout + M-Pesa upload
│   │   ├── AuthPages.jsx         # Login + Register
│   │   ├── ClientDashboard.jsx   # Traveler dashboard (8 tabs)
│   │   ├── OwnerDashboard.jsx    # Owner dashboard (6 tabs)
│   │   └── AdminDashboard.jsx    # Admin panel (9 tabs)
│   ├── context/
│   │   └── store.js              # Zustand global state
│   └── lib/
│       ├── data.js               # Mock data, constants, formatters
│       └── supabase.js           # Supabase client + helpers
├── supabase_schema.sql           # Full Postgres schema
├── .env.example                  # Environment template
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## ✨ Features

### 🏠 Core
- **Property Listings** — 8 mock properties across Kenya (villas, safari lodges, apartments, treehouses, cottages, boutique hotels)
- **Search & Filter** — by city, type, price range, rating, bedrooms, guests
- **3 View Modes** — Grid, List, and interactive Map view
- **Property Comparison** — side-by-side compare up to 3 properties
- **Wishlist / Favorites** — save properties across sessions

### 💳 Payments
- **M-Pesa Native** — Paybill (123456) + Till (654321) support
- **Step-by-step guide** — detailed in-app M-Pesa instructions
- **Payment proof upload** — screenshot + transaction code
- **Admin verification** — approve/reject within 24h
- **2% Cashback** — credited after each completed stay

### 📊 Dashboards
| Dashboard | Tabs |
|-----------|------|
| **Client** | Overview, Bookings, Messages, Cashback, Referral, Upload Payment, Wishlist, Profile |
| **Owner** | Overview, Properties, Bookings, Earnings, Analytics, Add Property |
| **Admin** | Overview, Payments, Properties, Bookings, Users, Analytics, Payouts, Settings, Logs |

### 🤝 User Features
- Host-guest **messaging** with conversation threads
- **Review system** — per-category star ratings (cleanliness, value, location, communication)
- **Referral program** — KES 500 per friend who completes a booking
- **Notifications** panel with real-time badges
- **Dark mode** toggle
- **Mobile responsive** navigation

---

## 🔑 Demo Login

| Role   | Email                          | Password               |
|--------|-------------------------------|------------------------|
| Admin  | leemuchiri175@gmail.com        | RoyalAdmin2024!Secure  |
| Admin  | martztush@gmail.com            | RoyalAdmin2024!Secure  |
| Client | any@email.com                  | anypassword            |

---

## 💰 Business Logic

| Item                | Value        |
|---------------------|-------------|
| Platform commission | 8%          |
| Owner payout        | 90%         |
| Client cashback     | 2%          |
| Referral bonus      | KES 500     |
| M-Pesa Paybill      | 123456      |
| M-Pesa Till         | 654321      |

---

## 🗄 Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run `supabase_schema.sql` in the SQL Editor
3. Create these Storage buckets:
   - `property-images` (public)
   - `payment-proofs` (private)
4. Enable Email Auth in Authentication → Providers
5. Copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY` to `.env`

---

## 🚢 Deployment (Vercel)

```bash
# Push to GitHub, then:
vercel --prod

# Or link in Vercel dashboard and add env vars:
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
```

---

## 📦 Key Dependencies

| Package           | Purpose                    |
|-------------------|----------------------------|
| React 18          | UI framework               |
| Vite 5            | Build tool                 |
| Tailwind CSS 3    | Utility-first styling      |
| Zustand 4         | Global state management    |
| @supabase/js 2    | Database + auth + storage  |
| Framer Motion 11  | Animations (ready to wire) |
| react-dropzone    | File upload UI             |
| Recharts 2        | Charts (ready to integrate)|
| date-fns 3        | Date utilities             |

---

## 🗺 Roadmap

- [ ] Connect Supabase real-time for live messaging
- [ ] Integrate Mapbox/Google Maps for actual map view  
- [ ] M-Pesa Daraja API for automated payment verification
- [ ] Email notifications via Resend/SendGrid
- [ ] Push notifications (PWA)
- [ ] Image optimization with Cloudinary
- [ ] Property availability calendar
- [ ] Multi-language (English + Swahili)
- [ ] Admin CSV exports
- [ ] Mobile app (React Native)

---

## 👨‍💻 Credits

Built with ❤️ for Kenya 🇰🇪

Platform admins: leemuchiri175@gmail.com · martztush@gmail.com
