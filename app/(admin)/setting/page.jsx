"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // adjust path
import toast, { Toaster } from "react-hot-toast";

import Link from "next/link";

export default function SettingPage() {
    const { token } = useAuth();
    const [user, setUser] = useState(null);
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const title = pathname ? pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2) : "";
    // update document title
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    const [formData, setFormData] = useState({
        name: user?.user?.name || "",
        email: user?.email || "",
        address: user?.address || "",
        whatsApp: user?.whatsApp || "",
        fblink: user?.fblink || "",
        description: user?.description || "",
        website: user?.website || "",
        telegram: user?.telegram || "",
        copyright: user?.copyright || "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/setting/upateSetting`, {
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
                toast.error(Object.values(data.errors).flat().join(" "));
                setErrors(data.errors);
            } else {
                toast.error(data.message || "Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network or server error!");
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/setting/settingrow`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await res.json();
                if (res.ok) {
                    setUser(data.data); // not the whole data wrapper
                    setFormData({
                        name: data?.data?.name || "",
                        email: data?.data?.email || "",
                        address: data?.data?.address || "",
                        whatsApp: data?.data?.whatsApp || "",
                        fblink: data?.data?.fblink || "",
                        description: data?.data?.description || "",
                        website: data?.data?.website || "",
                        telegram: data?.data?.telegram || "",
                        copyright: data?.data?.copyright || "",
                    });
                } else {
                    console.error("Auth error:", data.message);
                }
            } catch (err) {
                console.error("API error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <p className="text-center py-5"></p>;
    }


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
                                <li className="breadcrumb-item active" aria-current="page"><a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.back();
                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    ← Back
                                </a></li>
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
                                    {/*begin::Body*/}
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} name="name" value={formData.name} onChange={handleChange} />
                                            {errors.name && errors.name.length > 0 && (
                                                <div className="invalid-feedback">{errors.name[0]}</div>
                                            )}
                                        </div>


                                        <div className="mb-3">
                                            <label className="form-label">Email address</label>
                                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
                                        </div>


                                        <div className="mb-3">
                                            <label className="form-label">Business Description</label>
                                            <textarea type="text" className="form-control" name="description" value={formData.description} onChange={handleChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">WhatsApp</label>
                                            <input type="text" className="form-control" name="whatsApp" value={formData.whatsApp} onChange={handleChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Facebook Page Link</label>
                                            <input type="text" className="form-control" name="fblink" value={formData.fblink} onChange={handleChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Website</label>
                                            <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Telegram</label>
                                            <input type="text" className="form-control" name="telegram" value={formData.telegram} onChange={handleChange} />
                                        </div>


                                        <div className="mb-3">
                                            <label className="form-label">Copyright</label>
                                            <input type="text" className="form-control" name="copyright" value={formData.copyright} onChange={handleChange} />
                                        </div>



                                    </div>
                                    {/*end::Body*/}
                                    {/*begin::Footer*/}
                                    <div className="card-footer text-end">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                    {/*end::Footer*/}
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
