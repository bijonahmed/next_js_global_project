// app/shop/page.js
import ShopPage from "./ShopPage"; // import your client component

// SEO settings (Google will read this)
export const metadata = {
  title: "Vogexi Shop - Premium T-Shirts",
  description: "Buy export quality t-shirts from Vogexi. Stylish, affordable and premium fashion.",
  keywords: "vogexi, t-shirt, shop, fashion, export quality"
};

// This is server component (no "use client" here)
export default function Page() {
  return <ShopPage />;
}
