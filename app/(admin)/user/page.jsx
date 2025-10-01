"use client"; // Required in Next.js App Router for client-side component

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { customStyles } from "../../components/styles/customDataTable";
import { useAuth } from "../../context/AuthContext"; // adjust path

export default function UserPage() {
    const router = useRouter();
    const { token } = useAuth();
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

    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const fetchUsers = async (
        page = 1,
        pageSize = 10,
        searchQuery = "",
        selectedFilter = 1
    ) => {
        setLoading(true);

        try {
            const url = `${process.env.NEXT_PUBLIC_API_BASE}/user/allSuperAdmin?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&selectedFilter=${selectedFilter}`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // keep token if required
                },
            });

            if (!res.ok) {
                throw new Error(`API Error: ${res.status}`);
            }

            const json = await res.json();

            // ✅ Match Laravel API response keys
            setData(json.data || []);
            setTotalRows(json.total_records || 0); // Laravel returns total_records
        } catch (err) {
            console.error("Fetch users failed:", err);
            alert("Failed to fetch users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Example useEffect
    useEffect(() => {
        fetchUsers(page, perPage, search);
    }, [page, perPage, search]);

    const columns = [
        { name: "Name", selector: row => row.name, sortable: true },
        { name: "Email", selector: row => row.email, sortable: true },
        { name: "Phone", selector: row => row.phone_number, sortable: true },
        {
            name: "Actions",
            cell: row => (
                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-light" onClick={() => router.push(`/user/view/${row.id}`)}>
                        View
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={() => router.push(`/user/edit/${row.id}`)}>
                        Edit
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        },
    ];

    const conditionalRowStyles = [
        {
            when: row => row.id === 4, // condition
            style: {
                backgroundColor: '#bebebdff',
                color: 'black', // optional, to make text visible
            },
        },
    ];
    const handlePageChange = newPage => setPage(newPage);
    const handlePerRowsChange = newPerPage => setPerPage(newPerPage);
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
                    <div className="card card-primary card-outline mb-4">
                        {/*begin::Header*/}
                        <div className="card-header"><div className="card-title">Collapse</div></div>
                        {/*end::Header*/}
                        {/*begin::Body*/}
                        <div className="card-body">
                            <div className="mb-3 d-flex justify-content-between">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    className="form-control w-50"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <button className="btn btn-primary">Add User</button>
                            </div>

                            <button type="button" onClick={() => fetchUsers()}>Fetech</button>


                            <DataTable
                                columns={columns}
                                data={data}
                                progressPending={loading}
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                onChangePage={handlePageChange}
                                onChangeRowsPerPage={handlePerRowsChange}
                                customStyles={customStyles}
                                conditionalRowStyles={conditionalRowStyles} // <-- add this
                            />
                        </div>
                    </div>
                    {/*end::Body*/}
                </div>

                {/*end::Row*/}
            </div>
            {/*end::Container*/}

            {/*end::App Content*/}
        </main >

    );
}
