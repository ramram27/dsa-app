'use client'

export default function DashboardPage() {
    const email = localStorage.getItem('userEmail');

    return (
        <div className="min-h-screen bg-gray-50 flex" style={{ marginTop: '-30rem' }}>
            <div className="flex-1 p-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Email: {email}</h3>
                </div>
            </div>
        </div>
    );
}