"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../context/AuthContext"; // adjust path
import toast, { Toaster } from "react-hot-toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";



import Link from "next/link";

export default function UserAddPage() {
    const { token } = useAuth();
    const [user, setUser] = useState(null);
    const [postCategory, setPostCategorys] = useState(null);
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const title = "Post Add";//pathname ? pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2) : "";
    // update document title
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    const [formData, setFormData] = useState({
        name: "",
        meta_title: "",
        meta_description: "",
        meta_keyword: "",
        categoryId: "",
        description_full: "",
        status: 1
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/post/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...formData }),
            });

            const data = await res.json();
            if (res.ok) {
                setUser(data);
                toast.success("Post add successfully ✅");
                router.push("/post");
            } else if (data.errors) {
                toast.error(Object.values(data.errors).flat().join("\n"), {
                    style: { whiteSpace: "pre-line" },
                });

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
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/category/postCategorysearch`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await res.json();
                if (res.ok) {
                    setPostCategorys(data);
                } else {
                    console.error("Auth error:", data.message);
                }
            } catch (err) {
                console.error("API error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [router]);

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
                                            <label className="form-label">Meta Title</label>
                                            <input type="text" className="form-control" name="meta_title" value={formData.meta_title} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Meta Keyword</label>
                                            <input type="text" className="form-control" name="meta_keyword" value={formData.meta_keyword} onChange={handleChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Meta Description</label>
                                            <textarea
                                                className="form-control"
                                                name="meta_description"
                                                rows={5}
                                                cols={5}
                                                value={formData.meta_description}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Post Categoryes</label>
                                            <select
                                                className={`form-control ${errors.categoryId ? "is-invalid" : ""}`}
                                                name="categoryId"
                                                value={formData.categoryId}
                                                onChange={handleChange}
                                            >
                                                <option value="">-- Select --</option>
                                                {postCategory.map((pcategory, index) => (
                                                    <option key={pcategory.id} value={pcategory.id}>
                                                        {pcategory.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {errors.categoryId && errors.categoryId.length > 0 && (
                                                <div className="invalid-feedback">{errors.categoryId[0]}</div>
                                            )}

                                        </div>


                                        <div className="mb-3">
                                            <label className="form-label">Full Description</label>
                                            {/* <textarea className="form-control" name="address" value={formData.description_full} onChange={handleChange} /> */}
                                            <CKEditor
                                                editor={ClassicEditor}
                                               
                                                data={formData.description_full}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setFormData({ ...formData, description_full: data });
                                                }}
                                            />
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
