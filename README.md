# 🛒 বাজার দর (Bazar Dor) — নিত্যপ্রয়োজনীয় পণ্যের বাজারদর ট্র্যাকিং প্ল্যাটফর্ম

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-Enabled-emerald?style=for-the-badge)](https://better-auth.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**বাজার দর (Bazar Dor)** হলো একটি আধুনিক, নির্ভরযোগ্য এবং রিয়েল-টাইম বাংলাদেশি নিত্যপ্রয়োজনীয় পণ্যের বাজারদর ট্র্যাকিং ওয়েব অ্যাপ্লিকেশন। এর মাধ্যমে প্রতিদিনের চাল, ডাল, ভোজ্যতেল, শাকসবজি, মাছ, মাংস, ডিম ও মসলাসহ সকল নিত্যপণ্যের পাইকারি ও খুচরা বাজারদর, সর্বোচ্চ-সর্বনিম্ন দাম এবং বাজারভিত্তিক বিশদ বিবরণ খুব সহজেই এক নজরে যাচাই করা যায়।

---

## 🔗 গুরুত্বপূর্ণ লিংকসমূহ (Project Links)

- **🌐 লাইভ ওয়েবসাইট (Live URL):** [https://assignment07-bazardor.vercel.app](https://assignment07-bazardor.vercel.app) *(অথবা Vercel/Netlify ডেপ্লয়মেন্ট লিংক)*
- **📂 গিটহাব রিপোজিটরি (GitHub Repo):** [https://github.com/sjahanothye/Assignment07](https://github.com/sjahanothye/Assignment07)

---

## ✨ প্রধান ৫টি বৈশিষ্ট্য (Key Features)

1. **🔴 লাইভ প্রাইস মার্কার ও মারকুই টিকার (Infinite Price Ticker):**
   - ওয়েবসাইটের শীর্ষভাগে চলমান ইনফিনিট মারকুই স্ক্রলিং স্ট্রিপে পণ্যের ইমোজি, নাম, প্রতি ইউনিটের আজকের দাম এবং বৃদ্ধির/হ্রাসের শতকরা হার (▲/▼ %) রিয়েল-টাইমে প্রদর্শিত হয়।

2. **⚖️ দৈনিক বাজারদর বৃদ্ধি ও হ্রাসের শীর্ষ তালিকা (Daily Risers & Fallers Analysis):**
   - হোম পেজে গতকালের তুলনায় আজ যেসব পণ্যের দাম বেড়েছে (**“আজ দাম বেড়েছে ▲”**) এবং যেসব পণ্যের দাম কমেছে (**“আজ দাম কমেছে ▼”**) তাদের শীর্ষ ৬টি পণ্যের আলাদা সেকশন।

3. **🔒 সুরক্ষিত বিস্তারিত প্রোডাক্ট পেজ (Protected Product Details Page - `/product/[slug]`):**
   - বিস্তারিত পণ্যের পেজটি BetterAuth দ্বারা সুরক্ষিত। লগইন ব্যতীত কেউ প্রবেশ করলে টোস্ট নোটিফিকেশন প্রদর্শনপূর্বক সাইন-ইন পেজে রিডাইরেক্ট করা হয়। লগইনের পর সর্বোচ্চ, সর্বনিম্ন ও গড় দামের তুলনামূলক পরিসংখ্যান এবং কারওয়ান বাজারসহ দেশের ১২+ বাজারের বিভাগভিত্তিক মূল্য তালিকা প্রদর্শিত হয়।

4. **⚡ ক্যাটাগরিভিত্তিক ফিল্টারিং ও সঠিক সংখ্যাভিত্তিক সর্টিং (Challenge C1):**
   - চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলা ক্যাটাগরির জন্য ডেডিকেটেড পেজ। বাংলা সংখ্যামানের সঠিক গাণিতিক মান অনুযায়ী **“ডিফল্ট”**, **“দাম: কম থেকে বেশি”** এবং **“দাম: বেশি থেকে কম”** সর্টিং ড্রপডাউন সুবিধা।

5. **👤 প্রোফাইল ব্যবস্থাপনা ও তথ্য আপডেট ফিচার (Challenge C3):**
   - ব্যবহারকারীর নিজস্ব প্রোফাইল ভিউ (`/profile`) এবং BetterAuth API ব্যবহার করে ব্যবহারকারীর নাম হালনাগাদ করার জন্য পৃথক `/profile/update` রাউট ও তাৎক্ষণিক টোস্ট নোটিফিকেশন।

---

## 🛠️ ব্যবহৃত প্রযুক্তিসমূহ (Technologies Used)

| প্রযুক্তি | উদ্দেশ্য |
| :--- | :--- |
| **Next.js 16 (App Router)** | আধুনিক ফুলস্ট্যাক ওয়েব অ্যাপ্লিকেশন ফ্রেমওয়ার্ক, Server Components ও SSR |
| **React 19** | আধুনিক রিয়্যাক্ট কম্পোনেন্ট ও হুকস আর্কিটেকচার |
| **Tailwind CSS v4** | রেসপন্সিভ ডিজাইন ও প্রিমিয়াম স্টাইলিং |
| **TypeScript** | টাইপ সেফ কোডিং ও নির্ভরযোগ্য ডাটা স্ট্রাকচার |
| **BetterAuth** | আধুনিক অথেন্টিকেশন (Email/Password, Google, GitHub & Session Management) |
| **React Hot Toast** | ইন্টারেক্টিভ ও নান্দনিক টোস্ট নোটিফিকেশন হ্যান্ডলিং |
| **Lucide React** | আধুনিক ও পরিচ্ছন্ন ভেক্টর আইকন লাইব্রেরি |
| **LibSQL / SQLite** | ডাটাবেজ হ্যান্ডলিং |

---

## 🚀 লোকাল মেশিনে রান করার নিয়ম (Getting Started)

### ১. রিপোজিটরি ক্লোন করুন
```bash
git clone https://github.com/sjahanothye/Assignment07.git
cd Assignment07
```

### ২. ডিপেন্ডেন্সি ইনস্টল করুন
```bash
npm install
```

### ৩. এনভায়রনমেন্ট ভেরিয়েবল সেটআপ করুন (`.env.local`)
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=bazardor-secret-key-assignment-07-2026-auth
```

### ৪. ডেভেলপমেন্ট সার্ভার চালু করুন
```bash
npm run dev
```
ব্রাউজারে [http://localhost:3000](http://localhost:3000) ওপেন করে প্রজেক্টটি দেখুন।

### ৫. প্রোডাকশন বিল্ড যাচাই করুন
```bash
npm run build
npm start
```

---

## 🔐 অথেন্টিকেশন ও ডেমো টেস্ট একাউন্ট (Demo Credentials)

পরীক্ষক ও ব্যবহারকারীর দ্রুত টেস্ট করার সুবিধার্থে সাইন-ইন পেজে **এক ক্লিকে ডেমো লগইন** বাটন যুক্ত করা হয়েছে। এছাড়াও নিচের ক্রেডেনশিয়াল ব্যবহার করে টেস্ট করা যাবে:

- **ইমেইল:** `rahim@bazardor.com`
- **পাসওয়ার্ড:** `123456`
- **নতুন রেজিস্ট্রেশন:** যেকোনো বৈধ নাম, ইমেইল এবং ন্যূনতম ৬ অক্ষরের পাসওয়ার্ড দিয়ে তাৎক্ষণিক একাউন্ট তৈরি করা যায়।

---

## 📡 API এন্ডপয়েন্টস (Data Endpoints)

- **সকল পণ্য:** `https://openapi.programming-hero.com/api/bazardor/products`
- **ক্যাটাগরি অনুযায়ী ফিল্টার:** `https://openapi.programming-hero.com/api/bazardor/products?category=chal`
- **একক পণ্য:** `https://openapi.programming-hero.com/api/bazardor/products/1`
- **সকল ক্যাটাগরি:** `https://openapi.programming-hero.com/api/bazardor/categories`

---

## 👨‍💻 প্রণয়নে
- **প্রজেক্ট নাম:** বাজার দর (Bazar Dor)
- **ব্যাচ:** Batch 14 (Assignment 07)
- **গিটহাব প্রোফাইল:** [sjahanothye](https://github.com/sjahanothye)
