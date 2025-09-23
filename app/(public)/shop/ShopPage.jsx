"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingImages, setLoadingImages] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Change per page count here

  // Fetch products
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/public/getProducts`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingData(false);
      });
  }, []);

  // Filter products
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, products]);

  // Preload images
  useEffect(() => {
    if (filteredProducts.length === 0) return;

    let imagesLoaded = 0;
    filteredProducts.forEach((product) => {
      const img = new Image();
      img.src = product.thumbnail;
      img.onload = img.onerror = () => {
        imagesLoaded++;
        if (imagesLoaded === filteredProducts.length) {
          setLoadingImages(false);
        }
      };
    });
  }, [filteredProducts]);

  if (loadingData || loadingImages) {
    return (
      <div className="text-center py-5">
        <h3>Loading products...</h3>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Vogexi Shop</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {currentProducts.length === 0 && (
          <p className="text-center">No products found.</p>
        )}

        {currentProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <Link
              href={`/shop/${product.slug}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <div
                    className="card-text"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="h5 fw-bold">${product.price}</span>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
