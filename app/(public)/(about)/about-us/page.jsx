export const metadata = {
    title: "About Us - My Website",
    description: "Learn more about our company, mission, and values.",
    keywords: ["about us", "company info", "our team"],
    openGraph: {
        title: "About Us - My Website",
        description: "Learn more about our company, mission, and values.",
        url: "https://mywebsite.com/about",
        siteName: "My Website",
        images: [
            {
                url: "/og-image-about.jpg",
                width: 1200,
                height: 630,
                alt: "About Us Preview",
            },
        ],
        type: "website",
    },
    alternates: {
        canonical: "https://mywebsite.com/about",
    },
};

export default function AboutPage() {
    return (
        <div>
            <h1>About Us</h1>
            <p>At VOGEXI, fashion is more than just clothing — it is a reflection of identity, a canvas for expression, and a statement of elegance. Our philosophy centers on empowering individuals to express their unique personalities through premium apparel that blends timeless aesthetics with contemporary edge. We believe that confidence begins with how you present yourself to the world, and VOGEXI is here to ensure that every detail of your outfit speaks volumes about your style, strength, and sophistication</p>
        </div>
    );
}