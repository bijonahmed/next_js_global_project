// EditUserForm.jsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext"; // adjust path
import { usePathname } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";


export default function EditUserForm({ id }) {
    const { token } = useAuth(); // client-side token
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});


    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone_number: user?.phone_number || "",
        address: user?.address || "",
        facebook: user?.facebook || "",
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/updateprofile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // ✅ pass token
                },
                body: JSON.stringify({ ...formData, email: user?.email }),
            });

            const data = await res.json();
            if (res.ok) {
                setUser(data);
                toast.success("User updated successfully ✅"); // ✅ success toast
            } else if (data.errors) {
                toast.error(Object.values(data.errors).flat().join(" ")); // show backend validation errors
            } else {
                toast.error(data.message || "Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network or server error!");
        }
    };



    useEffect(() => {
        if (!token) return;

        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user/getUserRow/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                const user = data?.data || {};
                setFormData({
                    name: user.name ?? "",
                    email: user.email ?? "",              // ensure string, not undefined
                    phone_number: user.phone_number ?? "",
                    address: user.address ?? "",
                    facebook: user.facebook ?? "",
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id, token]);


    const pathname = usePathname();
    const title = "User Edit";
    //const title = pathname ? pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2) : "";
    // update document title
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);


    return (
        <main className="app-main" id="main" tabIndex={-1}>
            {/*begin::App Content Header*/}
            <div className="app-content-header">
                {/*begin::Container*/}
                <div className="container-fluid">
                    {/*begin::Row*/}
                    <div className="row">
                        <div className="col-sm-6"><h3 className="mb-0">{title}</h3></div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-end">
                                <li className="breadcrumb-item"><Link href="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{title}</li>
                            </ol>
                        </div>
                    </div>
                    {/*end::Row*/}
                </div>
                {/*end::Container*/}
            </div>

            {/*begin::App Content*/}
            <div className="app-content">
                {/*begin::Container*/}
                <div className="container-fluid">
                    {/*begin::Row*/}
                    <div className="row g-4">
                        {/*begin::Col*/}
                        <div className="col-md-12">
                            {/*begin::Quick Example*/}
                            <div className="card card-primary card-outline mb-4">

                                {/*begin::Form*/}
                                <Toaster position="top-right" />
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            {errors.name?.length > 0 && (
                                                <div className="invalid-feedback">{errors.name[0]}</div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Email address</label>
                                            <input
                                                type="text"
                                                name="email"
                                                className="form-control"
                                                value={formData.email ?? ""}   // fallback if undefined
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Phone</label>
                                            <input
                                                type="text"
                                                name="phone_number"
                                                className={`form-control ${errors.phone_number ? "is-invalid" : ""}`}
                                                value={formData.phone_number ?? ""}
                                                onChange={handleChange}
                                            />
                                            {errors.phone_number?.length > 0 && (
                                                <div className="invalid-feedback">{errors.phone_number[0]}</div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                className="form-control"
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Facebook profile link</label>
                                            <input
                                                type="text"
                                                name="facebook"
                                                className="form-control"
                                                value={formData.facebook}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="card-footer text-end">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>

                                {/*end::Form*/}
                            </div>
                            {/*end::Quick Example*/}

                        </div>
                        {/*end::Col*/}

                    </div>
                    {/*end::Row*/}
                </div>
                {/*end::Container*/}
            </div>
            {/*end::App Content*/}
        </main>

    );
}
