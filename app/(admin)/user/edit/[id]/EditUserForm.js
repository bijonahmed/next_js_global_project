// EditUserForm.jsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext"; // adjust path
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function EditUserForm({ id }) {
    const { token } = useAuth(); // client-side token
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
                console.log("User data:", data.data.name);
                setUser(data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id, token]);


    const pathname = usePathname();
    const title = pathname
        ? pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2)
        : "";
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
                                <form>
                                    {/*begin::Body*/}
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" className="form-control" defaultValue={user?.name || ""} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email address</label>
                                            <input type="email" className="form-control" defaultValue={user?.email} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Phone</label>
                                            <input type="text" className="form-control" defaultValue={user?.phone_number} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <input type="text" className="form-control" defaultValue={user?.address} />
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
