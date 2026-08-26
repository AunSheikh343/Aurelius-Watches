# Aurelius Watches — Professional React E-commerce Frontend

A professional, responsive luxury watch store built with React + Vite.

## Project structure

```text
Aurelius-Watches-Professional/
├── public/
│   └── images/
│       └── watches/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Announcement.jsx
│   │   ├── BlogCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Newsletter.jsx
│   │   ├── PageHero.jsx
│   │   ├── ProductCard.jsx
│   │   └── SectionHeading.jsx
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── BlogDetails.jsx
│   │   ├── Blogs.jsx
│   │   ├── Cart.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   └── Shop.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Run in VS Code

```bash
npm install
npm run dev
```

## Deploy the API

Set these environment variables in the hosting provider before deploying:

```text
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-frontend-domain.example
```

For Vercel, add them under Project Settings > Environment Variables and redeploy after saving. Never commit `.env` files or real credentials.

## Routes

- `/` — Home
- `/shop` — Shop
- `/products` — Products
- `/product/1` — Product details
- `/cart` — Cart
- `/about` — About
- `/contact` — Contact
- `/blogs` — Blog listing
- `/blog/1` — Blog article

## Features

- Responsive luxury watch design
- React Router navigation
- Product search
- Category filters
- Sorting
- Product details
- Add to cart
- Quantity controls
- Remove from cart
- LocalStorage cart persistence
- Contact form
- Newsletter UI
- Blog section
- Mobile navigation

The project is frontend-only. It is structured so a backend/API and SQL Server database can be connected later.
