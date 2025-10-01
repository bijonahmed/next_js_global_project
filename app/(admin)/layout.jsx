"use client"; // must be client for localStorage and router

import Script from "next/script";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminFooter from "../components/admin/AdminFooter";
import { AuthProvider } from "../context/AuthContext";
import AdminAssets from "../components/admin/AdminAssets";
import { useState, useEffect } from "react"; // ✅ import hooks
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function AdminLayout({ children }) {

  const [loading, setLoading] = useState(true);
  const router = useRouter();

// Set page title manually in client component
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token"); // read from localStorage
    if (!token) {
      router.replace("/login"); // redirect if no token
    } else {
      setLoading(false); // allow access
    }
  }, [router]);

  if (loading) return <p>Loading...</p>; // show loader while checking

  return (

    <AuthProvider>
      
  
      <div className="app-wrapper">
        <AdminAssets />
        <AdminNavbar />
        <AdminSidebar />
        <AdminFooter />
        {children}

      </div>

    </AuthProvider>

  );
}