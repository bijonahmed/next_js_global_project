"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext"; // adjust path
import { usePathname } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function EditUserForm({ id }) {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        id: id,
        name: "",
        meta_title: "",
        meta_description: "",
        meta_keyword: "",
        categoryId: "",
        description_full: "",
        status: "",
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [postCategory, setPostCategorys] = useState([]);
    const router = useRouter();
    const pathname = usePathname();
    const title = "Post Edit";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/post/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Post updated successfully ✅");
                router.push("/post");
            } else if (data.errors) {
                toast.error(Object.values(data.errors).flat().join(" "));
            } else {
                toast.error(data.message || "Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network or server error!");
        }
    };

    // Fetch post data
    useEffect(() => {
        if (!id || !token) return;
        const fetchPost = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/post/postrow/${id}`, {
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                const datarow = data?.data || {};
                setFormData({
                    id: datarow.id ?? "",
                    name: datarow.name ?? "",
                    meta_title: datarow.meta_title ?? "",
                    meta_description: datarow.meta_description ?? "",
                    meta_keyword: datarow.meta_keyword ?? "",
                    categoryId: datarow.categoryId ?? "",
                    description_full: datarow.description_full ?? "",
                    status: datarow.status ?? "",
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id, token]);

    // Fetch post categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/category/postCategorysearch`, {
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (res.ok) setPostCategorys(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (title) document.title = title;
    }, [title]);

    if (loading) return <p>Loading...</p>;

    return (
        <main className="app-main" id="main" tabIndex={-1}>
            <Toaster position="top-right" />
            <div className="app-content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6"><h3 className="mb-0">{title}</h3></div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-end">
                                <li className="breadcrumb-item"><Link href="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{title}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="app-content">
                <div className="container-fluid">
                    <div className="row g-4">
                        <div className="col-md-12">
                            <div className="card card-primary card-outline mb-4">
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
                                            {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Meta Title</label>
                                            <input
                                                type="text"
                                                name="meta_title"
                                                className="form-control"
                                                value={formData.meta_title}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Meta Keyword</label>
                                            <input
                                                type="text"
                                                name="meta_keyword"
                                                className="form-control"
                                                value={formData.meta_keyword}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Meta Description</label>
                                            <textarea
                                                name="meta_description"
                                                className="form-control"
                                                rows={5}
                                                value={formData.meta_description}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Post Category</label>
                                            <select
                                                name="categoryId"
                                                className={`form-control ${errors.categoryId ? "is-invalid" : ""}`}
                                                value={formData.categoryId}
                                                onChange={handleChange}
                                            >
                                                <option value="">-- Select --</option>
                                                {postCategory.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Full Description</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                key={formData.id} // important: force rerender when id changes
                                                data={formData.description_full}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setFormData(prev => ({ ...prev, description_full: data }));
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="card-footer text-end">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
