// app/shop/[slug]/page.js (Server Component)
import ProductDetails from "./ProductDetails";

// ✅ Generate all slugs at build time
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/public/getProducts`
  );
  const products = await res.json();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/public/productRow?slug=${slug}`
    );
    const product = await res.json();

    if (!product) {
      return {
        title: "Product Not Found - VOGEXI",
        description: "The product you are looking for does not exist.",
      };
    }

    return {
      title: `${product.name} | VOGEXI`,
      description:
        product.description?.substring(0, 160) ||
        "Shop high-quality fashion at VOGEXI.",
      openGraph: {
        title: product.name,
        description: product.description?.substring(0, 160),
        images: [
          {
            url: product.thumbnail,
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
      },
    };
  } catch (err) {
    console.error("Metadata fetch error:", err);
    return {
      title: "VOGEXI | Shop Now",
      description: "Explore premium products at VOGEXI.",
    };
  }
}

// ✅ Render product details
export default function Page({ params }) {
  return <ProductDetails slug={params.slug} />;
}
