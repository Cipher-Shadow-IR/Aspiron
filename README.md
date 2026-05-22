<p align="center">
  <img src="public/Aspiron_logo.png" width="180" alt="Aspiron Logo" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Outfit&size=28&duration=4000&color=00D9FF&center=true&vCenter=true&width=1000&height=70&lines=ASPIRON+%7C+Premium+College+Predictor+%26+Discovery+Platform;Find+Your+Dream+College+Instantly" alt="Typing SVG" />
</p>

<h2 align="center">🚀 A premium, production-grade College Discovery & Admission Fit Predictor platform.</h2>

---

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Built%20With-Next.js%20%7C%20PostgreSQL-black?style=for-the-badge" />
</p>

---

# 🌌 Aspiron

> *Your Compass to Academic Success.*  
> **Aspiron** is a full-stack college discovery and admission fit prediction platform built to solve the complex process of finding the right colleges and predicting admission fit.  
> Designed with **Next.js 14 (App Router)**, **TypeScript**, **Prisma ORM**, and **PostgreSQL** for speed, scale, and elegance.

---

# ✨ Features

- ⚡ **College Listing & Filters (Home Page)**: Search colleges in real-time, filter by city, max fees, and rating, and sort by rating or annual fees dynamically with clean pagination (6 items/page).
- 🔐 **Detailed College Profiles**: Deep dive into placement statistics (highest and average packages), academic credentials, entrance exams, and courses offered.
- 📊 **Comparison Grid**: Compare up to 3 colleges side-by-side on metrics such as location, fee structure, placement, rating, courses, and accepted exams with duplicity checks.
- 🌐 **Admission Predictor**: Recommends eligible colleges using historical rank rules for exams like **JEE Main** and **GUJCET**.
- 🎯 **Recent History Tracking**: Locally persisted "Recently Viewed" college history to quickly revisit previously browsed profiles.
- 🎨 **Theme Toggle**: Fully supporting smooth light and dark theme mode preferences.

---

# 💡 Why This Project?

This project helps aspiring students navigate the often confusing process of college admissions.
Instead of relying on fragmented information across multiple outdated websites, Aspiron provides:
- **Unified Discovery**: A single platform to search, filter, and compare top institutions.
- **Data-Driven Fit Prediction**: Instant rank-based admission predictability based on historical cutoffs.
- **Premium User Experience**: Designed to be visual, responsive, and easy to use.

---

# 🧩 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend / Backend | Next.js 14 (App Router) |
| Language | TypeScript |
| Database ORM | Prisma ORM |
| Database | PostgreSQL (Neon / Docker-ready) |
| Styling | Tailwind CSS |
| Validation | Zod |
| History Sync | React Context (with LocalStorage) |

---

# 📂 Project Structure

```plaintext
Aspiron/
├── app/
│   ├── api/                  # API routes (colleges, compare, predict, cities)
│   ├── college/              # Dynamic college profiles view
│   ├── compare/              # College comparison dashboard
│   ├── predictor/            # Score predictor interface
│   ├── layout.tsx            # Theme-wrapped navbar, footer & layout
│   └── page.tsx              # Home page discovery & search engine
├── components/               # Reusable React components (Navbar, Footer, Cards, UI)
├── lib/                      # Shared helper utilities & DB client singleton
├── prisma/                   # Database schema & seeding scripts
├── public/                   # Branding assets, images & favicon
├── types/                    # TypeScript custom declarations
├── validators/               # Zod validation schemas
├── .env.example              # Env configuration template
└── README.md                 # Project Documentation
```

---

# ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/Cipher-Shadow-IR/Aspiron.git

# Enter folder
cd "Aspiron"

# Install dependencies
npm install
```

---

# ▶️ Run Locally

### Run Database via Docker (Optional/Recommended)
If you wish to spin up a local PostgreSQL instance via Docker:
```bash
docker-compose up -d
```

### Setup Prisma Database Schema
Generate the Prisma Client types and push the database schema to your PostgreSQL database:
```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init
```

### Seed the Database
Seed the database with 18 realistic Indian college records and cutoff rules:
```bash
npm run db:seed
```

### Start Development Server
```bash
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/aspiron?schema=public"
```
*(Reference `.env.example` for details)*

---

# 📸 Screenshots

* **Homepage**: Discovery interface with real-time searches, ratings, and fee filters.
* **College Details Page**: Placement highlights, courses, and exam details.
* **Compare Dashboard**: Side-by-side comparison tables.
* **Admission Predictor**: JEE Main & GUJCET score predictor.

---

# 🧠 How It Works

1. **Information Extraction**: The user explores colleges on the main directory page using granular searches, fees slider, ratings, and city filters.
2. **Side-by-Side Comparison**: Adding up to 3 colleges dynamically updates the comparison grid to compare course options, location, fees, and placements.
3. **Admission Probability**: Entering JEE Main or GUJCET ranks triggers cutoff calculations against the backend database rules.
4. **Local Persistence**: User's recently viewed college history is updated instantly.

---

# 🚀 Roadmap

* [x] Rebranding to Aspiron
* [x] Dynamic Filtering and Sorting
* [x] Compare colleges side-by-side
* [x] JEE Main & GUJCET Admission Predictor
* [x] Persisted recently viewed colleges
* [x] Theme Toggle (Light / Dark mode)
* [ ] User authentication (OAuth & Credentials)
* [ ] Multi-campus comparative charts (radar charts for placements, infrastructure, academics)
* [ ] Custom review and rating submissions

---

# 🧪 Testing

Confirm the application builds without issues:
```bash
npm run build
```

---

# 📈 Future Improvements

* Interactive visual charts comparing college placements over the years.
* Real-time notifications for application deadlines.
* AI-driven personalized college counselor chatbot.

---

# 📜 License

Apache-2.0 License

---

## 💬 Author

<p align="center">
  <img src="https://img.icons8.com/fluency/48/brain.png" /><br><br>
  <b>Built by Ishaan Ray (Cipher Shadow IR)</b><br>
  <i>"Your Compass to Academic Success, Choose wisely!”</i><br><br>
  <a href="https://github.com/Cipher-Shadow-IR" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Cipher%20Shadow%20IR-181717?style=for-the-badge&logo=github" />
  </a>
</p>

---

# ⭐ Support

If you liked this project:

```md
Give it a star ⭐
```
