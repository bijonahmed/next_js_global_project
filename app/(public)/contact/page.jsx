export const metadata = {
    title: "Contact - My Website",
    description: "Get in touch with us via email or phone.",
    keywords: ["contact", "email", "support"],
    openGraph: {
        title: "Contact - My Website",
        description: "Get in touch with us via email or phone.",
        url: "https://mywebsite.com/contact",
        siteName: "My Website",
        images: [
            {
                url: "/og-image-contact.jpg",
                width: 1200,
                height: 630,
                alt: "Contact Preview",
            },
        ],
        type: "website",
    },
    alternates: {
        canonical: "https://mywebsite.com/contact",
    },
};


export default function ContactPage() {
    return (
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <h2 className="card-title mb-4">Contact Us</h2>

                                {/* WhatsApp Button */}
                                <a
                                    href="https://wa.me/8801915728982"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-success mb-3"
                                >
                                    Chat on WhatsApp
                                </a>

                                <hr />

                                {/* Email */}
                                <div className="mb-3">
                                    <h5>Email Address</h5>
                                    <p>
                                        <a href="mailto:info@vogexi.com">info@vogexi.com</a>
                                    </p>
                                </div>

                                {/* Office Location */}
                                <div>
                                    <h5>Office Location</h5>
                                    <p>Section 1, Mirpur, Dhaka-1216, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
