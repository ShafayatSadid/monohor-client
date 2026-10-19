
# Monohor (মনোহর) — Bengali Traditional E-commerce Platform

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-lightgreen?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

A production-ready, full-stack e-commerce application built for a real Bengali heritage brand. Monohor provides a seamless shopping experience for customers and a powerful, automated management system for the admin.

🌐 **Live Site:** [monohor.com.bd](https://monohor.com.bd)

## 🎯 Overview

Traditional sellers in Bangladesh often rely heavily on manual order processing via Facebook pages — leading to lost sales, manual courier bookings, and no real-time tracking. 

Monohor solves this by providing a complete, automated digital storefront. From guest checkout and secure payments (COD) to automated email notifications and seamless courier hand-offs, the platform handles the entire lifecycle of an order.

## 🚀 Key Features

### 🛒 Customer-Facing Store
- **Dynamic Hero & Storefront:** Engaging UI with Embla Carousel.
- **Product Variants:** Support for multiple sizes per product (e.g., 2ml, 4ml, 6ml) with real-time price updates.
- **Cart & Wishlist:** Persistent state management using Zustand and `localStorage`.
- **Guest Checkout:** Fast, frictionless checkout using Cash on Delivery (COD).
- **Reviews System:** Only logged-in users can submit reviews, which are hidden until approved by the admin.
- **Rich Product Descriptions:** Built-in Markdown support for detailed product info.
- **Authentication:** Secure login/registration via Email/Password and Google OAuth (Better Auth).

### 🛡️ Admin Dashboard
- **Real-time Analytics:** Monitor total orders, revenue, low-stock alerts, and pending reviews.
- **Product & Order Management:** Full CRUD operations for products, categories, and order statuses.
- **Review Moderation:** Approve, reject, or delete customer reviews before they appear on the site.
- **Steadfast Courier Integration:** One-click API integration to push confirmed orders directly to the courier partner.

## 🔒 Security & Architecture Highlight

**Never trust the client.**
To prevent price manipulation via browser DevTools, the frontend *never* calculates or sends the final order price. The frontend only sends the `product_slug`, `variant_id`, and `quantity`. The Node.js backend independently fetches the real prices from MongoDB, validates stock, recalculates the subtotal and delivery charge, and generates the final invoice.

## 💻 Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4, HeroUI, Zustand, Embla Carousel
- **Backend:** Node.js, Express.js, MongoDB Atlas (Native Driver)
- **Authentication:** Better Auth (Session & JWT)
- **Third-Party Integrations:** Cloudinary (Images), Resend (Email), Steadfast API (Courier), Meta Pixel (Analytics)

## 📁 Project Structure

```text
monohor-client/
├── src/
│   ├── app/              # Next.js App Router (Pages & Layouts)
│   │   ├── (auth)/       # Login & Register routes
│   │   ├── admin/        # Admin dashboard routes
│   │   ├── api/          # Next.js API routes (Auth)
│   │   ├── products/     # Product listing & detail routes
│   │   └── ...
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities (API clients, fbpixel, auth)
│   ├── store/            # Zustand stores (Cart, Wishlist)
│   └── hooks/            # Custom React hooks
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v20 or higher)
- MongoDB URI (Atlas or Local)
- API Keys for Cloudinary, Resend, Steadfast, and Google OAuth.

### Installation
```bash
# Clone the repository
git clone https://github.com/ShafayatSadid/monohor-client.git

# Navigate to the project directory
cd monohor-client

# Install dependencies
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory and add the following variables:

```env
# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000

# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Third-Party
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id
```

### Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Build & Deployment

This project is optimized for deployment on Vercel. The production build uses Webpack for stability.

```bash
npm run build
npm start
```

---
*(Note: The backend API repository is maintained separately.)*

## 👨‍💻 Author

**Md. Shafayat Hossain Sadid**
- GitHub: [@ShafayatSadid](https://github.com/ShafayatSadid)
- LinkedIn: [Md. Shafayat Hossain Sadid](https://www.linkedin.com/in/md-shafayat-hossain-sadid)
- Portfolio: [monohor.com.bd](https://monohor.com.bd)
