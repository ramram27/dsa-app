'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const handleLogout = (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userData');
        router.push('/');
    };
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 p-8">

                {/* <div className="bg-[#428df5] text-white rounded-lg shadow-sm p-6 mb-6">

                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-white">Welcome to Dashboard</h1>
                        <div className="flex space-x-4">
                            <Link
                                href="/dashboard"
                                className="text-white hover:text-blue-800 font-medium"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/dashboard/topic"
                                className="text-white hover:text-blue-800 font-medium"
                            >
                                Topics
                            </Link>
                            <Link
                                href="/progress"
                                className="text-white hover:text-blue-800 font-medium"
                            >
                                Progress
                            </Link>
                            <Link
                                href="/logout"
                                className="text-red-600 hover:text-red-800 font-medium"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div> */}
                <div className="bg-blue-600 text-white p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <div className="flex space-x-4">
                            <Link href="/dashboard" className="hover:text-blue-200">Profile</Link>
                            <Link href="/dashboard/topic" className="hover:text-blue-200 font-semibold">Topics</Link>
                            <Link href="/dashboard/progress" className="hover:text-blue-200">Progress</Link>
                            <button
                                onClick={handleLogout}
                                className="hover:text-blue-200 border border-white px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}