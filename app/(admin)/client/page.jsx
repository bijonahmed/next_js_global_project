
import Link from "next/link";

export default function ClientPage() {
    return (
        <div className="container py-5">
            <h1>Client List</h1>
            <p>Hello,</p>

<Link href="/dashboard" className="nav-link">My Dashboard</Link>



        </div>
    );
}
