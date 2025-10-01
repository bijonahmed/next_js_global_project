// app/components/admin/AdminAssets.jsx
"use client";

import Script from "next/script";

export default function FrontendAssets() {
  return (
    <>
      {/* CSS files */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        crossOrigin="anonymous"
      />
      
     
      {/* Add your other external CSS files here */}

      {/* JS files */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      {/* Add your other external JS files here */}
    </>
  );
}
