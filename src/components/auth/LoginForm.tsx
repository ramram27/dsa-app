/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";

const url = process.env.API_URL || 'http://localhost:4000/api';
export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(false)
        try {
            const res = await axios.post(`${url}/login`, { email, password });
            console.log("hello", res)
            localStorage.setItem('userEmail', email);
            router.push("/dashboard")
        } catch (err: any) {
            console.log("hello", err)
            setError(err?.responce?.data?.message ?? 'login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4 ">Sign in</h2>

            {error && <div className="mb-3 text-red-600">{error}
            </div>}

            <label className="block mb-2">
                <span className="text-sm">Email</span>
                <input
                    className="mt-1 block w-full border rounded px-3 py-2"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                />
            </label>

            <label className="block mb-4">
                <span className="text-sm">Password</span>
                <input
                    className="mt-1 block w-full border rounded px-3 py-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                />
            </label>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded bg-blue-600 text-white disabled:opacity-70"
            >
                {loading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    )
}