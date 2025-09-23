// app/components/AdminNavbar.js
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // adjust path

export default function AdminSidebar() {
  const { isLoggedIn, logout, username } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // find all links with submenu
    const menuLinks = document.querySelectorAll(".nav-item > a");

    menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const parent = link.parentElement;

        // if this nav-item has a submenu
        if (parent.querySelector(".nav-treeview")) {
          e.preventDefault(); // prevent "#"
          parent.classList.toggle("menu-open"); // toggle open class
        }
      });
    });

    // cleanup event listeners
    return () => {
      menuLinks.forEach((link) => {
        link.replaceWith(link.cloneNode(true));
      });
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (


    <>
      {/*begin::Sidebar*/}
      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="/dashboard" className="brand-link">
            <img src="/src/assets/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image opacity-75 shadow" />
            <span className="brand-text fw-light">AdminLTE 4</span>
          </a>
        </div>
        {/*end::Sidebar Brand*/}
        {/*begin::Sidebar Wrapper*/}
        <div className="sidebar-wrapper">
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column" role="navigation">
              <li className="nav-item">
                <a href="#" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>Dashboard</p>
                </a>
              </li>

              <li className="nav-item">
                <a href="./generate/theme.html" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>Theme Generate</p>
                </a>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Widgets <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./widgets/small-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Small Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/info-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Info Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/cards.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Cards</p>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-clipboard-fill" />
                  <p>
                    Layout Options
                    <span className="nav-badge badge text-bg-secondary me-3">6</span>
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./layout/unfixed-sidebar.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Default Sidebar</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        {/*end::Sidebar Wrapper*/}
      </aside>
      {/*end::Sidebar*/}



    </>


  );
}
