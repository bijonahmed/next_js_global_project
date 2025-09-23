
import Link from "next/link";

export default function UserPage() {
    return (
        <div className="container py-5">
            <h1>User List</h1>
            <p>Hello,</p>
            <Link href="/dashboard" className="nav-link">My Dashboard</Link>
        </div>
    );
}
