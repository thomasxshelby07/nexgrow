"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash, Save } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminNavbarEditor() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/admin/navbar")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then(data => {
                setItems(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error("Error loading navbar config:", err);
                setItems([]);
                alert("Database connection failed. You can still edit, but saving might fail until fixed.");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        await fetch("/api/admin/navbar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items })
        });
        setSaving(false);
        alert("Saved successfully!");
    };

    const addItem = () => {
        setItems([...items, { label: "New Link", path: "/", type: "link", order: items.length }]);
    };

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const deleteItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-gray-200 rounded-lg">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-3xl font-bold">Edit Navbar</h1>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-[#ff4a01] disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>

                <div className="space-y-4">
                    {items.map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-4 shadow-sm">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Label</label>
                                    <input
                                        value={item.label}
                                        onChange={e => updateItem(i, "label", e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Path</label>
                                    <input
                                        value={item.path}
                                        onChange={e => updateItem(i, "path", e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
                                    <select
                                        value={item.type}
                                        onChange={e => updateItem(i, "type", e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value="link">Link</option>
                                        <option value="button">Button</option>
                                        <option value="dropdown">Dropdown (Coming Soon)</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={() => deleteItem(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg mt-5">
                                <Trash size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <button onClick={addItem} className="mt-6 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-[#ff4a01] hover:text-[#ff4a01] transition-colors flex items-center justify-center gap-2">
                    <Plus size={20} /> Add Menu Item
                </button>
            </div>
        </div>
    );
}
