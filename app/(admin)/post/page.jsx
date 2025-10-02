"use client"; // Required in Next.js App Router for client-side component

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { customStyles } from "../../components/styles/customDataTable";
import { useAuth } from "../../context/AuthContext";

export default function UserPage() {
    const router = useRouter();
    const { token } = useAuth();
    const pathname = usePathname();
    const title = "Post List";
    //const title = pathname ? pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2) : "";
    // update document title
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);
    const [statusFilter, setStatusFilter] = useState("");
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
        selectedFilter = statusFilter !== "" ? statusFilter : 1
    ) => {
        setLoading(true);

        try {
            const url = `${process.env.NEXT_PUBLIC_API_BASE}/post/allPost?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&selectedFilter=${selectedFilter}`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, 
                },
            });

            if (!res.ok) {
                throw new Error(`API Error: ${res.status}`);
            }

            const json = await res.json();
            setData(json.data || []);
         //   setTotalRows(json.total_records || 0);  
        } catch (err) {
            console.error("Fetch users failed:", err);
            alert("Failed to fetch users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page, perPage, search);
    }, [page, perPage, search]);

    const columns = [
        { name: "Name", selector: row => row.name, sortable: true },
        { name: "Category Name", selector: row => row.category_name, sortable: true },
        { name: "Status", selector: row => row.status == 1 ? 'Active' : 'Inactive', sortable: true },
        {
            name: "Actions",
            cell: row => (
                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-primary" onClick={() => router.push(`/post/edit/${row.id}`)}>
                        <i className="bi bi-pencil"></i> Edit
                    </button>
                </div>
            ),
            ignoreRowClick: true,
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
                        {/* Header */}
                        <div className="card-header">
                            <div className="card-title w-100">
                                <div className="row g-2 align-items-center">

                                    {/* Column 1: Search input */}
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <input
                                            type="text"
                                            placeholder="Search name..."
                                            className="form-control"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                    {/* Status Filter */}
                                    <div className="col-4 col-md-4 col-lg-3">
                                        <select
                                            className="form-control"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        >
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                    {/* Column 2: Fetch button */}
                                    <div className="col-6 col-md-3 col-lg-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary w-100"
                                            onClick={() => fetchUsers()}
                                        >
                                            Fetch
                                        </button>
                                    </div>

                                    {/* Column 3: Add User button */}
                                    <div className="col-6 col-md-3 col-lg-1 ms-auto">
                                        <button className="btn btn-primary w-100" onClick={() => router.push(`/post/add/`)}>Add New</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="card-body p-0">
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