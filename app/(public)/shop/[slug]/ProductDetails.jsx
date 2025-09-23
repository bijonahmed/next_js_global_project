"use client";

import { useEffect, useState } from "react";

export default function ProductDetails({ slug }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE}/public/productRow?slug=${slug}`
                );
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Fetch error:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) return <p className="text-center py-5">Loading...</p>;
    if (!product) return <p className="text-center py-5">Product not found</p>;

    return (
        <div className="container py-5">

           

            {/* Product Details */}
            <div className="row mb-5">
                <div className="col-md-6">
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <h4 className="text-primary">${product.price}</h4>
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    <button className="btn btn-primary mt-3">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
