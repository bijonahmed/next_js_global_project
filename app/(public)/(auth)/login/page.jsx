"use client"; // required for client components

import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext"; // Adjust the path as necessary
import { useState } from "react";


export default function LoginPage() {
    const router = useRouter(); // ✅ Next.js Router
    const [email, setemail] = useState("dev1@mail.com");
    const [password, setPassword] = useState("dev");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/userLogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("Login successful!");
                login(data.access_token, data.user.name);
                if (data.access_token) {
                    localStorage.setItem("token", data.access_token);
                }
                router.replace("/dashboard");
            } else {
                setError(data.message || "Invalid login credentials");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    };


    return (
      
        <div className="container py-5">
          
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>

                            <form onSubmit={handleSubmit}>
                                {/* email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        placeholder="Enter your email"

                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </div>

                                {/* Submit */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? "Logging in..." : "Login"}
                                    </button>
                                </div>

                                {/* Status Messages */}
                                {error && <p className="text-danger mt-3">{error}</p>}
                                {success && <p className="text-success mt-3">{success}</p>}

                                {/* Forgot Password */}

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}