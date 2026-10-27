# Fisenge Secondary School Website

A modern, responsive, full-stack website and secure content administration portal built for **Fisenge Secondary School** (Luanshya District, Copperbelt Province, Zambia).

---

## 🌟 Key Features

### 1. Public School Website
- **Homepage (`/`)**: High-impact campus hero photography, school motto, leadership welcome message, academic statistics, quick-access hubs for Students/Parents/Staff, latest school announcements, campus gallery preview, and enrollment CTA.
- **About Us (`/about`)**: Comprehensive school history since 1984, official Mission & Vision, core educational values, leadership address, campus facilities, and Ministry of Education / ECZ affiliation.
- **Students Hub (`/students`)**: Junior Secondary (Grades 8–9) and Senior Secondary (Grades 10–12) pathways (Pure Sciences, Business & Commerce, Arts & Humanities, Technical/Vocational), daily bell timetable, co-curricular clubs (JETS, Debate, Red Cross, Young Farmers), and school code of conduct.
- **Parents Hub (`/parents`)**: Academic calendar and approved term dates, PTA partnership guidelines, fee payment bank policies, downloadable student handbooks, and administrative contact directory.
- **Staff Directory (`/staff`)**: Profiles of school leadership and heads of department including qualifications, photographs, roles, and subject areas with child protection safeguards.
- **Interactive Photo Gallery (`/gallery`)**: Organized gallery with category filtering (*Campus, Academic, Sports, Events*), lazy loading, keyboard-accessible lightbox modal (with ESC/Arrow navigation), and student image consent safeguards.
- **Contact Page (`/contact`)**: Physical address, direct telephone lines, email, office hours, transit directions from Kitwe and Ndola, interactive map display, and a fully validated contact form with anti-spam honeypot protection.

---

### 2. Secure Content Administration Portal (`/admin`)
- **Authentication & Security**: Protected routes, bcrypt password hashing, secure HTTP-only cookie sessions using JSON Web Tokens (JWT). Unauthorized visitors to `/admin` are automatically redirected to `/admin/login`.
- **Administrative Overview**: Live statistics (total staff profiles, gallery images, published announcements, unread parent inquiries) and recent messages table.
- **Page Content Management**: Live editing of school contact details, official phone/email, admissions banner, homepage hero headlines, mission, vision, and headteacher messages without touching code.
- **Staff Directory Management**: Add new staff members, edit roles/qualifications/biographies, assign departments, and remove outdated entries.
- **Gallery Management**: Add new photos with custom titles, categories, and captions, or remove outdated imagery.
- **School Announcements**: Draft and publish urgent/normal school notices that immediately appear across the public homepage and parents pages.
- **Inquiry Management**: View all inquiries received from the public contact form, toggle read/unread status, delete inquiries, and click to reply directly via official school email.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested with Node v24)
- **npm**: v9.0.0 or higher

### Installation & Development
In PowerShell:
```powershell
# 1. Install dependencies (if not already installed)
npm.cmd install

# 2. Run the development server
npm.cmd run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Deployment
```powershell
# Build optimized production bundle
npm.cmd run build

# Start production server
npm.cmd run start
```

---

## 🔐 Administrator Access

- **Admin URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Username**: `admin`
- **Default Password**: `Fisenge2026!Admin`

*(Note: Passwords can be updated or rotated securely in `src/lib/db.ts` or via environment variables).*

---

## 📁 Project Architecture

```
School_Website/
├── public/
│   ├── favicon.svg             # School crest favicon
│   └── images/                 # High-resolution campus photography
│       ├── campus_hero.jpg     # Campus main entrance & grounds
│       ├── classroom.jpg       # Active classroom instruction
│       ├── deputy_principal.jpg# Deputy Principal portrait
│       ├── headteacher.jpg     # Headteacher portrait
│       ├── library.jpg         # Library & study hall
│       ├── science_lab.jpg     # Science lab practical
│       └── sports.jpg          # Inter-school soccer match
├── src/
│   ├── app/
│   │   ├── about/page.tsx      # About page
│   │   ├── admin/
│   │   │   ├── login/page.tsx  # Admin login page
│   │   │   ├── AdminDashboardClient.tsx # Unified admin control panel
│   │   │   └── page.tsx        # Protected admin route loader
│   │   ├── api/
│   │   │   ├── admin/          # Protected content, staff, gallery & announcements APIs
│   │   │   ├── auth/           # Login, logout & session APIs
│   │   │   └── public/contact/ # Public form submission with anti-spam
│   │   ├── contact/page.tsx    # Contact page
│   │   ├── gallery/page.tsx    # Gallery with lightbox
│   │   ├── parents/page.tsx    # Parents & PTA resources
│   │   ├── staff/page.tsx      # Staff directory
│   │   ├── students/page.tsx   # Students & curriculum hub
│   │   ├── globals.css         # Design system & responsive styles
│   │   ├── layout.tsx          # Root layout & SEO metadata
│   │   └── page.tsx            # School homepage
│   ├── components/
│   │   ├── ContactForm.tsx     # Validated contact form
│   │   ├── Footer.tsx          # Institutional footer
│   │   ├── GalleryViewer.tsx   # Interactive gallery & lightbox
│   │   └── Header.tsx          # Sticky responsive header & drawer
│   ├── data/
│   │   └── db.json             # Persistent file-based school database
│   └── lib/
│       ├── auth.ts             # JWT token signing & session verification
│       └── db.ts               # Database manager & TypeScript schemas
├── next.config.mjs
├── package.json
└── tsconfig.json
```

---

## 🛡️ Safeguarding & Privacy Standard
All student imagery, personal records, and inquiry data conform to Ministry of Education child protection policies. Public pages display only school-approved contact details and avoid publishing private telephone numbers or personal emails of staff or students.
