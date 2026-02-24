"use client";

import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";
import Image from "next/image";

export default function AdminDashboard() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/adminlogin");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 z-50">
                <div className="p-6 border-b border-gray-100 flex justify-center">
                    <div className="relative w-32 h-8">
                        <Image src="/logo.png" alt="NexGrow" fill className="object-contain" />
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#ff4a01]/10 text-[#ff4a01] rounded-xl font-medium">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </div>
                    <button
                        onClick={() => router.push('/admin/homepage')}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                    >
                        <LayoutDashboard size={20} />
                        Edit Home Page
                    </button>
                    <button
                        onClick={() => router.push('/admin/navbar')}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                    >
                        <LayoutDashboard size={20} />
                        Edit Navbar
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Projects</h3>
                            <div className="text-3xl font-bold">12</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-gray-500 text-sm font-medium mb-2">Active Services</h3>
                            <div className="text-3xl font-bold text-[#ff4a01]">5</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-gray-500 text-sm font-medium mb-2">Next Audit</h3>
                            <div className="text-xl font-bold text-gray-800">Feb 24, 2026</div>
                        </div>
                    </div>

                    <div className="mt-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center py-20">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LayoutDashboard className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome Back, Jatin!</h3>
                        <p className="text-gray-500 max-w-md mx-auto">Select an option from the sidebar to manage your content and settings.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
