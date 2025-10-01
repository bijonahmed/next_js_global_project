//"use client";

import ClientNavbar from "../components/frontend/ClientNavbar";
import ClientFooter from "../components/frontend/ClientFooter";
import { AuthProvider } from "../context/AuthContext";
import FrontendAssets from "../components/frontend/FrontendAssets";

export const metadata = { title: "Welcome to vogexi world" };


export default function PublicLayout({ children }) {
  return (
    <AuthProvider>
      <FrontendAssets />
      <ClientNavbar />
      <main>{children}</main>
      <ClientFooter />
    </AuthProvider>
  );
}
