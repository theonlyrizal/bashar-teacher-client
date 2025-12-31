# Bashar Teacher - Frontend

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://bashar-teacher.vercel.app)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.7-646CFF)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC)](https://tailwindcss.com/)

Bashar Teacher is a comprehensive tuition management platform designed to connect qualified tutors with students across Bangladesh. It provides a seamless interface for students to post tuition requirements and for tutors to find matched opportunities.

<img src="https://i.ibb.co.com/LXBL2dMZ/Screenshot-2025-12-20-142126.png">

## 🌐 Live Project
**Live Link:** [https://bashar-teacher.vercel.app](https://bashar-teacher.vercel.app)

## 🚀 Core Features

- **Role-Based Access Control:** Distinct dashboards for Students, Tutors, and Admins.
- **Tuition Marketplace:** Advanced search, filtering (by Class, Subject, Location), and sorting of tuition listings.
- **Tutor Profiles:** Detailed tutor profiles showcasing qualifications, skills, and experience.
- **Interactive Dashboards:**
    - **Student:** Post tuitions, track applications, and make secure payments.
    - **Tutor:** Browse matched tuitions, track application status, and view revenue analytics.
    - **Admin:** Manage users, verify tuitions, and monitor site-wide statistics.
- **Secure Payments:** Integration with Stripe for safe and reliable payment processing between students and tutors.
- **Social Authentication:** Easy login and registration using Google or Email/Password via Firebase.
- **Modern UI/UX:** Responsive "Liquid Glass" design with full support for Light and Dark modes.

## 🛠️ Technologies Used

- **Frontend Framework:** React (Vite)
- **Styling:** Tailwind CSS, DaisyUI
- **Animations:** Framer Motion
- **State & Routing:** React Router DOM, React Hook Form
- **Authentication:** Firebase Auth
- **Payments:** Stripe JS
- **Data Visualization:** Recharts
- **HTTP Client:** Axios
- **Toast Notifications:** React Hot Toast

## 📦 Dependencies

```json
{
  "dependencies": {
    "@stripe/stripe-js": "^3.5.0",
    "axios": "^1.7.2",
    "firebase": "^12.6.0",
    "framer-motion": "^11.2.10",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.51.5",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.23.1",
    "recharts": "^2.12.7"
  }
}
```

## ⚙️ Local Development Setup

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/theonlyrizal/bashar-teacher-client.git
   cd bashar-teacher-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:5000
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
